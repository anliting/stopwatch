import doe from         'doe'
export default class{
    constructor(){
        this._node={}
        this.node=doe.div(
            {className:'menuPage'},
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
                        'Menu',
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                ),
                doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onSettings()
                    },
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'settings'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Settings',
                    ),
                    doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'arrow_forward_ios'
                        )
                    ),
                ),
                this._node.install=doe.div(
                    {
                        className:'item clickable',
                        onclick:e=>
                            this.onInstall()
                    },
                    n=>{doe(n.style,{
                        display:'none',
                    })},
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'get_app'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Install',
                    ),
                    doe.div(
                        {className:'b'},
                    ),
                ),
                doe.a(
                    {
                        className:'item clickable',
                        href:'https://althea.anliting.com/stopwatch',
                        target:'_blank',
                    },
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'article'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Readme',
                    ),
                    doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'open_in_new'
                        )
                    ),
                ),
                doe.a(
                    {
                        className:'item clickable',
                        href:'https://anliting.com/',
                        target:'_blank',
                    },
                    doe.div(
                        {className:'c'},
                        doe.span(
                            {className:'a material-icons'},'person'
                        )
                    ),
                    doe.div(
                        {className:'a'},
                        'Author: An-Li Ting',
                    ),
                    doe.div(
                        {className:'b'},
                        doe.span(
                            {className:'a material-icons'},'open_in_new'
                        )
                    ),
                ),
            )
        )
    }
    hideInstall(){
        this._node.install.style.display='none'
    }
    off(){
    }
    on(){
    }
    showInstall(){
        this._node.install.style.display=''
    }
    set size(v){
        this._size=v
        this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
    }
}
