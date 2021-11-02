import doe from         'doe'
import HomePage from    './Page/HomePage.mjs'
function MorePage(){
    this.node=doe.div(
        {className:'morePage'},
        doe.div(
            doe.div(
                {className:'a'},
                doe.span({className:'material-icons'},'arrow_back_ios')
            ),
            doe.div(
                {className:'b'},
                doe.span({className:'a material-icons'},'arrow_forward_ios')
            ),
        )
    )
}
MorePage.style=`
    .morePage{
        height:100%;
        text-align:center;
    }
    .morePage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
        line-height:0;
    }
    .morePage>*{
        display:inline-block;
        margin:0 1em;
        width:22em;
        height:18em;
        color:white;
        font-size:calc(1px / 24 * var(--zoom));
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
        text-align:center;
        vertical-align:middle;
    }
    .morePage>*>*{
        height:2em;
        text-align:left;
    }
    .morePage>*>*::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
        line-height:0;
    }
    .morePage>*>*>*{
        display:inline-block;
        vertical-align:middle;
    }
    .morePage>*>.a>*{
        font-size:calc(1px / 24 * var(--zoom));
    }
    .morePage>*>.b>.a{
    }
`
Object.defineProperty(MorePage.prototype,'size',{set(v){
    this._size=v
    this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
}})
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
