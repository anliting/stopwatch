import fs from              'fs'
import core from            '@anliting/core'
import linkCss from         './linkCss/main.mjs'
import linkJs from          './linkJs/main.mjs'
import minifyCss from       './minifyCss/main.mjs'
import minifyHtml from      './minifyHtml/main.mjs'
import minifyJs from        './minifyJs/main.mjs'
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
            `${mainDir}/../main/main.css`
        ))}</style>
        <body>
        <script type=module>${
            await minifyJs(
                await linkJs(`${mainDir}/../main/main.mjs`)
            )
        }</script>
    `))
})()
;(async()=>{
    fs.promises.writeFile('build/sw',await minifyJs(
        ''+await fs.promises.readFile(`${mainDir}/../sw`)
    ))
})()
