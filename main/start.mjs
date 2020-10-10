import Server from  './start/Server.mjs'
import node from    './node.mjs'
let server
node.onceSigintOrSigterm(()=>
    server.end()
)
server=new Server(node.importMetaToDir(import.meta))
