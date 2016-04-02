'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

//const ipcMain = require('electron').ipcMain;

const AV = require('avoscloud-sdk');

const config = require('./config.js');

const settings = require('./src/configuration.js');

const init = require('./src/init.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;


var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
    // 当另一个实例运行的时候，这里将会被调用，我们需要激活应用的窗口
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
    return true;
});


function createWindow () {
    if(shouldQuit){
        app.quit();
        return;
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    var key = config.getKey();
    AV.initialize(key[0], key[1]);
    var TestObject = AV.Object.extend('TestObject');
    var testObject = new TestObject();
    testObject.save({
        foo: 'bar'
    }, {
        success: function(object) {
            console.log('LeanCloud works!');
        }
    });
    console.log(settings.getUserHome());
    init.init();
    settings.saveSettings('usssername','zhong');
    mainWindow.loadURL("http://bellorchid.info");

    //ipcMain.on('reset', (event, arg) => {
    //    createWindow();
    //    mainWindow.loadURL("http://www.baidu.com");
    //});
    //
    //ipcMain.on('render', (event, arg) => {
    //    if (arg == "upload") {
    //    upload.init(mainWindow);
    //    // mainWindow.close();
    //    }
    //
    //});

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
        createWindow();

});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('error', function(err){
    console.log(err);
});
