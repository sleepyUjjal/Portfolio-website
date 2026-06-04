import { motion } from 'framer-motion';
import './NotesWidget.css';

function NotesWidget({ name, title, bio }) {
  return (
    <motion.div className="notes-widget" drag dragMomentum={false}>
      <div className="notes-widget__header">
        <div className="notes-widget__header-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#ffd60a" />
            <line x1="7" y1="8" x2="17" y2="8" stroke="#8B7500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="12" x2="15" y2="12" stroke="#8B7500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="16" x2="13" y2="16" stroke="#8B7500" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="notes-widget__header-title">Notes</span>
      </div>

      <div className="notes-widget__content">
        <h3 className="notes-widget__name">{name || 'Your Name'}</h3>
        <p className="notes-widget__role">{title || 'Developer'}</p>
        {bio && <p className="notes-widget__bio">{bio}</p>}
      </div>
    </motion.div>
  );
}

export default NotesWidget;
