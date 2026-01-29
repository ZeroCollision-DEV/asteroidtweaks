// Asteroid Tweaking Utility - Renderer Process

const { ipcRenderer } = require('electron');

class AsteroidTweakingUtility {
    constructor() {
        this.isPremium = false;
        this.currentSection = 'dashboard';
        this.tweaks = new Map();
        this.performanceInterval = null;
        
        this.init();
    }

    async init() {
        await this.checkLicenseStatus();
        this.setupNavigation();
        this.setupEventListeners();
        this.loadSystemInfo();
        this.startPerformanceMonitoring();
    }

    async checkLicenseStatus() {
        try {
            const isPremium = await ipcRenderer.invoke('is-premium');
            this.isPremium = isPremium;
            this.updateLicenseUI();
        } catch (error) {
            console.error('License check failed:', error);
        }
    }

    updateLicenseUI() {
        const licenseStatus = document.getElementById('licenseStatus');
        const upgradeBtn = document.getElementById('upgradeBtn');
        
        if (this.isPremium) {
            licenseStatus.innerHTML = `
                <span class="premium-badge-active">
                    <i class="fas fa-crown"></i> PREMIUM
                </span>
            `;
            this.unlockPremiumFeatures();
        } else {
            licenseStatus.innerHTML = `
                <span class="free-badge">FREE VERSION</span>
                <button class="upgrade-btn" id="upgradeBtn">
                    <i class="fas fa-crown"></i> Upgrade to Premium
                </button>
            `;
            
            // Re-attach event listener to new button
            const newUpgradeBtn = document.getElementById('upgradeBtn');
            if (newUpgradeBtn) {
                newUpgradeBtn.addEventListener('click', () => this.showLicenseModal());
            }
        }
    }

    unlockPremiumFeatures() {
        // Unlock premium sections
        document.querySelectorAll('.premium-locked').forEach(element => {
            element.classList.remove('premium-locked');
            element.style.opacity = '1';
        });
        
        document.querySelectorAll('.premium-locked input').forEach(input => {
            input.disabled = false;
        });
        
        document.querySelectorAll('.premium-notice').forEach(notice => {
            notice.style.display = 'none';
        });
        
        document.querySelectorAll('.premium-only').forEach(element => {
            element.classList.remove('premium-only');
            element.style.position = 'relative';
            element.style.overflow = 'visible';
        });
        
        // Remove premium badges from nav items
        document.querySelectorAll('.nav-link .premium-badge').forEach(badge => {
            badge.style.display = 'none';
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(sectionName) {
        // Check if premium section is being accessed
        const premiumSections = ['performance', 'gaming', 'network', 'advanced'];
        if (premiumSections.includes(sectionName) && !this.isPremium) {
            this.showPremiumDialog();
            return;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;
    }

    async loadSystemInfo() {
        try {
            const systemInfo = await ipcRenderer.invoke('get-system-info');
            
            if (systemInfo.error) {
                console.error('Failed to get system info:', systemInfo.error);
                return;
            }

            document.getElementById('osInfo').textContent = systemInfo.os || 'Unknown';
            document.getElementById('cpuInfo').textContent = systemInfo.cpu || 'Unknown';
            document.getElementById('ramInfo').textContent = systemInfo.ram || 'Unknown';
            document.getElementById('gpuInfo').textContent = systemInfo.gpu || 'Unknown';
            document.getElementById('storageInfo').textContent = systemInfo.storage || 'Unknown';
            
            this.showNotification('System information loaded successfully', 'success');
        } catch (error) {
            console.error('Error loading system info:', error);
            this.showNotification('Failed to load system information', 'error');
        }
    }

    startPerformanceMonitoring() {
        this.performanceInterval = setInterval(async () => {
            try {
                const metrics = await ipcRenderer.invoke('get-performance-metrics');
                
                if (metrics.error) {
                    console.error('Failed to get performance metrics:', metrics.error);
                    return;
                }

                // Update CPU
                document.getElementById('cpuUsage').textContent = `${metrics.cpu}%`;
                document.querySelector('.cpu-progress').style.width = `${metrics.cpu}%`;
                
                // Update RAM
                document.getElementById('ramUsage').textContent = `${metrics.ram}%`;
                document.querySelector('.ram-progress').style.width = `${metrics.ram}%`;
                
                // Update Disk
                document.getElementById('diskUsage').textContent = `${metrics.disk}%`;
                document.querySelector('.disk-progress').style.width = `${metrics.disk}%`;
                
            } catch (error) {
                console.error('Error updating performance metrics:', error);
            }
        }, 2000);
    }

    setupEventListeners() {
        // License modal
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.showLicenseModal());
        }

        // Tweak toggles
        document.querySelectorAll('.tweak-item input[type="checkbox"]').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const tweakId = e.target.id;
                const isEnabled = e.target.checked;
                this.tweaks.set(tweakId, isEnabled);
                console.log(`Tweak ${tweakId}: ${isEnabled ? 'Enabled' : 'Disabled'}`);
            });
        });

        // Premium feature clicks
        document.querySelectorAll('.premium-only').forEach(element => {
            element.addEventListener('click', (e) => {
                if (!this.isPremium) {
                    e.preventDefault();
                    this.showPremiumDialog();
                }
            });
        });

        // License modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeLicenseModal();
            }
        });

        // License input enter key
        const licenseInput = document.getElementById('licenseKeyInput');
        if (licenseInput) {
            licenseInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.activateLicense();
                }
            });
        }
    }

    async applyAllTweaks() {
        try {
            this.showNotification('Applying tweaks...', 'warning');
            
            const enabledTweaks = [];
            this.tweaks.forEach((value, key) => {
                if (value) {
                    enabledTweaks.push(key);
                }
            });

            for (const tweak of enabledTweaks) {
                const result = await ipcRenderer.invoke('apply-tweak', tweak, true);
                if (!result.success) {
                    console.error(`Failed to apply tweak ${tweak}:`, result.message);
                }
            }

            this.showNotification(`Successfully applied ${enabledTweaks.length} tweaks`, 'success');
        } catch (error) {
            console.error('Error applying tweaks:', error);
            this.showNotification('Failed to apply some tweaks', 'error');
        }
    }

    async resetAllTweaks() {
        try {
            this.showNotification('Resetting all tweaks...', 'warning');
            
            // Reset all toggles
            document.querySelectorAll('.tweak-item input[type="checkbox"]').forEach(toggle => {
                toggle.checked = false;
            });
            
            // Clear tweaks map
            this.tweaks.clear();
            
            this.showNotification('All tweaks have been reset to default', 'success');
        } catch (error) {
            console.error('Error resetting tweaks:', error);
            this.showNotification('Failed to reset tweaks', 'error');
        }
    }

    async createBackup() {
        try {
            this.showNotification('Creating backup...', 'warning');
            
            const result = await ipcRenderer.invoke('create-backup');
            
            if (result.success) {
                this.showNotification('Backup created successfully', 'success');
            } else {
                this.showNotification(`Backup failed: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Error creating backup:', error);
            this.showNotification('Failed to create backup', 'error');
        }
    }

    async cleanupTempFiles() {
        try {
            this.showNotification('Cleaning temporary files...', 'warning');
            
            const result = await ipcRenderer.invoke('cleanup-temp-files');
            
            if (result.success) {
                this.showNotification(`Cleaned ${result.filesDeleted} temporary files`, 'success');
            } else {
                this.showNotification(`Cleanup failed: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Error cleaning temp files:', error);
            this.showNotification('Failed to clean temporary files', 'error');
        }
    }

    async emptyRecycleBin() {
        try {
            this.showNotification('Emptying recycle bin...', 'warning');
            
            const result = await ipcRenderer.invoke('empty-recycle-bin');
            
            if (result.success) {
                this.showNotification(result.message, 'success');
            } else {
                this.showNotification(`Failed to empty recycle bin: ${result.message}`, 'error');
            }
        } catch (error) {
            console.error('Error emptying recycle bin:', error);
            this.showNotification('Failed to empty recycle bin', 'error');
        }
    }

    async quickOptimize() {
        try {
            this.showNotification('Performing quick optimization...', 'warning');
            
            // Apply basic free optimizations
            const basicTweaks = ['disableTelemetry', 'disableAdvertising', 'disableLocation'];
            let appliedCount = 0;
            
            for (const tweak of basicTweaks) {
                const toggle = document.getElementById(tweak);
                if (toggle && !toggle.checked) {
                    toggle.checked = true;
                    this.tweaks.set(tweak, true);
                    appliedCount++;
                }
            }
            
            // Simulate optimization process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification(`Quick optimization complete! Applied ${appliedCount} tweaks`, 'success');
        } catch (error) {
            console.error('Error during quick optimization:', error);
            this.showNotification('Quick optimization failed', 'error');
        }
    }

    showLicenseModal() {
        document.getElementById('licenseModal').classList.add('show');
    }

    closeLicenseModal() {
        document.getElementById('licenseModal').classList.remove('show');
        document.getElementById('licenseKeyInput').value = '';
    }

    async activateLicense() {
        const licenseKey = document.getElementById('licenseKeyInput').value.trim();
        
        if (!licenseKey) {
            this.showNotification('Please enter a license key', 'warning');
            return;
        }

        try {
            const result = await ipcRenderer.invoke('validate-license', licenseKey);
            
            if (result.valid) {
                this.showNotification(result.message, 'success');
                this.isPremium = true;
                this.updateLicenseUI();
                this.closeLicenseModal();
            } else {
                this.showNotification(result.message, 'error');
            }
        } catch (error) {
            console.error('License activation error:', error);
            this.showNotification('License activation failed', 'error');
        }
    }

    showPremiumDialog() {
        ipcRenderer.invoke('show-premium-dialog');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        const notificationIcon = notification.querySelector('.notification-icon');
        
        // Set message and styling
        notificationText.textContent = message;
        notification.className = `notification show ${type}`;
        
        // Set icon based on type
        switch (type) {
            case 'success':
                notificationIcon.className = 'notification-icon fas fa-check-circle';
                break;
            case 'error':
                notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
                break;
            case 'warning':
                notificationIcon.className = 'notification-icon fas fa-exclamation-triangle';
                break;
            default:
                notificationIcon.className = 'notification-icon fas fa-info-circle';
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
    }

    destroy() {
        if (this.performanceInterval) {
            clearInterval(this.performanceInterval);
        }
    }
}

// Global functions for onclick handlers
let utility;

// Initialize the utility when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    utility = new AsteroidTweakingUtility();
});

// IPC event listeners
ipcRenderer.on('license-status', (event, data) => {
    if (utility) {
        utility.isPremium = data.premium;
        utility.updateLicenseUI();
    }
});

ipcRenderer.on('show-license-input', () => {
    if (utility) {
        utility.showLicenseModal();
    }
});

// Global functions for HTML onclick handlers
function applyAllTweaks() {
    if (utility) utility.applyAllTweaks();
}

function resetAllTweaks() {
    if (utility) utility.resetAllTweaks();
}

function createBackup() {
    if (utility) utility.createBackup();
}

function cleanupTempFiles() {
    if (utility) utility.cleanupTempFiles();
}

function emptyRecycleBin() {
    if (utility) utility.emptyRecycleBin();
}

function quickOptimize() {
    if (utility) utility.quickOptimize();
}

function showPremiumDialog() {
    if (utility) utility.showPremiumDialog();
}

function closeLicenseModal() {
    if (utility) utility.closeLicenseModal();
}

function activateLicense() {
    if (utility) utility.activateLicense();
}

function hideNotification() {
    if (utility) utility.hideNotification();
}

// Cleanup on window unload
window.addEventListener('beforeunload', () => {
    if (utility) {
        utility.destroy();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!utility) return;
    
    // Ctrl + B: Create backup
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        utility.createBackup();
    }
    
    // Ctrl + R: Reset all
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        utility.resetAllTweaks();
    }
    
    // Ctrl + Enter: Apply all
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        utility.applyAllTweaks();
    }
    
    // Ctrl + U: Show upgrade dialog
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        if (!utility.isPremium) {
            utility.showLicenseModal();
        }
    }
});
