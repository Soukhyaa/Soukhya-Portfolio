import React from 'react';
import PearlButton from '../common/PearlButton';

export default function Hero() {
  return (
    <section className="hero-editorial-section">
      {/* TOP-RIGHT HALFTONE DOT PATTERN */}
      <div className="halftone-top-right"></div>

      {/* MAIN HERO GRID */}
      <div className="hero-editorial-container">

        {/* ═══ LEFT: PORTRAIT + POLYGON BACKDROP + STAR ═══ */}
        <div className="hero-portrait-col">

          {/* Soft Organic Blush Contour Backdrop Shape */}
          <svg
            className="portrait-polygon-backdrop"
            viewBox="0 0 450 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 45 L280 18 L360 95 L405 235 L385 455 L245 530 L90 490 L50 285 L60 140 Z"
              fill="#ECC2BC"
              fillOpacity="0.38"
            />
          </svg>

          {/* Existing Cutout Portrait (Fully Colored) */}
          <img
            src="/portrait.png"
            alt="Soukhya Wale cutout portrait"
            className="hero-portrait-img"
          />

          {/* 5-Point Star Overlay (Overlapping portrait) */}
          <div className="hero-star-overlay">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="50,4 63,35 96,35 69,56 80,88 50,68 20,88 31,56 4,35 37,35"
                fill="#F6E7E2"
                stroke="#AB6968"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

        </div>

        {/* ═══ RIGHT: TYPOGRAPHY STACK ═══ */}
        <div className="hero-text-col">

          {/* 'hi, i'm' Tilted Dusty Rose Tag */}
          <div className="tag-hi-im">Hii, I'm</div>

          {/* Headline Stack: SOUKHYA WALE */}
          <h1 className="hero-name-heading">
            <span className="name-soukhya">SOUKHYA</span>
            <span className="name-wale">WALE</span>
          </h1>

          {/* Action Buttons (21st.dev Pearl Button System) */}
          <div className="hero-action-buttons">
            <PearlButton href="#about" variant="primary">
              VIEW PROJECTS
            </PearlButton>
            <PearlButton href="#contact" variant="secondary">
              CONTACT ME
            </PearlButton>
          </div>

        </div>

      </div>
    </section>
  );
}
