import React from 'react';
import { motion } from 'motion/react';

function FloatingPaths({
  position,
  className,
  opacityBase,
}: {
  position: number;
  className: string;
  opacityBase: number;
}) {
  const paths = Array.from({ length: 38 }, (_, i) => ({
    id: i,
    d: `M${250 - i * 6 * position} ${610 - i * 11}C${430 - i * 7 * position} ${
      370 - i * 5
    } ${650 - i * 3 * position} ${390 - i * 8} ${820 - i * 5 * position} ${
      486 - i * 7
    }C${1030 - i * 4 * position} ${604 - i * 8} ${1078 - i * 8 * position} ${
      300 - i * 5
    } ${1246 - i * 5 * position} ${202 - i * 4}C${1382 - i * 2 * position} ${
      122 - i * 3
    } ${1458 - i * 2 * position} ${164 - i * 5} ${1542 - i * position} ${250 - i * 4}`,
    width: 1.25 + i * 0.045,
    opacity: opacityBase + i * 0.014,
    duration: 20 + (i % 8),
    sweepDuration: 5.2 + (i % 5) * 0.45,
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        aria-hidden="true"
        className="w-full h-full"
        data-hero-background-path="true"
        fill="none"
        focusable="false"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 720"
      >
        {paths.map((path) => (
          <motion.path
            key={`base-${path.id}`}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            strokeLinecap="round"
            initial={{ opacity: 0.45 }}
            animate={{
              opacity: [0.36, 0.68, 0.36],
              x: [0, position * 8, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.id * 0.04,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
        {paths
          .filter((path) => path.id % 3 === 0)
          .map((path) => (
            <motion.path
              key={`sweep-${path.id}`}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width + 1.1}
              strokeLinecap="round"
              strokeDasharray="150 620"
              initial={{ opacity: 0.16, strokeDashoffset: 620 }}
              animate={{
                opacity: [0.16, 0.95, 0.16],
                strokeDashoffset: [620, 0, -620],
              }}
              transition={{
                duration: path.sweepDuration,
                delay: (path.id % 6) * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
            />
          ))}
      </svg>
    </div>
  );
}

function ConcentricRings({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
      viewBox="0 0 400 400"
    >
      {[70, 110, 150, 190].map((r, i) => (
        <motion.circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="currentColor"
          strokeWidth={1.1}
          strokeOpacity={0.5 - i * 0.1}
          strokeDasharray={i % 2 === 0 ? undefined : '4 8'}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.9, 0.55, 0.9] }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

export default function HeroBackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50">
      {/* Base wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute inset-y-0 right-0 w-[58%] bg-gradient-to-l from-green-50 via-blue-50/75 to-transparent" />

      {/* Aurora glow orbs */}
      <motion.div
        className="absolute -top-32 right-[6%] h-[30rem] w-[30rem] rounded-full bg-blue-400/25 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 right-[26%] h-[26rem] w-[26rem] rounded-full bg-emerald-300/25 blur-3xl"
        animate={{ x: [0, -35, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[30%] right-[42%] h-72 w-72 rounded-full bg-sky-300/20 blur-3xl"
        animate={{ x: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 6 }}
      />

      {/* Dot grid texture, fades toward text side */}
      <div
        className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_right,transparent_20%,black_60%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(30,64,175,0.16) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Flowing line paths */}
      <div className="absolute inset-0 opacity-100 mix-blend-multiply [filter:drop-shadow(0_16px_30px_rgba(37,99,235,0.13))] [mask-image:linear-gradient(to_right,transparent,transparent_30%,black_46%,black_98%)]">
        <FloatingPaths position={1} className="text-blue-700/95" opacityBase={0.22} />
        <FloatingPaths position={-1} className="text-emerald-600/90" opacityBase={0.18} />
      </div>

      {/* Geometric accents */}
      <ConcentricRings className="absolute right-[4%] top-[8%] h-[26rem] w-[26rem] text-blue-400/70" />
      <motion.div
        className="absolute right-[24%] bottom-[14%] h-28 w-28 rounded-full border border-green-400/60 bg-gradient-to-br from-green-100/40 to-transparent backdrop-blur-[2px] shadow-[0_8px_30px_rgba(16,185,129,0.12)]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[13%] bottom-[26%] h-14 w-14 rounded-full border border-blue-400/60 bg-gradient-to-br from-blue-100/50 to-transparent shadow-[0_8px_24px_rgba(37,99,235,0.14)]"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Readability + vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/68 to-white/0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/70" />
    </div>
  );
}
