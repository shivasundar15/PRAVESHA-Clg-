import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Info, CheckCircle2, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ComboEventDashboard: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !dashboardRef.current) return;
    
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true }
      }
    );

    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: dashboardRef.current, start: 'top 85%', once: true }
      }
    );
  }, []);

  // Google Form URL placeholder (Update this string when you have the real link)
  const GOOGLE_FORM_URL = 'https://forms.gle/qLacCgJgH1axd9f47';

  return (
    <section id="combo" ref={sectionRef} style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ border: '1px solid rgba(168,85,247,0.4)', color: 'var(--neon-purple)', background: 'rgba(168,85,247,0.1)' }}>EXCLUSIVE REGISTRATION</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem' }}>
            REGISTRATION <span style={{ color: 'var(--neon-purple)' }}>DASHBOARD</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            Choose individual events or unlock our exclusive combo pricing! Direct access to our registration portal below.
          </p>
        </div>

        {/* Dashboard Visual Banner */}
        <div 
          ref={dashboardRef}
          className="glass-panel" 
          style={{ 
            opacity: 0,
            padding: 'clamp(2rem, 5vw, 3.5rem)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(168, 85, 247, 0.05)'
          }}
        >
          {/* Aesthetic background flares */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2rem', zIndex: 1 }}>
            
            {/* Combo Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-blue)' }}>
                   <Zap size={24} />
                 </div>
                 <h3 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'Orbitron', letterSpacing: '1px' }}>COMBO <span style={{ color: 'var(--neon-blue)' }}>OFFER</span></h3>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Experience the best of both worlds! Select exactly <strong style={{ color: 'white' }}>1 Technical Event</strong> and <strong style={{ color: 'white' }}>1 Non-Technical Event</strong> to avail our special combo package pricing.
              </p>

              {/* Pricing Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
                  <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>Individual Event Fee</span>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>₹100</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '10px', boxShadow: '0 0 20px rgba(168,85,247,0.15)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600, letterSpacing: '0.5px', color: 'var(--neon-purple)' }}>Combo Event Fee</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(1 Tech + 1 Non-Tech)</span>
                  </div>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '1.4rem', fontWeight: 900, color: 'white', textShadow: '0 0 10px rgba(168,85,247,0.8)' }}>₹150</span>
                </div>
              </div>
            </div>

            {/* Special Callouts & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', background: 'rgba(255,42,42,0.08)', border: '1px solid rgba(255,42,42,0.3)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Info size={24} color="var(--neon-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.05rem', margin: '0 0 0.5rem 0', letterSpacing: '1px' }}>PAPER PRESENTATION (SPECIAL)</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                      Paper Presentation involves an <strong style={{ color: 'var(--neon-red)' }}>ISBN Certificate</strong> and has a discrete fee of <strong style={{ color: 'white' }}>₹600</strong>. It cannot be combined with the combo offer.
                    </p>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={24} color="var(--text-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.05rem', margin: '0 0 0.5rem 0', letterSpacing: '1px' }}>HOW TO REGISTER</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                      Click the button below to be redirected to our Google Form. Select your preferred events mapping to your chosen fee structure within the form!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a 
                href={GOOGLE_FORM_URL} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  fontSize: '1.1rem', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--neon-purple), #7c3aed)',
                  boxShadow: '0 10px 30px rgba(168,85,247,0.4)'
                }}
              >
                REGISTER HERE <ExternalLink size={20} />
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ComboEventDashboard;
