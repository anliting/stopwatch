let version='20200427.1',cache
addEventListener('install',e=>{
    e.waitUntil((async()=>{
        cache=await caches.open(version)
        await cache.addAll(['/'])
    })())
})
addEventListener('fetch',e=>{
    e.respondWith((async()=>
        (await cache.match(e.request))||fetch(e.request)
    )())
})
