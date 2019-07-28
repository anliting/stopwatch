import doe from         '../lib/doe/main/doe.mjs'
import Stopwatch from   './Stopwatch.mjs'
let stopwatch=new Stopwatch
doe.head(doe.style(Stopwatch.style))
doe.body(stopwatch.ui)
onkeydown=stopwatch.onKeyDown.bind(stopwatch)
