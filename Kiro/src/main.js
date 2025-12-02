const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Kiro } = require('@kiro/sdk'); // Hypothetical SDK for the hackathon

// --- Kiro Setup ---
// Load Kiro with configuration from our project directory
const kiro = new Kiro({ projectPath: path.join(__dirname, 'kiro') });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'renderer', 'renderer.js'),
    },
    // --- "Haunting" Window Properties ---
    frame: false,        // No window frame
    transparent: true,   // Transparent background
    alwaysOnTop: true,   // Stays on top of other windows
    resizable: false,
    skipTaskbar: true,   // Don't show in the taskbar
  });

  // Position the ghost in the bottom-right corner
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setPosition(width - 320, height - 420);

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  // mainWindow.webContents.openDevTools(); // Use for debugging
}

app.whenReady().then(() => {
  createWindow();

  // This interval periodically checks for context and triggers the ghost
  setInterval(async () => {
    try {
      // 1. Use MCP to get the current context (active window)
      const context = await kiro.runTool('get_context');

      // 2. Feed context to Kiro to see if any agent hooks are triggered
      const suggestion = await kiro.process(context);

      // 3. If there's a suggestion, send it to the renderer (the UI)
      if (suggestion && mainWindow) {
        console.log('Kiro suggests:', suggestion);
        mainWindow.webContents.send('ghost-suggestion', suggestion);
      } else {
        // Hide the ghost if there's no suggestion
        if (mainWindow) mainWindow.webContents.send('ghost-suggestion', null);
      }
    } catch (error) {
      console.error('Error in Kiro main loop:', error);
    }
  }, 2500); // Check every 2.5 seconds
});

// Handle commands from the renderer process (e.g., clicking a button)
ipcMain.handle('kiro-execute', async (event, command) => {
  console.log(`Executing command: ${command}`);
  const { exec } = require('child_process');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error: stderr });
      } else {
        resolve({ output: stdout });
      }
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
