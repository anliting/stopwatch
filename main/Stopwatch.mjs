import doe from             '../lib/doe/main/doe.mjs'
import style from           './Stopwatch/style.mjs'
function msToString(t){
    let output=paddingZerosTo(t%1000,3)
    t=~~(t/1000)
    output=paddingZerosTo(t%60,2)+'.'+output
    t=~~(t/60)
    output=paddingZerosTo(t%60,2)+':'+output
    t=~~(t/60)
    output=paddingZerosTo(t%100,2)+':'+output
    t=~~(t/100)
    return output
    function paddingZerosTo(m,n){
        m=''+m
        while(m.length<n)
            m='0'+m
        return m
    }
}
function Stopwatch(){
    this._layout='a'
    this._node={}
    let
        startPauseResume=e=>{
            e.preventDefault()
            e.stopPropagation()
            this[this._isRunning?'_pause':'_start'](e.timeStamp)
        },
        reset=e=>{
            e.preventDefault()
            e.stopPropagation()
            this._reset()
        }
    let{div}=doe
    this.ui=div(
        {className:'stopwatch a'},
        this._node.clock=div(
            {className:'clock'},
            msToString(0),
        ),
        div(
            {className:'control'},
            this._node.startOrPauseButton=div(
                {
                    className:'button a',
                    onmousedown:e=>{
                        if(e.button==0)
                            startPauseResume(e)
                    },
                    ontouchstart:startPauseResume,
                },
                'Start (space)',
            ),
            div(
                {
                    className:'button b',
                    onmousedown:e=>{
                        if(e.button==0)
                            reset(e)
                    },
                    ontouchstart:reset,
                },
                'Reset (R)',
            ),
        ),
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
Object.defineProperty(Stopwatch.prototype,'layout',{set(v){
    this.ui.classList.remove(this._layout)
    this.ui.classList.add(this._layout=v)
}})
Stopwatch.prototype.onKeyDown=function(e){
    if(!(e.key in map&&!e.repeat))
        return
    e.preventDefault()
    e.stopPropagation()
    map[e.key].call(this,e)
}
Stopwatch.style=style
export default Stopwatch
