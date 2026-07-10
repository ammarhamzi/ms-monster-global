import React from 'react';

export default function HeroBackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute inset-y-0 right-0 w-[58%] bg-gradient-to-l from-green-50 via-blue-50/75 to-transparent" />

      {/* Glow accents — drift via CSS transform only (GPU compositor, no JS/rAF cost) */}
      <div className="hero-orb hero-orb-a absolute -top-32 right-[4%] h-[34rem] w-[34rem] rounded-full bg-blue-400/50 blur-3xl" />
      <div className="hero-orb hero-orb-b absolute -bottom-40 right-[22%] h-[30rem] w-[30rem] rounded-full bg-emerald-300/55 blur-3xl" />
      <div className="hero-orb hero-orb-c absolute top-[24%] right-[34%] h-[22rem] w-[22rem] rounded-full bg-sky-300/45 blur-3xl" />

      {/* Readability wash over text side only — right side stays vivid */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 via-45% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
    </div>
  );
}
