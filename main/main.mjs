import doe from         '../lib/doe/main/doe.mjs'
import Stopwatch from   './Stopwatch.mjs'
let{a,div,span}=doe
function Page(){
    let stopwatch=new Stopwatch
    this._stopwatch=stopwatch
    this.node=div(
        {className:'page'},
        stopwatch.ui,
        a({
            href:'https://anliting.com/stopwatch',
            className:'bottomA',
            onclick:e=>this.onHrefClick(e),
        },'Readme'),
        a({
            className:'bottomB',
            href:'https://anliting.com/',
            onclick:e=>this.onHrefClick(e),
        },'An-Li Ting'),
    )
}
Page.style=`
    .page{
        position:relative;
        margin:calc(8px *  var(--zoom));
        width:calc(100% - 16px *  var(--zoom));
        height:calc(100% - 16px *  var(--zoom));
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        font-size:calc(16px * var(--zoom));
        text-align:center;
    }
    .page::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .page>.stopwatch{
        display:inline-block;
        vertical-align:middle;
    }
    .page>.bottomA{
        position:absolute;
        left:0;
        bottom:0;
    }
    .page>.bottomB{
        position:absolute;
        right:0;
        bottom:0;
        font-size:calc(8px * var(--zoom));
        font-family:serif;
        font-style:italic;
    }
    ${Stopwatch.style}
`
Page.prototype.onHrefClick=function(){
}
Page.prototype.onKeyDown=function(e){
    this._stopwatch.onKeyDown(e)
}
Object.defineProperty(Page.prototype,'size',{set(v){
/*
    width: 8+600+8=616
    height: 16*1.2+24+64*1.2+16+64+24+16*1.2=243.2
    r: 243.2/616
    width: 320
    height: 16*1.2+24+40*1.2+16+64+8+64+24+16*1.2=286.4
    r: 286.4/320
*/
    this._size=v
    let
        bodyRatio=this._size[1]/this._size[0],
        hold=r=>r<bodyRatio?r/bodyRatio:bodyRatio/r,
        layout={},
        zoom
    this._stopwatch.layout=layout=hold(286.4/320)<=hold(243.2/616)?{
        composition:'a',
        zoom:243.2/616<bodyRatio?this._size[0]/616:this._size[1]/243.2,
    }:{
        composition:'b',
        zoom:286.4/320<bodyRatio?this._size[0]/320:this._size[1]/286.4,
    }
    this.node.style.setProperty('--zoom',layout.zoom)
}})
let page=new Page
doe.head(doe.style(`
    html{
        height:100%;
    }
    body{
        margin:0;
        overflow:hidden;
        background-color:#808080;
        font-family:sans-serif;
        font-size:16px;
        line-height:1.2;
        height:100%;
    }
    a{
        color:unset;
        text-decoration:unset;
    }
    ${Page.style}
`))
doe.body(page.node)
onkeydown=page.onKeyDown.bind(page)
let size
{
    let bcr=document.body.getBoundingClientRect()
    size=page.size=[bcr.width,bcr.height]
}
onresize=e=>{
    let bcr=document.body.getBoundingClientRect()
    if(size[0]!=bcr.width||size[1]!=bcr.height)
        size=page.size=[bcr.width,bcr.height]
}
