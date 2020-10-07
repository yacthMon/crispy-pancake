'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import * as QA from './QAController'
import * as path from 'path';
import { Questions } from './types/Question'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: any, answerWindow: any = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      // preload: path.join(__dirname, './preload.js')
    }
  })
console.log(path.join(__dirname, './preload.js'));

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.webContents.once("dom-ready",async () => {
    let questions:Questions = await QA.loadQuestionList();
    console.log("Send load questions");
    win.webContents.send("load-questions", questions);
  })
  win.setMenu(null)
  win.on('closed', () => {
    win = null
    app.quit();
  })
}

function createAnswerWindow() {
  answerWindow = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true
    }
  })
  let path: string = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/#/answer'
    : `file://${__dirname}/index.html#answer`
  answerWindow.setMenu(null)
  answerWindow.loadURL(path)
  if (!process.env.IS_TEST) answerWindow.webContents.openDevTools()

  answerWindow.on('closed', () => {
    answerWindow = null
  })
}

ipcMain.on("show-answer", async (event: any, args: any) => {
  let answer = await QA.loadAnswer(args);
  if (answerWindow === null) {
    createAnswerWindow();
    answerWindow.webContents.once("dom-ready", () => {
      answerWindow.webContents.send("load-answer", answer);
    })
  } else {
    answerWindow.webContents.send("load-answer", answer);
  }
  

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
