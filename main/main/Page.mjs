import doe from         'doe'
import HomePage from    './Page/HomePage.mjs'
import MenuPage from    './Page/MenuPage.mjs'
function setPage(page){
    doe(this.node,1,this._currentPage.node)
    this._currentPage=page
    this._currentPage.size=this._size
    doe(this.node,this._currentPage.node)
}
function Page(){
    this._homePage=new HomePage
    this._homePage.onMenu=()=>
        setPage.call(this,this._menuPage)
    this._menuPage=new MenuPage
    this._menuPage.onBack=()=>
        setPage.call(this,this._homePage)
    this._menuPage.onInstall=()=>
        this.onInstall()
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
    ${MenuPage.style}
`
Page.prototype.hideInstall=function(){
    this._menuPage.hideInstall()
}
Page.prototype.keyDown=function(e){
    if(this._currentPage==this._homePage)
        this._homePage.keyDown(e)
}
Page.prototype.onHrefClick=function(){}
Page.prototype.showInstall=function(){
    this._menuPage.showInstall()
}
Object.defineProperty(Page.prototype,'size',{set(v){
    this._size=v
    this._currentPage.size=v
}})
export default Page
