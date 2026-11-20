import React from 'react';

export default function SvgFilters() {
  return (
    <>
      {/* SVG PAPER GRAIN OVERLAY */}
      <div className="paper-grain-overlay"></div>

      {/* SVG DEFINITIONS FOR GRAINY HIGHLIGHTER BRUSH STROKE */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none', width: 0, height: 0 }}
      >
        <defs>
          <filter
            id="grainy-highlighter-filter"
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
            filterUnits="objectBoundingBox"
          >
            {/* 1. Dry brush hair edge distortion */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.16"
              numOctaves="4"
              result="edgeTurbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="edgeTurbulence"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedStroke"
            />

            {/* 2. High-density fine grain noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.92"
              numOctaves="4"
              result="speckleGrain"
            />

            {/* 3. Tint the speckle noise with dusty rose particles & bright highlights */}
            <feColorMatrix
              type="matrix"
              values="
                0.55 0    0    0   0.45
                0.15 0.38 0    0   0.30
                0.12 0.12 0.28 0   0.32
                0    0    0    0.7 0"
              in="speckleGrain"
              result="tintedNoise"
            />

            {/* 4. Clip grain to the displaced brush stroke boundary */}
            <feComposite
              in="tintedNoise"
              in2="displacedStroke"
              operator="in"
              result="clippedGrain"
            />

            {/* 5. Arithmetic blend fine grain over displaced shape for dry-marker pigment feel */}
            <feComposite
              in="displacedStroke"
              in2="clippedGrain"
              operator="arithmetic"
              k1="0.55"
              k2="0.8"
              k3="0.35"
              k4="0"
              result="highlighterOutput"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
