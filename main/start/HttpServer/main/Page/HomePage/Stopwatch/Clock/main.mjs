import doe from             'doe'
import msToString from      './msToString/main.mjs'
let oneHundredHoursMs=1e3*60*60*100
export default class{
    constructor(){
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
    set time(val){
        val=~~((val%oneHundredHoursMs+oneHundredHoursMs)%oneHundredHoursMs)
        let s=msToString(val)
        this._node.map((a,i)=>{
            if(a.textContent!=s[i])
                a.textContent=s[i]
        })
    }
}
