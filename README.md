# Asteroid Tweaking Utility

A professional Windows system optimization utility with premium and free tiers, built with Electron for desktop deployment.

## Features

### 🆓 Free Version
- **System Dashboard**: Real-time performance monitoring
- **Basic Privacy Tweaks**: Disable telemetry, advertising ID, location tracking
- **UI Customization**: Visual effects, taskbar customization
- **System Cleanup**: Temporary files, recycle bin cleanup
- **Backup System**: Create and restore system backups
- **Quick Optimization**: One-click basic optimizations

### 👑 Premium Version
- **Advanced Performance Optimization**: Startup optimization, memory management, advanced tweaks
- **Gaming Mode**: Professional gaming optimizations for maximum FPS
- **Network Optimization**: TCP/IP settings, DNS optimization, bandwidth management
- **Advanced Registry Tweaks**: Expert-level system modifications
- **Deep Clean**: Advanced system cleanup capabilities
- **Priority Support**: Premium customer support
- **Future Updates**: Access to all new features

## Installation

### Development Setup
```bash
# Clone or download the project
cd "Asteroid Tweaking Utility"

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build-win
```

### Production Installation
1. Download the latest release from the releases page
2. Run the installer (`AsteroidTweakingUtility-Setup-x.x.x.exe`)
3. Follow the installation wizard
4. Launch from desktop shortcut or Start menu

## Usage

### Free Version
- Launch the application
- Navigate through available sections in the sidebar
- Apply basic tweaks and optimizations
- Create backups before making changes

### Premium Activation
1. Click "Upgrade to Premium" in the header
2. Enter your license key
3. Enjoy all premium features

**Demo License Key**: `ASTEROID-PREMIUM-2024-VALID-KEY`

## Sections Overview

### Dashboard
- System information display
- Real-time performance metrics
- Quick action buttons

### Performance (Premium)
- Startup optimization
- Memory management
- Advanced system tweaks

### Gaming (Premium)
- Graphics optimization
- Network optimization for gaming
- FPS boost settings

### Privacy & Security (Free)
- Privacy protection settings
- Security enhancements
- Windows security configuration

### UI Customization (Free)
- Visual effects controls
- Taskbar customization
- Interface personalization

### Network (Premium)
- Connection optimization
- TCP/IP settings
- DNS optimization

### System Cleanup (Free)
- Temporary file cleanup
- Recycle bin management
- Basic system cleaning

### Advanced (Premium)
- Registry optimization
- Expert-level tweaks
- System deep cleaning

## Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Electron
- **UI Framework**: Custom modern design
- **Icons**: Font Awesome 6.0
- **System Integration**: Windows Registry API, System Information API

### System Requirements
- **OS**: Windows 10/11 (x64)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 100MB free space
- **Permissions**: Administrator access required

### Architecture
- **Main Process**: `main.js` - Electron main process, system integration
- **Renderer Process**: `src/renderer.js` - UI logic and user interactions
- **UI**: `src/index.html` + `src/styles.css` - Modern responsive interface
- **License System**: AES encryption, machine ID binding

## License System

### License Validation
- Machine ID binding for security
- AES encryption for license storage
- Local validation with encrypted keys

### Premium Features
- License key activation
- Persistent license storage
- Automatic feature unlocking

## Security Features

### Data Protection
- Local license storage only
- No data transmitted to external servers
- Encrypted license information

### System Safety
- Backup before applying tweaks
- Reversible modifications
- Administrator permission validation

## Build Configuration

### Electron Builder Setup
```json
{
  "build": {
    "appId": "com.asteroid.tweaking-utility",
    "productName": "Asteroid Tweaking Utility",
    "win": {
      "target": ["nsis", "portable"],
      "requestedExecutionLevel": "requireAdministrator"
    }
  }
}
```

### Build Commands
```bash
npm run build-win    # Build Windows installer
npm run dist         # Build distribution package
```

## Development

### Project Structure
```
Asteroid Tweaking Utility/
├── main.js                 # Electron main process
├── package.json            # Project configuration
├── src/
│   ├── index.html         # Main UI
│   ├── styles.css         # Styling
│   └── renderer.js        # UI logic
├── assets/                # Icons and resources
└── README.md              # Documentation
```

### Adding New Tweaks
1. Add toggle to appropriate section in `index.html`
2. Add handler in `renderer.js`
3. Implement system modification in `main.js`
4. Test thoroughly

## Troubleshooting

### Common Issues

**Application won't start**:
- Run as administrator
- Check Windows security settings
- Verify .NET Framework installation

**Tweaks not applying**:
- Ensure administrator privileges
- Restart application after major changes
- Check Windows version compatibility

**License activation fails**:
- Verify license key spelling
- Check internet connection (if required)
- Contact support for assistance

**Performance monitoring not updating**:
- Restart application
- Check system resource availability
- Verify Windows Performance Counters

### Support
For technical support:
1. Check the troubleshooting section
2. Create a system backup
3. Contact support with system details

## Disclaimer

This software modifies Windows system settings and registry entries. While designed to be safe, users should:

- Always create backups before making changes
- Test tweaks individually when possible
- Understand that some changes may affect system stability
- Use at your own risk

The developers are not responsible for any system damage or data loss.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Version History

### v1.0.0
- Initial release
- Free and premium tiers
- Basic system optimization
- Modern UI design
- License system implementation

## Future Updates

### Planned Features
- Automatic maintenance scheduling
- Cloud backup integration
- Plugin system for custom tweaks
- Advanced gaming profiles
- Network monitoring tools
- System health reports

### Premium Roadmap
- AI-powered optimization suggestions
- Remote system management
- Advanced security features
- Priority customer support
- Beta access to new features

---

**Made with ❤️ for Windows power users and gamers**
