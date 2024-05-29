import doe from             'doe'
import createButton from    './createButton/main.mjs'
let{div,span}=doe
export default function(){
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
    this._node.startButtonContent=span(
        span(
            {className:'b material-icons'},
            'play_arrow'
        ),
        span(
            'Start'
        ),
        span(
            {className:'a'},
            ' (space)'
        ),
    )
    this._node.pauseButtonContent=span(
        span(
            {className:'b material-icons'},
            'pause'
        ),
        span(
            'Pause'
        ),
        span(
            {className:'a'},
            ' (space)'
        ),
    )
    this._node.resumeButtonContent=span(
        span(
            {className:'b material-icons'},
            'play_arrow'
        ),
        span(
            'Resume'
        ),
        span(
            {className:'a'},
            ' (space)'
        ),
    )
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
                this._node.startOrPauseButtonText=span(
                    {className:'b'},
                ),
                this._node.startButtonContent,
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
                span(
                    span(
                        {className:'b material-icons'},
                        'stop'
                    ),
                    span(
                        'Reset'
                    ),
                    span(
                        {className:'a'},
                        ' (R)'
                    ),
                )
            ),
        ),
    )
}
