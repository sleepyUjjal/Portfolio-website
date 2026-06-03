import { useState, useRef, useEffect } from 'react';
import MacWindow from '../MacWindow/MacWindow';
import './PreviewWindow.css';

function PreviewWindow({ file, onClose, zIndex, onFocus, onMinimize }) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  // Mock image for demonstration
  const imageUrl = file.url || 'https://via.placeholder.com/800x600.png?text=System+Design';

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 500));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const [isLoaded, setIsLoaded] = useState(false);

  // Handle trackpad pinch-to-zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Stop native browser page zoom
        const zoomDelta = e.deltaY * -0.5; // Adjust sensitivity
        setZoom(prev => Math.max(25, Math.min(prev + zoomDelta, 500)));
      }
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleNativeWheel);
  }, []);

  return (
    <MacWindow 
      title={file.label || 'Preview'} 
      onClose={onClose}
      initialWidth={800}
      initialHeight={600}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
    >
      <div className="preview-app">
        <div className="preview-app__toolbar">
          <div className="preview-app__tool-group">
            <div className="preview-app__tool" onClick={handleZoomOut} title="Zoom Out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </div>
            <div className="preview-app__tool" onClick={handleZoomIn} title="Zoom In">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            </div>
          </div>
          <span className="preview-app__zoom-text">{Math.round(zoom)}%</span>
          <div className="preview-app__tool-group">
            <div className="preview-app__tool" onClick={handleRotate} title="Rotate">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-5.94-5.94"></path></svg>
            </div>
          </div>
        </div>
        <div 
          className="preview-app__content" 
          ref={containerRef}
          style={{ 
            overflow: 'auto', 
            display: 'flex', 
            alignItems: zoom > 100 ? 'flex-start' : 'center', 
            justifyContent: zoom > 100 ? 'flex-start' : 'center',
            padding: '20px',
            position: 'relative'
          }}
        >
          {!isLoaded && (
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.6)' }}>
              <div style={{ width: '24px', height: '24px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#78dce8', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '12px' }}>Loading High-Res Image...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt={file.label} 
            className="preview-app__image" 
            onLoad={() => setIsLoaded(true)}
            style={{ 
              width: `${zoom}%`, 
              height: `${zoom}%`, 
              maxWidth: 'none', 
              maxHeight: 'none',
              objectFit: 'contain',
              flexShrink: 0,
              opacity: isLoaded ? 1 : 0,
              transform: `rotate(${rotation}deg)`,
              transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.1s, height 0.1s',
              transformOrigin: 'center center'
            }} 
          />
        </div>
      </div>
    </MacWindow>
  );
}

export default PreviewWindow;
