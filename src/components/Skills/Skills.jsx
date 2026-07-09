import React, { useState } from 'react';
import { 
  SiC, SiCplusplus, SiPython, SiJavascript, SiHtml5, SiMarkdown, SiLatex, SiGnubash,
  SiReact, SiNextdotjs, SiVite, SiBootstrap, SiEjs, SiChartdotjs, SiStreamlit,
  SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiFlask, SiJsonwebtokens, SiNginx, SiGunicorn,
  SiPostgresql, SiMysql, SiMongodb, SiSqlite, SiRedis, SiSupabase, SiGooglecloud, SiVercel, SiNetlify, SiRender
} from "react-icons/si";
import { FaCss3, FaAws } from "react-icons/fa";
import { VscTerminalPowershell } from "react-icons/vsc";
import portfolioData from '../../data/portfolio_data.json';
import './Skills.css';

const iconMap = {
  "C": <SiC />,
  "C++": <SiCplusplus />,
  "Python": <SiPython />,
  "JavaScript": <SiJavascript />,
  "HTML5": <SiHtml5 />,
  "CSS3": <FaCss3 />,
  "Markdown": <SiMarkdown />,
  "LaTeX": <SiLatex />,
  "Bash": <SiGnubash />,
  "PowerShell": <VscTerminalPowershell />,
  "React": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Vite": <SiVite />,
  "Bootstrap": <SiBootstrap />,
  "EJS": <SiEjs />,
  "Chart.js": <SiChartdotjs />,
  "Streamlit": <SiStreamlit />,
  "Node.js": <SiNodedotjs />,
  "Express.js": <SiExpress />,
  "Django": <SiDjango />,
  "Django REST": <SiDjango />,
  "FastAPI": <SiFastapi />,
  "Flask": <SiFlask />,
  "JWT": <SiJsonwebtokens />,
  "Nginx": <SiNginx />,
  "Gunicorn": <SiGunicorn />,
  "PostgreSQL": <SiPostgresql />,
  "MySQL": <SiMysql />,
  "MongoDB": <SiMongodb />,
  "SQLite": <SiSqlite />,
  "Redis": <SiRedis />,
  "Supabase": <SiSupabase />,
  "AWS": <FaAws />,
  "Google Cloud": <SiGooglecloud />,
  "Vercel": <SiVercel />,
  "Netlify": <SiNetlify />,
  "Render": <SiRender />
};

const Skills = () => {
  const skillsData = portfolioData.skills;
  const categories = Object.keys(skillsData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const currentSkills = skillsData[activeCategory];
  const totalSlots = Math.max(12, Math.ceil(currentSkills.length / 4) * 4);
  const emptySlotsCount = totalSlots - currentSkills.length;

  return (
    <section className="retro-skills">
      <div className="retro-inventory">
        
        <div className="retro-inventory__header">
          <span className="retro-inventory__title">INVENTORY</span>
        </div>

        <div className="retro-inventory__layout">
          
          <div className="retro-inventory__sidebar">
            <div className="retro-inventory__level-box">
              <div className="level-hexagon">99</div>
              <div className="level-bars">
                <div className="hp-bar"></div>
                <div className="xp-bar"></div>
              </div>
            </div>

            <div className="retro-inventory__tabs">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className={`retro-inventory__tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="retro-inventory__content">
            <div className="retro-inventory__grid">
              
              {currentSkills.map((skill, index) => (
                <div key={index} className="retro-inventory__slot has-item">
                  <div className="slot-content">
                    <div className="slot-icon">{iconMap[skill]}</div>
                    <span className="slot-text">{skill}</span>
                  </div>
                </div>
              ))}

              {Array.from({ length: emptySlotsCount }).map((_, index) => (
                <div key={`empty-${index}`} className="retro-inventory__slot empty-slot"></div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
