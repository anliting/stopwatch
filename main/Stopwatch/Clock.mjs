import doe from             '../../lib/doe/main/doe.mjs'
import msToString from      './Clock/msToString.mjs'
function Clock(){
    this.ui=doe.div(
        {className:'clock'},
        msToString(0),
    )
}
Object.defineProperty(Clock.prototype,'time',{set(val){
    this.ui.textContent=msToString(val)
}})
Clock.style=`
    .stopwatch>.clock{
        text-align:center;
        font-family:monospace;
        margin:calc(16px * var(--zoom)) 0;
    }
    .stopwatch.a>.clock{
        font-size:calc(64px * var(--zoom));
    }
    .stopwatch.b>.clock{
        font-size:calc(40px * var(--zoom));
    }
`
export default Clock
