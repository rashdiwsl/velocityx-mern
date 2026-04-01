import { useEffect, useState, useRef } from 'react';

function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('rev');
  const [needle, setNeedle] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const duration = 2200;
    const revUp = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.7
        ? (progress / 0.7) * 0.85
        : 0.85 + ((progress - 0.7) / 0.3) * 0.15;
      setNeedle(eased);
      setRpm(Math.round(eased * 8000));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(revUp);
      } else {
        setPhase('hold');
        setTimeout(() => setPhase('drop'), 400);
      }
    };
    rafRef.current = requestAnimationFrame(revUp);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (phase !== 'drop') return;
    const duration = 600;
    const start = performance.now();
    const drop = (ts) => {
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = (1 - progress) * 1.0;
      setNeedle(eased);
      setRpm(Math.round(eased * 8000));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(drop);
      } else {
        setLeaving(true);
        setTimeout(() => onDone(), 700);
      }
    };
    rafRef.current = requestAnimationFrame(drop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, onDone]);

  const SIZE = 320;
  const CX = SIZE / 2;
  const CY = SIZE / 2 + 30;
  const R = 120;
  const START_ANGLE = -220;
  const SWEEP = 260;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (startDeg, endDeg, r) => {
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const x1 = CX + r * Math.cos(s);
    const y1 = CY + r * Math.sin(s);
    const x2 = CX + r * Math.cos(e);
    const y2 = CY + r * Math.sin(e);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const needleDeg = START_ANGLE + needle * SWEEP;
  const needleRad = toRad(needleDeg);
  const needleX = CX + (R - 10) * Math.cos(needleRad);
  const needleY = CY + (R - 10) * Math.sin(needleRad);
  const needleTailX = CX - 28 * Math.cos(needleRad);
  const needleTailY = CY - 28 * Math.sin(needleRad);

  const ticks = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16;
    const deg = START_ANGLE + t * SWEEP;
    const rad = toRad(deg);
    const isMajor = i % 2 === 0;
    const inner = R - (isMajor ? 18 : 10);
    const outer = R - 2;
    return {
      x1: CX + inner * Math.cos(rad),
      y1: CY + inner * Math.sin(rad),
      x2: CX + outer * Math.cos(rad),
      y2: CY + outer * Math.sin(rad),
      isMajor,
      isRed: t > 0.78,
      label: isMajor ? Math.round(t * 8) : null,
      labelX: CX + (R - 34) * Math.cos(rad),
      labelY: CY + (R - 34) * Math.sin(rad),
    };
  });

  const filledArcEnd = START_ANGLE + needle * SWEEP;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#050505',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transition: leaving ? 'opacity 0.7s ease, transform 0.7s ease' : 'none',
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(192,57,43,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px', color: '#fff' }}>
          Velocity<span style={{ color: '#c0392b' }}>X</span>
        </span>
      </div>

      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={CX} cy={CY} r={R + 14} fill="none" stroke="#161616" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={R + 8} fill="#0a0a0a" stroke="#1e1e1e" strokeWidth="1" />

        <path d={arcPath(START_ANGLE, START_ANGLE + SWEEP, R)}
          fill="none" stroke="#1e1e1e" strokeWidth="6" strokeLinecap="round" />

        {needle > 0 && (
          <path
            d={arcPath(START_ANGLE, filledArcEnd, R)}
            fill="none"
            stroke={needle > 0.78 ? '#e74c3c' : '#c0392b'}
            strokeWidth="6"
            strokeLinecap="round"
            style={{ filter: needle > 0.78 ? 'drop-shadow(0 0 6px rgba(231,76,60,0.8))' : 'none' }}
          />
        )}

        {ticks.map((tick, i) => (
          <g key={i}>
            <line
              x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
              stroke={tick.isRed ? '#c0392b' : (tick.isMajor ? '#3a3a3a' : '#222')}
              strokeWidth={tick.isMajor ? 2 : 1}
              strokeLinecap="round"
            />
            {tick.label !== null && (
              <text
                x={tick.labelX} y={tick.labelY}
                textAnchor="middle" dominantBaseline="central"
                fontSize="9" fontWeight="600"
                fill={tick.isRed ? '#c0392b' : '#3a3a3a'}
                fontFamily="Inter, sans-serif"
              >
                {tick.label}
              </text>
            )}
          </g>
        ))}

        <line
          x1={needleTailX} y1={needleTailY}
          x2={needleX} y2={needleY}
          stroke="#e74c3c"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            filter: phase === 'hold'
              ? 'drop-shadow(0 0 8px rgba(231,76,60,1))'
              : 'drop-shadow(0 0 4px rgba(231,76,60,0.6))'
          }}
        />

        <circle cx={CX} cy={CY} r={10} fill="#141414" stroke="#c0392b" strokeWidth="2" />
        <circle cx={CX} cy={CY} r={3} fill="#e74c3c" />

        <text x={CX} y={CY + 44} textAnchor="middle"
          fontSize="22" fontWeight="900" fill="#ffffff" fontFamily="Inter, sans-serif">
          {rpm.toLocaleString()}
        </text>
        <text x={CX} y={CY + 62} textAnchor="middle"
          fontSize="9" fontWeight="600" fill="#3a3a3a"
          fontFamily="Inter, sans-serif" letterSpacing="3">
          RPM
        </text>

        <text x={CX} y={CY + 86} textAnchor="middle"
          fontSize="8" fontWeight="500" fill="#2a2a2a"
          fontFamily="Inter, sans-serif" letterSpacing="2">
          ×1000 r/min
        </text>
      </svg>

      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: phase === 'hold' ? '#e74c3c' : '#1e1e1e',
            transition: 'background 0.3s ease',
            transitionDelay: `${i * 0.1}s`,
            boxShadow: phase === 'hold' ? '0 0 8px rgba(231,76,60,0.8)' : 'none'
          }} />
        ))}
      </div>

      <p style={{
        marginTop: 16, fontSize: 10, letterSpacing: '4px',
        color: '#2a2a2a', fontFamily: 'Inter, sans-serif',
        textTransform: 'uppercase', fontWeight: 600
      }}>
        Premium Car Marketplace
      </p>
    </div>
  );
}

export default SplashScreen;