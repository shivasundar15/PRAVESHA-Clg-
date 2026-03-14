import React, { useEffect, useRef } from 'react';
import { GraduationCap, UserCircle, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const staffCoordinators = [
  { name: 'Dr. A. Rajesh', phone: '9750222225' },
  { name: 'Dr. A. Saritha', phone: '9820305258' },
  { name: 'Dr. P. Thilakavathy', phone: '9920026608' },
  { name: 'Mr. N. Udayakumar', phone: '82248777606' },
];

const studentCoordinators = [
  { name: 'Ananya S', phone: '7356666091' },
  { name: 'Sakthi Priyadharsan', phone: '9345252389' },
  { name: 'Shiva Sundar P', phone: '7338711301' },
  { name: 'S. Mohammed Kabir', phone: '9840362703' },
  { name: 'K.B. Yathindra', phone: '8667669019' },
];

const PersonRow = ({ name, phone, color }: { name: string; phone: string; color: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s' }}
    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
  >
    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{name}</span>
    <a href={`tel:${phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color, fontFamily: 'Orbitron', fontSize: '0.8rem', letterSpacing: '1px' }}>
      <Phone size={13} /> {phone}
    </a>
  </div>
);

const CoordCard = ({ title, icon: Icon, color, people, cardRef }: any) => (
  <div ref={cardRef} className="glass-panel"
    style={{ opacity: 0, padding: '2.5rem', borderColor: `${color}22`, position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        <Icon size={24} />
      </div>
      <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{title}</h3>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {people.map((p: any) => <PersonRow key={p.name} {...p} color={color} />)}
    </div>
  </div>
);

const Coordinators: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [headerRef, card1Ref, card2Ref].forEach((ref, i) => {
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, []);

  return (
    <section id="coordinators" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">REACH OUT</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '0.75rem' }}>
            COMMAND <span style={{ color: 'var(--neon-blue)' }}>CENTER</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Get in touch with our coordinators for any queries.</p>
        </div>
        <div className="coords-grid">
          <CoordCard title="STAFF COORDINATORS" icon={GraduationCap} color="var(--neon-red)" people={staffCoordinators} cardRef={card1Ref} />
          <CoordCard title="STUDENT COORDINATORS" icon={UserCircle} color="var(--neon-blue)" people={studentCoordinators} cardRef={card2Ref} />
        </div>
      </div>
    </section>
  );
};

export default Coordinators;
