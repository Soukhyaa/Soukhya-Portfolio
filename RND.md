# R&D File — Portfolio Website

**Author:** Soukhya Wale
**Purpose:** Documents the design & development process, decisions, and tokens used to build the portfolio.

---

## 1. Brief

Build a single-page personal portfolio for a B.Tech 3rd year AI & Data Science student, using:
- Name: Soukhya Wale
- Email: wsoukhya@gmail.com
- GitHub: https://github.com/Soukhyaa
- Skills: HTML, CSS, JavaScript, React, Python

## 2. Design plan (token system)

**Color palette**
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0d1013` | Page background (near-black, not pure black) |
| `--bg-raised` | `#14181d` | Cards / raised surfaces |
| `--border` | `#232a31` | Hairline borders/dividers |
| `--text` | `#e9e7e1` | Primary text (warm off-white) |
| `--text-dim` | `#8b95a1` | Secondary/muted text |
| `--accent` | `#5eead4` | Teal accent — nods to "data"/terminal aesthetic |
| `--accent-dim` | `#2c5f57` | Muted accent for icon backgrounds |

**Typography**
- Display: `Space Grotesk` — geometric, technical, used for headings.
- Body: `Inter` — neutral, readable, used for paragraph text.
- Utility/mono: `JetBrains Mono` — used for nav, labels, and the terminal animation, reinforcing the "developer" identity.

**Layout concept**
```
[ nav: logo -------------------- about / skills / contact ]
[ hero: eyebrow status dot                                ]
[       big name + role headline                          ]
[       animated terminal line (typing effect)            ]
[       [Get in touch] [View GitHub ↗]                    ]
[ about: two-column — bio paragraph | quick facts table   ]
[ skills: responsive card grid, one card per skill        ]
[ contact: single card, email row + github row            ]
[ footer: copyright, mono                                 ]
```

**Signature element**
A typing-terminal line under the hero headline (`> AI & Data Science student_`) that cycles through identity statements — a small, restrained animation that reflects both the "AI/Data" and "developer" sides of the brief without being decorative for its own sake.

## 3. Why this direction (self-critique)

- Avoided the common AI-portfolio defaults: no cream/serif/terracotta combo, no generic neon-on-black without a point of view, no numbered-marker sections (there's no real sequence to number here).
- Kept animation to exactly one moment (the terminal typing effect) rather than scattering hover/scroll effects everywhere — restraint over maximalism, since the content itself is still light (no project case studies yet).
- Mobile responsiveness: single-column grid collapses below 640px; skill cards wrap via `auto-fill`; all font sizes use `clamp()` for fluid scaling.
- Contact info (email + GitHub) is placed in a clearly separated, high-contrast card since that's the single most important action a visitor can take.

## 4. Build notes

- Built as a single self-contained `index.html` (HTML + CSS + JS in one file) for easy hosting on GitHub Pages, Netlify, or Vercel with zero build step.
- No external JS libraries — the typing effect is ~20 lines of vanilla JS.
- Google Fonts loaded via `<link>` for Space Grotesk, Inter, and JetBrains Mono.

## 5. Open items for future iteration

- [ ] Add real project cards once available (screenshot + tech tags + GitHub/live links).
- [ ] Add a resume PDF download link.
- [ ] Consider light/dark mode toggle if the palette is revisited.
- [ ] Add subtle scroll-reveal for section entrances once content grows.

---
*Companion to `RESEARCH.md` (background research) and `README.md` (usage instructions).*
