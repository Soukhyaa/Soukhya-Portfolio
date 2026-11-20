import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../hero/Hero';
import About from '../about/About';

gsap.registerPlugin(ScrollTrigger);

// 5-Pointed Star centered at (0, 0)
// Derived directly from the existing star polygon points in Hero.jsx:
// 50,4 63,35 96,35 69,56 80,88 50,68 20,88 31,56 4,35 37,35
// Centroid is at (50, 50).
const STAR_POINTS_CENTERED = [
  [0, -46],
  [13, -15],
  [46, -15],
  [19, 6],
  [30, 38],
  [0, 18],
  [-30, 38],
  [-19, 6],
  [-46, -15],
  [-13, -15]
];

// Exact rotation angle matching .hero-star-overlay { transform: rotate(-8deg); }
const STAR_ROTATION_DEG = -8;

function getStarVertices(cx, cy, scale) {
  const rad = (STAR_ROTATION_DEG * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return STAR_POINTS_CENTERED.map(([x, y]) => {
    const rx = (x * cos - y * sin) * scale;
    const ry = (x * sin + y * cos) * scale;
    return [cx + rx, cy + ry];
  });
}

function verticesToClipPolygon(vertices) {
  return 'polygon(' + vertices.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(', ') + ')';
}

function verticesToSvgPoints(vertices) {
  return vertices.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

export default function StarPortal() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const heroLayerRef = useRef(null);
  const revealedLayerRef = useRef(null);
  const rimSvgRef = useRef(null);
  const rimPolyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroEl = heroLayerRef.current;
      const revealedEl = revealedLayerRef.current;
      const rimSvg = rimSvgRef.current;
      const rimPoly = rimPolyRef.current;

      if (!heroEl || !revealedEl) return;

      const starEl = heroEl.querySelector('.hero-star-overlay');
      if (!starEl) return;

      function calculateGeometry() {
        const starRect = starEl.getBoundingClientRect();
        const heroRect = heroEl.getBoundingClientRect();

        // Exact pixel center of the portrait star in viewport coordinates
        const cx = (starRect.left - heroRect.left) + starRect.width / 2;
        const cy = (starRect.top - heroRect.top) + starRect.height / 2;

        // In 100x100 viewBox, tip-to-tip width is 92 units (-46 to +46).
        // Initial scale s0 gives the exact rendered size of the star beside portrait:
        const s0 = starRect.width / 92;

        // Distance from star center to all 4 corners of the viewport
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const d1 = Math.hypot(cx - 0, cy - 0);
        const d2 = Math.hypot(cx - vw, cy - 0);
        const d3 = Math.hypot(cx - 0, cy - vh);
        const d4 = Math.hypot(cx - vw, cy - vh);
        const dMax = Math.max(d1, d2, d3, d4);

        // Minimum inner vertex radius in centered units is 18 (from 0,0 to 0,18).
        // For the aperture to completely clear all screen corners:
        // sMax * 18 > dMax => sMax = (dMax / 18) * 1.35
        const sMax = (dMax / 18) * 1.35;

        return { cx, cy, s0, sMax };
      }

      const geom = calculateGeometry();
      if (!geom) return;

      // 1. Initial State before scroll (scroll position 0):
      // Hero layer is 100% visible, star on portrait is solid #F6E7E2
      // Revealed About layer is completely hidden
      revealedEl.style.opacity = '0';
      revealedEl.style.clipPath = 'polygon(0px 0px)';
      revealedEl.style.pointerEvents = 'none';
      if (rimSvg) rimSvg.style.opacity = '0';
      starEl.style.opacity = '1';

      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        revealedEl.style.clipPath = 'none';
        gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=60%',
            pin: true,
            scrub: true
          }
        }).to(revealedEl, { opacity: 1, ease: 'none' });
        return;
      }

      // 2. Normal mode: Scroll-Controlled Star Portal Scrub
      // Refined parameters for effortless, fluid, low-friction scrolling
      const progressProxy = { progress: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=70%', // Refined from +=130% down to +=70%: nearly 50% less scroll required
          pin: true,
          pinSpacing: true,
          scrub: 0.35, // Responsive 350ms scrub: tight, fluid tracking with zero lag
          anticipatePin: 1,
          onRefresh: () => {
            const refreshed = calculateGeometry();
            if (refreshed) {
              geom.cx = refreshed.cx;
              geom.cy = refreshed.cy;
              geom.s0 = refreshed.s0;
              geom.sMax = refreshed.sMax;
            }
          }
        }
      });

      tl.to(progressProxy, {
        progress: 1,
        ease: 'none', // Direct linear mapping: zero dead-zone, perfectly predictable progression
        onUpdate: () => {
          const p = progressProxy.progress;

          if (p <= 0.001) {
            // Absolute rest state at top (scroll 0):
            // Hero is 100% visible, star on portrait is solid, About is hidden
            revealedEl.style.opacity = '0';
            revealedEl.style.clipPath = 'polygon(0px 0px)';
            revealedEl.style.pointerEvents = 'none';
            if (rimSvg) rimSvg.style.opacity = '0';
            starEl.style.opacity = '1';
            return;
          }

          // Active aperture expansion:
          revealedEl.style.opacity = '1';

          if (p >= 0.98) {
            // Once fully open, remove clip-path for seamless handoff to standard document scrolling
            revealedEl.style.clipPath = 'none';
            revealedEl.style.pointerEvents = 'auto';
            if (rimSvg) rimSvg.style.opacity = '0';
            starEl.style.opacity = '0';
            return;
          }

          // Natural expansion curve: responds immediately to scroll with smooth acceleration
          const scale = geom.s0 + Math.pow(p, 1.12) * (geom.sMax - geom.s0);

          // Calculate current 5-pointed star vertices
          const vertices = getStarVertices(geom.cx, geom.cy, scale);
          const clipPolyStr = verticesToClipPolygon(vertices);
          const svgPointsStr = verticesToSvgPoints(vertices);

          // Update CSS clip-path aperture on the revealed About layer
          revealedEl.style.clipPath = clipPolyStr;

          // Update expanding star rim polygon
          if (rimPoly) {
            rimPoly.setAttribute('points', svgPointsStr);
          }

          // Dissolve portrait star fill into opening aperture over first 10% of scroll
          const fillOpacity = Math.max(0, 1 - p / 0.10);
          starEl.style.opacity = fillOpacity.toString();

          // Star rim outline: enters smoothly at start, stays luminous, fades out as points clear screen
          if (rimSvg) {
            let rimAlpha = 1;
            if (p < 0.05) {
              rimAlpha = p / 0.05;
            } else if (p > 0.85) {
              rimAlpha = Math.max(0, (1 - p) / 0.15);
            }
            rimSvg.style.opacity = rimAlpha.toString();
          }

          // Enable pointer interactions once portal is mostly open
          revealedEl.style.pointerEvents = p > 0.80 ? 'auto' : 'none';
        }
      });

      // Subtle camera push on Hero as you enter through the star
      tl.to(heroEl, {
        scale: 1.03,
        ease: 'none'
      }, 0);

      // Underlay emergence: About section settles into crisp focus
      const aboutSectionEl = revealedEl.querySelector('.about-editorial-section');
      if (aboutSectionEl) {
        tl.fromTo(aboutSectionEl,
          { scale: 0.96, opacity: 0.90 },
          { scale: 1.0, opacity: 1.0, ease: 'power1.out' },
          0
        );
      }

      // Window resize / load listener for dynamic recalculation
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);
      window.addEventListener('load', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('load', handleResize);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="star-portal-container">
      {/* PINNED STAGE VIEWPORT (100VH / 100DVH) */}
      <div ref={stageRef} className="star-portal-stage">

        {/* LAYER 1 (BASE): The complete original Hero (ALWAYS 100% VISIBLE ON LOAD) */}
        <div ref={heroLayerRef} className="portal-hero-layer">
          <Hero />
        </div>

        {/* LAYER 2 (PORTAL APERTURE): The actual About section revealed inside the expanding star */}
        <div ref={revealedLayerRef} className="portal-revealed-layer">
          <About />
        </div>

        {/* LAYER 3 (RIM): Expanding 5-Pointed Star Vector Outline (Dusty Rose Rim) */}
        <svg ref={rimSvgRef} className="portal-star-rim" aria-hidden="true">
          <polygon
            ref={rimPolyRef}
            className="portal-rim-poly"
            points="0,0"
          />
        </svg>

      </div>
    </div>
  );
}
