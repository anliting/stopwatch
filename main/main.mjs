import doe from'../lib/doe/main/doe.mjs'
import characteristics from'./main/characteristics.mjs'
import style from'./main/style.mjs'
function msToString(t){
    let output=paddingZerosTo(t%1000,3)
    t=~~(t/1000)
    output=paddingZerosTo(t%60,2)+'.'+output
    t=~~(t/60)
    output=paddingZerosTo(t%60,2)+':'+output
    t=~~(t/60)
    output=paddingZerosTo(t%24,2)+':'+output
    t=~~(t/24)
    return output
    function paddingZerosTo(m,n){
        m=''+m
        while(m.length<n)
            m='0'+m
        return m
    }
}
function Stopwatch(){
    let stopwatch=this
    this._node={}
    this.ui=doe.div(
        {className:'stopwatch'},
        doe.div(
            this._node.div_clock=doe.div(
                {className:'clock'},
                msToString(0),
            ),
            this._node.startOrPauseButton=
                doe.button('Start (space)',{className:'button',onclick(){
                    let now=performance.now()
                    stopwatch[stopwatch._isRunning?'_pause':'_start'](now)
                }}),
            doe.button('Reset (R)',{className:'button',onclick(){
                stopwatch._reset()
            }}),
            characteristics(),
        )
    )
}
Stopwatch.prototype._setClock=function(now){
    this._node.div_clock.textContent=
        msToString(~~(now-this._startTime))
}
Stopwatch.prototype._start=function(now){
    this._node.startOrPauseButton.textContent='Pause (space)'
    if(!this._startTime)
        this._startTime=now
    else
        this._startTime=now-(this._stopTime-this._startTime)
    this._isRunning=1
    let frame=now=>{
        this._setClock(now)
        this._requestId=requestAnimationFrame(frame)
    }
    this._requestId=requestAnimationFrame(frame)
}
Stopwatch.prototype._pause=function(now){
    this._node.startOrPauseButton.textContent='Start (space)'
    cancelAnimationFrame(this._requestId)
    this._isRunning=0
    this._stopTime=now
    this._setClock(now)
}
Stopwatch.prototype._reset=function(){
    if(this._isRunning){
        cancelAnimationFrame(this._requestId)
        this._isRunning=0
    }
    this._startTime=undefined
    this._node.div_clock.textContent=msToString(0)
}
let map={
    ' ':function(e,now){
        this[this._isRunning?'_pause':'_start'](now)
    },
    r(e,now){
        this._reset()
    },
}
Stopwatch.prototype.onKeyDown=function(e){
    let now=performance.now()
    if(!(e.key in map))
        return
    e.preventDefault()
    e.stopPropagation()
    map[e.key].call(this,e,now)
}
Stopwatch.style=style
let stopwatch=new Stopwatch
doe.head(doe.style(Stopwatch.style))
doe.body(stopwatch.ui)
onkeydown=stopwatch.onKeyDown.bind(stopwatch)
