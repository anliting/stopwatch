import doe from         'doe'
export default class{
    constructor(){
        this._current='ecmascriptEpoch'
        this._node={
            option:{
                ecmascriptEpoch:doe.span(
                    {className:'a material-icons'},'radio_button_unchecked'
                ),
                highResolutionTime:doe.span(
                    {className:'a material-icons'},'radio_button_unchecked'
                ),
            }
        }
        this.node=doe.div(
            {className:'timestampProviderPage'},
            doe.div(
                {className:'menu'},
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onBack()
                    },
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'arrow_back_ios'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Timestamp Provider',
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                ),
                doe.div(
                    {
                        className:'item',
                    },
                    doe.div(
                        {className:'c'},
                    ),
                    doe.div(
                        {className:'a'},
                        doe.div(
                            {className:'description'},
                            'New settings here will only affect new timing tasks; which means ongoing timing tasks will not be affected.',
                        ),
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                ),
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onSet('highResolutionTime')
                    },
                    doe.div(
                        {className:'c'},
                        this._node.option.highResolutionTime,
                    ),
                    doe.div(
                        {className:'a'},
                        doe.div(
                            {className:'title'},
                            'Monotonic clock',
                        ),
                        doe.div(
                            {className:'description'},
                            'It is not subject to system clock skew or adjustments but computer suspension.',
                        ),
                    ),
                    /*doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'help_outline'
                        )
                    ),*/
                ),
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onSet('ecmascriptEpoch')
                    },
                    doe.div(
                        {className:'c'},
                        this._node.option.ecmascriptEpoch,
                    ),
                    doe.div(
                        {className:'a'},
                        doe.div(
                            {className:'title'},
                            'System clock',
                        ),
                        doe.div(
                            {className:'description'},
                            'It is not subject to computer suspension but system clock skew or adjustments.',
                        ),
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                    /*doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'help_outline'
                        )
                    ),*/
                ),
            )
        )
    }
    off(){
    }
    on(){
    }
    set(value){
        this._node.option[this._current].textContent='radio_button_unchecked'
        this._current=value
        this._node.option[this._current].textContent='radio_button_checked'
    }
    set size(v){
        this._size=v
        this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
    }
}
