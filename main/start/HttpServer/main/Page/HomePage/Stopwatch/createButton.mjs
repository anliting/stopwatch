import doe from             'doe'
function createButton(){
    let node=doe.div()
    return{
        node,
        effect(){
            doe(node.style,{
                animation:'none',
            })
            node.offsetLeft
            doe(node.style,{
                animation:'click 500ms linear',
                animationFillMode:'forwards',
            })
        },
        off(){
            doe(node.style,{
                animation:'none',
            })
        },
    }
}
export default createButton
