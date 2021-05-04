import doe from             'doe'
import style from           './Stopwatch/style.mjs'
import Clock from           './Stopwatch/Clock.mjs'
function createButton(){
    let ripple=doe.div({className:'ripple'}),node=doe.div(ripple)
    return{
        node,
        ripple(x,y){
            doe(node.style,{
                animation:'none',
            })
            node.offsetLeft
            doe(node.style,{
                animation:'ripple 500ms linear',
                animationFillMode:'forwards',
            })
            //doe(node.parentNode,1,node,0,node)
            /*let bcr=node.getBoundingClientRect()
            ripple.style.setProperty('--d',`${
                Math.max(node.clientWidth,node.clientHeight)
            }px`)
            ripple.style.setProperty('--l',`${
                x-bcr.left
            }px`)
            ripple.style.setProperty('--t',`${
                y-bcr.top
            }px`)
            doe(node,1,ripple,0,ripple)*/
        }
    }
}
function Stopwatch(){
    this._layout={composition:'a',zoom:1}
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
    this._clock=new Clock
    let
        {div}=doe,
        startOrPauseButton=createButton(),
        resetButton=createButton()
    this.ui=div(
        {className:'stopwatch a'},
        this._clock.ui,
        div(
            {className:'control'},
            doe(
                startOrPauseButton.node,
                {
                    className:'button a',
                    onmousedown:e=>{
                        if(e.button==0){
                            startOrPauseButton.ripple(e.clientX,e.clientY)
                            startPauseResume(e)
                        }
                    },
                    ontouchstart:e=>{
                        for(let t of e.changedTouches)
                            startOrPauseButton.ripple(t.clientX,t.clientY)
                        startPauseResume(e)
                    },
                },
                this._node.startOrPauseButton=div('Start (space)'),
            ),
            doe(
                resetButton.node,
                {
                    className:'button b',
                    onmousedown:e=>{
                        if(e.button==0){
                            resetButton.ripple(e.clientX,e.clientY)
                            reset(e)
                        }
                    },
                    ontouchstart:e=>{
                        for(let t of e.changedTouches)
                            resetButton.ripple(t.clientX,t.clientY)
                        reset(e)
                    },
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
    this._clock.time=0
    this._node.startOrPauseButton.textContent='Start (space)'
}
Stopwatch.prototype._setClock=function(now){
    this._clock.time=~~(now-this._startTime)
}
Stopwatch.prototype._start=function(now){
    this._node.startOrPauseButton.textContent='Pause (space)'
    this._startTime=this._startTime?
        now-(this._stopTime-this._startTime)
    :
        now
    this._isRunning=1
    let frame=now=>{
        this._requestId=requestAnimationFrame(frame)
        this._setClock(now)
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
    this.ui.classList.remove(this._layout.composition)
    this.ui.classList.add((this._layout=v).composition)
}})
Stopwatch.prototype.onKeyDown=function(e){
    if(!(!e.altKey&&!e.ctrlKey&&!e.shiftKey&&!e.repeat&&e.key in map))
        return
    e.preventDefault()
    e.stopPropagation()
    map[e.key].call(this,e)
}
Stopwatch.style=style+Clock.style
export default Stopwatch
