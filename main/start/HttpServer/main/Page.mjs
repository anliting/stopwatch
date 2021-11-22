import doe from                     'doe'
import HomePage from                './Page/HomePage.mjs'
import MenuPage from                './Page/MenuPage.mjs'
import SettingsPage from            './Page/SettingsPage.mjs'
import TimestampProviderPage from   './Page/TimestampProviderPage.mjs'
function setPage(page){
    doe(this.node,1,this._currentPage.node)
    this._currentPage.off()
    this._currentPage=page
    this._currentPage.size=this._size
    this._currentPage.on()
    doe(this.node,this._currentPage.node)
}
function Page(){
    this._homePage=new HomePage
    this._homePage.onMenu=()=>{
        setPage.call(this,this._menuPage)
    }
    this._menuPage=new MenuPage
    this._menuPage.onBack=()=>
        setPage.call(this,this._homePage)
    this._menuPage.onSettings=()=>
        setPage.call(this,this._settingsPage)
    this._menuPage.onInstall=()=>
        this.onInstall()
    this._settingsPage=new SettingsPage
    this._settingsPage.onBack=()=>
        setPage.call(this,this._menuPage)
    this._settingsPage.onTimestampProvider=()=>
        setPage.call(this,this._timestampProviderPage)
    this._timestampProviderPage=new TimestampProviderPage
    this._timestampProviderPage.onBack=()=>
        setPage.call(this,this._settingsPage)
    this._timestampProviderPage.onSet=v=>
        this.onSetTimestampProvider(v)
    this._currentPage=this._homePage
    this._homePage.on()
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
    ${SettingsPage.style}
    ${TimestampProviderPage.style}
`
Page.prototype.hideInstall=function(){
    this._menuPage.hideInstall()
}
Page.prototype.keyDown=function(e){
    if(this._currentPage==this._homePage)
        this._homePage.keyDown(e)
}
Page.prototype.setTimestampProvider=function(timestampProvider){
    this._homePage.setTimestampProvider(timestampProvider)
    this._timestampProviderPage.set(timestampProvider)
}
Page.prototype.showInstall=function(){
    this._menuPage.showInstall()
}
Object.defineProperty(Page.prototype,'size',{set(v){
    this._size=v
    this._currentPage.size=v
}})
export default Page
