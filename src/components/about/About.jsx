import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-editorial-section">
      <div className="about-frame">

        {/* LEFT: Tilted Editorial Headline with Grainy Pink Highlighter Strokes */}
        <div className="about-left-col">
          <div className="about-title-tilted">

            {/* ABOUT */}
            <div className="about-word-wrap word-about-wrap">
              <svg className="highlighter-svg stroke-about-svg" viewBox="0 0 540 95" preserveAspectRatio="none">
                <path
                  d="M 12 24 C 90 14, 250 24, 520 12 C 532 30, 528 58, 508 76 C 360 82, 180 72, 18 78 C 4 58, 6 38, 12 24 Z"
                  fill="var(--bg-blush)"
                  opacity="0.95"
                  filter="url(#grainy-highlighter-filter)"
                />
              </svg>
              <span className="about-title-text">ABOUT</span>
            </div>

            {/* ME */}
            <div className="about-word-wrap word-me-wrap">
              <svg className="highlighter-svg stroke-me-svg" viewBox="0 0 340 95" preserveAspectRatio="none">
                <path
                  d="M 10 22 C 85 14, 210 22, 322 14 C 334 32, 328 58, 308 74 C 210 80, 100 70, 15 74 C 4 56, 5 36, 10 22 Z"
                  fill="var(--bg-blush)"
                  opacity="0.95"
                  filter="url(#grainy-highlighter-filter)"
                />
              </svg>
              <span className="about-title-text">ME</span>
            </div>

          </div>
        </div>

        {/* RIGHT: Editorial Paragraph Sitting Freely on Background */}
        <div className="about-right-col">
          <p className="about-description-para">
            I’m an AI &amp; Data Science student, an aspiring{' '}
            <span className="highlight-pink">full-stack developer</span>, and a tech
            enthusiast with a creative approach to problem-solving. I love turning
            ideas and <span className="highlight-pink">imagination</span> into experiences
            that people can see, explore, and interact with.
          </p>
          <p className="about-description-para">
            Drawn to the space where <span className="highlight-pink">technology</span> meets{' '}
            <span className="highlight-pink">creativity</span>, I enjoy experimenting
            with <span className="highlight-pink">design</span>, building playful interactions,
            and finding unconventional ways to bring ideas to life. I believe technology
            can be more than just functional — it can have character, spark curiosity, and
            make even the simplest interactions memorable. After all, I don't just want to
            build things that work; I want to build things that make people{' '}
            <span className="highlight-pink">feel something</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
