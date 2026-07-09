import React, { useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-detail__not-found">
        <h1>404 - Project Not Found</h1>
        <Link to="/">Return to OS</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-detail__header">
        <button onClick={() => navigate(-1)} className="project-detail__back" style={{ color: 'var(--retro-dark)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>&larr;</span> BACK
        </button>
        <h1 className="project-detail__title" style={{ 
          color: projectColor, 
          textShadow: '-2px -2px 0 var(--retro-dark), 2px -2px 0 var(--retro-dark), -2px 2px 0 var(--retro-dark), 2px 2px 0 var(--retro-dark), 4px 4px 0 var(--retro-dark)'
        }}>
          {project.title}
        </h1>
      </div>
      
      <div className="project-detail__content">
        <div className="project-detail__info-box" style={{ borderColor: projectColor, backgroundColor: 'var(--retro-dark)' }}>
          <div className="project-detail__info-titlebar" style={{ backgroundColor: projectColor, color: 'var(--retro-dark)' }}>
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
          {project.github && project.github !== 'Private (NDA)' && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-detail__link-btn" style={{ borderColor: projectColor, backgroundColor: projectColor, color: 'var(--retro-dark)' }}>
              VIEW SOURCE CODE
            </a>
          )}
          {project.demo && project.demo !== 'In Progress' && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-detail__link-btn" style={{ borderColor: projectColor, backgroundColor: projectColor, color: 'var(--retro-dark)' }}>
              LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
