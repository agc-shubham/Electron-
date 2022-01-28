const electron =  require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;
app.on('ready', ( ) => {
     mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    
});

ipcMain.on('path:submit', (event,path)=>{
    ffmpeg.ffprobe(path, (err,metadata) =>{
        mainWindow.webContents.send('video:metadata',metadata.format.duration);
        console.log('Video duration is:', metadata.format.duration);
    });
});