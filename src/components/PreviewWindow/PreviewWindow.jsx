import MacWindow from '../MacWindow/MacWindow';
import './PreviewWindow.css';

function PreviewWindow({ file, onClose }) {
  // Mock image for demonstration
  const imageUrl = file.url || 'https://via.placeholder.com/800x600.png?text=System+Design';

  return (
    <MacWindow 
      title={file.label || 'Preview'} 
      onClose={onClose}
      initialWidth={800}
      initialHeight={600}
    >
      <div className="preview-app">
        <div className="preview-app__toolbar">
          <div className="preview-app__tool">Zoom In</div>
          <div className="preview-app__tool">Zoom Out</div>
          <div className="preview-app__tool">Rotate</div>
        </div>
        <div className="preview-app__content">
          <img src={imageUrl} alt={file.label} className="preview-app__image" />
        </div>
      </div>
    </MacWindow>
  );
}

export default PreviewWindow;
