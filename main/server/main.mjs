import core from        '@anliting/core'
import HttpServer from  './HttpServer/main.mjs'
let server
core.onceSigintOrSigterm(()=>
    server.end()
)
server=new HttpServer(core.importMetaToDir(import.meta))
server.listen()
