import './Dock.css';

function Dock({ isSettingsOpen, setIsSettingsOpen, onFinderClick }) {
  // Use Vite environment variables
  const githubUrl = import.meta.env.GITHUB || 'https://github.com/sleepyUjjal';
  const linkedinUrl = import.meta.env.LINKEDIN || 'https://linkedin.com';
  const emailAddress = import.meta.env.EMAIL || 'your@email.com';

  return (
    <div className="dock">
      {/* Finder */}
      <div className="dock__item dock__item--active" data-tooltip="Finder" onClick={onFinderClick}>
        <svg viewBox="0 0 120 120">
          <rect width="120" height="120" rx="26" fill="url(#finderGrad)" />
          <defs>
            <linearGradient id="finderGrad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6ec2f7" />
              <stop offset="1" stopColor="#2a8cd4" />
            </linearGradient>
          </defs>
          <rect x="28" y="30" width="64" height="55" rx="6" fill="none" stroke="white" strokeWidth="3" />
          <line x1="60" y1="30" x2="60" y2="85" stroke="white" strokeWidth="2.5" />
          <circle cx="44" cy="52" r="3" fill="white" />
          <circle cx="76" cy="52" r="3" fill="white" />
          <path d="M42 68 Q50 76 58 68" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* GitHub */}
      <div className="dock__item" data-tooltip="GitHub" onClick={() => window.open(githubUrl, '_blank')}>
        <svg viewBox="0 0 120 120">
          <rect width="120" height="120" rx="26" fill="#24292e" />
          <path d="M60 22c-20.987 0-38 17.013-38 38 0 16.788 10.884 31.035 25.994 36.065 1.9.342 2.594-.825 2.594-1.836 0-.905-.033-3.3-.05-6.48-10.577 2.299-12.804-5.1-12.804-5.1-1.728-4.39-4.218-5.559-4.218-5.559-3.448-2.357.261-2.31.261-2.31 3.812.268 5.818 3.914 5.818 3.914 3.39 5.81 8.891 4.131 11.062 3.158.345-2.457 1.328-4.131 2.414-5.083-8.443-.96-17.321-4.224-17.321-18.79 0-4.153 1.483-7.548 3.913-10.21-.392-.96-1.695-4.829.373-10.064 0 0 3.19-1.021 10.45 3.9A36.4 36.4 0 0160 37.998a36.4 36.4 0 019.513 1.281c7.258-4.921 10.443-3.9 10.443-3.9 2.072 5.236.77 9.105.378 10.065 2.435 2.661 3.91 6.056 3.91 10.209 0 14.607-8.893 17.82-17.364 18.762 1.365 1.175 2.58 3.498 2.58 7.05v10.45c0 1.02.685 2.196 2.614 1.826C87.13 91.017 98 76.778 98 60c0-20.987-17.013-38-38-38z" fill="white" />
        </svg>
      </div>

      {/* LinkedIn */}
      <div className="dock__item" data-tooltip="LinkedIn" onClick={() => window.open(linkedinUrl, '_blank')}>
        <svg viewBox="0 0 120 120">
          <rect width="120" height="120" rx="26" fill="#0A66C2" />
          <path d="M30 46h16v44H30V46zm8-24a9.5 9.5 0 110 19 9.5 9.5 0 010-19zM53 46h15v7c2-3.5 7.5-8 16-8 14 0 15.5 10 15.5 22v23H84V67c0-6-1-10-8-10-8 0-9 5.5-9 11v22H53V46z" fill="white" />
        </svg>
      </div>

      {/* Email */}
      <div className="dock__item" data-tooltip="Email" onClick={() => window.open(`mailto:${emailAddress}`)}>
        <svg viewBox="0 0 120 120">
          <rect width="120" height="120" rx="26" fill="#34c759" />
          <rect x="24" y="38" width="72" height="44" rx="6" fill="none" stroke="white" strokeWidth="4" />
          <path d="M24 38l36 26 36-26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="dock__separator" />

      {/* Settings */}
      <div className="dock__item" data-tooltip="Settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
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
  );
}

export default Dock;
