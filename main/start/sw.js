let version='20200429'
addEventListener('install',e=>{
    e.waitUntil((async()=>{
        let cache=await caches.open(version)
        await cache.addAll(['/'])
    })())
})
addEventListener('fetch',e=>{
    e.respondWith((async()=>{
        let cache=caches.open(version),c=(async()=>{
            cache=await cache
            return cache.match(e.request)
        })()
        let res
        try{
            res=await fetch(e.request.clone())
        }catch(e){
            return c
        }
        ;(async()=>{
            cache=await cache
            cache.put(e.request,res)
        })()
        return res.clone()
    })())
})
