import { app, BrowserWindow, screen, globalShortcut, ipcMain, ipcRenderer, nativeImage, contextBridge } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import { rejects } from 'assert';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');
let appLoaded = false;
let allowDevTools = false;

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  const image = nativeImage.createFromPath(__dirname + 'assets/galaxy.ico');
  image.setTemplateImage(true);

  // Create the browser window.
  win = new BrowserWindow({
    width: size.width,
    height: size.height,
    frame: true, // hide menu,
    acceptFirstMouse: true,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      // enableRemoteModule: true,
      contextIsolation: false,
      allowRunningInsecureContent: true,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true
    },
    icon: image,
    resizable: true,
    kiosk: false,
    closable: true,
    minimizable: true,
    maximizable: true
  });

  if (serve) {
    allowDevTools = true;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  globalShortcut.register('Ctrl+Shift+F12', () => {
    win.webContents.openDevTools();
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

try {

  app.disableHardwareAcceleration();

  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

  // This method makes your application a Single Instance Application - it ensures that
  // only a single instance of your app is running, and other instances signal this instance and exit.
  const gotSingleInstanceLock = app.requestSingleInstanceLock();

  if (!gotSingleInstanceLock) {
    app.quit();
  } else {
    // Create window, load the rest of the app, etc...
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow();
      }
    });

    // if the event 'app-closed' is received from languageComponent then close Window
    ipcMain.on('app-closed', () => {
      app.releaseSingleInstanceLock();
      if (process.platform !== 'darwin') {
        win.close();
      }
    });

    ipcMain.on('app-loaded', () => {
      appLoaded = true;
    });
  }
} catch (e) {
  // Catch Error
  // throw e;
}
