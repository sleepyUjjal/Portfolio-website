import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Launchpad.css';

const LAUNCHPAD_APPS = [
  { id: 'finder', label: 'Finder', icon: '/folder.png' },
  { id: 'terminal', label: 'Terminal', icon: '/terminal.png' },
  { id: 'settings', label: 'Settings', icon: '/settings.png' },
  { id: 'textedit', label: 'TextEdit', icon: '/textedit.png' },
  { id: 'preview', label: 'Preview', icon: '/preview.png' },
  { id: 'nullpass', label: 'NullPass', icon: '/folder.png' },
  { id: 'nuancenode', label: 'NuanceNode', icon: '/folder.png' },
  { id: 'finprocessor', label: 'FinProcessor', icon: '/folder.png' },
  { id: 'trading-cli', label: 'Trading CLI', icon: '/folder.png' },
  { id: 'veridian', label: 'Veridian', icon: '/folder.png' },
];

function Launchpad({ isOpen, onClose, onOpenApp }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clear search when opened/closed
  useEffect(() => {
    if (!isOpen) setSearchTerm('');
  }, [isOpen]);

  const filteredApps = LAUNCHPAD_APPS.filter(app => 
    app.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="launchpad"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => {
            // Close if clicking on the background (not an app or search bar)
            if (e.target.classList.contains('launchpad') || e.target.classList.contains('launchpad__grid')) {
              onClose();
            }
          }}
        >
          {/* Search Bar */}
          <div className="launchpad__search-container">
            <div className="launchpad__search">
              <svg className="launchpad__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                className="launchpad__search-input" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {/* App Grid */}
          <div className="launchpad__grid">
            {filteredApps.map((app, index) => (
              <motion.div 
                key={app.id} 
                className="launchpad__app"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
              >
                <div className="launchpad__app-icon-wrapper">
                  {/* Since we don't have explicit app icons for everything, we use CSS fallback or the ones we know exist */}
                  {app.id === 'terminal' || app.id === 'settings' ? (
                    <div className={`launchpad__fallback-icon launchpad__fallback-icon--${app.id}`}></div>
                  ) : (
                    <img 
                      src={app.icon.replace('.png', '.webp')} 
                      alt={app.label} 
                      className="launchpad__app-icon" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  <div className="launchpad__fallback-icon-text" style={{ display: 'none' }}>
                    {app.label.charAt(0)}
                  </div>
                </div>
                <div className="launchpad__app-label">{app.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Launchpad;
