import React, { useEffect, useRef, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MonitorPlay, BrainCog, Presentation, Music,
  ArrowRight, X, CheckCircle2, ExternalLink,
  Mic2, PenTool, Lightbulb, ImageIcon, Cpu, BookOpen, Trophy
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Event = {
  title: string;
  badge?: string;
  icon: any;
  desc: string;
  color: string;
  rules: string[];
  judgingCriteria: string[];
  teamSize: string;
  duration: string;
  venue: string;
};

const technicalEvents: Event[] = [
  {
    title: 'PAPER PRESENTATION',
    badge: 'ISBN',
    icon: Presentation,
    color: '#00d4ff',
    desc: 'Present your research ideas and technical expertise in emerging technology domains. Selected papers get published with an ISBN number for academic recognition.',
    teamSize: 'Max 3 members',
    duration: '8 min + 2 min Q&A',
    venue: 'Seminar Hall',
    rules: [
      'Open to individual participants or teams (maximum 3 members).',
      'Topics must relate to Computer Science & Emerging Technologies (AI, Data Science, IoT, Cyber Security, etc.).',
      'The paper must follow IEEE format.',
      'Last date for submitting the paper: 5th April; PPT must be submitted by 8th April.',
      'Each team gets 8 minutes for presentation + 2 minutes for Q&A.',
      'Participants must bring a backup of their PPT on a pen drive.',
      'The paper must be original work; plagiarism must not exceed 25%.',
      'Papers aligned with Sustainable Development Goals (SDGs) will be given preference.',
      'Selected papers may be published with an ISBN.',
      'Participants must report 30 minutes before the event. Judges decision is final and binding.',
    ],
    judgingCriteria: [
      'Innovation & Contribution -- relevance to SDGs and novelty of research.',
      'Presentation Skills -- clarity, structure, and organization of the PPT.',
      'Originality -- plagiarism within acceptable limits (25% max).',
      'Technical Depth -- depth of methodology and real-world applicability.',
    ],
  },
  {
    title: 'WORKSHOP',
    icon: MonitorPlay,
    color: '#ff2a2a',
    desc: 'Hands-on experience with cutting-edge tools and technologies guided by industry experts. All participants must complete registration before attending.',
    teamSize: 'Individual',
    duration: 'Full Session',
    venue: 'Smart Classroom',
    rules: [
      'Registration Mandatory -- all participants must complete the registration process before entering the workshop.',
      'Punctuality -- participants should report on time. Late entry may not be allowed once the session begins.',
      'ID Requirement -- students must carry their college ID card or valid identification proof.',
      'Attendance -- full attendance is required to receive a participation certificate.',
      'Code of Conduct -- participants must maintain discipline and behave respectfully towards speakers, coordinators, and fellow participants.',
      'Use of Devices -- mobile phones should be kept on silent mode. Usage is allowed only for workshop-related purposes.',
      'Participation -- active participation is encouraged during activities, discussions, and hands-on sessions.',
      'Certificates -- certificates will be provided only to participants who attend the complete workshop.',
      'No Misconduct -- any form of misbehavior, malpractice, or violation of rules will lead to disqualification.',
      'Organizers\u2019 Decision -- the decision of the organizers will be final in all matters.',
      'Safety Guidelines -- participants must follow all safety instructions provided during the workshop.',
    ],
    judgingCriteria: [
      'No competitive judging -- all participants who attend the complete workshop receive a certificate of participation.',
    ],
  },
  {
    title: 'PROJECT EXPO',
    icon: Lightbulb,
    color: '#00d4ff',
    desc: 'Showcase your innovative ideas, technical skills, and problem-solving abilities through working models or functional prototypes to a panel of expert judges.',
    teamSize: 'Max 2 members',
    duration: '5 min + 2 min Q&A',
    venue: 'Expo Hall',
    rules: [
      'Each team shall consist of a maximum of two members.',
      'Participants must bring their own laptops and any necessary hardware for project demonstration.',
      'All projects must be presented as working models or functional prototypes.',
      'Each team will be allotted 5 minutes for presentation + 2 minutes for judge interaction.',
      'Teams must submit a brief abstract of their project at the time of the event.',
      'Plagiarism or use of copied projects is strictly prohibited and will lead to immediate disqualification.',
      'All teams are required to report to the venue at least 30 minutes prior to the scheduled start time.',
      'Participants must maintain professional conduct, discipline, and decorum throughout the event.',
      'The decision of the judging panel shall be final and binding in all matters.',
    ],
    judgingCriteria: [
      'Innovation / Creativity (20 Marks) -- Originality, uniqueness, and novelty of the project idea.',
      'Technical Knowledge (20 Marks) -- Depth of understanding of concepts, tools, and technologies used.',
      'Practical Implementation (20 Marks) -- Functionality, working condition, and real-time execution.',
      'Problem Solving (15 Marks) -- Ability to identify problems and provide effective, logical solutions.',
      'Presentation Skills (15 Marks) -- Clarity, confidence, communication, and demonstration quality.',
      'Social Impact / Usefulness (10 Marks) -- Relevance, usefulness, and potential impact on society or industry.',
    ],
  },
  {
    title: 'CODE GOLF',
    icon: Cpu,
    color: '#ff2a2a',
    desc: 'Write the shortest possible code to solve programming challenges. Individual participation across three rounds of increasing difficulty.',
    teamSize: 'Individual',
    duration: '3 Rounds',
    venue: 'Computer Lab',
    rules: [
      'Individual participation only -- no teamwork allowed.',
      'Any programming language is allowed.',
      'Code length (character count) is the primary scoring factor.',
      'Participants must bring their own laptops for the event.',
      'The competition consists of three rounds of increasing difficulty.',
      'Must produce correct output for all given test cases.',
      'Solutions must be submitted within the given time limit per round.',
      'No external libraries unless pre-approved by coordinators.',
      'Any form of malpractice will lead to immediate disqualification.',
      'The decision of the judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Code Length -- shortest correct solution (by character count) wins.',
      'Correctness -- solution must pass all test cases for that round.',
      'Time Compliance -- submitted within the allotted time limit.',
      'All three rounds are evaluated cumulatively to determine the winner.',
    ],
  },
  {
    title: 'BUZZER BYTES',
    icon: BrainCog,
    color: '#00d4ff',
    desc: 'Rapid-fire tech quiz in two rounds -- a computer-based screening followed by a live buzzer stage round testing logic, trivia, and CS fundamentals.',
    teamSize: '2 members',
    duration: '2 Rounds',
    venue: 'Seminar Hall',
    rules: [
      'Each team must consist of exactly two members.',
      'Participants must bring their own laptops for the event.',
      'Round 1 (Screening): Computer-based MCQ test -- 30 questions in 45 minutes; top 6 teams qualify.',
      'Round 2 Stage 1: Six qualified teams compete in 3 head-to-head matchups (3 questions each, time limits: Q1-30s, Q2-20s, Q3-10s). Winners advance to Finals.',
      'Round 2 Stage 2 (Finals): 1 vs 1 vs 1 format -- 15 questions, 30-second limit each; highest score wins.',
      'A question will be skipped only if all teams in the matchup choose to skip it.',
      'No discussion or external assistance is allowed during the test.',
      'Any form of malpractice may lead to disqualification.',
      'The decision of the judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Round 1: Top 6 teams with the highest MCQ scores qualify.',
      'Round 2 Stage 1: Head-to-head winner determined by correct answers (tiebreaker if needed).',
      'Round 2 Stage 2: Total points accumulated across 15 questions determine ranking.',
      'In case of a tie, a tie-breaker question will determine the winner.',
    ],
  },
  {
    title: 'LOGO DESIGNING',
    icon: PenTool,
    color: '#ff2a2a',
    desc: 'Design a compelling brand identity from scratch -- let your creativity speak through vectors and pixels in this timed design challenge.',
    teamSize: '1-2 members',
    duration: '90 minutes',
    venue: 'Computer Lab',
    rules: [
      'Participation: Individual or team of up to 2 members.',
      'Design brief will be provided at the start of the event.',
      'Allowed tools: Adobe Illustrator, CorelDRAW, Inkscape, or Figma.',
      'Final logo must be submitted in vector format (SVG / AI).',
      'Plagiarism or use of pre-made / AI-generated assets will result in disqualification.',
      'Participants must bring their own laptops with the required software installed.',
      'Designs must be original and created during the event only.',
      'The decision of the judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Originality (40%) -- uniqueness and creativity of the design concept.',
      'Relevance (30%) -- how well the logo matches the brief and communicates the brand.',
      'Aesthetics (30%) -- visual appeal, color usage, typography, and overall design quality.',
    ],
  },
];

const nonTechnicalEvents: Event[] = [
  {
    title: 'SHOWOFF',
    icon: Music,
    color: '#a855f7',
    desc: 'Showcase your talents in dance, music, or any performing art on the main stage. Do not exceed the given time limit or interrupt other performances.',
    teamSize: '1-6 members',
    duration: '5-8 min per team',
    venue: 'Open Air Stage',
    rules: [
      'Participation: Individual or team of up to 6 members.',
      'Performances can include dance, singing, mimicry, or any performing art.',
      'Vulgarity or offensive content will lead to immediate disqualification.',
      'Background music / tracks must be submitted 1 day before the event.',
      'Props are allowed but must be arranged by the participants themselves.',
      'Do not exceed the given time limit; do not interrupt other performances.',
      'Participants must report to the stage 30 minutes before scheduled time.',
      'The decision of the judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Performance Quality (50%) -- skill, execution, and entertainment value.',
      'Creativity (30%) -- originality and innovative presentation of the act.',
      'Stage Presence (20%) -- confidence, energy, and audience engagement.',
    ],
  },
  {
    title: 'ACTUNE',
    icon: Mic2,
    color: '#a855f7',
    desc: 'A fusion of acting and music! Three rounds: guess songs from BGM, identify songs from images, and act out songs. No lip syncing in Round 3.',
    teamSize: '3 members (no solo)',
    duration: '3 Rounds',
    venue: 'Open Air Stage',
    rules: [
      'Teams must consist of exactly 3 members -- solo participation is not allowed.',
      'Round 1: Guess the song from BGM (10-15 seconds given).',
      'Round 2: Identify the song from an image (20-25 seconds given).',
      'Round 3: Guess the song by action/performance (40-50 seconds given).',
      'No lip syncing is allowed in Round 3 -- if done, the team will be disqualified.',
      'No mobile phones or external help allowed -- use may lead to disqualification.',
      'Answers must be given within the specified time limits.',
      'Correct answers earn points; a tiebreaker will be held if needed.',
      'The team with the highest score wins. Judges decision is final.',
    ],
    judgingCriteria: [
      'Accuracy -- correct identification of the song within the time limit.',
      'Speed -- faster correct answers used as tiebreaker between equal scores.',
      'Round 3 Performance -- expression and quality of acting out the song.',
      'Overall Score -- cumulative points across all three rounds determine the winner.',
    ],
  },
  {
    title: 'TECH MEME',
    icon: BookOpen,
    color: '#a855f7',
    desc: 'Create 3-5 original tech-themed memes in a timed challenge. Content must relate to coding, programmers life, bugs, AI, or tech college life.',
    teamSize: '2 members',
    duration: '2 Rounds',
    venue: 'Computer Lab',
    rules: [
      'Participation: Team of exactly 2 members.',
      'Each team can submit 3-5 memes within the given time.',
      'Memes must be original -- no reposts or copied content.',
      'Submission format: Image or PPT.',
      'Content must be appropriate, non-offensive, and tech-related.',
      'Theme must relate to coding, programmers life, bugs, AI, or tech college life.',
      'Round 1: Teams submit memes; judges shortlist top teams based on humour, creativity, and originality.',
      'Round 2: Shortlisted teams present their memes (2-3 min explanation per team).',
      'Teams will be ranked based on total scores. The highest-scoring team wins.',
      'The decision of judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Humour & Creativity -- how funny, original, and clever the memes are.',
      'Relatability -- how well the content connects with CSE students and tech culture.',
      'Overall Impact -- audience reaction and presentation confidence in Round 2.',
    ],
  },
  {
    title: 'POSTER PRESENTATION',
    icon: ImageIcon,
    color: '#a855f7',
    desc: 'Create an original poster on a spot-given theme in 45 minutes, then present it. Top 6 teams enter a Q&A final round testing concept understanding.',
    teamSize: '1-2 members',
    duration: '45 min + Q&A Round',
    venue: 'Exhibition Hall',
    rules: [
      'Participation: Individual or team of up to 2 members.',
      'Theme will be given on the spot during the event.',
      'Time allotted: 45 minutes to create the poster.',
      'Participants must bring their own materials (chart paper, markers, colours, etc.).',
      'Posters must be original and relevant to the given theme.',
      'Each team will present their poster (2-minute presentation per team).',
      'Top 6 teams will be shortlisted for Round 2 -- a Q&A session with the judges.',
      'No digital printing is allowed; all work must be done manually.',
      'The decision of judges/coordinators will be final and binding.',
    ],
    judgingCriteria: [
      'Creativity & Design (Round 1) -- visual appeal, layout, and artistic quality.',
      'Clarity of Content (Round 1) -- how effectively the theme is communicated.',
      'Relevance to Theme (Round 1) -- accuracy of interpretation and subject matter.',
      'Confidence & Communication (Round 2) -- presentation skills during Q&A.',
      'Depth of Understanding (Round 2) -- subject knowledge and design choices.',
    ],
  },
];

// Modal
const EventModal = ({ event, onClose }: { event: Event; onClose: () => void }) => {
  const Icon = event.icon;
  const overlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    window.dispatchEvent(new Event('modal-open'));
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' });
    gsap.fromTo(boxRef.current, { opacity: 0, scale: 0.92, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: 'back.out(1.2)' });
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.dispatchEvent(new Event('modal-close'));
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.12, onComplete: onClose });
  };

  return createPortal(
    <div ref={overlayRef} onClick={handleClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,5,8,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(0.75rem, 4vw, 1.5rem)' }}
    >
      <div ref={boxRef} onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 5vw, 2.5rem)', border: `1px solid ${event.color}40`, borderRadius: '16px', background: '#0a0a0f', boxShadow: '0 8px 32px rgba(0,0,0,0.8)', position: 'relative', overflowX: 'hidden' }}
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', margin: 0, letterSpacing: '1px' }}>{event.title}</h2>
              {event.badge && (
                <span style={{ fontSize: '0.62rem', fontFamily: 'Orbitron', padding: '0.15rem 0.5rem', borderRadius: '6px', background: `${event.color}22`, border: `1px solid ${event.color}55`, color: event.color, letterSpacing: '1.5px', fontWeight: 700 }}>
                  {event.badge}
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0', lineHeight: 1.5 }}>{event.desc}</p>
          </div>
        </div>

        {/* Meta chips: Team Size | Duration | Venue */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
          {[
            { label: 'Team Size', val: event.teamSize },
            { label: 'Duration', val: event.duration },
            { label: 'Venue', val: event.venue },
          ].map(m => (
            <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '0.65rem 0.75rem' }}>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-secondary)', letterSpacing: '1.5px', marginBottom: '0.25rem' }}>{m.label.toUpperCase()}</div>
              <div style={{ fontSize: 'clamp(0.68rem, 2vw, 0.85rem)', fontWeight: 700, fontFamily: 'Orbitron', color: event.color, lineHeight: 1.3, wordBreak: 'break-word' }}>{m.val}</div>
            </div>
          ))}
        </div>

        {/* Rules and Guidelines */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '0.9rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: event.color }}>&#9658;</span> RULES &amp; GUIDELINES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {event.rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={15} color={event.color} style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Judging Criteria */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '0.9rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={14} style={{ color: event.color }} /> JUDGING CRITERIA
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {event.judgingCriteria.map((criteria, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.5rem 0.75rem', background: `${event.color}08`, border: `1px solid ${event.color}20`, borderRadius: '8px' }}>
                <span style={{ color: event.color, fontWeight: 700, fontSize: '0.78rem', flexShrink: 0, marginTop: '2px', fontFamily: 'Orbitron' }}>{String(i + 1).padStart(2, '0')}.</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{criteria}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Register button -- unchanged */}
        <a
          href="https://forms.gle/qLacCgJgH1axd9f47"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', display: 'flex', boxSizing: 'border-box', whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.4, background: `linear-gradient(135deg, ${event.color === '#a855f7' ? '#a855f7, #7c3aed' : '#ff2a2a, #cc0000'})` }}
        >
          <ExternalLink size={16} /> Register for {event.title}
        </a>
      </div>
    </div>,
    document.body
  );
};

// Card
const EventCard = memo(({ event, index, badge, onOpen }: { event: Event; index: number; badge: string; onOpen: () => void }) => {
  const Icon = event.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, delay: index * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true }
      }
    );
  }, []);

  return (
    <div ref={cardRef} className="glass-panel"
      style={{ opacity: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', borderColor: `${event.color}22`, willChange: 'transform' }}
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

      {/* Title + optional badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: '1.05rem', margin: 0, letterSpacing: '0.5px' }}>{event.title}</h3>
        {event.badge && (
          <span style={{ fontSize: '0.58rem', fontFamily: 'Orbitron', padding: '0.12rem 0.45rem', borderRadius: '5px', background: `${event.color}20`, border: `1px solid ${event.color}50`, color: event.color, letterSpacing: '1.5px', fontWeight: 700 }}>
            {event.badge}
          </span>
        )}
      </div>

      {/* Quick info chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.7rem', padding: '0.18rem 0.5rem', borderRadius: '100px', background: `${event.color}12`, border: `1px solid ${event.color}25`, color: event.color, fontFamily: 'Orbitron', whiteSpace: 'nowrap' }}>
          Team: {event.teamSize}
        </span>
        <span style={{ fontSize: '0.7rem', padding: '0.18rem 0.5rem', borderRadius: '100px', background: `${event.color}12`, border: `1px solid ${event.color}25`, color: event.color, fontFamily: 'Orbitron', whiteSpace: 'nowrap' }}>
          {event.duration}
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.6 }}>{event.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: event.color, fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem', fontFamily: 'Orbitron' }}>
        View Details <ArrowRight size={14} />
      </div>
    </div>
  );
});

const Events: React.FC = () => {
  const [selected, setSelected] = useState<Event | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true }
      }
    );
  }, []);

  return (
    <section id="events" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">WHAT&apos;S IN STORE</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '1.5rem' }}>
            EVENTS <span style={{ color: 'var(--neon-red)' }}>ARENA</span>
          </h2>
          <div className="glass-panel fee-banner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', padding: '1.25rem 2rem', borderColor: 'rgba(0,212,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Registration Fee:</span>
              <span style={{ color: 'white', fontWeight: 700, fontFamily: 'Orbitron', fontSize: '0.95rem' }}>&#8377;100 / Event</span>
            </div>
            <div className="fee-divider" style={{ width: '1px', background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="pulse-dot" style={{ background: 'var(--neon-blue)', boxShadow: '0 0 8px var(--neon-blue)' }} />
              <span style={{ color: 'var(--neon-blue)', fontWeight: 700, fontFamily: 'Orbitron', fontSize: '0.9rem' }}>Last Date for Registration: APRIL 05</span>
            </div>
          </div>
        </div>

        {/* Technical Events */}
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

        {/* Non-Technical Events */}
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
