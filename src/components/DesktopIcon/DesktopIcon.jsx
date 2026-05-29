import './DesktopIcon.css';

const MacFolderIcon = () => (
  <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2588d9"/>
        <stop offset="100%" stopColor="#1564a9"/>
      </linearGradient>
      <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#51bcf6"/>
        <stop offset="100%" stopColor="#1e89e0"/>
      </linearGradient>
      <filter id="folderShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25"/>
      </filter>
    </defs>
    
    <g filter="url(#folderShadow)">
      <path d="M 8 20 C 8 15 12 11 17 11 L 43 11 C 47 11 50 13 52 16 L 57 23 L 103 23 C 108 23 112 27 112 32 L 112 85 C 112 90 108 94 103 94 L 17 94 C 12 94 8 90 8 85 Z" fill="url(#folderBack)"/>
      <path d="M 8 36 C 8 32 12 28 17 28 L 103 28 C 108 28 112 32 112 36 L 112 85 C 112 90 108 94 103 94 L 17 94 C 12 94 8 90 8 85 Z" fill="url(#folderFront)"/>
      <path d="M 17 29 L 103 29" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  </svg>
);

const MacDocIcon = () => (
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff"/>
        <stop offset="100%" stopColor="#e5e5e5"/>
      </linearGradient>
      <filter id="docShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    <g filter="url(#docShadow)">
      <path d="M 15 10 L 65 10 L 85 30 L 85 110 C 85 113 82 116 79 116 L 21 116 C 18 116 15 113 15 110 Z" fill="url(#docGrad)"/>
      <path d="M 65 10 L 65 27 C 65 29 66 30 68 30 L 85 30 Z" fill="#d1d1d1"/>
      <path d="M 65 10 L 65 27 C 65 29 66 30 68 30 L 85 30" fill="none" stroke="#bebebe" strokeWidth="0.5"/>
      
      <rect x="30" y="45" width="40" height="3.5" rx="1.75" fill="#a0a0a0"/>
      <rect x="30" y="58" width="30" height="3.5" rx="1.75" fill="#a0a0a0"/>
      <rect x="30" y="71" width="40" height="3.5" rx="1.75" fill="#a0a0a0"/>
      <rect x="30" y="84" width="35" height="3.5" rx="1.75" fill="#a0a0a0"/>
      <rect x="30" y="97" width="40" height="3.5" rx="1.75" fill="#a0a0a0"/>
      <path d="M 15 10 L 65 10 L 85 30 L 85 110 C 85 113 82 116 79 116 L 21 116 C 18 116 15 113 15 110 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
    </g>
  </svg>
);

const MacImageIcon = () => (
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="imgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff"/>
        <stop offset="100%" stopColor="#e5e5e5"/>
      </linearGradient>
      <filter id="imgShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
      </filter>
    </defs>
    
    <g filter="url(#imgShadow)">
      <path d="M 15 10 L 65 10 L 85 30 L 85 110 C 85 113 82 116 79 116 L 21 116 C 18 116 15 113 15 110 Z" fill="url(#imgGrad)"/>
      <path d="M 65 10 L 65 27 C 65 29 66 30 68 30 L 85 30 Z" fill="#d1d1d1"/>
      
      <rect x="25" y="45" width="50" height="40" rx="4" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1"/>
      <circle cx="40" cy="58" r="6" fill="#71b9f8"/>
      <polygon points="25,85 45,60 60,85" fill="#67c784"/>
      <polygon points="45,85 60,65 75,85" fill="#4ea568"/>
      <path d="M 15 10 L 65 10 L 85 30 L 85 110 C 85 113 82 116 79 116 L 21 116 C 18 116 15 113 15 110 Z" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
    </g>
  </svg>
);

function DesktopIcon({ label, type = 'folder', onClick, onDoubleClick, selected }) {
  const renderIcon = () => {
    switch (type) {
      case 'file-text': return <MacDocIcon />;
      case 'file-image': return <MacImageIcon />;
      case 'folder':
      default: return <MacFolderIcon />;
    }
  };

  return (
    <div
      className={`desktop-icon ${selected ? 'desktop-icon--selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex={0}
    >
      <div className="desktop-icon__image">
        {renderIcon()}
      </div>
      {label && <span className="desktop-icon__label">{label}</span>}
    </div>
  );
}

export default DesktopIcon;
