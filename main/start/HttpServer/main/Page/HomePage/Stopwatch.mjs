import doe from             'doe'
import style from           './Stopwatch/style.mjs'
import Clock from           './Stopwatch/Clock.mjs'
import createUi from        './Stopwatch/createUi.mjs'
function Stopwatch(){
    this._clock=new Clock
    createUi.call(this)
}
Stopwatch.prototype._now={
    ecmascriptEpoch:()=>new Date,
    highResolutionTime:()=>performance.now(),
}
Stopwatch.prototype._pause=function(){
    let now=this._now[this._currentTiming.timestampProvider]()
    doe(this._node.startOrPauseButton.node,
        {textContent:''},
        this._node.resumeButtonContent
    )
    cancelAnimationFrame(this._requestId)
    this._isRunning=0
    this._currentTiming.stopTime=now
    this._setClock(now)
}
Stopwatch.prototype._reset=function(){
    if(this._isRunning)
        this._pause()
    this._currentTiming=undefined
    this._clock.time=0
    doe(this._node.startOrPauseButton.node,
        {textContent:''},
        this._node.startButtonContent
    )
}
Stopwatch.prototype._setClock=function(now){
    this._clock.time=now-this._currentTiming.startTime
}
Stopwatch.prototype._start=function(){
    if(this._currentTiming)
        this._currentTiming.startTime=
            this._now[this._currentTiming.timestampProvider]()-
            (this._currentTiming.stopTime-this._currentTiming.startTime)
    else
        this._currentTiming={
            timestampProvider:this._timestampProvider,
            startTime:this._now[this._timestampProvider](),
        }
    doe(this._node.startOrPauseButton.node,
        {textContent:''},
        this._node.pauseButtonContent
    )
    this._isRunning=1
    let frame=()=>{
        let now=this._now[this._currentTiming.timestampProvider]()
        this._requestId=requestAnimationFrame(frame)
        this._setClock(now)
    }
    this._requestId=requestAnimationFrame(frame)
}
let map={
    ' ':function(e){
        this[this._isRunning?'_pause':'_start']()
    },
    r(){
        this._reset()
    },
}
Stopwatch.prototype.keyDown=function(e){
    if(!(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.repeat&&e.key in map))
        return
    e.preventDefault()
    e.stopPropagation()
    map[e.key].call(this,e)
}
Object.defineProperty(Stopwatch.prototype,'layout',{set(v){
    this.ui.classList.remove(this._layout.composition)
    this.ui.classList.add((this._layout=v).composition)
}})
Stopwatch.prototype.off=function(){
    this._node.startOrPauseButton.off()
    this._node.resetButton.off()
}
Stopwatch.prototype.on=function(){
}
Stopwatch.prototype.setTimestampProvider=function(v){
    this._timestampProvider=v
}
Stopwatch.style=style+Clock.style
export default Stopwatch
