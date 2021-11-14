import doe from             'doe'
import style from           './Stopwatch/style.mjs'
import Clock from           './Stopwatch/Clock.mjs'
function createButton(){
    let node=doe.div()
    return{
        node,
        effect(){
            doe(node.style,{
                animation:'none',
            })
            node.offsetLeft
            doe(node.style,{
                animation:'click 500ms linear',
                animationFillMode:'forwards',
            })
        },
        off(){
            doe(node.style,{
                animation:'none',
            })
        },
    }
}
function Stopwatch(){
    this._timestampProvider='ecmascriptEpoch'
    this._layout={composition:'a',zoom:1}
    this._node={}
    let
        startPauseResume=e=>{
            e.preventDefault()
            e.stopPropagation()
            this[this._isRunning?'_pause':'_start']()
        },
        reset=e=>{
            e.preventDefault()
            e.stopPropagation()
            this._reset()
        }
    this._clock=new Clock
    let
        {div}=doe
    this._node.startOrPauseButton=createButton()
    this._node.resetButton=createButton()
    this.ui=div(
        {className:'stopwatch a'},
        this._clock.ui,
        div(
            {className:'control'},
            doe(
                this._node.startOrPauseButton.node,
                {
                    className:'button a',
                    onmousedown:e=>{
                        if(e.button==0){
                            this._node.startOrPauseButton.effect()
                            startPauseResume(e)
                        }
                    },
                    ontouchstart:e=>{
                        this._node.startOrPauseButton.effect()
                        startPauseResume(e)
                    },
                },
                'Start (space)',
            ),
            doe(
                this._node.resetButton.node,
                {
                    className:'button b',
                    onmousedown:e=>{
                        if(e.button==0){
                            this._node.resetButton.effect()
                            reset(e)
                        }
                    },
                    ontouchstart:e=>{
                        this._node.resetButton.effect()
                        reset(e)
                    },
                },
                'Reset (R)',
            ),
        ),
    )
}
Stopwatch.prototype._now=function(){
    return this._currentTiming.timestampProvider=='ecmascriptEpoch'?
        new Date
    :
        performance.now()
}
Stopwatch.prototype._pause=function(){
    let now=this._now()
    this._node.startOrPauseButton.node.textContent='Resume (space)'
    cancelAnimationFrame(this._requestId)
    this._isRunning=0
    this._stopTime=now
    this._setClock(now)
}
Stopwatch.prototype._reset=function(){
    if(this._isRunning)
        this._pause()
    this._currentTiming=undefined
    this._startTime=undefined
    this._clock.time=0
    this._node.startOrPauseButton.node.textContent='Start (space)'
}
Stopwatch.prototype._setClock=function(now){
    this._clock.time=now-this._startTime
}
Stopwatch.prototype._start=function(){
    if(!this._startTime)
        this._currentTiming={
            timestampProvider:this._timestampProvider,
        }
    let now=this._now()
    this._startTime=this._startTime?
        now-(this._stopTime-this._startTime)
    :
        now
    this._node.startOrPauseButton.node.textContent='Pause (space)'
    this._isRunning=1
    let frame=()=>{
        let now=this._now()
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
