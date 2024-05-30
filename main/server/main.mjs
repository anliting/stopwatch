import http from            'http'
import fs from              'fs'
import urlModule from       'url'
import core from            '@anliting/core'
let staticMap={
    '/':{
        header:{'content-type':'text/html;charset=utf-8'},
        path:'root',
    },
    '/%23sw':{
        header:{'content-type':'application/javascript'},
        path:'sw',
    },
    '/%23icon':{
        header:{'content-type':'image/png'},
        path:'main512.png',
    },
    '/%23manifest':{
        header:{'content-type':'text/html;charset=utf-8'},
        path:'manifest',
    },
    '/%23mi.woff2':{
        header:{'content-type':'font/woff2'},
        path:'mi.woff2',
    },
}
let HttpServer=class{
    constructor(){
        this._session=new Set
        this._server=http.createServer((rq,rs)=>{
            let
                url=new urlModule.URL(rq.url,'http://a'),
                s=staticMap[url.pathname]
            if(rq.method=='GET'&&s){
                rs.writeHead(200,s.header)
                fs.createReadStream(`static/${s.path}`).pipe(rs)
                return
            }
            rs.writeHead(400)
            rs.end()
        })
    }
    listen(){
        return new Promise(rs=>
            this._server.listen(80,rs)
        )
    }
    end(){
        return new Promise(rs=>{
            this._server.close(rs)
        })
    }
}
let server
core.onceSigintOrSigterm(()=>
    server.end()
)
server=new HttpServer
server.listen()
