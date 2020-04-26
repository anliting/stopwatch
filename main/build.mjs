import fs from'fs'
import{rollup}from'rollup'
async function link(input,file){
    let bundle=await rollup({
        input,
    })
    return(await bundle.generate({
        file,
        format:'es',
    })).output[0].code
}
;(async()=>{
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
