import './menu';
import {createEvent} from "./utils/event.util";

require('devtron').install();

const {ipcRenderer,} = require('electron');


let simplemde = new (window as any).SimpleMDE({
  spellChecker: false,
  autosave: {
    enabled: true,
    uniqueId: "phodit",
    delay: 1000,
  },
  element: document.getElementById('input-section')
});

window.document.addEventListener('phodit.editor.open.guide', (data) => {
  ipcRenderer.send('phodit.open.guide', simplemde.value());
});

window.document.addEventListener('phodit.editor.fullscreen', (data) => {
  ipcRenderer.send('phodit.fullscreen');
});

window.document.addEventListener('phodit.editor.unfullscreen', (data) => {
  ipcRenderer.send('phodit.unfullscreen');
});

ipcRenderer.on('phodit.open.one-file', (event: any, arg: any) => {
  simplemde.value(arg);
});

ipcRenderer.on('client.save.file', () => {
  ipcRenderer.send('phodit.save.file', simplemde.value());
});

ipcRenderer.on('phodit.open.path', (event: any, arg: any) => {
  createEvent('phodit.tree.open', arg);
});

window.document.addEventListener('tree.pub.open', (event: any) => {
  ipcRenderer.send('phodit.open.file', JSON.parse(event.detail).filename);
});
