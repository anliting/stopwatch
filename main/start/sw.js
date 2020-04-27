let version='20200427.2'
addEventListener('install',e=>{
    e.waitUntil((async()=>{
        let cache=await caches.open(version)
        await cache.addAll(['/'])
    })())
})
addEventListener('fetch',e=>{
    e.respondWith((async()=>{
        try{
            return fetch(e.request)
        }catch(e){
            let cache=await caches.open(version)
            return cache.match(e.request)
        }
    })())
})
