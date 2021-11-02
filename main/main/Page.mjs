import doe from         'doe'
import HomePage from    './Page/HomePage.mjs'
import MorePage from    './Page/MorePage.mjs'
function setPage(page){
    doe(this.node,1,this._currentPage.node)
    this._currentPage=page
    this._currentPage.size=this._size
    doe(this.node,this._currentPage.node)
}
function Page(){
    this._homePage=new HomePage
    this._homePage.onMore=()=>
        setPage.call(this,this._morePage)
    this._morePage=new MorePage
    this._morePage.onBack=()=>
        setPage.call(this,this._homePage)
    this._currentPage=this._homePage
    this.node=doe.div(
        {className:'page'},
        this._homePage.node
    )
}
Page.style=`
    .page{
        height:100%;
    }
    ${HomePage.style}
    ${MorePage.style}
`
Page.prototype.onHrefClick=function(){}
Page.prototype.keyDown=function(e){
    if(this._currentPage==this._homePage)
        this._homePage.keyDown(e)
}
Object.defineProperty(Page.prototype,'size',{set(v){
    this._size=v
    this._currentPage.size=v
}})
export default Page
