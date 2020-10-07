// let windowLocal: any = window;
// windowLocal.ipcRenderer = require('electron').ipcRenderer;
console.log("Preload active.");
window.ipcRenderer = require('electron').ipcRenderer;