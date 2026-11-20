import React, { useState, useEffect, useRef, useMemo } from 'react';
import PearlButton from '../common/PearlButton';

const USERNAME = 'Soukhyaa';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS_TO_SHOW = [
  { day: 1, label: 'Mon' },
  { day: 3, label: 'Wed' },
  { day: 5, label: 'Fri' }
];

export default function GitHubActivity() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [totalCount, setTotalCount] = useState('--');
  const [contributions, setContributions] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', top: 0, left: 0 });

  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubContributions() {
      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        const data = await response.json();

        if (!data || !data.contributions || !Array.isArray(data.contributions)) {
          throw new Error('Invalid data structure');
        }

        if (!isMounted) return;

        // Calculate total count
        let total = 0;
        if (data.total && typeof data.total.lastYear === 'number') {
          total = data.total.lastYear;
        } else {
          total = data.contributions.reduce((sum, item) => sum + (item.count || 0), 0);
        }

        setTotalCount(total.toLocaleString());
        setContributions(data.contributions);
        setStatus('success');
      } catch (err) {
        console.warn('Could not load GitHub contributions dynamically:', err);
        if (isMounted) {
          setStatus('error');
          setTotalCount('Active');
        }
      }
    }

    fetchGitHubContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute weeks & dimensions
  const calendarData = useMemo(() => {
    if (!contributions || contributions.length === 0) return null;

    const weeks = [];
    let currentWeek = [];

    contributions.forEach((day, index) => {
      const parts = day.date.split('-');
      const d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
      const dayOfWeek = d.getUTCDay();

      if (index === 0 && dayOfWeek > 0) {
        for (let p = 0; p < dayOfWeek; p++) {
          currentWeek.push(null);
        }
      }

      currentWeek.push({
        date: day.date,
        count: day.count || 0,
        level: day.level || 0,
        utcDate: d
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    const cellSize = 11;
    const cellGap = 3.5;
    const leftOffset = 30;
    const topOffset = 22;

    const totalWidth = leftOffset + weeks.length * (cellSize + cellGap);
    const totalHeight = topOffset + 7 * (cellSize + cellGap) + 4;

    // Month headers
    let lastMonth = -1;
    const monthHeaders = [];
    weeks.forEach((week, wIdx) => {
      const firstValid = week.find((item) => item !== null);
      if (firstValid) {
        const m = firstValid.utcDate.getUTCMonth();
        if (m !== lastMonth) {
          monthHeaders.push({
            x: leftOffset + wIdx * (cellSize + cellGap),
            y: 12,
            text: MONTH_NAMES[m]
          });
          lastMonth = m;
        }
      }
    });

    return {
      weeks,
      cellSize,
      cellGap,
      leftOffset,
      topOffset,
      totalWidth,
      totalHeight,
      monthHeaders
    };
  }, [contributions]);

  const handleCellMouseEnter = (e, day) => {
    if (!scrollRef.current) return;
    const parts = day.date.split('-');
    const countStr =
      day.count === 0
        ? 'No contributions'
        : day.count === 1
        ? '1 contribution'
        : `${day.count} contributions`;
    const monthStr = MONTH_NAMES[+parts[1] - 1];
    const formatted = `${countStr} on ${monthStr} ${+parts[2]}, ${parts[0]}`;

    const rectBounds = e.currentTarget.getBoundingClientRect();
    const scrollBounds = scrollRef.current.getBoundingClientRect();

    const topPos = rectBounds.top - scrollBounds.top + scrollRef.current.scrollTop;
    const leftPos = rectBounds.left - scrollBounds.left + scrollRef.current.scrollLeft + 5.5; // cellSize / 2

    setTooltip({
      visible: true,
      text: formatted,
      top: topPos,
      left: leftPos
    });
  };

  const handleCellMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section id="github" className="github-activity-section">
      <div className="github-card">
        <div className="github-card-header">
          <div className="github-title-group">
            <span className="github-section-tag">Open Source</span>
            <h2 className="github-heading">GitHub Activity</h2>
          </div>
          <div className="github-stat-pill">
            <span className="github-stat-number" id="github-total-count">
              {totalCount}
            </span>
            <span className="github-stat-desc">Contributions in the last year</span>
          </div>
        </div>

        {/* CALENDAR WRAPPER */}
        <div className="github-calendar-wrap">
          <div className="github-calendar-scroll" id="github-calendar-scroll" ref={scrollRef}>
            {status === 'loading' && (
              <div id="github-calendar-loading" className="github-calendar-state">
                <span className="github-loading-spinner"></span>
                <span>Loading contribution activity...</span>
              </div>
            )}

            {status === 'error' && (
              <div id="github-calendar-error" className="github-calendar-state">
                <p>Unable to load live contribution activity right now.</p>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-error-link"
                >
                  View contributions on GitHub ↗
                </a>
              </div>
            )}

            {status === 'success' && calendarData && (
              <div id="github-calendar-graph" className="github-calendar-graph">
                <svg
                  viewBox={`0 0 ${calendarData.totalWidth} ${calendarData.totalHeight}`}
                  className="github-calendar-svg"
                  role="img"
                  aria-label={`GitHub Contribution Calendar for ${USERNAME}`}
                >
                  {/* Month labels */}
                  {calendarData.monthHeaders.map((m, idx) => (
                    <text
                      key={`month-${idx}`}
                      x={m.x}
                      y={m.y}
                      className="gh-cal-month-text"
                    >
                      {m.text}
                    </text>
                  ))}

                  {/* Day labels (Mon, Wed, Fri) */}
                  {DAYS_TO_SHOW.map((item) => (
                    <text
                      key={`day-${item.day}`}
                      x="2"
                      y={calendarData.topOffset + item.day * (calendarData.cellSize + calendarData.cellGap) + calendarData.cellSize - 2}
                      className="gh-cal-day-text"
                    >
                      {item.label}
                    </text>
                  ))}

                  {/* Week cells */}
                  {calendarData.weeks.map((week, wIdx) => {
                    const colX = calendarData.leftOffset + wIdx * (calendarData.cellSize + calendarData.cellGap);

                    return (
                      <g key={`week-${wIdx}`}>
                        {week.map((day, dIdx) => {
                          if (!day) return null;
                          const rowY = calendarData.topOffset + dIdx * (calendarData.cellSize + calendarData.cellGap);
                          const levelClass = `level-${Math.min(Math.max(day.level, 0), 4)}`;

                          return (
                            <rect
                              key={`cell-${day.date}`}
                              x={colX}
                              y={rowY}
                              width={calendarData.cellSize}
                              height={calendarData.cellSize}
                              rx="2.5"
                              ry="2.5"
                              className={`gh-cal-cell ${levelClass}`}
                              data-date={day.date}
                              data-count={day.count}
                              onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                              onMouseLeave={handleCellMouseLeave}
                            />
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Tooltip */}
            <div
              id="github-tooltip"
              className="github-tooltip"
              style={{
                display: tooltip.visible ? 'block' : 'none',
                top: `${tooltip.top}px`,
                left: `${tooltip.left}px`
              }}
            >
              {tooltip.text}
            </div>
          </div>
        </div>

        <div className="github-card-footer">
          {/* Legend: Less -> More */}
          <div className="github-legend">
            <span>Less</span>
            <span className="legend-cell level-0"></span>
            <span className="legend-cell level-1"></span>
            <span className="legend-cell level-2"></span>
            <span className="legend-cell level-3"></span>
            <span className="legend-cell level-4"></span>
            <span>More</span>
          </div>

          {/* View GitHub Profile Button */}
          <PearlButton
            href={`https://github.com/${USERNAME}`}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW GITHUB PROFILE
          </PearlButton>
        </div>
      </div>
    </section>
  );
}
