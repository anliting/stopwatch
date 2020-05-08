import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import{rollup}from          'rollup'
async function link(input,file){
    let bundle=await rollup({
        input,
    })
    return(await bundle.generate({
        file,
        format:'es',
    })).output[0].code
}
function calcSw(mainDir){
    return fs.promises.readFile(`${mainDir}/start/sw.js`)
}
async function calcRootContent(mainDir){
    return(
        await fs.promises.readFile(`${mainDir}/start/main.html`,'utf8')
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${
            await link(`${mainDir}/start/main.mjs`)
        }
        navigator.serviceWorker.register('/%23sw')
        </script>`
    )
}
function HttpServer(mainDir,test,tls){
    this._mainDir=mainDir
    this._test=test
    this._session=new Set
    this._rootContentPromise=calcRootContent(mainDir)
    this._swPromise=calcSw(mainDir)
    this._server=(tls?
        http2.createSecureServer().on('secureConnection',socket=>{
            socket.on('error',()=>{})
        }).on('tlsClientError',()=>{})
    :
        http2.createServer()
    ).on('session',session=>{
        this._session.add(session)
        session.on('close',()=>
            this._session.delete(session)
        )
    }).on('stream',async(stream,header)=>{
        stream.on('error',()=>{stream.close()})
        let url=new urlModule.URL(header[':path'],'http://a')
        if(header[':method']=='GET'&&url.pathname=='/'){
            let content=await this._rootContentPromise
            if(stream.closed)
                return
            stream.respond({
                ':status':200,
                'content-type':'text/html;charset=utf-8'
            })
            stream.end(content)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/%23sw'){
            stream.respond({
                ':status':200,
                'content-type':'application/javascript'
            })
            return stream.end(await this._swPromise)
        }
        stream.respond({
            ':status':400,
        })
        stream.end()
    })
}
HttpServer.prototype.setSecureContext=function(secureContext){
    this._server.setSecureContext(secureContext)
}
HttpServer.prototype.listen=function(a){
    return new Promise(rs=>
        this._server.listen(...a,rs)
    )
}
HttpServer.prototype.end=function(){
    return new Promise(rs=>{
        this._server.close(rs)
        this._session.forEach(a=>
            a.destroy()
        )
    })
}
export default HttpServer
