import { useState } from 'react';
import MacWindow from '../MacWindow/MacWindow';
import './ResumeViewer.css';

function ResumeViewer({ file, onClose }) {
  const resumeUrl = file?.url || '/resume_ujjal.pdf';

  const downloadButton = (
    <button 
      className="resume-viewer__download-btn"
      onClick={() => {
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = file?.label || 'resume_ujjal.pdf';
        link.click();
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Download
    </button>
  );

  return (
    <MacWindow 
      title={file?.label || "resume.pdf"} 
      onClose={onClose}
      initialWidth={800}
      initialHeight={700}
      actionButton={downloadButton}
    >
      <div className="resume-viewer">
        <div className="resume-viewer__content">
          <iframe 
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`} 
            title="Resume PDF"
            className="resume-viewer__iframe"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </MacWindow>
  );
}

export default ResumeViewer;
