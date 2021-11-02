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
doe.body(page.node)
onkeydown=page.keyDown.bind(page)
;(onresize=()=>{
    let bcr=document.body.getBoundingClientRect()
    page.size=[bcr.width,bcr.height]
})()
