import doe from         'doe'
import Page from        './main/Page.mjs'
let page=new Page
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
        src:
            url(/mi.woff2) format('woff2'),
            url(/mi.ttf) format('truetype')
        ;
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
        'person',
        'radio_button_checked',
        'radio_button_unchecked',
        'schedule',
        'settings',
    ].map(a=>
        doe.span({className:'material-icons'},a),
    )
))
;(async()=>{
    await document.fonts.ready
    doe.body(1,preloadIconDiv,0,page.node)
})()
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