import fs from'fs'
import link from'./link.mjs'
async function calcRootContent(){
    let main=link(`main.mjs`)
    return(
        await fs.promises.readFile(`main.html`,'utf8')
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${
            await main
        }
        </script>`
    )
}
;(async()=>{
    fs.promises.writeFile(
        'app.html',
        await calcRootContent()
    )
    
/*
    Distros are disabled to raise maintainability.
*/
    return
    let license=await fs.promises.readFile('license','utf8')
    fs.promises.writeFile(
        'dist/Stopwatch.mjs',
        `/*${license}*/${
            await link(`main/Stopwatch.mjs`)
        }`
    )
    fs.promises.writeFile(
        'dist/main.html',
        `<!--${license}-->${
            (await fs.promises.readFile('main/main.html','utf8')).replace(
                '<script type=module src=main.mjs></script>',
                `<script type=module>${
                    await link(`main/main.mjs`)
                }</script>`
            )
        }`
    )
})()
