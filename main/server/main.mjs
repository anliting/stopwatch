import core from    '@anliting/core'
import Server from  './start/Server.mjs'
let server
core.onceSigintOrSigterm(()=>
    server.end()
)
server=new Server(core.importMetaToDir(import.meta))
