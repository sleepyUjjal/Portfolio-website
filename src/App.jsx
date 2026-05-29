import { useState, useEffect } from 'react';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import PhotosWidget from './components/PhotosWidget/PhotosWidget';
import NotesWidget from './components/NotesWidget/NotesWidget';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Dock from './components/Dock/Dock';
import './App.css';

const DEFAULT_WALLPAPERS = {
  'sequoia-dark': {
    id: 'sequoia-dark',
    name: 'Sequoia Dark',
    style: {
      background: `radial-gradient(ellipse at 25% 75%, rgba(30, 60, 100, 0.6) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 25%, rgba(80, 40, 100, 0.5) 0%, transparent 55%),
                   radial-gradient(ellipse at 50% 100%, rgba(20, 40, 80, 0.4) 0%, transparent 50%),
                   linear-gradient(180deg, #0d0d0d 0%, #1a1a2e 40%, #16213e 70%, #0d0d0d 100%)`
    }
  }
};

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPERS['sequoia-dark']);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('mac-theme');
    const savedWallpaper = localStorage.getItem('mac-wallpaper');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedWallpaper) {
      try {
        setWallpaper(JSON.parse(savedWallpaper));
      } catch (e) {
        console.error('Failed to load wallpaper');
      }
    }
  }, []);

  // Apply theme class to document body
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('mac-theme', theme);
  }, [theme]);

  // Apply wallpaper style to body or desktop container and save
  useEffect(() => {
    if (wallpaper && wallpaper.style && wallpaper.style.background) {
       document.body.style.background = wallpaper.style.background;
       document.body.style.backgroundAttachment = 'fixed';
       localStorage.setItem('mac-wallpaper', JSON.stringify(wallpaper));
    }
  }, [wallpaper]);
  // Clock logic
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleIconDoubleClick = (id) => {
    console.log('Open:', id);
    // Step 4 will implement Finder window opening here
  };

  return (
    <div className="desktop">
      {/* ── Menu Bar ── */}
      <div className="menu-bar">
        <div className="menu-bar__left">
          <span className="menu-bar__apple">&#63743;</span>
          <span className="menu-bar__app-name">Finder</span>
          <span className="menu-bar__item">File</span>
          <span className="menu-bar__item">Edit</span>
          <span className="menu-bar__item">View</span>
          <span className="menu-bar__item">Go</span>
          <span className="menu-bar__item">Window</span>
          <span className="menu-bar__item">Help</span>
        </div>
        <div className="menu-bar__right">
          {/* Battery */}
          <svg className="menu-bar__status-icon" width="20" height="12" viewBox="0 0 20 12" fill="none">
            <rect x="0.5" y="1" width="16" height="10" rx="2" stroke="white" strokeOpacity="0.7" strokeWidth="1"/>
            <rect x="17" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.4"/>
            <rect x="2" y="2.5" width="10" height="7" rx="1" fill="white" fillOpacity="0.7"/>
          </svg>
          {/* WiFi */}
          <svg className="menu-bar__status-icon" width="14" height="12" viewBox="0 0 14 12" fill="none">
            <path d="M7 10.5L8.5 8.5C8 8 7.5 7.8 7 7.8C6.5 7.8 6 8 5.5 8.5L7 10.5Z" fill="white" fillOpacity="0.8"/>
            <path d="M3.5 6.5C4.5 5.5 5.8 5 7 5C8.2 5 9.5 5.5 10.5 6.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <path d="M1.5 4C3 2.5 5 1.5 7 1.5C9 1.5 11 2.5 12.5 4" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="menu-bar__time">{currentDate} {currentTime}</span>
        </div>
      </div>

      {/* ── Widgets (LEFT) ── */}
      <div className="widgets-area">
        <PhotosWidget
          name="Ujjal"
          photoUrl={null}
        />
        <NotesWidget
          name="Ujjal"
          title="Full-Stack Developer"
          bio="Building robust systems with clean architectures. Passionate about security, AI, and elegant user experiences."
        />
      </div>

      {/* ── Desktop Icons (RIGHT grid) ── */}
      <div className="desktop-icons-grid">
        <DesktopIcon
          label="NullPass"
          type="folder"
          onDoubleClick={() => handleIconDoubleClick('nullpass')}
        />
        <DesktopIcon
          label="NuanceNode"
          type="folder"
          onDoubleClick={() => handleIconDoubleClick('nuancenode')}
        />
        <DesktopIcon
          label="FinProcessor"
          type="folder"
          onDoubleClick={() => handleIconDoubleClick('finprocessor')}
        />
        <DesktopIcon
          label="Trading CLI"
          type="folder"
          onDoubleClick={() => handleIconDoubleClick('trading-cli')}
        />
        <DesktopIcon
          label="resume.pdf"
          type="file-text"
          onDoubleClick={() => handleIconDoubleClick('resume')}
        />
        <DesktopIcon
          label="about_me.txt"
          type="file-text"
          onDoubleClick={() => handleIconDoubleClick('about')}
        />
        <DesktopIcon
          label="contact.txt"
          type="file-text"
          onDoubleClick={() => handleIconDoubleClick('contact')}
        />
      </div>

      {/* ── Dock ── */}
      <Dock isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />

      {/* ── Overlays ── */}
      {isSettingsOpen && (
        <SettingsPanel 
          onClose={() => setIsSettingsOpen(false)}
          theme={theme}
          setTheme={setTheme}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
        />
      )}
    </div>
  );
}

export default App;
