import http2 from   'http2'
import fs from      'fs'
import urlModule from     'url'
import path from    'path'
import rollup from  'rollup'
let mainDir=path.dirname((new urlModule.URL(import.meta.url)).pathname)
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
    })
    return(await bundle.generate({
        file,
        format:'es',
    })).output[0].code
}
async function calcRootContent(){
    return(
        await fs.promises.readFile(`${mainDir}/main.html`,'utf8')
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${
            await link(`${mainDir}/main.mjs`)
        }</script>`
    )
}
let rootContentPromise=calcRootContent()
let server=http2.createServer().on('stream',async(stream,header)=>{
    stream.on('error',()=>{stream.close()})
    let url=new urlModule.URL(header[':path'],'http://a')
    if(header[':method']=='GET'&&url.pathname=='/'){
        let content=await rootContentPromise
        if(stream.closed)
            return
        stream.respond({
            ':status':200,
            type:'text/html;charset=utf-8'
        })
        stream.end(content)
    }else{
        stream.respond({
            ':status':400,
        })
        stream.end()
    }
})
let listen=(''+fs.readFileSync('httpListen')).split('\n')[0].split(' ')
server.listen(...listen)
