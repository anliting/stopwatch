import Server from  './start/Server.mjs'
import node from    './start/node.mjs'
let server
node.onceSigintOrSigterm(()=>
    server.end()
)
server=new Server(node.importMetaToDir(import.meta))
