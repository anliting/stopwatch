import doe from         'doe'
import HomePage from    './Page/HomePage.mjs'
function MorePage(){
    this.node=doe.div(
        {className:'morePage'},
    )
}
MorePage.style=`
    .morePage{
        position:relative;
        /*margin:calc(8px *  var(--zoom));
        width:calc(100% - 16px * var(--zoom));
        height:calc(100% - 16px * var(--zoom));*/
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        /*font-size:calc(16px * var(--zoom));*/
        text-align:center;
    }
`
Object.defineProperty(MorePage.prototype,'size',{set(v){
    this._size=v
}})
function setPage(page){
    doe(this.node,1,this._currentPage.node)
    this._currentPage=page
    doe(this.node,this._currentPage.node)
}
function Page(){
    this._homePage=new HomePage
    this._homePage.onMore=()=>
        setPage.call(this,this._morePage)
    this._homePage.onHrefClick=e=>
        this.onHrefClick(e)
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
