let electron=require('electron')
console.log(electron)
;(async()=>{
    await electron.app.whenReady()
    let win=new electron.BrowserWindow({
        autoHideMenuBar:true,
        webPreferences:{
            nodeIntegration:true,
        },
    })
    win.loadFile('app.html')
})()
