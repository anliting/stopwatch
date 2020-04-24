import http2 from           'http2'
import fs from              'fs'
import urlModule from       'url'
import rollup from          'rollup'
async function link(input,file){
    let bundle=await rollup.rollup({
        input,
    })
    return(await bundle.generate({
        file,
        format:'es',
    })).output[0].code
}
async function calcRootContent(mainDir){
    return(
        await fs.promises.readFile(`${mainDir}/main.html`,'utf8')
    ).replace(
        '<script type=module src=main.mjs></script>',
        `<script type=module>${
            await link(`${mainDir}/main.mjs`)
        }</script>`
    )
}
function HttpServer(mainDir,test,tls){
    this._mainDir=mainDir
    this._test=test
    this._tls=tls
    this._rootContentPromise=calcRootContent(mainDir)
    this._server=(tls?
        http2.createSecureServer().on('secureConnection',socket=>{
            socket.on('error',()=>{})
        }).on('tlsClientError',()=>{})
    :
        http2.createServer()
    ).on('stream',async(stream,header)=>{
        stream.on('error',()=>{stream.close()})
        let url=new urlModule.URL(header[':path'],'http://a')
        if(header[':method']=='GET'&&url.pathname=='/'){
            let content=await this._rootContentPromise
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
async function load(){
    async function readListen(path){
        return(
            await fs.promises.readFile(path,'utf8')
        ).split('\n')[0].split(' ')
    }
    let httpListen=await readListen('httpListen')
    try{
        await fs.promises.stat('test')
        this._test=1
    }catch(e){
        if(!(e.code=='ENOENT'))
            throw e
        this._test=0
    }
    await Promise.all([
        (async()=>{
            this._tls=1
            try{
                await fs.promises.stat('tls')
            }catch(e){
                if(!(e.code=='ENOENT'))
                    throw e
                this._tls=0
            }
            this._httpServer=new HttpServer(
                this._mainDir,
                this._test,
                this._tls
            )
            if(this._tls){
                this._interval=setInterval(async()=>{
                    this._loadTls()
                },86400e3)
                await this._loadTls()
            }
            await this._httpServer.listen(httpListen)
        })(),
    ])
}
function Server(mainDir){
    this._mainDir=mainDir
    this._load=load.call(this)
}
Server.prototype._loadTls=async function(){
    let[key,crt]=await Promise.all([
        fs.promises.readFile('tls/key','utf8'),
        fs.promises.readFile('tls/crt','utf8'),
    ])
    this._httpServer.setSecureContext({key,cert:crt})
}
Server.prototype.end=async function(){
    await this._load
    if(this._tls)
        clearInterval(this._interval)
    await this._httpServer.end()
}
export default Server
