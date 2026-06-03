import { motion, AnimatePresence } from 'framer-motion';
import './Dock.css';

function Dock({ windows = [], onBringToFront, onOpenFinder, onOpenTerminal, onOpenSettings, onOpenLaunchpad }) {
  const githubUrl = import.meta.env.GITHUB || 'https://github.com/sleepyUjjal';
  const linkedinUrl = import.meta.env.LINKEDIN || 'https://linkedin.com';
  const emailAddress = import.meta.env.EMAIL || 'your@email.com';

  // Active state for core apps (dot indicator)
  const isFinderOpen = windows.some(w => w.type === 'finder');
  const isTerminalOpen = windows.some(w => w.type === 'terminal');
  const isSettingsOpen = windows.some(w => w.type === 'settings');

  // Dynamic apps: preview, text, resume — show icon when open OR minimized
  const dynamicApps = windows.filter(w => ['preview', 'text', 'resume'].includes(w.type));

  // Minimized core apps (finder, terminal, settings) — show in minimized section
  const minimizedCoreApps = windows.filter(w => w.isMinimized && ['finder', 'terminal', 'settings'].includes(w.type));

  const getIconForType = (type) => {
    if (type === 'preview') return '/icons/preview.webp';
    if (type === 'text') return '/icons/textedit.webp';
    if (type === 'resume') return '/icons/preview.webp';
    if (type === 'finder') return '/icons/finder.webp';
    if (type === 'terminal') return '/icons/terminal.webp';
    if (type === 'settings') return '/icons/settings.webp';
    return '/icons/finder.webp';
  };

  const getTooltipForWin = (win) => {
    if (win.props?.file?.label) return win.props.file.label;
    if (win.type === 'finder') return 'Finder';
    if (win.type === 'terminal') return 'Terminal';
    if (win.type === 'settings') return 'Settings';
    if (win.type === 'preview') return 'Preview';
    if (win.type === 'text') return 'TextEdit';
    if (win.type === 'resume') return 'Resume';
    return win.type;
  };

  const itemVariants = {
    initial: { width: 0, opacity: 0, scale: 0.3 },
    animate: { width: 48, opacity: 1, scale: 1 },
    exit: { width: 0, opacity: 0, scale: 0.3, transition: { duration: 0.2 } }
  };

  const springTransition = { type: "spring", stiffness: 400, damping: 25 };

  return (
    <div className="dock">
      <AnimatePresence initial={false}>
        {/* Finder — always visible */}
        <motion.div layout key="finder" className={`dock__item ${isFinderOpen ? 'dock__item--active' : ''}`} data-tooltip="Finder" onClick={onOpenFinder}>
          <img src="/icons/finder.webp" alt="Finder" />
        </motion.div>

        {/* Launchpad — always visible */}
        <motion.div layout key="launchpad" className="dock__item" data-tooltip="Launchpad" onClick={onOpenLaunchpad}>
          <img src="/icons/launchpad.webp" alt="Launchpad" />
        </motion.div>

        {/* Terminal — always visible */}
        <motion.div layout key="terminal" className={`dock__item ${isTerminalOpen ? 'dock__item--active' : ''}`} data-tooltip="Terminal" onClick={onOpenTerminal}>
          <img src="/icons/terminal.webp" alt="Terminal" />
        </motion.div>

        {/* Dynamic apps (TextEdit, Preview, Resume) — appear/disappear */}
        {dynamicApps.map(win => (
          <motion.div
            layout
            key={`dyn-${win.id}`}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className={`dock__item dock__item--active ${win.isMinimized ? 'dock__item--minimized' : ''}`}
            data-tooltip={getTooltipForWin(win)}
            onClick={() => onBringToFront(win.id)}
          >
            <img src={getIconForType(win.type)} alt={win.type} style={win.isMinimized ? { opacity: 0.6 } : {}} />
          </motion.div>
        ))}

        {/* GitHub */}
        <motion.div layout key="github" className="dock__item" data-tooltip="GitHub" onClick={() => window.open(githubUrl, '_blank')}>
          <img src="/icons/github.webp" alt="GitHub" />
        </motion.div>

        {/* LinkedIn */}
        <motion.div layout key="linkedin" className="dock__item" data-tooltip="LinkedIn" onClick={() => window.open(linkedinUrl, '_blank')}>
          <img src="/icons/linkedin.webp" alt="LinkedIn" />
        </motion.div>

        {/* Email */}
        <motion.div layout key="email" className="dock__item" data-tooltip="Email" onClick={() => window.open(`mailto:${emailAddress}`)}>
          <img src="/icons/mail.webp" alt="Email" />
        </motion.div>

        {/* Separator */}
        <motion.div layout key="sep" className="dock__separator" />

        {/* Settings — always visible */}
        <motion.div layout key="settings" className={`dock__item ${isSettingsOpen ? 'dock__item--active' : ''}`} data-tooltip="Settings" onClick={onOpenSettings}>
          <img src="/icons/settings.webp" alt="Settings" />
        </motion.div>

        {/* Minimized core apps (Finder/Terminal/Settings when minimized) */}
        {minimizedCoreApps.length > 0 && (
          <motion.div
            layout
            key="sep-min"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 1, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="dock__separator"
          />
        )}
        {minimizedCoreApps.map(win => (
          <motion.div
            layout
            key={`min-${win.id}`}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className="dock__item dock__item--minimized"
            data-tooltip={`${getTooltipForWin(win)} (minimized)`}
            onClick={() => onBringToFront(win.id)}
          >
            <img src={getIconForType(win.type)} alt={win.type} style={{ opacity: 0.6 }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Dock;
