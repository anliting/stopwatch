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
        src:url(/mi.ttf) format('truetype');
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
    doe.span({className:'material-icons'},'arrow_back_ios'),
    doe.span({className:'material-icons'},'menu'),
    doe.span({className:'material-icons'},'open_in_new'),
))
;(async()=>{
    await document.fonts.ready
    doe.body(1,preloadIconDiv,0,page.node)
})()
let beforeinstallprompt
if('onbeforeinstallprompt'in window)
    onbeforeinstallprompt=e=>{
        beforeinstallprompt=e
        page.showInstall()
        page.onInstall=async()=>{
            beforeinstallprompt.prompt()
            if((await beforeinstallprompt.userChoice).outcome=='accepted'){
                page.hideInstall()
                beforeinstallprompt=null
            }
        }
    }
onkeydown=page.keyDown.bind(page)
;(onresize=()=>{
    let bcr=document.body.getBoundingClientRect()
    page.size=[bcr.width,bcr.height]
})()
