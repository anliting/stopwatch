import doe from         '../../lib/doe/main/doe.mjs'
import Stopwatch from   './Stopwatch.mjs'
function Page(){
    let stopwatch=new Stopwatch
    this._stopwatch=stopwatch
    this.node=doe.div(
        {className:'page'},
        doe.div(
            {className:'a',},
            doe.div(
                doe.div(
                    stopwatch.ui,
                )
            )
        ),
        doe.div(
            {className:'bottom',},
            doe.a({
                href:'https://anliting.com/stopwatch',
                className:'a',
            },'Readme'),
            doe.span(
                {className:'b'},
                doe.a({href:'https://anliting.com/'},'An-Li Ting'),
                ' 2020-04-29',
            ),
        ),
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
        font-size:calc(12px * var(--zoom));
    }
    .page>.a{
        display:table;
        width:100%;
        height:100%;
    }
    .page>.a>*{
        display:table-cell;
        vertical-align:middle;
        text-align:center;
    }
    .page>.a>*>*{
        display:inline-block;
        width:100%;
        text-align:left;
    }
    .page>.bottom{
        position:absolute;
        width:100%;
        bottom:0;
    }
    .page>.bottom>.a{
        float:left;
    }
    .page>.bottom>.b{
        float:right;
    }
    ${Stopwatch.style}
`
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
        layout,
        zoom
    if(hold(286.4/320)<=hold(243.2/616)){
        layout='a'
        zoom=243.2/616<bodyRatio?this._size[0]/616:this._size[1]/243.2
    }else{
        layout='b'
        zoom=286.4/320<bodyRatio?this._size[0]/320:this._size[1]/286.4
    }
    this._stopwatch.layout=layout
    this.node.style.setProperty('--zoom',zoom)
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
;(async()=>{
    await navigator.serviceWorker.register('/%23sw')
})()
