let version='20200428.0'
addEventListener('install',e=>{
    e.waitUntil((async()=>{
        let cache=await caches.open(version)
        await cache.addAll(['/'])
    })())
})
addEventListener('fetch',e=>{
    e.respondWith((async()=>{
/*
    cache.match after fetch error is always undefined in chrome 81.
    believed to be a bug.
    cache.match before fetch.
*/
        let
            cache=await caches.open(version),
            c=await cache.match(e.request)
        try{
            return await fetch(e.request)
        }catch(e){
            return c
        }
    })())
})
