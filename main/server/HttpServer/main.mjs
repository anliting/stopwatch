import http from            'http'
import fs from              'fs'
import urlModule from       'url'
export default class{
    constructor(mainDir){
        this._session=new Set
        this._server=http.createServer((rq,rs)=>{
            let url=new urlModule.URL(rq.url,'http://a')
            if(rq.method=='GET')switch(url.pathname){
                case'/':
                    rs.writeHead(200,{'content-type':'text/html;charset=utf-8'})
                    fs.createReadStream('build/root').pipe(rs)
                return
                case'/%23sw':
                    rs.writeHead(200,{'content-type':'application/javascript'})
                    fs.createReadStream('build/sw').pipe(rs)
                return
                case'/%23icon':
                    rs.writeHead(200,{'content-type':'image/png'})
                    fs.createReadStream(
                        `${mainDir}/HttpServer/icon/main512.png`
                    ).pipe(rs)
                return
                case'/%23manifest':
                    rs.writeHead(200,{'content-type':'application/manifest+json'})
                    fs.createReadStream(
                        `${mainDir}/HttpServer/manifest`
                    ).pipe(rs)
                return
                case'/%23mi.woff2':
                    rs.writeHead(200,{'content-type':'font/woff2'})
                    fs.createReadStream(
                        `${mainDir}/HttpServer/mi.woff2`
                    ).pipe(rs)
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
