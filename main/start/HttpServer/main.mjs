import doe from         'doe'
import Page from        './main/Page.mjs'
let preloadIconDiv
doe.body(preloadIconDiv=doe.div(
    n=>{n.style.opacity=0},
    [
        'arrow_back_ios',
        'arrow_forward_ios',
        'article',
        'get_app',
        //'help_outline',
        'menu',
        'open_in_new',
        'pause',
        'person',
        'play_arrow',
        'radio_button_checked',
        'radio_button_unchecked',
        'schedule',
        'settings',
        'stop',
    ].map(a=>
        doe.span({className:'material-icons'},a),
    )
))
let
    page=new Page,
    setting,
    sw
page.onSetTimestampProvider=v=>{
    let newSetting=JSON.parse(JSON.stringify(setting))
    newSetting.timestampProvider=v
    sw.postMessage(['setSetting',newSetting])
}
doe.head(doe.style(`
    html{
        height:100%;
    }
    body{
        margin:0;
        overflow:hidden;
        background-color:#7f7f7f;
        font-family:sans-serif;
        font-size:16px;
        line-height:1.2;
        height:100%;
        touch-action:none;
    }
    a{
        color:unset;
        text-decoration:unset;
    }
    @font-face{
        font-family:'Material Icons';
        font-style:normal;
        font-weight:400;
        src:url(/mi.woff2) format('woff2');
    }
    .material-icons{
        font-family:'Material Icons';
        font-weight:normal;
        font-style:normal;
        display:inline-block;
        line-height:1;
        text-transform:none;
        letter-spacing:normal;
        word-wrap:normal;
        white-space:nowrap;
        direction:ltr;
        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering:optimizeLegibility;
        /* Support for Firefox. */
        -moz-osx-font-smoothing:grayscale;
    }
    ${Page.style}
`))
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
                        await document.fonts.ready
                        doe.body(1,preloadIconDiv,0,page.node)
                    })()
            }else{
                sw.postMessage(['setSetting',{
                    timestampProvider:'highResolutionTime',
                }])
            }
        }
    }
})()
