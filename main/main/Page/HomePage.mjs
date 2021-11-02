import doe from         'doe'
import Stopwatch from   './HomePage/Stopwatch.mjs'
function HomePage(){
    let stopwatch=new Stopwatch
    this._stopwatch=stopwatch
    this.node=doe.div(
        {className:'homePage'},
        stopwatch.ui,
        doe.div(
            {
                className:'top',
                onclick:()=>this.onMore()
            },
            doe.span({className:'material-icons'},'more_vert')
        ),
        doe.a({
            href:'https://althea.anliting.com/stopwatch',
            className:'bottomA',
            onclick:e=>this.onHrefClick(e),
            target:'_blank',
        },'Readme'),
        doe.a({
            className:'bottomB',
            href:'https://anliting.com/',
            onclick:e=>this.onHrefClick(e),
            target:'_blank',
        },'An-Li Ting'),
    )
}
HomePage.style=`
    .homePage{
        position:relative;
        margin:calc(8px *  var(--zoom));
        width:calc(100% - 16px * var(--zoom));
        height:calc(100% - 16px * var(--zoom));
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        font-size:calc(16px * var(--zoom));
        text-align:center;
    }
    .homePage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .homePage>.stopwatch{
        display:inline-block;
        vertical-align:middle;
    }
    .homePage>.top{
        position:absolute;
        right:calc(-8px *  var(--zoom));
        top:calc(-8px *  var(--zoom));
        user-select:none;
        font-size:calc(24px * var(--zoom));
        width:calc(24px * 1.2 * var(--zoom));
        height:calc(24px * 1.2 * var(--zoom));
        line-height:0;
    }
    .homePage>.top::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .homePage>.top>*{
        display:inline-block;
        vertical-align:middle;
        font-size:calc(24px * var(--zoom));
    }
    .homePage>.bottomA{
        position:absolute;
        left:0;
        bottom:0;
    }
    .homePage>.bottomB{
        position:absolute;
        right:0;
        bottom:0;
        font-size:calc(8px * var(--zoom));
        font-family:serif;
        font-style:italic;
    }
    ${Stopwatch.style}
`
HomePage.prototype.keyDown=function(e){
    this._stopwatch.keyDown(e)
}
Object.defineProperty(HomePage.prototype,'size',{set(v){
/*
    width: 8+600+8=616
    height:
            8+
            top-line(16*1.2)+
            stopwatch(
                16+
                clock(64*1.2)+
                16+
                control(64)+
            )+
            16+
            bottom-line(16*1.2)+
            8
        =
            243.2
    r: 243.2/616
    width: 320
    height:
            8+
            16*1.2+
            16+
            clock(40*1.2)+
            16+
            control(64)+
            8+
            control(64)+
            16+
            16*1.2+
            8
        =
            286.4
    r: 286.4/320
*/
    this._size=v
    let
        bodyRatio=this._size[1]/this._size[0],
        hold=r=>r<bodyRatio?r/bodyRatio:bodyRatio/r,
        layout={}
    this._stopwatch.layout=layout=hold(286.4/320)<=hold(243.2/616)?{
        composition:'a',
        zoom:243.2/616<bodyRatio?this._size[0]/616:this._size[1]/243.2,
    }:{
        composition:'b',
        zoom:286.4/320<bodyRatio?this._size[0]/320:this._size[1]/286.4,
    }
    this.node.style.setProperty('--zoom',layout.zoom)
}})
export default HomePage
