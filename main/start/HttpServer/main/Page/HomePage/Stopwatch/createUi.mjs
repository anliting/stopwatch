import doe from             'doe'
import createButton from    './createUi/createButton.mjs'
function createUi(){
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
    this._node.startButtonContent=doe.span(
        doe.span(
            {className:'b material-icons'},
            'play_arrow'
        ),
        doe.span(
            'Start'
        ),
        doe.span(
            {className:'a'},
            ' (space)'
        ),
    )
    this._node.pauseButtonContent=doe.span(
        doe.span(
            {className:'b material-icons'},
            'pause'
        ),
        doe.span(
            'Pause'
        ),
        doe.span(
            {className:'a'},
            ' (space)'
        ),
    )
    this._node.resumeButtonContent=doe.span(
        doe.span(
            {className:'b material-icons'},
            'play_arrow'
        ),
        doe.span(
            'Resume'
        ),
        doe.span(
            {className:'a'},
            ' (space)'
        ),
    )
    this._node.startOrPauseButton=createButton()
    this._node.resetButton=createButton()
    this.ui=doe.div(
        {className:'stopwatch a'},
        this._clock.ui,
        doe.div(
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
                this._node.startOrPauseButtonText=doe.span(
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
                doe.span(
                    doe.span(
                        {className:'b material-icons'},
                        'stop'
                    ),
                    doe.span(
                        'Reset'
                    ),
                    doe.span(
                        {className:'a'},
                        ' (R)'
                    ),
                )
            ),
        ),
    )
}
export default createUi
