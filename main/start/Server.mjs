import fs from              'fs'
import HttpServer from      './HttpServer.mjs'
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
