import { useState, useRef, useEffect } from 'react';
import './MacWindow.css';

function MacWindow({
  title,
  onClose,
  children,
  actionButton = null,
  initialWidth = 800,
  initialHeight = 500,
  sidebar = false,
  zIndex = 200,
  onFocus,
  onMinimize
}) {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - initialWidth / 2,
    y: window.innerHeight / 2 - initialHeight / 2
  });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState(null);
  const [prevSize, setPrevSize] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  const handleMouseDown = (e) => {
    // Only allow drag from the header area, not buttons
    if (e.target.closest('.mac-window__btn') || e.target.closest('.mac-window__action') || isResizing) return;

    if (isMaximized) {
      setIsMaximized(false);
      setSize(prevSize);
      const newX = e.clientX - prevSize.width / 2;
      setPosition({ x: newX, y: e.clientY - 10 });
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: newX,
        startPosY: e.clientY - 10
      };
      return;
    }

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

  // Resize Effect
  useEffect(() => {
    const handleResizeMove = (e) => {
      if (!isResizing || isMaximized) return;
      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      setSize({
        width: Math.max(300, resizeRef.current.startWidth + dx),
        height: Math.max(200, resizeRef.current.startHeight + dy)
      });
    };

    const handleResizeUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeUp);
    };
  }, [isResizing, isMaximized]);

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(prevPosition);
      setSize(prevSize);
      setIsMaximized(false);
    } else {
      setPrevPosition({ ...position });
      setPrevSize({ ...size });
      setPosition({ x: 0, y: 35 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 35 });
      setIsMaximized(true);
    }
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) return;
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height
    };
  };

  return (
    <div
      className={`mac-window-wrapper ${isDragging ? 'mac-window-wrapper--dragging' : ''} ${sidebar ? 'mac-window-wrapper--has-sidebar' : ''} ${isMaximized ? 'mac-window-wrapper--maximized' : ''}`}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: zIndex
      }}
      onMouseDown={onFocus}
    >
      <div className="mac-window__header" onMouseDown={handleMouseDown}>
        <div className="mac-window__traffic-lights">
          <div className="mac-window__btn mac-window__btn--close" onClick={onClose}></div>
          <div className="mac-window__btn mac-window__btn--minimize" onClick={onMinimize || onClose}></div>
          <div className="mac-window__btn mac-window__btn--maximize" onClick={toggleMaximize}></div>
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

      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          className="mac-window__resize-handle" 
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
}

export default MacWindow;
