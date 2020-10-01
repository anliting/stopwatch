import fs from              'fs'
import HttpServer from      './HttpServer.mjs'
async function load(){
    async function existFile(p){
        try{
            await fs.promises.stat(p)
            return 1
        }catch(e){
            if(!(e.code=='ENOENT'))
                throw e
            return 0
        }
    }
    async function readListen(path){
        try{
            return(
                await fs.promises.readFile(path,'utf8')
            ).split('\n')[0].split(' ')
        }catch(e){
            if(!(e.code=='ENOENT'))
                throw e
            return 0
        }
    }
    let
        httpListen=readListen('httpListen'),
        httpListenOnPath=existFile('httpListenOnPath')
    this._tls=await existFile('tls')
    this._httpServer=new HttpServer(
        this._mainDir,
        this._tls
    )
    if(this._tls){
        this._interval=setInterval(async()=>{
            this._loadTls()
        },86400e3)
        await this._loadTls()
    }
    await Promise.all([
        (async()=>{
            if(httpListen=await httpListen)
                this._httpServer.listen(httpListen)
        })(),
        (async()=>{
            if(await httpListenOnPath)
                this._httpServer.listen(['httpServer'])
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
