"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * BinaryPortrait — a "terminal video" portrait.
 *
 * The photo is rendered as a living field of 0s and 1s on a <canvas>:
 *   1. Boot:   random binary noise that resolves into the photo (decode effect)
 *   2. Live:   shimmer driven by the photo's luminance + a traveling scanline
 *   3. Loop:   a frame-by-frame ASCII thumbs-up animation pops in periodically
 *   4. Hover:  the real photo crossfades in (binary → image)
 *
 * Performance: the photo is decoded ONCE into a luminance grid; every frame
 * only reads typed arrays and draws text — no per-frame image reads. The loop
 * pauses when the component is offscreen or the tab is hidden, and it renders
 * a single static frame under prefers-reduced-motion (hover reveal still works).
 * Visual design is theme-driven: all glyphs use the theme's --primary-rgb.
 */

const CELL = 8; // px per character cell (canvas units)
const MAX_COLS = 72;
const FONT_STACK = "ui-monospace, 'Fira Code', 'Cascadia Mono', monospace";

interface Props {
  src: string;
  alt?: string;
  /** CSS width in px; the canvas height follows the photo's aspect ratio */
  width?: number;
  className?: string;
}

interface PortraitState {
  grid: Uint8Array | null; // contrast-normalized luminance 0..255 per cell
  photo: HTMLCanvasElement | null; // full-color copy for the hover reveal
  cols: number;
  rows: number;
  dpr: number;
  reveal: number; // 0..1 decode progress
  hover: number; // 0..1 photo crossfade progress
  hoverTarget: 0 | 1;
  inView: boolean;
  running: boolean;
  raf: number;
  thumbFrame: number; // -1 = not playing
  thumbStart: number;
  nextThumbAt: number;
  reduced: boolean;
}

function freshState(): PortraitState {
  return {
    grid: null,
    photo: null,
    cols: 0,
    rows: 0,
    dpr: 1,
    reveal: 0,
    hover: 0,
    hoverTarget: 0,
    inView: true, // default ON so hidden/never-observed environments still render
    running: false,
    raf: 0,
    thumbFrame: -1,
    thumbStart: 0,
    nextThumbAt: 0,
    reduced: false,
  };
}

const THUMB_FRAME_MS = 240;
const THUMB_FRAME_COUNT = 4;

export function BinaryPortrait({ src, alt = "Wahab Sohail", width = 360, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<PortraitState>(freshState());

  /* ── Tick scheduler: drives the animation only while visible ── */
  const tickRef = useRef<((now: number, dt: number) => void) | null>(null);

  const setRunning = useCallback((on: boolean) => {
    const st = stRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (on && !st.running && st.grid) {
      st.running = true;
      let last = performance.now();
      const loop = (now: number) => {
        if (!st.running) return;
        const dt = Math.min(64, now - last);
        last = now;
        tickRef.current?.(now, dt);
        st.raf = requestAnimationFrame(loop);
      };
      st.raf = requestAnimationFrame(loop);
    } else if (!on && st.running) {
      st.running = false;
      cancelAnimationFrame(st.raf);
      // paint one clean final frame so the canvas never freezes mid-flicker
      if (!st.reduced) tickRef.current?.(performance.now(), 0);
    }
  }, []);

  /* ── Decode photo → luminance grid + color copy; set up canvas & observers ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const st = stRef.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      const cols = Math.min(MAX_COLS, Math.floor(width / CELL));
      const rows = Math.max(8, Math.round(cols * (img.height / img.width) * 0.55));

      // Luminance grid
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      const grid = new Uint8Array(cols * rows);
      let min = 255;
      let max = 0;
      for (let i = 0; i < cols * rows; i++) {
        const lum = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) | 0;
        grid[i] = lum;
        if (lum < min) min = lum;
        if (lum > max) max = lum;
      }
      const range = Math.max(1, max - min);
      for (let i = 0; i < grid.length; i++) grid[i] = (((grid[i] - min) / range) * 255) | 0;

      // Full-color copy for hover reveal
      const photo = document.createElement("canvas");
      photo.width = cols * CELL;
      photo.height = rows * CELL;
      photo.getContext("2d")?.drawImage(img, 0, 0, photo.width, photo.height);

      st.grid = grid;
      st.photo = photo;
      st.cols = cols;
      st.rows = rows;
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = cols * CELL * st.dpr;
      canvas.height = rows * CELL * st.dpr;
      wrap.style.aspectRatio = `${cols} / ${rows}`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);

      st.reveal = st.reduced ? 1 : 0;
      st.nextThumbAt = performance.now() + 2600;

      tickRef.current = paintFrame;

      if (st.reduced) {
        // single static frame; hover crossfade handled by the one-shot stepper
        paintFrame(performance.now(), 0);
      } else {
        setRunning(true);
      }
    };

    /* ── Per-frame painter ── */
    const paintFrame = (now: number, dt: number) => {
      const ctx = canvas.getContext("2d");
      const grid = st.grid;
      if (!ctx || !grid) return;
      const cw = st.cols * CELL;
      const ch = st.rows * CELL;

      if (st.reveal < 1) st.reveal = Math.min(1, st.reveal + dt / 1500);
      st.hover += (st.hoverTarget - st.hover) * Math.min(1, dt / 160);

      // Thumbs-up scheduler
      if (st.reveal >= 1 && st.hover < 0.4) {
        if (st.thumbFrame === -1 && now >= st.nextThumbAt) {
          st.thumbFrame = 0;
          st.thumbStart = now;
        } else if (st.thumbFrame >= 0) {
          const el = now - st.thumbStart;
          const total = THUMB_FRAME_COUNT * THUMB_FRAME_MS;
          if (el < total) {
            st.thumbFrame = Math.floor(el / THUMB_FRAME_MS) % THUMB_FRAME_COUNT;
          } else {
            st.thumbFrame = -1;
            st.nextThumbAt = now + 6000 + Math.random() * 4000;
          }
        }
      }

      // Fade layer: trails without unbounded accumulation
      ctx.fillStyle = "rgba(10, 12, 16, 0.5)";
      ctx.fillRect(0, 0, cw, ch);

      const css = getComputedStyle(document.documentElement);
      const rgb = css.getPropertyValue("--primary-rgb").trim() || "76, 175, 80";
      const scanY = ((now / 14) % (ch + 140)) - 70;
      ctx.font = `${CELL - 1}px ${FONT_STACK}`;
      ctx.textBaseline = "top";

      const cols = st.cols;
      const rows = st.rows;
      for (let r = 0; r < rows; r++) {
        const cellTop = r * CELL;
        const scanBoost = Math.max(0, 1 - Math.abs(cellTop - scanY) / 28);
        for (let c = 0; c < cols; c++) {
          const lum = grid[r * cols + c] / 255;
          const decodeAt = (c / cols) * 0.8 + st.reveal * 0.2;
          const decoded = st.reveal >= decodeAt;
          let glyph: string;
          let alpha: number;
          if (!decoded) {
            glyph = Math.random() < 0.5 ? "0" : "1";
            alpha = 0.14 + Math.random() * 0.1;
          } else {
            glyph = lum > 0.5 ? "1" : "0";
            alpha = 0.2 + lum * 0.6 + scanBoost * 0.3;
            // sparse shimmer
            if ((r * 31 + c * 17 + (now / 120 | 0)) % 89 === 0) {
              glyph = Math.random() < 0.5 ? "0" : "1";
              alpha *= 0.8;
            }
          }
          ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, alpha).toFixed(3)})`;
          ctx.fillText(glyph, c * CELL, cellTop);
        }
      }

      // ASCII thumbs-up over the face region (upper-center)
      if (st.thumbFrame >= 0 && st.hover < 0.4) {
        const frames = THUMB_FRAMES;
        const frame = frames[st.thumbFrame % frames.length];
        const fr = Math.max(0, Math.floor(rows * 0.14) - 2);
        const fc = Math.floor(cols / 2) - 4;
        ctx.font = `${CELL + 1}px ${FONT_STACK}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        ctx.shadowBlur = 6;
        frame.forEach((line, i) => ctx.fillText(line, fc * CELL, (fr + i) * CELL));
        ctx.shadowBlur = 0;
      }

      // Photo crossfade on hover
      if (st.hover > 0.01 && st.photo) {
        ctx.save();
        ctx.globalAlpha = st.hover;
        ctx.drawImage(st.photo, 0, 0, cw, ch);
        ctx.restore();
      }
    };

    /* ── Visibility: pause when offscreen or tab hidden ── */
    let ioSeen = true;
    const updateVis = () => {
      const vis = document.visibilityState !== "hidden" && ioSeen;
      if (vis !== st.inView) {
        st.inView = vis;
        if (!st.reduced) setRunning(vis);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        ioSeen = entries.some((e) => e.isIntersecting);
        updateVis();
      },
      { rootMargin: "80px" }
    );
    io.observe(wrap);
    const onVis = () => updateVis();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      setRunning(false);
      st.grid = null;
      st.photo = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, width]);

  /* ── Hover handlers (work in reduced-motion too, via one-shot repaint) ── */
  const onEnter = useCallback(() => {
    const st = stRef.current;
    st.hoverTarget = 1;
    if (st.reduced && !st.running) {
      let id = 0;
      const step = () => {
        const s = stRef.current;
        s.hover += (s.hoverTarget - s.hover) * 0.18;
        tickRef.current?.(performance.now(), 16);
        if (Math.abs(s.hoverTarget - s.hover) > 0.01) id = requestAnimationFrame(step);
      };
      id = requestAnimationFrame(step);
    }
  }, []);

  const onLeave = useCallback(() => {
    const st = stRef.current;
    st.hoverTarget = 0;
    if (st.reduced && !st.running) {
      let id = 0;
      const step = () => {
        const s = stRef.current;
        s.hover += (s.hoverTarget - s.hover) * 0.18;
        tickRef.current?.(performance.now(), 16);
        if (Math.abs(s.hoverTarget - s.hover) > 0.01) id = requestAnimationFrame(step);
      };
      id = requestAnimationFrame(step);
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      title={alt}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: width,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(var(--primary-rgb), 0.28)",
        background: "#0a0c10",
        cursor: "crosshair",
        boxShadow: "0 14px 44px rgba(0, 0, 0, 0.35)",
        flexShrink: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${alt} — binary terminal portrait (hover to reveal photo)`}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          right: 10,
          fontFamily: FONT_STACK,
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          color: "rgba(var(--primary-rgb), 0.85)",
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      >
        ● REC
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 8,
          left: 10,
          fontFamily: FONT_STACK,
          fontSize: "0.58rem",
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.45)",
          pointerEvents: "none",
        }}
      >
        hover to reveal
      </div>
    </div>
  );
}

/* ── ASCII thumbs-up frames (drawn over the face region) ── */
const THUMB_FRAMES: string[][] = [
  [
    " ______ ",
    "|  __  |",
    "| |  | |",
    "| |__| |",
    "|______|",
    "   ||   ",
    "  _||_  ",
  ],
  [
    "  ____  ",
    " |    | ",
    " | OK | ",
    " |____| ",
    "   ||   ",
    "  _||_  ",
    "        ",
  ],
  [
    "   __   ",
    "  |  |  ",
    "  |  |  ",
    "  |  |  ",
    " __||__ ",
    "   ||   ",
    "  _||_  ",
  ],
  [
    "  ___   ",
    " /   \\  ",
    "|  +  | ",
    " \\___/  ",
    "   ||   ",
    "  _||_  ",
    "        ",
  ],
];
