import { useState, useRef } from 'react';
import MacWindow from '../MacWindow/MacWindow';
import './SettingsPanel.css';

function SettingsPanel({ onClose, theme, setTheme, wallpaper, setWallpaper, zIndex, onFocus, onMinimize }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB for localStorage)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image too large! Please use an image under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas to avoid localStorage 5MB quota limit
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 2560;
        const MAX_HEIGHT = 1440;
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while scaling down
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export as compressed WebP (great size reduction)
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);

        const customWallpaper = {
          id: 'custom-upload',
          name: 'Custom',
          style: {
            background: `url("${compressedDataUrl}") center/cover no-repeat`
          }
        };

        try {
          localStorage.setItem('mac-custom-wallpaper-data', compressedDataUrl);
          setWallpaper(customWallpaper);
        } catch (e) {
          console.error('Storage error:', e);
          alert('Image is still too large to save in browser memory. Please try a smaller file.');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-uploaded
    e.target.value = '';
  };

  const handleRemoveCustom = () => {
    localStorage.removeItem('mac-custom-wallpaper-data');
    // Revert to first default wallpaper
    setWallpaper(wallpapers[0]);
  };

  const wallpapers = [
    {
      id: 'sequoia-dark',
      name: 'Sequoia Dark',
      style: {
        background: `radial-gradient(ellipse at 25% 75%, rgba(30, 60, 100, 0.6) 0%, transparent 55%),
                     radial-gradient(ellipse at 75% 25%, rgba(80, 40, 100, 0.5) 0%, transparent 55%),
                     radial-gradient(ellipse at 50% 100%, rgba(20, 40, 80, 0.4) 0%, transparent 50%),
                     linear-gradient(180deg, #0d0d0d 0%, #1a1a2e 40%, #16213e 70%, #0d0d0d 100%)`
      }
    },
    {
      id: 'sequoia-light',
      name: 'Sequoia Light',
      style: {
        background: `radial-gradient(ellipse at 25% 75%, rgba(150, 200, 255, 0.6) 0%, transparent 55%),
                     radial-gradient(ellipse at 75% 25%, rgba(220, 150, 255, 0.5) 0%, transparent 55%),
                     radial-gradient(ellipse at 50% 100%, rgba(100, 180, 255, 0.4) 0%, transparent 50%),
                     linear-gradient(180deg, #f0f4f8 0%, #e0e8f0 40%, #d0e0f0 70%, #f0f4f8 100%)`
      }
    },
    {
      id: 'monterey',
      name: 'Monterey',
      style: {
        background: `linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFB13B 50%, #E83F6F 75%, #8A2387 100%)`
      }
    },
    {
      id: 'midnight',
      name: 'Midnight',
      style: {
        background: `linear-gradient(to right, #0f2027, #203a43, #2c5364)`
      }
    }
  ];

  return (
    <MacWindow 
      title="System Settings" 
      onClose={onClose}
      initialWidth={550}
      initialHeight={500}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
    >
      <div className="settings-panel">
        <div className="settings-panel__content">
          
          {/* Appearance Section */}
          <div className="settings-panel__section">
            <h3 className="settings-panel__section-title">Appearance</h3>
            <div className="settings-panel__theme-toggle">
              <button 
                className={`theme-btn ${theme === 'light' ? 'theme-btn--active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <div className="theme-preview theme-preview--light"></div>
                <span>Light</span>
              </button>
              <button 
                className={`theme-btn ${theme === 'dark' ? 'theme-btn--active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <div className="theme-preview theme-preview--dark"></div>
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="settings-panel__divider"></div>

          {/* Wallpaper Section */}
          <div className="settings-panel__section">
            <h3 className="settings-panel__section-title">Wallpaper</h3>
            <div className="settings-panel__wallpaper-grid">
              {wallpapers.map((wp) => (
                <div 
                  key={wp.id}
                  className={`wallpaper-item ${wallpaper.id === wp.id ? 'wallpaper-item--active' : ''}`}
                  onClick={() => setWallpaper(wp)}
                >
                  <div className="wallpaper-item__preview" style={wp.style}></div>
                  <span className="wallpaper-item__name">{wp.name}</span>
                </div>
              ))}

              {/* Custom Upload Tile */}
              <div 
                className={`wallpaper-item ${wallpaper.id === 'custom-upload' ? 'wallpaper-item--active' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="wallpaper-item__preview wallpaper-item__preview--upload"
                  style={wallpaper.id === 'custom-upload' ? wallpaper.style : {}}
                >
                  {wallpaper.id !== 'custom-upload' && (
                    <span className="wallpaper-upload-icon">+</span>
                  )}
                </div>
                <span className="wallpaper-item__name">
                  {wallpaper.id === 'custom-upload' ? 'Custom ✓' : 'Upload'}
                </span>
              </div>
            </div>

            {/* Hidden file input */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {/* Remove Custom button */}
            {wallpaper.id === 'custom-upload' && (
              <button className="settings-panel__remove-btn" onClick={handleRemoveCustom}>
                Remove Custom Wallpaper
              </button>
            )}
          </div>

        </div>
      </div>
    </MacWindow>
  );
}

export default SettingsPanel;
