import doe from         'doe'
import Page from        './Page/main.mjs'
let
    page=new Page,
    setting,
    sw
page.onSetTimestampProvider=v=>{
    let newSetting=JSON.parse(JSON.stringify(setting))
    newSetting.timestampProvider=v
    sw.postMessage(['setSetting',newSetting])
}
if('onbeforeinstallprompt'in window){
    let beforeinstallprompt
    onbeforeinstallprompt=e=>{
        beforeinstallprompt=e
        page.showInstall()
        page.onInstall=()=>beforeinstallprompt.prompt()
    }
    onappinstalled=event=>{
        beforeinstallprompt=0
        page.hideInstall()
    }
}
onkeydown=page.keyDown.bind(page)
;(onresize=()=>{
    let bcr=document.body.getBoundingClientRect()
    page.size=[bcr.width,bcr.height]
})()
;(async()=>{
    sw=await(async()=>{
        let reg=await navigator.serviceWorker.register('%23sw')
        await new Promise(rs=>{
            if(reg.active)
                return rs()
            reg.onupdatefound=e=>
                reg.installing.onstatechange=e=>{
                    if(reg.active)
                        rs()
                }
        })
        return reg.active
    })()
    sw.postMessage(['getSetting'])
    navigator.serviceWorker.onmessage=e=>{
        if(e.data[0]=='setSetting'){
            if(e.data[1]){
                let a=setting
                setting=e.data[1]
                page.setTimestampProvider(setting.timestampProvider)
                if(!a)
                    (async()=>{
                        await document.fonts.load("16px 'Material Icons'")
                        doe.body(page.node)
                    })()
            }else{
                sw.postMessage(['setSetting',{
                    timestampProvider:'highResolutionTime',
                }])
            }
        }
    }
})()
