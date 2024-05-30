import doe from         'doe'
export default class{
    constructor(){
        this._node={}
        this.node=doe.div(
            {className:'settingsPage'},
            doe.div(
                {className:'menu'},
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onBack()
                    },
                    doe.div(
                        {className:'a'},
                        doe.span(
                            {className:'material-icons'},'arrow_back_ios'
                        )
                    ),
                    doe.div(
                        {className:'b'},
                        'Settings',
                    ),
                    doe.div(
                        {className:'c'},
                    ),
                ),
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onTimestampProvider()
                    },
                    doe.div(
                        {className:'a'},
                        doe.span(
                            {className:'material-icons'},'schedule'
                        )
                    ),
                    doe.div(
                        {className:'b'},
                        'Timestamp provider',
                    ),
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'material-icons'},'arrow_forward_ios'
                        )
                    ),
                ),
            )
        )
    }
    off(){
    }
    on(){
    }
    set size(v){
        this._size=v
        this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
    }
}
