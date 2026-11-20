import React from 'react';
import PearlButton from '../common/PearlButton';

export default function Resume() {
  return (
    <section id="resume" className="resume-section">
      <div className="resume-container">
        <h2 className="resume-title">Resume</h2>
        <div className="resume-divider"></div>
        <PearlButton
          href="mailto:wsoukhya@gmail.com?subject=Resume%20Request"
          variant="primary"
          className="resume-btn"
        >
          REQUEST RESUME
        </PearlButton>
      </div>
    </section>
  );
}
