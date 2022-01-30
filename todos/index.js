const electron = require('electron');
// const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => { app.quit() });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // const ses = mainWindow.webContents.session
    // console.log(ses.getUserAgent())
});

function createaddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add New Todo",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    addWindow.loadURL(`file://${__dirname}/add.html`)
    addWindow.on('closed', () => addWindow = null);
}



ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() { createaddWindow(); }
            },
            {
                label: 'Delete Todo',
                click() { mainWindow.webContents.send('todo:delete');}
            },
            {
                label: 'Quit',
                accelerator: process.platform === "win32" ? 'Ctrl+Q' : 'Control+Q',
                // (() => {
                //     if (process.platform === 'darwin') {
                //         return "Command+Q";
                //     } else if (process.platform === 'win32') {
                //         return "Ctrl+Q";
                //     }
                // })()

                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {role: 'reload'},
            {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'win32' ? 'Ctrl+Shift+I' : 'Command+Alt+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    })

}