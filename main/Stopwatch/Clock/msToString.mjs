function msToString(t){
    let output=paddingZerosTo(t%1000,3)
    t=~~(t/1000)
    output=paddingZerosTo(t%60,2)+'.'+output
    t=~~(t/60)
    output=paddingZerosTo(t%60,2)+':'+output
    t=~~(t/60)
    output=paddingZerosTo(t%100,2)+':'+output
    t=~~(t/100)
    return output
    function paddingZerosTo(m,n){
        m=''+m
        while(m.length<n)
            m='0'+m
        return m
    }
}
export default msToString
