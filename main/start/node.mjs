import path from    'path'
import url from     'url'
function importMetaToDir(meta){
    return path.dirname((new url.URL(meta.url)).pathname)
}
function onceSigintOrSigterm(f){
    function g(){
        process.off('SIGINT',g).off('SIGTERM',g)
        f()
    }
    process.on('SIGINT',g).on('SIGTERM',g)
}
export default{
    importMetaToDir,
    onceSigintOrSigterm,
}
