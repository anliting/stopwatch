import electron from'electron'
;(async()=>{
    await electron.app.whenReady()
    let win=new electron.BrowserWindow({autoHideMenuBar:true})
    win.loadFile('file/index.html')
})()
