"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const historyData = [
  {
    year: "2020",
    title: "Establishment",
    description:
      "IEEE SB IPB University was officially founded, marking the beginning of a new era for technology enthusiasts at IPB.",
  },
  {
    year: "2021",
    title: "First Milestone",
    description:
      "IEEE SB IPB held its inaugural seminar series, attracting over 300 participants from engineering and computer science faculties.",
  },
  {
    year: "2022",
    title: "Expanding Reach",
    description:
      "The branch launched three new technical chapters and forged partnerships with IEEE SB chapters across Indonesia.",
  },
  {
    year: "2023",
    title: "National Recognition",
    description:
      "IEEE SB IPB received the Outstanding Student Branch Award at the national level, recognizing excellence in technical activities and community impact.",
  },
  {
    year: "2024",
    title: "Innovation Drive",
    description:
      "Launched the annual IEEE IPB Hackathon, fostering innovation and problem-solving among over 500 students nationwide.",
  },
  {
    year: "2025",
    title: "Global Connections",
    description:
      "Established official collaboration with IEEE Region 10 and hosted an international webinar series featuring speakers from 12 countries.",
  },
  {
    year: "2026",
    title: "New Horizons",
    description:
      "IEEE SB IPB embarks on a new chapter of digital transformation, advancing research programs and community-driven tech initiatives across the archipelago.",
  },
];

const COLOR_STOPS = [
  { r: 0x5b, g: 0x9a, b: 0xec },
  { r: 0x81, g: 0x72, b: 0xcb },
  { r: 0x0e, g: 0xa8, b: 0xc0 },
];

function lerpColor(t: number): string {
  let a, b, lt;
  if (t <= 0.5) {
    a = COLOR_STOPS[0];
    b = COLOR_STOPS[1];
    lt = t / 0.5;
  } else {
    a = COLOR_STOPS[1];
    b = COLOR_STOPS[2];
    lt = (t - 0.5) / 0.5;
  }
  const r = Math.round(a.r + (b.r - a.r) * lt);
  const g = Math.round(a.g + (b.g - a.g) * lt);
  const bl = Math.round(a.b + (b.b - a.b) * lt);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

const ITEM_COLORS = historyData.map((_, i) =>
  lerpColor(i / (historyData.length - 1)),
);

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/* ─────────────────────────────────────────────
   LAYOUT
   ViewBox: 560 wide
   Center axis: x = 280
   Badges alternate left (x=148) / right (x=412) except last (center)
   Row height: 130px
───────────────────────────────────────────── */
const VW = 560;
const CX = VW / 2; // 280
const ROW_H = 160;
const BPH = 22; // badge pill half-height
const BPW = 82; // badge pill half-width
const TOP_PAD = 46;

const BADGE_X: number[] = [148, 412, 412, 148, 148, 412, CX]; // badge center x per item
const Rotation: number[] = [-10, 5, 10, -5, -10, 0];
type TextSide = "left" | "right" | "center";
const TEXT_SIDE: TextSide[] = [
  "left",
  "right",
  "right",
  "left",
  "left",
  "right",
  "center",
];

const badgeY = (i: number) => TOP_PAD + ROW_H * Math.floor(i / 2) + BPH;
const SVG_H = TOP_PAD + ROW_H * historyData.length + 60;

/* ─────────────────────────────────────────────
   SNAKE PATH via cardinal spline
───────────────────────────────────────────── */

type Point = {
  x: number;
  y: number;
  tension?: number; // 0 = flat, 1 = very curved
};

const PATH_POINTS: Point[] = [
  { x: 60, y: 45, tension: 0 },
  { x: 250, y: 90, tension: 0.15 },
  { x: 500, y: 70, tension: 0.2 },
  { x: 500, y: 210, tension: 0.2 },
  { x: 60, y: 230, tension: 0.1 },
  { x: 60, y: 370, tension: 0.2 },
  { x: 500, y: 425, tension: 0.5 },
  { x: 250, y: 560, tension: 0 },
];

function buildSnakePath(points: Point[]): string {
  if (points.length < 2) return "";

  const getTension = (p: Point) => p.tension ?? 0.4;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const t1 = getTension(p1);
    const t2 = getTension(p2);

    // direction vectors
    const dx1 = (p2.x - p0.x) * t1;
    const dy1 = (p2.y - p0.y) * t1;

    const dx2 = (p3.x - p1.x) * t2;
    const dy2 = (p3.y - p1.y) * t2;

    const cp1x = p1.x + dx1;
    const cp1y = p1.y + dy1;

    const cp2x = p2.x - dx2;
    const cp2y = p2.y - dy2;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

const SNAKE_PATH = buildSnakePath(PATH_POINTS);

/* ─────────────────────────────────────────────
   TEXT WRAP
───────────────────────────────────────────── */
function wrapText(text: string, charsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length <= charsPerLine) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function OurJourneyPage() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen py-14 px-4 bg-gradient-to-b from-[#dce9f7] via-[#ccd8ef] to-[#bdd0ea]">
      <h1 className="text-center text-6xl font-bold text-slate-700 mb-10 tracking-tight">
        Our Journey
      </h1>

      <div className="w-full px-12 mx-auto select-none">
        <svg
          viewBox={`0 0 ${VW} ${SVG_H}`}
          width="100%"
          className="overflow-visible block mt-48"
        >
          {PATH_POINTS.map((p, i) => (
            <g key={i}>
              {/* <circle cx={p.x} cy={p.y} r={4} fill="red" /> */}
              {/* <text x={p.x + 6} y={p.y - 6} fontSize="10" fill="red">
                {i}
              </text> */}
            </g>
          ))}
          <defs>
            <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B9AEC" />
              <stop offset="48%" stopColor="#8172CB" />
              <stop offset="100%" stopColor="#0EA8C0" />
            </linearGradient>
            {ITEM_COLORS.map((color, i) => {
              const { r, g, b } = hexToRgb(color);
              return (
                <filter
                  key={i}
                  id={`glow${i}`}
                  x="-80%"
                  y="-120%"
                  width="360%"
                  height="440%"
                >
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="5"
                    floodColor={`rgb(${r},${g},${b})`}
                    floodOpacity="0.9"
                  />
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="11"
                    floodColor={`rgb(${r},${g},${b})`}
                    floodOpacity="0.45"
                  />
                </filter>
              );
            })}
          </defs>

          {/* Trail */}
          <path
            d={SNAKE_PATH}
            fill="none"
            stroke="url(#trailGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: shown ? 0.88 : 0,
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Items */}
          {historyData.map((item, i) => {
            const color = ITEM_COLORS[i];
            const bx = BADGE_X[i];
            const by = badgeY(i);
            const side = TEXT_SIDE[i];
            const delay = `${i * 90 + 150}ms`;
            const degree = Rotation[i];

            // Text block positioning
            let tx: number;
            let anchor: "start" | "end" | "middle";
            let maxW: number;
            if (side === "left") {
              tx = bx;
              anchor = "end";
              maxW = tx - 6;
            } else if (side === "right") {
              tx = bx;
              anchor = "start";
              maxW = VW - tx - 6;
            } else {
              tx = CX;
              anchor = "middle";
              maxW = 200;
            }

            const charsPerLine = Math.max(12, Math.floor(maxW / 4.0));
            const descLines = wrapText(item.description, charsPerLine);
            const LINE_H = 13;
            const blockH = 16 + descLines.length * LINE_H;

            // vertical centering of the whole text block around badge center
            let titleY: number;
            if (side === "center") {
              titleY = by + BPH + 16;
            } else {
              titleY = by - 100;
            }

            return (
              <g
                key={item.year}
                style={{
                  opacity: shown ? 1 : 0,
                  transition: `opacity 0.5s ease ${delay}`,
                }}
              >
                {/* Badge */}
                <rect
                  x={bx - BPW / 2}
                  y={by - BPH}
                  width={BPW}
                  height={BPH * 1.7}
                  rx={BPH / 2}
                  transform={`rotate(${degree} ${bx} ${by})`}
                  fill={color}
                  filter={`url(#glow${i})`}
                />
                <text
                  x={bx}
                  y={by - 5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#0A1A2F"
                  fontWeight="700"
                  fontSize="32"
                  transform={`rotate(${degree} ${bx} ${by})`}
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {item.year}
                </text>

                {/* Title */}
                <text
                  x={tx}
                  y={titleY}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  fill={color}
                  fontWeight="700"
                  fontSize="11"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  {item.title}
                </text>

                {/* Description lines */}
                {descLines.map((line, li) => (
                  <text
                    key={li}
                    x={tx}
                    y={titleY + 14 + li * LINE_H}
                    textAnchor="middle"
                    dominantBaseline="auto"
                    fill="#475569"
                    fontSize="10"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </main>
  );
}
