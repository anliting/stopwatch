import doe from                     'doe'
import HomePage from                './HomePage/main.mjs'
import MenuPage from                './MenuPage/main.mjs'
import SettingsPage from            './SettingsPage/main.mjs'
import TimestampProviderPage from   './TimestampProviderPage/main.mjs'
function setPage(page){
    doe(this.node,1,this._currentPage.node)
    this._currentPage.off()
    this._currentPage=page
    this._currentPage.size=this._size
    this._currentPage.on()
    doe(this.node,this._currentPage.node)
}
export default class{
    constructor(){
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
    hideInstall(){
        this._menuPage.hideInstall()
    }
    keyDown(e){
        if(this._currentPage==this._homePage)
            this._homePage.keyDown(e)
    }
    setTimestampProvider(timestampProvider){
        this._homePage.setTimestampProvider(timestampProvider)
        this._timestampProviderPage.set(timestampProvider)
    }
    showInstall(){
        this._menuPage.showInstall()
    }
    set size(v){
        this._size=v
        this._currentPage.size=v
    }
}
