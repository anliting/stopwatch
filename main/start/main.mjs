import doe from         '../../lib/doe/main/doe.mjs'
import Stopwatch from   './Stopwatch.mjs'
let stopwatch=new Stopwatch
doe.head(doe.style(`
    html{
        height:100%;
    }
    body{
        background-color:#808080;
        font-family:sans-serif;
        font-size:16px;
        line-height:1.2;
        height:calc(100% - 16px);
    }
    a{
        color:unset;
        text-decoration:unset;
    }
    body>.a{
        height:100%;
        width:100%;
        display:table;
        color:white;
        text-shadow:
            0 0 .05em rgba(0,0,0,.4),
            .05em .05em .05em rgba(0,0,0,.2);
    }
    body>.a>*{
        display:table-cell;
        width:100%;
        vertical-align:middle;
        text-align:center;
    }
    body>.a>*>*{
        display:inline-block;
        width:100%;
        max-width:600px;
        text-align:left;
    }
    body>.a>*>*>.bottom{
        margin-top:24px;
    }
    body>.a>*>*>.bottom>.a{
        float:left;
    }
    body>.a>*>*>.bottom>.b{
        float:right;
    }
    ${Stopwatch.style}
`))
doe.body(doe.div(
    {className:'a'},
    doe.div(
        doe.div(
            stopwatch.ui,
            doe.div(
                {className:'bottom',},
                doe.a({
                    href:'https://anliting.com/stopwatch',
                    className:'a',
                },'Readme'),
                doe.a({
                    href:'https://anliting.com/',
                    className:'b',
                },'An-Li Ting'),
                ' 2020-04-27',
            ),
        )
    )
))
onkeydown=stopwatch.onKeyDown.bind(stopwatch)
;(async()=>{
    await navigator.serviceWorker.register('/%23sw')
})()
