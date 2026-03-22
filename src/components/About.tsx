import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Trophy, Cpu, GraduationCap, Globe, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Trophy, value: '10', label: 'Events', color: 'var(--neon-red)' },
  { icon: Award, value: 'A++', label: 'NAAC Accredited', color: 'var(--neon-blue)' },
  { icon: Globe, value: '500+', label: 'Participants', color: 'var(--neon-purple)' },
  { icon: GraduationCap, value: '1 Day', label: 'Symposium', color: 'var(--neon-red)' },
];

const highlights = [
  { icon: Cpu, title: 'Technical & Non-Tech', desc: 'Paper Presentation, Project Expo, Coding Challenges, UI Design and more — test your skills across 10 unique events.' },
  { icon: Trophy, title: '₹1 Lakh+ Prize Pool', desc: 'Win exciting cash prizes worth ₹1 Lakh across all events. Registration fee: ₹100/event.' },
  { icon: MapPin, title: 'Venue', desc: 'VELS Institute of Science, Technology & Advanced Studies (VISTAS). Campuses in Pallavaram, Thalambur, Periyapalayam — Chennai.' },
  { icon: Globe, title: 'Open to All', desc: 'Open to students from all colleges across India. Last date for online registration is April 05.' },
];

const About: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fadeUp = (el: Element | null, delay = 0) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
      );
    };

    fadeUp(headerRef.current);

    // Stagger stat cards
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true } }
      );
    }

    // Stagger highlight cards
    if (highlightsRef.current) {
      gsap.fromTo(highlightsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: highlightsRef.current, start: 'top 85%', once: true } }
      );
    }

    fadeUp(bannerRef.current);
  }, []);

  return (
    <section id="about" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">ABOUT THE EVENT</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem' }}>
            WHAT IS <span style={{ color: 'var(--neon-red)' }}>PRAVESHA?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', maxWidth: '760px', margin: '0 auto', lineHeight: 1.8, textWrap: 'balance' as any }}>
            PRAVESHA 2K26 is a <span style={{ color: 'white', fontWeight: 600 }}>National Level Technical Symposium</span> organized by the
            <span style={{ color: 'white', fontWeight: 600 }}> Department of CSE, AIDS &amp; IT</span> at VISTAS. 
            Accredited with <span style={{ color: 'var(--neon-blue)', fontWeight: 600 }}>A++ by NAAC</span>, VELS Institute is proud to host <span style={{ color: 'var(--neon-purple)', fontWeight: 600 }}>500+ participants</span> from colleges across India to compete, collaborate, and celebrate technology.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="stats-grid" style={{ marginBottom: '3.5rem' }}>
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="glass-panel" style={{ opacity: 0, padding: '1.75rem', textAlign: 'center', borderColor: `${color}30` }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color }}>
                <Icon size={24} />
              </div>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: 'clamp(1rem, 3vw, 2.2rem)', color, lineHeight: 1.1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{value}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', letterSpacing: '1px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div ref={highlightsRef} className="highlights-grid">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-panel" style={{ opacity: 0, padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(255,42,42,0.1)', border: '1px solid rgba(255,42,42,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-red)', flexShrink: 0 }}>
                <Icon size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'white' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div ref={bannerRef} className="glass-panel about-info-banner"
          style={{ opacity: 0, marginTop: '3rem', padding: '2rem 2.5rem', borderColor: 'rgba(0,212,255,0.2)', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', letterSpacing: '3px', marginBottom: '0.4rem' }}>ORGANISED BY</div>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.25rem' }}>Dept. of CSE, AIDS &amp; IT</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Pallavaram, Thalambur, Periyapalayam — Chennai</div>
          </div>
          <div className="about-info-banner-right" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="pulse-dot" />
              <span style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', color: 'var(--neon-red)' }}>APRIL 09, 2026</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last date for online registration: <span style={{ color: 'var(--neon-blue)', fontWeight: 600 }}>April 05</span></div>
            <a href="mailto:pravesha2k26@gmail.com" style={{ fontSize: '0.82rem', color: 'var(--neon-blue)' }}>pravesha2k26@gmail.com</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
