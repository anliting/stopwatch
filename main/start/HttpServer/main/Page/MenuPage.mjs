import doe from         'doe'
import style from       './MenuPage/style.mjs'
function MenuPage(){
    this._node={}
    this.node=doe.div(
        {className:'menuPage'},
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
                    'Menu',
                ),
                doe.div(
                    {className:'b'},
                ),
            ),
            this._node.install=doe.div(
                {
                    className:'b',
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
                    className:'b',
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
                    className:'b',
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
MenuPage.style=style
MenuPage.prototype.hideInstall=function(){
    this._node.install.style.display='none'
}
MenuPage.prototype.off=function(){
}
MenuPage.prototype.on=function(){
}
MenuPage.prototype.showInstall=function(){
    this._node.install.style.display=''
}
Object.defineProperty(MenuPage.prototype,'size',{set(v){
    this._size=v
    this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
}})
export default MenuPage
