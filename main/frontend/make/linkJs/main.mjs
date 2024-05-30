import{rollup}from'rollup'
import core from'@anliting/core'
let dir=core.importMetaToDir(import.meta)
export default async input=>(await(await rollup({
    input,
    plugins:[{
        resolveId:i=>
            i=='doe'?`${dir}/../../../../lib/doe/export/main.mjs`:null,
    }],
})).generate({
    format:'es',
})).output[0].code
