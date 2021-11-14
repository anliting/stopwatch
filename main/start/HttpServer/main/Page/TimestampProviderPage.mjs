import doe from         'doe'
import style from       './TimestampProviderPage/style.mjs'
function TimestampProviderPage(){
    this._node={}
    this.node=doe.div(
        {className:'timestampProviderPage'},
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
                    'Timestamp Provider',
                ),
                doe.div(
                    {className:'b'},
                ),
            ),
            doe.div(
                {
                    className:'b',
                    onclick:e=>{}
                },
                doe.div(
                    {className:'c'},
                    doe.span(
                        {className:'a material-icons'},
                        'radio_button_unchecked'
                    )
                ),
                doe.div(
                    {className:'a'},
                    'ECMAScript epoch',
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
            doe.div(
                {
                    className:'b',
                    onclick:e=>{}
                },
                doe.div(
                    {className:'c'},
                    doe.span(
                        {className:'a material-icons'},
                        'radio_button_unchecked'
                    )
                ),
                doe.div(
                    {className:'a'},
                    'High resolution time',
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
TimestampProviderPage.style=style
TimestampProviderPage.prototype.off=function(){
}
TimestampProviderPage.prototype.on=function(){
}
Object.defineProperty(TimestampProviderPage.prototype,'size',{set(v){
    this._size=v
    this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
}})
export default TimestampProviderPage
