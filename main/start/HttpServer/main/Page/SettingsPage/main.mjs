import doe from         'doe'
export default class{
    constructor(){
        this._node={}
        this.node=doe.div(
            {className:'settingsPage'},
            doe.div(
                doe.div(
                    {
                        className:'b',
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
                        'Settings',
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                ),
                doe.div(
                    {
                        className:'b',
                        onclick:e=>
                            this.onTimestampProvider()
                    },
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'schedule'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Timestamp provider',
                    ),
                    doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'arrow_forward_ios'
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
