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
export default link
