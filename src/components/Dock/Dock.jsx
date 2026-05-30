import './Dock.css';

function Dock({ isSettingsOpen, setIsSettingsOpen, onFinderClick, onTerminalClick }) {
  // Use Vite environment variables
  const githubUrl = import.meta.env.GITHUB || 'https://github.com/sleepyUjjal';
  const linkedinUrl = import.meta.env.LINKEDIN || 'https://linkedin.com';
  const emailAddress = import.meta.env.EMAIL || 'your@email.com';

  return (
    <div className="dock">
      {/* Finder */}
      <div className="dock__item dock__item--active" data-tooltip="Finder" onClick={onFinderClick}>
        <img src="/icons/finder.png" alt="Finder" />
      </div>

      {/* Terminal */}
      <div className="dock__item" data-tooltip="Terminal" onClick={onTerminalClick}>
        <img src="/icons/terminal.png" alt="Terminal" />
      </div>

      {/* GitHub */}
      <div className="dock__item" data-tooltip="GitHub" onClick={() => window.open(githubUrl, '_blank')}>
        <img src="/icons/github.png" alt="GitHub" />
      </div>

      {/* LinkedIn */}
      <div className="dock__item" data-tooltip="LinkedIn" onClick={() => window.open(linkedinUrl, '_blank')}>
        <img src="/icons/linkedin.png" alt="LinkedIn" />
      </div>

      {/* Email */}
      <div className="dock__item" data-tooltip="Email" onClick={() => window.open(`mailto:${emailAddress}`)}>
        <img src="/icons/mail.png" alt="Email" />
      </div>

      <div className="dock__separator" />

      {/* Settings */}
      <div className="dock__item" data-tooltip="Settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <img src="/icons/settings.png" alt="Settings" />
      </div>
    </div>
  );
}

export default Dock;
