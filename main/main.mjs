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
    ${Page.style}
`))
doe.body(page.node)
onkeydown=page.keyDown.bind(page)
;(onresize=()=>{
    let bcr=document.body.getBoundingClientRect()
    page.size=[bcr.width,bcr.height]
})()
