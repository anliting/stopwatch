let version='20200427.1'
addEventListener('install',e=>{
    e.waitUntil((async()=>{
        let cache=await caches.open(version)
        await cache.addAll(['/'])
    })())
})
addEventListener('fetch',e=>{
    e.respondWith((async()=>{
        let cache=await caches.open(version)
        return(await cache.match(e.request))||fetch(e.request)
    })())
})
