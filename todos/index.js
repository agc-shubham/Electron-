const electron = require('electron');
// const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`)

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {label: 'New Todo'},
            {label: 'Quit'}
        ]
    }
];

if(process.platform === 'darwin'){
    menuTemplate.unshift({});
}