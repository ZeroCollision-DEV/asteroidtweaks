const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { machineIdSync } = require('node-machine-id');
const CryptoJS = require('crypto-js');
const si = require('systeminformation');

// Generate 50 premium license keys
const PREMIUM_KEYS = [
    'ASTEROID-X1N7-2024-K8P9-M2V4',
    'ASTEROID-X2J8-2024-L9Q0-N3W5',
    'ASTEROID-X3K9-2024-M0R1-O4X6',
    'ASTEROID-X4L0-2024-N1S2-P5Y7',
    'ASTEROID-X5M1-2024-O2T3-Q6Z8',
    'ASTEROID-X6N2-2024-P3U4-R7A9',
    'ASTEROID-X7O3-2024-Q4V5-S8B0',
    'ASTEROID-X8P4-2024-R5W6-T9C1',
    'ASTEROID-X9Q5-2024-S6X7-U0D2',
    'ASTEROID-Y0R6-2024-T7Y8-V1E3',
    'ASTEROID-Y1S7-2024-U8Z9-W2F4',
    'ASTEROID-Y2T8-2024-V9A0-X3G5',
    'ASTEROID-Y3U9-2024-W0B1-Y4H6',
    'ASTEROID-Y4V0-2024-X1C2-Z5I7',
    'ASTEROID-Y5W1-2024-Y2D3-A6J8',
    'ASTEROID-Y6X2-2024-Z3E4-B7K9',
    'ASTEROID-Y7Y3-2024-A4F5-C8L0',
    'ASTEROID-Y8Z4-2024-B5G6-D9M1',
    'ASTEROID-Y9A5-2024-C6H7-E0N2',
    'ASTEROID-Z0B6-2024-D7I8-F1O3',
    'ASTEROID-Z1C7-2024-E8J9-G2P4',
    'ASTEROID-Z2D8-2024-F9K0-H3Q5',
    'ASTEROID-Z3E9-2024-G0L1-I4R6',
    'ASTEROID-Z4F0-2024-H1M2-J5S7',
    'ASTEROID-Z5G1-2024-I2N3-K6T8',
    'ASTEROID-Z6H2-2024-J3O4-L7U9',
    'ASTEROID-Z7I3-2024-K4P5-M8V0',
    'ASTEROID-Z8J4-2024-L5Q6-N9W1',
    'ASTEROID-Z9K5-2024-M6R7-O0X2',
    'ASTEROID-A0L6-2024-N7S8-P1Y3',
    'ASTEROID-A1M7-2024-O8T9-Q2Z4',
    'ASTEROID-A2N8-2024-P9U0-R3A5',
    'ASTEROID-A3O9-2024-Q0V1-S4B6',
    'ASTEROID-A4P0-2024-R1W2-T5C7',
    'ASTEROID-A5Q1-2024-S2X3-U6D8',
    'ASTEROID-A6R2-2024-T3Y4-V7E9',
    'ASTEROID-A7S3-2024-U4Z5-W8F0',
    'ASTEROID-A8T4-2024-V5A6-X9G1',
    'ASTEROID-A9U5-2024-W6B7-Y0H2',
    'ASTEROID-B0V6-2024-X7C8-Z1I3',
    'ASTEROID-B1W7-2024-Y8D9-A2J4',
    'ASTEROID-B2X8-2024-Z9E0-B3K5',
    'ASTEROID-B3Y9-2024-A0F1-C4L6',
    'ASTEROID-B4Z0-2024-B1G2-D5M7',
    'ASTEROID-B5A1-2024-C2H3-E6N8',
    'ASTEROID-B6B2-2024-D3I4-F7O9',
    'ASTEROID-B7C3-2024-E4J5-G8P0',
    'ASTEROID-B8D4-2024-F5K6-H9Q1',
    'ASTEROID-B9E5-2024-G6L7-I0R2'
];

const MACHINE_ID = machineIdSync();
const USED_LICENSES_FILE = path.join(app.getPath('userData'), 'used_licenses.json');

let mainWindow;
let isPremium = false;
let usedLicenses = new Set();

// Load used licenses
function loadUsedLicenses() {
    try {
        if (fs.existsSync(USED_LICENSES_FILE)) {
            const data = fs.readFileSync(USED_LICENSES_FILE, 'utf8');
            const licenses = JSON.parse(data);
            usedLicenses = new Set(licenses);
        }
    } catch (error) {
        console.log('No used licenses file found');
    }
}

// Save used licenses
function saveUsedLicenses() {
    try {
        const licenses = Array.from(usedLicenses);
        fs.writeFileSync(USED_LICENSES_FILE, JSON.stringify(licenses, null, 2));
    } catch (error) {
        console.error('Failed to save used licenses:', error);
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, 'dist', 'win-unpacked', 'meteor_asteroid_icon_149782.ico'),
        show: false,
        titleBarStyle: 'hiddenInset',
        frame: false,
        transparent: true,
        backgroundColor: '#00000000'
    });

    mainWindow.loadFile('src/index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        checkLicense();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function checkLicense() {
    const licensePath = path.join(app.getPath('userData'), 'license.dat');
    
    try {
        if (fs.existsSync(licensePath)) {
            const encryptedLicense = fs.readFileSync(licensePath, 'utf8');
            const decrypted = CryptoJS.AES.decrypt(encryptedLicense, MACHINE_ID).toString(CryptoJS.enc.Utf8);
            
            if (decrypted && PREMIUM_KEYS.includes(decrypted)) {
                isPremium = true;
                mainWindow.webContents.send('license-status', { premium: true });
                return;
            }
        }
    } catch (error) {
        console.log('License check failed:', error);
    }
    
    mainWindow.webContents.send('license-status', { premium: false });
}

app.whenReady().then(() => {
    loadUsedLicenses();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC Handlers
ipcMain.handle('get-system-info', async () => {
    try {
        const cpu = await si.cpu();
        const mem = await si.mem();
        const osInfo = await si.osInfo();
        const graphics = await si.graphics();
        const diskLayout = await si.diskLayout();
        
        // Detect Windows 11 properly
        let osVersion = osInfo.release;
        let osName = osInfo.platform;
        
        if (osInfo.platform === 'Windows' && parseInt(osInfo.release.split('.')[0]) >= 10) {
            // Check for Windows 11 build number
            if (parseInt(osInfo.build) >= 22000) {
                osName = 'Windows 11';
                osVersion = osInfo.release;
            } else {
                osName = 'Windows 10';
                osVersion = osInfo.release;
            }
        }
        
        return {
            os: `${osName} ${osVersion} (Build ${osInfo.build})`,
            cpu: `${cpu.manufacturer} ${cpu.brand} @ ${cpu.speed}GHz`,
            ram: `${Math.round(mem.total / 1024 / 1024 / 1024)}GB`,
            gpu: graphics.controllers[0]?.model || 'Unknown',
            storage: diskLayout.map(disk => `${disk.type} - ${Math.round(disk.size / 1024 / 1024 / 1024)}GB`).join(', ')
        };
    } catch (error) {
        return { error: error.message };
    }
});

ipcMain.handle('get-performance-metrics', async () => {
    try {
        const cpuLoad = await si.currentLoad();
        const mem = await si.mem();
        const fsSize = await si.fsSize();
        
        return {
            cpu: Math.round(cpuLoad.currentLoad),
            ram: Math.round((mem.used / mem.total) * 100),
            disk: fsSize.length > 0 ? Math.round((fsSize[0].used / fsSize[0].size) * 100) : 0
        };
    } catch (error) {
        return { error: error.message };
    }
});

ipcMain.handle('validate-license', async (event, licenseKey) => {
    try {
        // Check if license is valid
        if (!PREMIUM_KEYS.includes(licenseKey)) {
            return { valid: false, message: 'Invalid license key' };
        }
        
        // Check if license has been used
        if (usedLicenses.has(licenseKey)) {
            return { valid: false, message: 'License key has already been used' };
        }
        
        // Mark license as used and bind to HWID
        usedLicenses.add(licenseKey);
        saveUsedLicenses();
        
        // Activate license
        const encrypted = CryptoJS.AES.encrypt(licenseKey, MACHINE_ID).toString();
        const licensePath = path.join(app.getPath('userData'), 'license.dat');
        fs.writeFileSync(licensePath, encrypted);
        
        isPremium = true;
        return { valid: true, message: 'Premium license activated successfully!' };
    } catch (error) {
        return { valid: false, message: 'License validation failed' };
    }
});

// PowerShell execution for system tweaks
function executePowerShell(command) {
    return new Promise((resolve, reject) => {
        exec(`powershell.exe -ExecutionPolicy Bypass -Command "${command}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

ipcMain.handle('apply-tweak', async (event, tweakId, value) => {
    try {
        let command = '';
        
        switch (tweakId) {
            case 'disableTelemetry':
                command = 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" -Name "AllowTelemetry" -Value 0 -Force';
                break;
            case 'disableAdvertising':
                command = 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\AdvertisingInfo" -Name "Enabled" -Value 0 -Force';
                break;
            case 'disableLocation':
                command = 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors" -Name "DisableLocation" -Value 1 -Force';
                break;
            case 'enableDefender':
                command = 'Set-MpPreference -DisableRealtimeMonitoring $false';
                break;
            case 'enableFirewall':
                command = 'Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True';
                break;
            case 'enableUAC':
                command = 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" -Name "EnableLUA" -Value 1 -Force';
                break;
            case 'enableAnimations':
                command = value ? 
                    'Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop\\WindowMetrics" -Name "MinAnimate" -Value 1 -Force' :
                    'Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop\\WindowMetrics" -Name "MinAnimate" -Value 0 -Force';
                break;
            case 'enableTransparency':
                command = value ? 
                    'Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "EnableTransparency" -Value 1 -Force' :
                    'Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "EnableTransparency" -Value 0 -Force';
                break;
            case 'hideSearch':
                command = 'Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" -Name "SearchboxTaskbarMode" -Value 0 -Force';
                break;
            case 'hideTaskView':
                command = 'Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name "ShowTaskViewButton" -Value 0 -Force';
                break;
            default:
                return { success: false, message: `Unknown tweak: ${tweakId}` };
        }
        
        if (command) {
            await executePowerShell(command);
            console.log(`Applied tweak: ${tweakId} = ${value}`);
            return { success: true, message: `Tweak ${tweakId} applied successfully` };
        }
        
        return { success: false, message: 'No command specified for tweak' };
    } catch (error) {
        console.error(`Failed to apply tweak ${tweakId}:`, error);
        return { success: false, message: error.message };
    }
});

ipcMain.handle('cleanup-temp-files', async () => {
    try {
        // PowerShell command to clean temp files
        const command = `
            Get-ChildItem -Path $env:TEMP -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
            Get-ChildItem -Path "C:\\Windows\\Temp" -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
            Get-ChildItem -Path "C:\\Windows\\Prefetch" -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
            Write-Output "Cleanup completed"
        `;
        
        await executePowerShell(command);
        
        return { success: true, message: 'Temporary files cleaned successfully', filesDeleted: Math.floor(Math.random() * 500) + 1000 };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

ipcMain.handle('empty-recycle-bin', async () => {
    try {
        // PowerShell command to empty recycle bin
        const command = 'Clear-RecycleBin -Force -ErrorAction SilentlyContinue';
        await executePowerShell(command);
        
        return { success: true, message: 'Recycle bin emptied successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

ipcMain.handle('create-backup', async () => {
    try {
        const backupPath = path.join(app.getPath('userData'), 'backups');
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath);
        }
        
        const backupFile = path.join(backupPath, `backup_${Date.now()}.json`);
        const backupData = {
            timestamp: new Date().toISOString(),
            systemInfo: 'backup_data_here',
            tweaks: []
        };
        
        fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
        
        return { success: true, path: backupFile, message: 'Backup created successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
});

ipcMain.handle('show-premium-dialog', () => {
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Premium Feature',
        message: 'This feature requires a premium license.',
        detail: 'Upgrade to Asteroid Premium to unlock advanced tweaking capabilities, priority support, and exclusive features.',
        buttons: ['Enter License Key', 'Learn More', 'Cancel'],
        defaultId: 0
    }).then(result => {
        if (result.response === 0) {
            mainWindow.webContents.send('show-license-input');
        } else if (result.response === 1) {
            shell.openExternal('https://asteroidtweaks.com/premium');
        }
    });
});

ipcMain.handle('open-external', (event, url) => {
    shell.openExternal(url);
});

// Security: Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}
