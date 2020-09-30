import fs from'fs'
import link from'./link.mjs'
import buildMjs from'./buildMjs.mjs'
async function calcRootContent(){
    let main=buildMjs('main.mjs')
    return(
        await fs.promises.readFile(`main.html`,'utf8')
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${await main}
let eletron=require('electron')
page.onHrefClick=e=>{
    e.preventDefault()
    eletron.shell.openExternal(e.target.href)
}
</script>
`
    )
}
;(async()=>{
    fs.promises.writeFile(
        'app.html',
        await calcRootContent()
    )
})()
