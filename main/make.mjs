import fs from'fs'
import link from            './link.mjs'
import minify from          './minify.mjs'
import htmlMinifier from    'html-minifier'
async function calcRootContent(){
    let main=(async()=>minify(`
        ${await link('main.mjs')};
        let eletron=require('electron')
        page.onHrefClick=e=>{
            e.preventDefault()
            eletron.shell.openExternal(e.target.href)
        }
    `))()
    return htmlMinifier.minify((
        await fs.promises.readFile('main.html','utf8')
    ).replace(
        '<link rel=manifest href=manifest>',
        ''
    ).replace(
        '<link rel=icon href=icon>',
        '<link rel=icon href=data:,>'
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${await main}</script>`
    ),{
            collapseWhitespace:true,
            removeAttributeQuotes:true,
            removeOptionalTags:true,
    })
}
;(async()=>{
    fs.promises.writeFile(
        'app.html',
        await calcRootContent()
    )
})()
