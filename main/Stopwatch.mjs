import doe from             '../lib/doe/main/doe.mjs'
import style from           './Stopwatch/style.mjs'
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
        this._node.clock=doe.div(
            {className:'clock'},
            msToString(0),
        ),
        this._node.startOrPauseButton=
            doe.button('Start (space)',{className:'button',onmousedown(e){
                stopwatch[stopwatch._isRunning?'_pause':'_start'](
                    e.timeStamp
                )
            }}),
        doe.button('Reset (R)',{className:'button',onmousedown(){
            stopwatch._reset()
        }}),
        doe.a({
            className:'readme',
            href:'https://anliting.com/stopwatch'
        },'Readme'),
    )
}
Stopwatch.prototype._pause=function(now){
    this._node.startOrPauseButton.textContent='Resume (space)'
    cancelAnimationFrame(this._requestId)
    this._isRunning=0
    this._stopTime=now
    this._setClock(now)
}
Stopwatch.prototype._reset=function(){
    if(this._isRunning)
        this._pause()
    this._startTime=undefined
    this._node.clock.textContent=msToString(0)
    this._node.startOrPauseButton.textContent='Start (space)'
}
Stopwatch.prototype._setClock=function(now){
    this._node.clock.textContent=
        msToString(~~(now-this._startTime))
}
Stopwatch.prototype._start=function(now){
    this._node.startOrPauseButton.textContent='Pause (space)'
    this._startTime=this._startTime?
        now-(this._stopTime-this._startTime)
    :
        now
    this._isRunning=1
    let frame=now=>{
        this._setClock(now)
        this._requestId=requestAnimationFrame(frame)
    }
    this._requestId=requestAnimationFrame(frame)
}
let map={
    ' ':function(e){
        this[this._isRunning?'_pause':'_start'](e.timeStamp)
    },
    r(){
        this._reset()
    },
}
Stopwatch.prototype.onKeyDown=function(e){
    if(!(e.key in map))
        return
    e.preventDefault()
    e.stopPropagation()
    map[e.key].call(this,e)
}
Stopwatch.style=style
export default Stopwatch
