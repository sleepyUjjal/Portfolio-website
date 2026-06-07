import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import PhotosWidget from './components/PhotosWidget/PhotosWidget';
import NotesWidget from './components/NotesWidget/NotesWidget';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import FinderWindow from './components/FinderWindow/FinderWindow';
import PreviewWindow from './components/PreviewWindow/PreviewWindow';
import TextEditWindow from './components/TextEditWindow/TextEditWindow';
import ResumeViewer from './components/ResumeViewer/ResumeViewer';
import Dock from './components/Dock/Dock';
import Terminal from './components/Terminal/Terminal';
import MobileGate from './components/MobileGate/MobileGate';
import BootScreen from './components/BootScreen/BootScreen';
import ContextMenu from './components/ContextMenu/ContextMenu';
import NotificationCenter from './components/NotificationCenter/NotificationCenter';
import Launchpad from './components/Launchpad/Launchpad';
import { projectData } from './data/projects';
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

// Icon definitions for the desktop
const DESKTOP_ICONS = [
  { id: 'nullpass', label: 'NullPass', type: 'folder' },
  { id: 'nuancenode', label: 'NuanceNode', type: 'folder' },
  { id: 'finprocessor', label: 'FinProcessor', type: 'folder' },
  { id: 'trading-cli', label: 'Trading CLI', type: 'folder' },
  { id: 'veridian', label: 'Veridian', type: 'folder' },
  { id: 'resume', label: 'resume.pdf', type: 'file-text' },
  { id: 'about', label: 'about_me.txt', type: 'file-text' },
];

function generateDefaultPositions() {
  // macOS-style: right-aligned column, top-to-bottom, right-to-left
  const colWidth = 100;
  const rowHeight = 95;
  const startRight = 20; // px from right edge
  const startTop = 45;   // below menu bar
  const maxRows = Math.floor((window.innerHeight - startTop - 80) / rowHeight);

  const positions = {};
  DESKTOP_ICONS.forEach((icon, i) => {
    const col = Math.floor(i / maxRows);
    const row = i % maxRows;
    positions[icon.id] = {
      x: window.innerWidth - startRight - colWidth - (col * (colWidth + 15)),
      y: startTop + row * rowHeight
    };
  });
  return positions;
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // ── Icon Positions ──
  const [iconPositions, setIconPositions] = useState(() => {
    const saved = localStorage.getItem('mac-icon-positions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { /* ignore */ }
    }
    return generateDefaultPositions();
  });

  const handleIconDragEnd = (iconId, newPos) => {
    setIconPositions(prev => {
      const updated = { ...prev, [iconId]: newPos };
      localStorage.setItem('mac-icon-positions', JSON.stringify(updated));
      return updated;
    });
  };

  // ── Window Management System ──
  const [windows, setWindows] = useState([]);
  const [topZ, setTopZ] = useState(200);

  const openWindow = (type, props = {}) => {
    setTopZ(z => {
      const newZ = z + 1;
      setWindows(prev => {
        // Exact match — bring to front and un-minimize
        const exactIdx = prev.findIndex(w => w.type === type && w.props.id === props.id);
        if (exactIdx >= 0) {
          return prev.map((w, i) => i === exactIdx ? { ...w, zIndex: newZ, isMinimized: false } : w);
        }
        // Un-minimize latest minimized window of same type
        const minimized = prev.filter(w => w.type === type && w.isMinimized);
        if (minimized.length > 0) {
          const latest = minimized[minimized.length - 1];
          return prev.map(w => w.id === latest.id ? { ...w, zIndex: newZ, isMinimized: false } : w);
        }
        // Create new window
        const id = `${type}-${Date.now()}`;
        return [...prev, { id, type, props, zIndex: newZ, isMinimized: false }];
      });
      return newZ;
    });
  };

  const closeWindow = (id) => setWindows(prev => prev.filter(w => w.id !== id));

  const minimizeWindow = (id) => setWindows(prev =>
    prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)
  );

  const bringToFront = (id) => {
    setTopZ(z => {
      const newZ = z + 1;
      setWindows(prev =>
        prev.map(w => w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w)
      );
      return newZ;
    });
  };

  // ── Theme & Wallpaper ──
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('mac-theme') || 'dark';
  });

  const [wallpaper, setWallpaper] = useState(() => {
    const savedWallpaper = localStorage.getItem('mac-wallpaper');
    if (savedWallpaper) {
      try {
        const parsed = JSON.parse(savedWallpaper);
        if (parsed.id === 'custom-upload') {
          const dataUrl = localStorage.getItem('mac-custom-wallpaper-data');
          if (dataUrl) {
            parsed.style = {
              background: `url("${dataUrl}") center/cover no-repeat`
            };
          } else {
            return DEFAULT_WALLPAPERS['sequoia-dark'];
          }
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved wallpaper');
      }
    }
    return DEFAULT_WALLPAPERS['sequoia-dark'];
  });

  // ── Boot Screen ──
  const [isBooting, setIsBooting] = useState(() => {
    return !localStorage.getItem('mac-booted');
  });

  const handleBootComplete = () => {
    localStorage.setItem('mac-booted', 'true');
    setIsBooting(false);
  };

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('mac-theme', theme);
  }, [theme]);

  // Apply wallpaper
  useEffect(() => {
    if (wallpaper && wallpaper.style && wallpaper.style.background) {
      document.body.style.background = wallpaper.style.background;
      document.body.style.backgroundAttachment = 'fixed';
      if (wallpaper.id === 'custom-upload') {
        localStorage.setItem('mac-wallpaper', JSON.stringify({ id: 'custom-upload', name: 'Custom' }));
      } else {
        localStorage.setItem('mac-wallpaper', JSON.stringify(wallpaper));
      }
    }
  }, [wallpaper]);

  // Clock
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

  // ── Unified double-click handler ──
  const handleIconDoubleClick = (file) => {
    // Handle string IDs from desktop icons
    if (typeof file === 'string') {
      if (['nullpass', 'nuancenode', 'finprocessor', 'trading-cli', 'veridian'].includes(file)) {
        openWindow('finder', { id: file, initialProject: file });
      } else if (file === 'resume') {
        openWindow('resume', { id: 'resume', file: { label: 'resume.pdf', url: '/resume_ujjal.pdf' } });
      } else if (file === 'about') {
        const aboutContent = `Hi everyone! I'm Ujjaldeep, an aspiring full stack developer who's curious about how things actually work behind what we see on the internet.\n\nI enjoy solving real-world problems using logic and programming, and I'm always trying to build things that are not only functional but also meaningful.\n\nI keep exploring new technologies to stay engaged and keep learning. My tech stack includes React.js for frontend and Python with Django, FastAPI, Flask and Node.js and Express.js for backend development.\n\nI believe in learning from anyone and everyone, constantly improving myself every day. I'm always open to collaborating, learning, and building something impactful.`;
        openWindow('text', { id: 'about', file: { label: 'about_me.txt', content: aboutContent } });
      }
      return;
    }

    // Handle object files from Finder
    if (file.id === 'resume') {
      openWindow('resume', { id: 'resume', file: { label: 'resume.pdf', url: '/resume_ujjal.pdf' } });
    } else if (file.type === 'folder' && file.id === 'code') {
      const projectInfo = projectData[file.project];
      const githubUrl = projectInfo ? projectInfo.github : 'https://github.com/sleepyUjjal';
      window.open(githubUrl, '_blank');
    } else if (file.type === 'folder' && file.id === 'livedemo') {
      const projectInfo = projectData[file.project];
      const demoUrl = projectInfo ? projectInfo.demo : 'https://github.com/sleepyUjjal';
      window.open(demoUrl, '_blank');
    } else if (file.type === 'file-image') {
      let url = 'https://via.placeholder.com/800x600.webp?text=System+Design';
      if (file.id === 'system_design') {
        if (file.project === 'nullpass') url = '/nullpass_lld.webp';
        else if (file.project === 'nuancenode') url = '/nuancenode_lld.webp';
        else if (file.project === 'finprocessor') url = '/finprocessor_lld.webp';
        else if (file.project === 'trading-cli') url = '/tradingcli_lld.webp';
        else if (file.project === 'veridian') url = '/veridian_lld.webp';
      }
      openWindow('preview', { id: file.id + '-' + (file.project || ''), file: { ...file, url } });
    } else if (file.type === 'file-text') {
      const projectInfo = projectData[file.project];
      const content = projectInfo ? projectInfo.idea : 'No content available.';
      openWindow('text', { id: file.id + '-' + (file.project || ''), file: { ...file, content } });
    }
  };


  // ── Context Menu ──
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    // Prevent context menu on windows and dock
    if (e.target.closest('.mac-window-wrapper') || e.target.closest('.dock')) return;

    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Change Wallpaper...', action: () => openWindow('settings', { id: 'settings' }) },
        { separator: true },
        { label: 'Open Terminal', action: () => openWindow('terminal', { id: 'terminal' }) },
        { separator: true },
        {
          label: 'Reset Icon Positions', action: () => {
            localStorage.removeItem('mac-icon-positions');
            setIconPositions(generateDefaultPositions());
          }
        },
        { separator: true },
        { label: 'About This Mac', action: () => handleIconDoubleClick('about') },
      ]
    });
  };

  // ── Notification Center ──
  const [isNCOpen, setIsNCOpen] = useState(false);

  // ── Launchpad ──
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);

  // ── Menu Bar Dropdowns ──
  const [activeMenu, setActiveMenu] = useState(null);

  // ── Mobile gate (AFTER all hooks) ──
  if (isMobile) {
    return <MobileGate />;
  }

  // ── Window animation variants ──
  const windowVariants = {
    initial: { opacity: 0, scale: 0.92, y: 12 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  // ── Dynamic App Name ──
  const focusedWindow = windows.filter(w => !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0];
  const activeAppName = focusedWindow ? ({
    settings: 'System Preferences',
    finder: 'Finder',
    preview: 'Preview',
    text: 'TextEdit',
    resume: 'Preview',
    terminal: 'Terminal'
  })[focusedWindow.type] || 'Finder' : 'Finder';

  // ── Restart handler ──
  const handleRestart = () => {
    localStorage.removeItem('mac-booted');
    setIsBooting(true);
    setActiveMenu(null);
  };

  // ── Close focused window ──
  const closeFocused = () => {
    if (focusedWindow) closeWindow(focusedWindow.id);
  };
  const minimizeFocused = () => {
    if (focusedWindow) minimizeWindow(focusedWindow.id);
  };

  // ── Menu Definitions ──
  const toggleMenu = (name) => setActiveMenu(prev => prev === name ? null : name);

  const githubUrl = import.meta.env.GITHUB || 'https://github.com/sleepyUjjal';
  const linkedinUrl = import.meta.env.LINKEDIN || 'https://linkedin.com';
  const emailAddress = import.meta.env.EMAIL || 'your@email.com';

  const menus = {
    apple: [
      { label: 'About This Mac', action: () => handleIconDoubleClick('about') },
      { separator: true },
      { label: 'System Preferences...', action: () => openWindow('settings', { id: 'settings' }) },
      { separator: true },
      { label: 'Sleep', disabled: true },
      { label: 'Restart...', action: handleRestart },
    ],
    file: [
      { label: 'New Finder Window', shortcut: '⌘N', action: () => openWindow('finder', { id: 'home', initialProject: 'nullpass' }) },
      { label: 'New Terminal Window', action: () => openWindow('terminal', { id: 'terminal' }) },
      { separator: true },
      { label: 'Close Window', shortcut: '⌘W', action: closeFocused, disabled: !focusedWindow },
    ],
    edit: [
      { label: 'Undo', shortcut: '⌘Z', disabled: true },
      { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
      { separator: true },
      { label: 'Cut', shortcut: '⌘X', disabled: true },
      { label: 'Copy', shortcut: '⌘C', disabled: true },
      { label: 'Paste', shortcut: '⌘V', disabled: true },
      { label: 'Select All', shortcut: '⌘A', disabled: true },
    ],
    view: [
      { label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', action: () => setTheme(t => t === 'dark' ? 'light' : 'dark') },
      { separator: true },
      { label: 'Change Wallpaper...', action: () => openWindow('settings', { id: 'settings' }) },
    ],
    go: [
      { label: 'GitHub', action: () => window.open(githubUrl, '_blank') },
      { label: 'LinkedIn', action: () => window.open(linkedinUrl, '_blank') },
      { label: 'Email', action: () => window.open(`mailto:${emailAddress}`) },
      { separator: true },
      { label: 'Resume', action: () => openWindow('resume', { id: 'resume', file: { label: 'resume.pdf', url: '/resume_ujjal.pdf' } }) },
    ],
    window: [
      { label: 'Minimize', shortcut: '⌘M', action: minimizeFocused, disabled: !focusedWindow },
      { separator: true },
      { label: 'Close Window', shortcut: '⌘W', action: closeFocused, disabled: !focusedWindow },
    ],
    help: [
      { label: 'Open Terminal for Help', action: () => openWindow('terminal', { id: 'terminal' }) },
      { separator: true },
      { label: 'Made with ❤️ by Ujjal', disabled: true },
    ],
  };

  // ── Render a single menu bar trigger + dropdown ──
  const renderMenu = (id, label, className = '') => (
    <div
      className={`menu-bar__menu-trigger ${activeMenu === id ? 'menu-bar__menu-trigger--active' : ''}`}
      onClick={() => toggleMenu(id)}
      onMouseEnter={() => activeMenu && activeMenu !== id && setActiveMenu(id)}
    >
      <span className={className}>{label}</span>
      {activeMenu === id && menus[id] && (
        <div className="menu-bar__dropdown">
          {menus[id].map((item, i) =>
            item.separator ? (
              <div key={i} className="menu-bar__dropdown-separator" />
            ) : (
              <div
                key={i}
                className={`menu-bar__dropdown-item ${item.disabled ? 'menu-bar__dropdown-item--disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!item.disabled && item.action) {
                    item.action();
                    setActiveMenu(null);
                  }
                }}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="menu-bar__dropdown-shortcut">{item.shortcut}</span>}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {isBooting && <BootScreen onComplete={handleBootComplete} />}
      <div
        className="desktop"
        style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.5s ease' }}
        onContextMenu={handleContextMenu}
      >
        {/* ── Backdrop to close menus ── */}
        {activeMenu && <div className="menu-bar__backdrop" onClick={() => setActiveMenu(null)} />}

        {/* ── Menu Bar ── */}
        <div className="menu-bar">
          <div className="menu-bar__left">
            {renderMenu('apple', <img src="/logo.webp" alt="Logo" style={{ height: '12px', width: 'auto', objectFit: 'contain', display: 'block' }} />, 'menu-bar__apple')}
            <div className="menu-bar__menu-trigger">
              <span className="menu-bar__app-name">{activeAppName}</span>
            </div>
            {renderMenu('file', 'File', 'menu-bar__item')}
            {renderMenu('edit', 'Edit', 'menu-bar__item')}
            {renderMenu('view', 'View', 'menu-bar__item')}
            {renderMenu('go', 'Go', 'menu-bar__item')}
            {renderMenu('window', 'Window', 'menu-bar__item')}
            {renderMenu('help', 'Help', 'menu-bar__item')}
          </div>
          <div className="menu-bar__right">
            {/* Battery */}
            <svg className="menu-bar__status-icon" width="20" height="12" viewBox="0 0 20 12" fill="none">
              <rect x="0.5" y="1" width="16" height="10" rx="2" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
              <rect x="17" y="4" width="2" height="4" rx="0.5" fill="white" fillOpacity="0.4" />
              <rect x="2" y="2.5" width="10" height="7" rx="1" fill="white" fillOpacity="0.7" />
            </svg>
            {/* WiFi */}
            <svg className="menu-bar__status-icon" width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path d="M7 10.5L8.5 8.5C8 8 7.5 7.8 7 7.8C6.5 7.8 6 8 5.5 8.5L7 10.5Z" fill="white" fillOpacity="0.8" />
              <path d="M3.5 6.5C4.5 5.5 5.8 5 7 5C8.2 5 9.5 5.5 10.5 6.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M1.5 4C3 2.5 5 1.5 7 1.5C9 1.5 11 2.5 12.5 4" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            <span className="menu-bar__time" onClick={() => setIsNCOpen(!isNCOpen)} style={{ cursor: 'pointer' }}>
              {currentDate} {currentTime}
            </span>
          </div>
        </div>

        {/* ── Widgets (LEFT column) ── */}
        <div className="widgets-area">
          <PhotosWidget
            name="Ujjal"
            photoUrl="/photo.webp"
            imagePosition="center 20%"
          />
          <NotesWidget
            name="Ujjaldeep Singh"
            title="Full-Stack Developer"
            bio="Hi, people generally call me Ujjal. I'm a Full-Stack Developer with a keen interest in System Design. I enjoy building robust systems with clean architectures. Passionate about security, performance optimizations and elegant designs."
          />
        </div>

        {/* ── Desktop Icons (draggable, absolute positioned) ── */}
        <div className="desktop-icons-grid">
          {DESKTOP_ICONS.map(icon => (
            <DesktopIcon
              key={icon.id}
              iconId={icon.id}
              label={icon.label}
              type={icon.type}
              position={iconPositions[icon.id]}
              onDragEnd={handleIconDragEnd}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
            />
          ))}
        </div>

        {/* ── Dock ── */}
        <Dock
          windows={windows}
          onBringToFront={bringToFront}
          onOpenFinder={() => openWindow('finder', { id: 'home', initialProject: 'nullpass' })}
          onOpenSettings={() => openWindow('settings', { id: 'settings' })}
          onOpenTerminal={() => openWindow('terminal', { id: 'terminal' })}
          onOpenLaunchpad={() => setIsLaunchpadOpen(true)}
        />

        {/* ── Render All Open Windows ── */}
        <AnimatePresence>
          {windows.map(win => {
            if (win.isMinimized) return null;

            const sharedProps = {
              onClose: () => closeWindow(win.id),
              zIndex: win.zIndex,
              onFocus: () => bringToFront(win.id),
              onMinimize: () => minimizeWindow(win.id),
            };

            let content = null;
            switch (win.type) {
              case 'settings':
                content = <SettingsPanel {...sharedProps} theme={theme} setTheme={setTheme} wallpaper={wallpaper} setWallpaper={setWallpaper} />;
                break;
              case 'finder':
                content = <FinderWindow {...sharedProps} folderId={win.props.id} initialProject={win.props.initialProject} onOpenFile={handleIconDoubleClick} />;
                break;
              case 'preview':
                content = <PreviewWindow {...sharedProps} file={win.props.file} />;
                break;
              case 'text':
                content = <TextEditWindow {...sharedProps} file={win.props.file} />;
                break;
              case 'resume':
                content = <ResumeViewer {...sharedProps} file={win.props.file} />;
                break;
              case 'terminal':
                content = <Terminal {...sharedProps} onOpenFolder={(props) => openWindow('finder', props)} onOpenApp={(t, props) => openWindow(t, props)} />;
                break;
              default:
                return null;
            }

            return (
              <motion.div
                key={win.id}
                variants={windowVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: win.zIndex }}
              >
                <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  {content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* ── Context Menu ── */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={() => setContextMenu(null)}
          />
        )}

        {/* ── Notification Center ── */}
        <NotificationCenter isOpen={isNCOpen} onClose={() => setIsNCOpen(false)} />

        {/* ── Launchpad ── */}
        <Launchpad
          isOpen={isLaunchpadOpen}
          onClose={() => setIsLaunchpadOpen(false)}
          onOpenApp={(id) => {
            if (id === 'finder' || id === 'nullpass' || id === 'nuancenode' || id === 'finprocessor' || id === 'trading-cli' || id === 'veridian') {
              openWindow('finder', { id: 'home', initialProject: id === 'finder' ? 'nullpass' : id });
            } else if (id === 'terminal') {
              openWindow('terminal', { id: 'terminal' });
            } else if (id === 'settings') {
              openWindow('settings', { id: 'settings' });
            } else if (id === 'textedit') {
              handleIconDoubleClick('about');
            } else if (id === 'preview') {
              handleIconDoubleClick('resume');
            } else {
              handleIconDoubleClick(id);
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
