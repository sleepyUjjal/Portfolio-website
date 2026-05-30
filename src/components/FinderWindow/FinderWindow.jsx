import { useState } from 'react';
import MacWindow from '../MacWindow/MacWindow';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import './FinderWindow.css';

const PROJECTS = [
  { id: 'nullpass', name: 'NullPass' },
  { id: 'nuancenode', name: 'NuanceNode' },
  { id: 'finprocessor', name: 'FinProcessor' },
  { id: 'trading-cli', name: 'Trading CLI' },
  { id: 'veridian', name: 'Veridian' }
];

const PROJECT_FILES = [
  { id: 'code', label: 'code', type: 'folder' },
  { id: 'livedemo', label: 'livedemo', type: 'folder' },
  { id: 'system_design', label: 'system_design.png', type: 'file-image' },
  { id: 'idea', label: 'idea.txt', type: 'file-text' }
];

function FinderWindow({ onClose, onOpenFile, initialProject = 'nullpass' }) {
  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [selectedFile, setSelectedFile] = useState(null);

  const activeProjectName = PROJECTS.find(p => p.id === selectedProject)?.name || 'Finder';

  return (
    <MacWindow 
      title={activeProjectName}
      onClose={onClose}
      initialWidth={750}
      initialHeight={450}
      sidebar={true}
    >
      <div className="finder">
        {/* Sidebar */}
        <div className="finder__sidebar">
          <div className="finder__sidebar-section">
            <div className="finder__sidebar-title">Projects</div>
            <ul className="finder__sidebar-list">
              {PROJECTS.map(project => (
                <li 
                  key={project.id}
                  className={`finder__sidebar-item ${selectedProject === project.id ? 'finder__sidebar-item--active' : ''}`}
                  onClick={() => {
                    setSelectedProject(project.id);
                    setSelectedFile(null); // Reset file selection on project change
                  }}
                >
                  <svg className="finder__sidebar-icon" viewBox="0 0 100 100" fill="currentColor">
                     <path d="M 8 20 C 8 15 12 11 17 11 L 43 11 C 47 11 50 13 52 16 L 57 23 L 103 23 C 108 23 112 27 112 32 L 112 85 C 112 90 108 94 103 94 L 17 94 C 12 94 8 90 8 85 Z" fill="#2588d9"/>
                  </svg>
                  <span>{project.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="finder__content">
          <div className="finder__toolbar">
            <div className="finder__view-controls">
              {/* Back/Forward arrows (decorative) */}
              <svg className="finder__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              <svg className="finder__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.3}}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            <div className="finder__path">
              {activeProjectName}
            </div>
          </div>
          
          <div className="finder__files-grid">
            {PROJECT_FILES.map(file => (
              <DesktopIcon
                key={file.id}
                label={file.label}
                type={file.type}
                selected={selectedFile === file.id}
                onClick={() => setSelectedFile(file.id)}
                onDoubleClick={() => onOpenFile({ ...file, project: selectedProject })}
              />
            ))}
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

export default FinderWindow;
