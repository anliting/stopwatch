import fs from              'fs'
import HttpServer from      './HttpServer.mjs'
function Server(mainDir){
    this._mainDir=mainDir
    this._httpServer=new HttpServer(this._mainDir)
    this._httpServer.listen()
}
Server.prototype.end=async function(){
    await this._httpServer.end()
}
export default Server
