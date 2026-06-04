import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MacFolderIcon, MacDocIcon, MacImageIcon } from '../DesktopIcon/DesktopIcon';
import './Launchpad.css';

const LAUNCHPAD_APPS = [
  { id: 'finder', label: 'Finder', icon: '/icons/finder.webp', type: 'app' },
  { id: 'terminal', label: 'Terminal', icon: '/icons/terminal.webp', type: 'app' },
  { id: 'settings', label: 'Settings', icon: '/icons/settings.webp', type: 'app' },
  { id: 'textedit', label: 'TextEdit', type: 'doc' },
  { id: 'preview', label: 'Preview', type: 'image' },
  { id: 'nullpass', label: 'NullPass', type: 'folder' },
  { id: 'nuancenode', label: 'NuanceNode', type: 'folder' },
  { id: 'finprocessor', label: 'FinProcessor', type: 'folder' },
  { id: 'trading-cli', label: 'Trading CLI', type: 'folder' },
  { id: 'veridian', label: 'Veridian', type: 'folder' },
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
                  {app.type === 'folder' && <MacFolderIcon />}
                  {app.type === 'doc' && <MacDocIcon />}
                  {app.type === 'image' && <MacImageIcon />}
                  {app.type === 'app' && (
                    <img
                      src={app.icon}
                      alt={app.label}
                      className="launchpad__app-icon"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  {app.type === 'app' && (
                    <div className="launchpad__fallback-icon-text" style={{ display: 'none' }}>
                      {app.label.charAt(0)}
                    </div>
                  )}
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
