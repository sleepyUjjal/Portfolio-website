import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import portfolioData from '../../data/portfolio_data.json';
import './ProjectDetail.css';

const PROJECT_COLORS = [
  'var(--color-curious-blue)',
  'var(--color-blaze-orange)',
  'var(--color-nice-blue)',
  'var(--color-orange-yellow)',
  'var(--color-red-wine)',
  'var(--color-raddish)'
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = portfolioData.projects.findIndex(p => p.id === id);
  const project = portfolioData.projects[projectIndex];

  const projectColor = projectIndex !== -1 ? PROJECT_COLORS[projectIndex % PROJECT_COLORS.length] : 'var(--retro-dark)';

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (e) => {
      const PAN_SPEED = 40;
      const ZOOM_SPEED = 0.2;

      switch (e.key) {
        case 'ArrowUp':
          setPos(prev => ({ ...prev, y: prev.y + PAN_SPEED }));
          break;
        case 'ArrowDown':
          setPos(prev => ({ ...prev, y: prev.y - PAN_SPEED }));
          break;
        case 'ArrowLeft':
          setPos(prev => ({ ...prev, x: prev.x + PAN_SPEED }));
          break;
        case 'ArrowRight':
          setPos(prev => ({ ...prev, x: prev.x - PAN_SPEED }));
          break;
        case '+':
        case '=':
          setZoom(prev => Math.min(prev + ZOOM_SPEED, 5));
          break;
        case '-':
        case '_':
          setZoom(prev => Math.max(prev - ZOOM_SPEED, 0.2));
          break;
        case 'Escape':
          setIsViewerOpen(false);
          break;
        default:
          break;
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        setZoom(prev => Math.min(Math.max(prev + delta, 0.2), 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isViewerOpen]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const openViewer = () => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
    setIsViewerOpen(true);
  };

  if (!project) {
    return (
      <div className="project-detail__not-found">
        <h1>404 - Project Not Found</h1>
        <Link to="/">Return to OS</Link>
      </div>
    );
  }

  return (
    <div className="project-detail" style={{ '--project-color': projectColor }}>
      <div className="project-detail__header">
        <button onClick={() => navigate(-1)} className="project-detail__back">
          <span>&larr;</span> BACK
        </button>
        <h1 className="project-detail__title">
          {project.title}
        </h1>
      </div>

      <div className="project-detail__content">
        <div className="project-detail__info-box">
          <div className="project-detail__info-titlebar">
            INFO.EXE
          </div>
          <div className="project-detail__info-body">
            <p className="project-detail__idea">
              {project.idea.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        <div className="project-detail__links">
          {project.hld && (
            <button onClick={openViewer} className="project-detail__link-btn">
              VIEW SYSTEM DESIGN
            </button>
          )}
          {project.github && project.github !== 'Private (NDA)' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail__link-btn">
              VIEW SOURCE CODE
            </a>
          )}
          {project.demo && project.demo !== 'In Progress' && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-detail__link-btn">
              LIVE DEMO
            </a>
          )}
        </div>
      </div>

      {isViewerOpen && (
        <div className="project-detail__viewer">
          <div className="project-detail__viewer-controls">
            <span>Arrow Keys to Pan | +/- to Zoom | Esc to Close</span>
            <button className="project-detail__viewer-close" onClick={() => setIsViewerOpen(false)}>
              [X]
            </button>
          </div>
          <div
            className="project-detail__viewer-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={project.hld}
              alt="System Design Diagram"
              className="project-detail__viewer-img"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              draggable="false"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
