import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContextMenu.css';

function ContextMenu({ x, y, items, onClose }) {
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    // Slight delay to prevent immediate close on the same click that opened it
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to stay within viewport
  let adjustedX = x;
  let adjustedY = y;
  
  if (menuRef.current) {
    const rect = menuRef.current.getBoundingClientRect();
    if (x + rect.width > window.innerWidth) {
      adjustedX = window.innerWidth - rect.width - 5;
    }
    if (y + rect.height > window.innerHeight) {
      adjustedY = window.innerHeight - rect.height - 5;
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        ref={menuRef}
        className="context-menu"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        style={{ top: adjustedY, left: adjustedX }}
      >
        {items.map((item, index) => {
          if (item.separator) {
            return <div key={`sep-${index}`} className="context-menu__separator" />;
          }
          return (
            <div 
              key={index} 
              className={`context-menu__item ${item.disabled ? 'context-menu__item--disabled' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // prevent document click from firing first
                if (!item.disabled && item.action) {
                  item.action();
                  onClose();
                }
              }}
            >
              {item.label}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default ContextMenu;
