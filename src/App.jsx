import { useState, useEffect } from 'react';
import DesktopIcon from './components/DesktopIcon/DesktopIcon';
import PhotosWidget from './components/PhotosWidget/PhotosWidget';
import NotesWidget from './components/NotesWidget/NotesWidget';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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
      <div className="dock">
        {/* Finder */}
        <div className="dock__item dock__item--active" data-tooltip="Finder">
          <svg viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="url(#finderGrad)" />
            <defs>
              <linearGradient id="finderGrad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6ec2f7" />
                <stop offset="1" stopColor="#2a8cd4" />
              </linearGradient>
            </defs>
            {/* Finder face */}
            <rect x="28" y="30" width="64" height="55" rx="6" fill="none" stroke="white" strokeWidth="3" />
            <line x1="60" y1="30" x2="60" y2="85" stroke="white" strokeWidth="2.5" />
            <circle cx="44" cy="52" r="3" fill="white" />
            <circle cx="76" cy="52" r="3" fill="white" />
            <path d="M42 68 Q50 76 58 68" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* GitHub */}
        <div className="dock__item" data-tooltip="GitHub" onClick={() => window.open('https://github.com/sleepyUjjal', '_blank')}>
          <svg viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="#24292e" />
            <path d="M60 22c-20.987 0-38 17.013-38 38 0 16.788 10.884 31.035 25.994 36.065 1.9.342 2.594-.825 2.594-1.836 0-.905-.033-3.3-.05-6.48-10.577 2.299-12.804-5.1-12.804-5.1-1.728-4.39-4.218-5.559-4.218-5.559-3.448-2.357.261-2.31.261-2.31 3.812.268 5.818 3.914 5.818 3.914 3.39 5.81 8.891 4.131 11.062 3.158.345-2.457 1.328-4.131 2.414-5.083-8.443-.96-17.321-4.224-17.321-18.79 0-4.153 1.483-7.548 3.913-10.21-.392-.96-1.695-4.829.373-10.064 0 0 3.19-1.021 10.45 3.9A36.4 36.4 0 0160 37.998a36.4 36.4 0 019.513 1.281c7.258-4.921 10.443-3.9 10.443-3.9 2.072 5.236.77 9.105.378 10.065 2.435 2.661 3.91 6.056 3.91 10.209 0 14.607-8.893 17.82-17.364 18.762 1.365 1.175 2.58 3.498 2.58 7.05v10.45c0 1.02.685 2.196 2.614 1.826C87.13 91.017 98 76.778 98 60c0-20.987-17.013-38-38-38z" fill="white" />
          </svg>
        </div>

        {/* LinkedIn */}
        <div className="dock__item" data-tooltip="LinkedIn" onClick={() => window.open('https://linkedin.com', '_blank')}>
          <svg viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="#0A66C2" />
            <path d="M35 50v34M35 36v.1" stroke="white" strokeWidth="7" strokeLinecap="round" />
            <path d="M50 84V64c0-6 3.5-10 9-10s7.5 4 7.5 10v20M66.5 84V64" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Email */}
        <div className="dock__item" data-tooltip="Email" onClick={() => window.open('mailto:your@email.com')}>
          <svg viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="#34c759" />
            <rect x="24" y="38" width="72" height="44" rx="6" fill="none" stroke="white" strokeWidth="4" />
            <path d="M24 38l36 26 36-26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="dock__separator" />

        {/* Settings */}
        <div className="dock__item" data-tooltip="Settings" onClick={() => console.log('Open settings')}>
          <svg viewBox="0 0 120 120">
            <rect width="120" height="120" rx="26" fill="#636366" />
            <circle cx="60" cy="60" r="16" stroke="white" strokeWidth="4" fill="none" />
            <g stroke="white" strokeWidth="4" strokeLinecap="round">
              <line x1="60" y1="20" x2="60" y2="34" />
              <line x1="60" y1="86" x2="60" y2="100" />
              <line x1="20" y1="60" x2="34" y2="60" />
              <line x1="86" y1="60" x2="100" y2="60" />
              <line x1="31.7" y1="31.7" x2="41.6" y2="41.6" />
              <line x1="78.4" y1="78.4" x2="88.3" y2="88.3" />
              <line x1="31.7" y1="88.3" x2="41.6" y2="78.4" />
              <line x1="78.4" y1="41.6" x2="88.3" y2="31.7" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
