import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import link from            './HttpServer/link.mjs'
import minify from          './HttpServer/minify.mjs'
import htmlMinifier from    'html-minifier'
function calcSw(mainDir){
    return fs.promises.readFile(`${mainDir}/start/HttpServer/sw`)
}
async function calcRootContent(mainDir){
    let main=(async()=>minify(`${
        await link(`${mainDir}/start/HttpServer/main.mjs`)
    };navigator.serviceWorker.register('%23sw')`))()
    return htmlMinifier.minify((
        ''+await fs.promises.readFile(
            `${mainDir}/start/HttpServer/main.html`
        )
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${await main}</script>`
    ),{
            collapseWhitespace:true,
            removeAttributeQuotes:true,
            removeOptionalTags:true,
    })
}
function HttpServer(mainDir,tls){
    this._mainDir=mainDir
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
        if(header[':method']=='GET'&&url.pathname=='/icon'){
            stream.respond({
                ':status':200,
                'content-type':'image/png'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/icon/main.png`).pipe(stream)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/manifest'){
            stream.respond({
                ':status':200,
                'content-type':'application/manifest+json'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/manifest`).pipe(stream)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/mi.ttf'){
            stream.respond({
                ':status':200,
                'content-type':'font/ttf'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/mi.ttf`).pipe(stream)
            return
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
