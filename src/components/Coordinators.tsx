import React, { useEffect, useRef } from 'react';
import { GraduationCap, UserCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const staffCoordinators = [
  { name: 'Dr. A. Saritha' },
  { name: 'Dr. E. Padma' },
  { name: 'Dr. P. Thilakavathy' },
  { name: 'Mr. N. Udayakumar' },
  { name: 'Ms. Yamini B' },
];

const studentCoordinators = [
  { name: 'Ananya S' },
  { name: 'Aditya Anabayan B' },
  { name: 'Sakthi Priyadharsan' },
  { name: 'Bhavana M' },
  { name: 'Shiva Sundar P' },
  { name: 'Abirutha' },
  { name: 'Mohammed Kabir S' },
  { name: 'Pooja Manoharan' },
  { name: 'Yathindra K B' },
  { name: 'Akshara S' },
];

// Single name chip used in staff list (single column)
const StaffRow = ({ name, color }: { name: string; color: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.2s',
      boxSizing: 'border-box',
    }}
    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)')}
    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
  >
    <div
      style={{
        width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
        background: color, boxShadow: `0 0 8px ${color}90`,
      }}
    />
    <span
      style={{
        fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
        fontWeight: 600,
        color: 'var(--text-primary)',
      }}
    >
      {name}
    </span>
  </div>
);

// Compact name chip used in the two-column student grid
const StudentChip = ({ name, color }: { name: string; color: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.65rem 0.9rem',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.2s',
      boxSizing: 'border-box',
    }}
    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)')}
    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
  >
    <div
      style={{
        width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
        background: color, boxShadow: `0 0 6px ${color}90`,
      }}
    />
    <span
      style={{
        fontSize: 'clamp(0.78rem, 1.6vw, 0.92rem)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </span>
  </div>
);

const StaffCard = ({
  cardRef,
}: {
  cardRef: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={cardRef}
    className="glass-panel coord-card"
    style={{
      opacity: 0,
      padding: 'clamp(1.25rem, 3vw, 2rem)',
      borderColor: 'rgba(255,42,42,0.22)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {/* Accent bar */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--neon-red), transparent)' }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255,42,42,0.12)', border: '1px solid rgba(255,42,42,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-red)', flexShrink: 0 }}>
        <GraduationCap size={22} />
      </div>
      <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', margin: 0, color: 'white', letterSpacing: '0.5px' }}>STAFF COORDINATORS</h3>
    </div>

    {/* List */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
      {staffCoordinators.map(p => (
        <StaffRow key={p.name} name={p.name} color="var(--neon-red)" />
      ))}
    </div>
  </div>
);

const StudentCard = ({
  cardRef,
}: {
  cardRef: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={cardRef}
    className="glass-panel coord-card"
    style={{
      opacity: 0,
      padding: 'clamp(1.25rem, 3vw, 2rem)',
      borderColor: 'rgba(0,212,255,0.22)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {/* Accent bar */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)' }} />

    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)', flexShrink: 0 }}>
        <UserCircle size={22} />
      </div>
      <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', margin: 0, color: 'white', letterSpacing: '0.5px' }}>STUDENT COORDINATORS</h3>
    </div>

    {/* Two-column grid */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.6rem',
        flex: 1,
      }}
    >
      {studentCoordinators.map(p => (
        <StudentChip key={p.name} name={p.name} color="var(--neon-blue)" />
      ))}
    </div>
  </div>
);

const Coordinators: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref  = useRef<HTMLDivElement>(null);
  const card2Ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [headerRef, card1Ref, card2Ref].forEach((ref, i) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      );
    });
  }, []);

  return (
    <section id="coordinators" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">REACH OUT</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            COMMAND <span style={{ color: 'var(--neon-blue)' }}>CENTER</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Get in touch with our coordinators for any queries.
          </p>
        </div>

        {/* Cards */}
        <div className="coords-grid">
          <StaffCard cardRef={card1Ref as React.RefObject<HTMLDivElement>} />
          <StudentCard cardRef={card2Ref as React.RefObject<HTMLDivElement>} />
        </div>
      </div>
    </section>
  );
};

export default Coordinators;
