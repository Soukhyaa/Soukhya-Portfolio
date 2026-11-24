import React from 'react';
import PearlButton from '../common/PearlButton';

const FEATURES = [
  {
    title: 'Interactive Camera Capture',
    desc: 'Live webcam stream with real-time curtain draw and shutter countdown'
  },
  {
    title: 'Still Photos & Live Photos',
    desc: 'Capture still photos with a short accompanying motion clip'
  },
  {
    title: 'Customizable Photo Strips',
    desc: 'Curated film filters (Soft B&W, Golden Hour) with custom borders'
  },
  {
    title: 'Create a Strip Studio',
    desc: 'Custom photo layout studio to arrange and compose personalized prints'
  },
  {
    title: 'Pose Inspiration Library',
    desc: 'Curated creative pose guides to inspire memorable booth shots'
  },
  {
    title: 'Save to My Memories',
    desc: 'Persistent PostgreSQL storage preserving memories for seven days'
  }
];

const TECH_STACK = [
  'React 19',
  'Vite',
  'JavaScript',
  'FastAPI',
  'Python',
  'SQLAlchemy',
  'Neon PostgreSQL',
  'Canvas API',
  'Vercel / Render'
];

export default function Projects() {
  return (
    <section id="projects" className="projects-editorial-section">
      {/* SECTION HEADER */}
      <div className="projects-header">
        <div className="projects-title-group">
          <span className="projects-section-tag">Featured Work</span>
          <h2 className="projects-heading">Selected Project</h2>
        </div>
        <p className="projects-subheading">
          Full-stack interactive web application blending analog nostalgia with modern web engineering.
        </p>
      </div>

      {/* FLAGSHIP PROJECT CARD */}
      <div className="project-card">
        {/* LEFT / TOP: AUTHENTIC SCREENSHOT SHOWCASE */}
        <div className="project-visual-col">
          <div className="browser-mockup">
            <div className="browser-mockup-header">
              <div className="browser-dots">
                <span className="dot dot-close"></span>
                <span className="dot dot-minimize"></span>
                <span className="dot dot-maximize"></span>
              </div>
              <div className="browser-address-bar">
                <span className="address-lock">🔒</span>
                <span className="address-text">photobooth-bay-psi.vercel.app</span>
              </div>
              <span className="browser-badge">✧ Live Booth</span>
            </div>
            <div className="browser-viewport">
              <img
                src="/vintage-booth-preview.png"
                alt="Vintage Booth - Interactive Photo Booth Application"
                className="project-screenshot-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM: PROJECT DETAILS */}
        <div className="project-content-col">
          <div className="project-eyebrow-row">
            <span className="project-category-badge">✧ Interactive Full-Stack Application</span>
            <span className="project-status-pill">
              <span className="status-indicator-dot"></span>
              Deployed
            </span>
          </div>

          <h3 className="project-title">Vintage Booth</h3>

          <p className="project-description">
            A retro-styled photo booth experience bringing analog photo booth magic directly to the browser.
            Step behind the velvet curtain to capture candid moments, craft timeless 4-shot photo strips,
            and preserve your keepsakes with 7-day memory storage.
          </p>

          {/* KEY FEATURES GRID */}
          <div className="project-features-block">
            <h4 className="features-label">Key Highlights</h4>
            <div className="features-grid">
              {FEATURES.map((item, idx) => (
                <div className="feature-item" key={idx}>
                  <span className="feature-bullet">✧</span>
                  <div className="feature-text">
                    <strong className="feature-title">{item.title}</strong>
                    <span className="feature-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TECH STACK PILLS */}
          <div className="project-tech-block">
            <h4 className="tech-label">Built With</h4>
            <div className="tech-tags-wrap">
              {TECH_STACK.map((tech) => (
                <span className="tech-pill" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="project-actions">
            <PearlButton
              href="https://photobooth-bay-psi.vercel.app/"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LIVE DEMO
            </PearlButton>
            <PearlButton
              href="https://github.com/Soukhyaa/Photobooth"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB REPO
            </PearlButton>
          </div>
        </div>
      </div>
    </section>
  );
}
