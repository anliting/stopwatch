import doe from         'doe'
function MorePage(){
    this.node=doe.div(
        {className:'morePage'},
        doe.div(
            doe.div(
                {
                    className:'a',
                    onclick:e=>{
                        this.onBack()
                    },
                },
                doe.span({className:'material-icons'},'arrow_back_ios')
            ),
            doe.a(
                {
                    className:'b',
                    href:'https://althea.anliting.com/stopwatch',
                    target:'_blank',
                },
                doe.div(
                    {className:'a'},
                    'Manual',
                ),
                doe.div(
                    {className:'b'},
                    doe.span(
                        {className:'a material-icons'},'arrow_forward_ios'
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
                    {className:'a'},
                    'About',
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
MorePage.style=`
    .morePage{
        height:100%;
        text-align:center;
    }
    .morePage{
        line-height:0;
    }
    .morePage::after{
        content:'';
        display:inline-block;
        height:100%;
        vertical-align:middle;
    }
    .morePage>*{
        display:inline-block;
        width:24em;
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
        height:4em;
        text-align:left;
        user-select:none;
    }
    .morePage>*>:hover{
        background-color:#8f8f8f;
    }
    .morePage>*>:active{
        background-color:#5f5f5f;
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
    .morePage>*>.a{
        padding:0 1em;
    }
    .morePage>*>.a>*{
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
    }
    .morePage>*>.b{
        display:table;
        width:100%;
        cursor:default;
    }
    .morePage>*>.b>*{
        display:table-cell;
    }
    .morePage>*>.b>.a{
        padding-left:calc(1px / 24 * var(--zoom));
        font-size:calc(1px * 1.5 / 24 * var(--zoom));
        text-align:left;
    }
    .morePage>*>.b>.b{
        padding-right:calc(1px / 24 * var(--zoom));
        text-align:right;
    }
`
Object.defineProperty(MorePage.prototype,'size',{set(v){
    this._size=v
    this.node.style.setProperty('--zoom',''+Math.min(v[0],v[1]/.75))
}})
export default MorePage
