import doe from             'doe'
import msToString from      './Clock/msToString.mjs'
let oneHundredHoursMs=1e3*60*60*100
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
    val=~~((val%oneHundredHoursMs+oneHundredHoursMs)%oneHundredHoursMs)
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
export default Clock
