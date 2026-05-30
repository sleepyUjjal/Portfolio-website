import MacWindow from '../MacWindow/MacWindow';
import './TextEditWindow.css';

function TextEditWindow({ file, onClose }) {
  // Mock content
  const content = file.content || `This is the content of ${file.label}.\n\nIt can contain multiple lines of text, mimicking a real TextEdit document on macOS.\n\nYou can edit this text but it won't save permanently!`;

  return (
    <MacWindow 
      title={file.label || 'TextEdit'} 
      onClose={onClose}
      initialWidth={600}
      initialHeight={450}
    >
      <div className="textedit-app">
        <div className="textedit-app__toolbar">
          <select className="textedit-app__select" defaultValue="Helvetica">
            <option>Helvetica</option>
            <option>SF Pro</option>
            <option>Courier New</option>
          </select>
          <select className="textedit-app__select" defaultValue="14">
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
          </select>
          <div className="textedit-app__separator"></div>
          <div className="textedit-app__style-btn">B</div>
          <div className="textedit-app__style-btn" style={{ fontStyle: 'italic' }}>I</div>
          <div className="textedit-app__style-btn" style={{ textDecoration: 'underline' }}>U</div>
        </div>
        <div className="textedit-app__content-container">
          <textarea 
            className="textedit-app__textarea" 
            defaultValue={content}
            spellCheck="false"
          />
        </div>
      </div>
    </MacWindow>
  );
}

export default TextEditWindow;
