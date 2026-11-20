import React from 'react';
import PearlButton from '../common/PearlButton';

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-cta">
        <div className="contact-cta-content">
          <h2>Let's talk.</h2>
          <p className="contact-description">
            If you think we could create something cool together, let's talk.
          </p>

          <div className="contact-action-buttons">
            <PearlButton href="mailto:wsoukhya@gmail.com" variant="primary">
              EMAIL
            </PearlButton>
            <PearlButton
              href="https://www.linkedin.com/in/soukhya-w-6a79b1345/"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </PearlButton>
            <PearlButton
              href="https://github.com/Soukhyaa"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </PearlButton>
          </div>
        </div>
      </div>
    </section>
  );
}
