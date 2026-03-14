import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Lightbulb, Gamepad2, Users, MonitorPlay, BrainCog, Presentation, Music, Ticket, ArrowRight, X, CheckCircle2, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Event = {
  title: string;
  icon: any;
  desc: string;
  color: string;
  rules: string[];
  teamSize: string;
  duration: string;
  venue: string;
};

const technicalEvents: Event[] = [
  {
    title: 'PAPER PRESENTATION', icon: Presentation, color: '#00d4ff',
    desc: 'Present your research papers and innovative ideas to a panel of experts.',
    teamSize: '1–2 members', duration: '10 min + 5 min Q&A', venue: 'Seminar Hall A',
    rules: [
      'Paper must be original and unpublished work.',
      'Abstract (max 300 words) must be submitted before March 26.',
      'Presentation must be in PPT format (max 15 slides).',
      'Plagiarism above 20% will lead to disqualification.',
      'Judging criteria: Innovation (40%), Content (30%), Presentation (30%).',
    ],
  },
  {
    title: 'PROJECT EXPO', icon: Lightbulb, color: '#ff2a2a',
    desc: 'Showcase your functional projects and prototypes to industry professionals.',
    teamSize: '2–4 members', duration: 'Full day', venue: 'Main Lab',
    rules: [
      'Projects must be functional and demonstrated live.',
      'Both hardware and software projects are accepted.',
      'A working prototype or demo must be brought on the day.',
      'Teams must submit a 1-page abstract before March 26.',
      'Judging: Innovation (35%), Functionality (35%), Presentation (30%).',
    ],
  },
  {
    title: 'BUZZER BYTES', icon: BrainCog, color: '#00d4ff',
    desc: 'Rapid-fire quiz based on logic, tech trivia, and computer science fundamentals.',
    teamSize: '2 members', duration: '45 minutes', venue: 'Seminar Hall B',
    rules: [
      'Quiz consists of 3 rounds: MCQ, Rapid Fire, and Visual Round.',
      'No electronic devices allowed during the quiz.',
      'Each correct answer carries 10 points; no negative marking.',
      'In case of a tie, a sudden-death round will be conducted.',
      'Decision of the quiz master is final.',
    ],
  },
  {
    title: 'ALGO-RYTHM', icon: Terminal, color: '#ff2a2a',
    desc: 'Solve complex algorithms and coding challenges under time pressure.',
    teamSize: '1–2 members', duration: '2 hours', venue: 'Computer Lab 1',
    rules: [
      'Participants can use C, C++, Java, or Python.',
      'Internet access is strictly prohibited.',
      'Problems will range from easy to hard difficulty.',
      'Judging based on correctness, time complexity, and speed of submission.',
      'Pre-loaded IDEs will be provided; no personal laptops.',
    ],
  },
  {
    title: 'WORKSHOP', icon: MonitorPlay, color: '#00d4ff',
    desc: 'Hands-on experience with cutting-edge tools guided by industry experts.',
    teamSize: 'Individual', duration: '3 hours', venue: 'Smart Classroom',
    rules: [
      'Separate registration required for the workshop.',
      'Participants must bring their own laptops with required software pre-installed.',
      'Software requirements will be shared 3 days before the event.',
      'Certificate of participation will be provided to all attendees.',
      'Limited seats — first come, first served.',
    ],
  },
  {
    title: 'UI WAVE', icon: Gamepad2, color: '#ff2a2a',
    desc: 'Create stunning user interfaces in real-time design challenges.',
    teamSize: '1–2 members', duration: '90 minutes', venue: 'Computer Lab 2',
    rules: [
      'Participants can use Figma, Adobe XD, or any design tool.',
      'Theme will be revealed on the day of the event.',
      'Judging: Creativity (40%), Usability (30%), Aesthetics (30%).',
      'Submissions must be exported as PDF or image files.',
      'No pre-made templates allowed.',
    ],
  },
];

const nonTechnicalEvents: Event[] = [
  {
    title: 'SHOW-OFF', icon: Music, color: '#a855f7',
    desc: 'Showcase your talents in dance, music, or performing arts on the big stage.',
    teamSize: '1–6 members', duration: '5–8 min per team', venue: 'Open Air Stage',
    rules: [
      'Performances can include dance, singing, mimicry, or any performing art.',
      'Vulgarity or offensive content will lead to immediate disqualification.',
      'Background music/tracks must be submitted 1 day before the event.',
      'Props are allowed but must be arranged by the participants.',
      'Judging: Performance (50%), Creativity (30%), Stage Presence (20%).',
    ],
  },
  {
    title: 'IPL AUCTION', icon: Ticket, color: '#a855f7',
    desc: 'Strategize and build the ultimate cricket team with a limited budget.',
    teamSize: '2–3 members', duration: '2 hours', venue: 'Seminar Hall C',
    rules: [
      'Each team gets a virtual budget of ₹100 crore.',
      'Minimum bid starts at ₹50 lakh per player.',
      'Each team must have 11 players including 1 wicketkeeper and 1 overseas player.',
      'Bidding wars are encouraged — highest bid wins the player.',
      'Team with the best balanced squad (as judged) wins.',
    ],
  },
  {
    title: 'CREW AND CLUE', icon: Users, color: '#a855f7',
    desc: 'Team-based treasure hunt and mystery solving across the campus.',
    teamSize: '3–5 members', duration: '1.5 hours', venue: 'Campus-wide',
    rules: [
      'Clues will be hidden across the campus.',
      'Teams must solve puzzles to find the next clue location.',
      'No running inside buildings.',
      'Mobile phones allowed only for scanning QR codes.',
      'First team to reach the final destination with all clues wins.',
    ],
  },
];

// Modal
const EventModal = ({ event, onClose }: { event: Event; onClose: () => void }) => {
  const Icon = event.icon;
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    gsap.fromTo(boxRef.current, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' });
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.15, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} onClick={handleClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <div ref={boxRef} onClick={e => e.stopPropagation()} className="glass-panel"
        style={{ width: '100%', maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto', padding: '2.5rem', borderColor: `${event.color}40`, position: 'relative' }}
      >
          {/* Top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${event.color}, transparent)`, borderRadius: '16px 16px 0 0' }} />

          {/* Close */}
          <button onClick={handleClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${event.color}18`, border: `1px solid ${event.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: event.color, flexShrink: 0 }}>
              <Icon size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', margin: 0, letterSpacing: '1px' }}>{event.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.25rem 0 0' }}>{event.desc}</p>
            </div>
          </div>

          {/* Meta chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
            {[
              { label: 'Team Size', val: event.teamSize },
              { label: 'Duration', val: event.duration },
              { label: 'Venue', val: event.venue },
            ].map(m => (
              <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '1.5px', marginBottom: '0.2rem' }}>{m.label.toUpperCase()}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'Orbitron', color: event.color }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '1rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: event.color }}>▸</span> RULES & GUIDELINES
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {event.rules.map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color={event.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Register button */}
          <a
            href="https://forms.gle/your-registration-link"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', background: `linear-gradient(135deg, ${event.color === '#ff2a2a' || event.color === '#00d4ff' ? '#ff2a2a, #cc0000' : '#a855f7, #7c3aed'})` }}
          >
            <ExternalLink size={16} /> Register for {event.title}
          </a>
        </div>
    </div>
  );
};

// Card
const EventCard = ({ event, index, badge, onOpen }: { event: Event; index: number; badge: string; onOpen: () => void }) => {
  const Icon = event.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true } }
    );
  }, []);

  return (
    <div ref={cardRef} className="glass-panel"
      style={{ opacity: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', borderColor: `${event.color}22`, transition: 'transform 0.2s' }}
      onClick={onOpen}
      onMouseEnter={e => gsap.to(e.currentTarget, { y: -8, duration: 0.2 })}
      onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, duration: 0.2 })}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${event.color}15`, border: `1px solid ${event.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: event.color }}>
          <Icon size={26} />
        </div>
        <span className={`event-badge ${badge}`}>{badge === 'badge-tech' ? 'TECHNICAL' : 'NON-TECH'}</span>
      </div>
      <h3 style={{ fontSize: '1.1rem', margin: 0, letterSpacing: '0.5px' }}>{event.title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.6 }}>{event.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: event.color, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem', fontFamily: 'Orbitron' }}>
        View Details <ArrowRight size={14} />
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
    );
  }, []);

  return (
    <section id="events" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">WHAT'S IN STORE</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '1.5rem' }}>
            EVENTS <span style={{ color: 'var(--neon-red)' }}>ARENA</span>
          </h2>
          <div className="glass-panel fee-banner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', padding: '1.25rem 2rem', borderColor: 'rgba(0,212,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Registration Fee:</span>
              <span style={{ color: 'white', fontWeight: 700, fontFamily: 'Orbitron', fontSize: '0.95rem' }}>₹150 / Event</span>
            </div>
            <div className="fee-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Combo Offer:</span>
              <span style={{ color: 'white', fontWeight: 700, fontFamily: 'Orbitron', fontSize: '0.95rem' }}>₹200 / 2 Events</span>
            </div>
            <div className="fee-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="pulse-dot" style={{ background: 'var(--neon-blue)', boxShadow: '0 0 8px var(--neon-blue)' }} />
              <span style={{ color: 'var(--neon-blue)', fontWeight: 700, fontFamily: 'Orbitron', fontSize: '0.9rem' }}>Register Before MARCH 26</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--neon-blue)', margin: 0 }}>TECHNICAL EVENTS</h3>
            <span style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '100px', padding: '0.2rem 0.8rem', fontSize: '0.8rem', color: 'var(--neon-blue)', fontFamily: 'Orbitron' }}>{technicalEvents.length}</span>
          </div>
          <hr className="neon-divider" />
          <div className="events-grid">
            {technicalEvents.map((e, i) => <EventCard key={e.title} event={e} index={i} badge="badge-tech" onOpen={() => setSelected(e)} />)}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--neon-purple)', margin: 0 }}>NON-TECHNICAL EVENTS</h3>
            <span style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '100px', padding: '0.2rem 0.8rem', fontSize: '0.8rem', color: 'var(--neon-purple)', fontFamily: 'Orbitron' }}>{nonTechnicalEvents.length}</span>
          </div>
          <hr className="neon-divider-red" style={{ background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)' } as any} />
          <div className="events-grid">
            {nonTechnicalEvents.map((e, i) => <EventCard key={e.title} event={e} index={i} badge="badge-nontech" onOpen={() => setSelected(e)} />)}
          </div>
        </div>
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Events;
