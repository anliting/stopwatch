import doe from             'doe'
import msToString from      './Clock/msToString.mjs'
function Clock(){
    this._node=[...Array(12)].map((_,i)=>doe.span(
        n=>{doe(n.style,{
            left:`calc(${i} * .6 * var(--baseFontSize) * var(--zoom))`,
        })}
    ))
    this.time=0
    this.ui=doe.div(
        {className:'clock'},
        this._node,
    )
}
Object.defineProperty(Clock.prototype,'time',{set(val){
    let s=msToString(val)
    this._node.map((a,i)=>{
        if(a.textContent!=s[i])
            a.textContent=s[i]
    })
}})
/*
    left: (600-64*1.2/2*12)/2=69.6
    left: (302-40*1.2/2*12)/2=7
*/
Clock.style=`
    .stopwatch>.clock{
        text-align:center;
        font-family:monospace;
        margin:calc(16px * var(--zoom)) 0;
        position:relative;
        font-size:calc(var(--baseFontSize) * var(--zoom));
        height:calc(var(--baseFontSize) * var(--zoom) * 1.2);
    }
    .stopwatch>.clock>*{
        position:absolute;
    }
    .stopwatch.a>.clock{
        --baseFontSize:64px;
        left:calc(69.6px * var(--zoom));
    }
    .stopwatch.b>.clock{
        --baseFontSize:40px;
        left:calc(7px * var(--zoom));
    }
`
export default Clock
