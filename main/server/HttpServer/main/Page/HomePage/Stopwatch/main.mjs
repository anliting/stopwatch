import doe from             'doe'
import Clock from           './Clock/main.mjs'
import createUi from        './createUi/main.mjs'
let map={
    ' ':function(e){
        this[this._isRunning?'_pause':'_start']()
    },
    r(){
        this._reset()
    },
}
export default class{
    _now={
        ecmascriptEpoch:()=>new Date,
        highResolutionTime:()=>performance.now(),
    }
    constructor(){
        this._clock=new Clock
        createUi.call(this)
    }
    _pause(){
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
    _reset(){
        if(this._isRunning)
            this._pause()
        this._currentTiming=undefined
        this._clock.time=0
        doe(this._node.startOrPauseButton.node,
            {textContent:''},
            this._node.startButtonContent
        )
    }
    _setClock(now){
        this._clock.time=now-this._currentTiming.startTime
    }
    _start(){
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
    keyDown(e){
        if(!(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.repeat&&e.key in map))
            return
        e.preventDefault()
        e.stopPropagation()
        map[e.key].call(this,e)
    }
    set layout(v){
        this.ui.classList.remove(this._layout.composition)
        this.ui.classList.add((this._layout=v).composition)
    }
    off(){
        this._node.startOrPauseButton.off()
        this._node.resetButton.off()
    }
    on(){
    }
    setTimestampProvider(v){
        this._timestampProvider=v
    }
}
