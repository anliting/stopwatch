import node from    '@anliting/node'
import Server from  './start/Server.mjs'
let server
node.onceSigintOrSigterm(()=>
    server.end()
)
server=new Server(node.importMetaToDir(import.meta))
