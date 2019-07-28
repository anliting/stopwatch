import doe from         '../lib/doe/main/doe.mjs'
import Stopwatch from   './Stopwatch.mjs'
let stopwatch=new Stopwatch
doe.head(doe.style(`
    html{
        height:100%;
    }
    body{
        height:calc(100% - 16px);
    }
    a{
        color:blue;
    }
    body>.a{
        height:100%;
        width:100%;
        display:table;
    }
    body>.a>*{
        display:table-cell;
        width:100%;
        vertical-align:middle;
        text-align:center;
    }
    body>.a>*>*{
        display:inline-block;
    }
    ${Stopwatch.style}
`))
doe.body(doe.div(
    {className:'a'},
    doe.div(
        stopwatch.ui
    )
))
onkeydown=stopwatch.onKeyDown.bind(stopwatch)
