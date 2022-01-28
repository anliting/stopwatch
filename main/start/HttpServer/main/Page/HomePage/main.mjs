import doe from         'doe'
import Stopwatch from   './Stopwatch/main.mjs'
export default class{
    constructor(){
        let stopwatch=new Stopwatch
        this._stopwatch=stopwatch
        this.node=doe.div(
            {className:'homePage'},
            stopwatch.ui,
            doe.div(
                {
                    className:'top',
                    onclick:()=>this.onMenu()
                },
                doe.span({className:'material-icons'},'menu')
            ),
        )
    }
    keyDown(e){
        this._stopwatch.keyDown(e)
    }
    off(){
        this._stopwatch.off()
    }
    on(){
        this._stopwatch.on()
    }
    setTimestampProvider(v){
        this._stopwatch.setTimestampProvider(v)
    }
    set size(v){
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
    }
}
