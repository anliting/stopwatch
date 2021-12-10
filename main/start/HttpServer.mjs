import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import link from            './HttpServer/link.mjs'
import minify from          './HttpServer/minify.mjs'
import htmlMinifier from    'html-minifier'
async function calcSw(mainDir){
    return minify(
        ''+await fs.promises.readFile(`${mainDir}/start/HttpServer/sw`)
    )
}
async function calcRootContent(mainDir){
    return htmlMinifier.minify(`
        <!doctype html>
        <meta name=theme-color content=#7f7f7f>
        <meta name=viewport content='initial-scale=1,width=device-width'>
        <link rel=icon href=%23icon>
        <link rel=manifest href=%23manifest>
        <title>Stopwatch</title>
        <body>
        <script type=module>${
            await minify(
                await link(`${mainDir}/start/HttpServer/main.mjs`)
            )
        }</script>
    `,{
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
        if(header[':method']=='GET'&&url.pathname=='/%23icon'){
            stream.respond({
                ':status':200,
                'content-type':'image/png'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/icon/main512.png`).pipe(stream)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/%23manifest'){
            stream.respond({
                ':status':200,
                'content-type':'application/manifest+json'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/manifest`).pipe(stream)
            return
        }
        if(header[':method']=='GET'&&url.pathname=='/%23mi.woff2'){
            stream.respond({
                ':status':200,
                'content-type':'font/woff2'
            })
            fs.createReadStream(`${mainDir}/start/HttpServer/mi.woff2`).pipe(stream)
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
