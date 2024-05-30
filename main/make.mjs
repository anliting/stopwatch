import fs from              'fs'
import core from            '@anliting/core'
import linkCss from         './start/HttpServer/linkCss/main.mjs'
import linkJs from          './start/HttpServer/linkJs/main.mjs'
import minifyCss from       './start/HttpServer/minifyCss/main.mjs'
import minifyHtml from      './start/HttpServer/minifyHtml/main.mjs'
import minifyJs from        './start/HttpServer/minifyJs/main.mjs'
let mainDir=core.importMetaToDir(import.meta)
;(async()=>{
    fs.promises.writeFile('build/root',await minifyHtml(`
        <!doctype html>
        <meta name=theme-color content=#7f7f7f>
        <meta name=viewport content='initial-scale=1,width=device-width'>
        <link rel=icon href=%23icon>
        <link rel=manifest href=%23manifest>
        <title>Stopwatch</title>
        <style>${await minifyCss(await linkCss(
            `${mainDir}/start/HttpServer/main/main.css`
        ))}</style>
        <body>
        <script type=module>${
            await minifyJs(
                await linkJs(`${mainDir}/start/HttpServer/main/main.mjs`)
            )
        }</script>
    `))
})()
;(async()=>{
    fs.promises.writeFile('build/sw',await minifyJs(
        ''+await fs.promises.readFile(`${mainDir}/start/HttpServer/sw`)
    ))
})()
