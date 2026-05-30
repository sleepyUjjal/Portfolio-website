import { useState, useRef, useEffect } from 'react';
import './MacWindow.css';

function MacWindow({
  title,
  onClose,
  children,
  actionButton = null,
  initialWidth = 800,
  initialHeight = 500,
  sidebar = false
}) {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - initialWidth / 2,
    y: window.innerHeight / 2 - initialHeight / 2
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const handleMouseDown = (e) => {
    // Only allow drag from the header area, not buttons
    if (e.target.closest('.mac-window__btn') || e.target.closest('.mac-window__action')) return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`mac-window-wrapper ${isDragging ? 'mac-window-wrapper--dragging' : ''} ${sidebar ? 'mac-window-wrapper--has-sidebar' : ''}`}
      style={{
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <div className="mac-window__header" onMouseDown={handleMouseDown}>
        <div className="mac-window__traffic-lights">
          <div className="mac-window__btn mac-window__btn--close" onClick={onClose}></div>
          <div className="mac-window__btn mac-window__btn--minimize"></div>
          <div className="mac-window__btn mac-window__btn--maximize"></div>
        </div>

        <div className="mac-window__title">{title}</div>

        {actionButton && (
          <div className="mac-window__action">
            {actionButton}
          </div>
        )}
      </div>

      <div className="mac-window__body">
        {children}
      </div>
    </div>
  );
}

export default MacWindow;
