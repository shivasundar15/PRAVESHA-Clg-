import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('April 09, 2026 00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const Digit = ({ value, label }: { value: number; label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          border: '2px solid #dc2626',
          borderRadius: '0.5rem',
          padding: 'clamp(0.5rem, 1.5vw, 1rem)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          position: 'relative',
          zIndex: 1,
          minWidth: 'clamp(3.5rem, 10vw, 5.5rem)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div className="tailwind-pulse" style={{
            fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            color: '#ef4444',
            fontFamily: 'monospace',
            lineHeight: 1
          }}>
            {String(value).padStart(2, '0')}
          </div>
        </div>
        <div className="tailwind-pulse" style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '0.5rem',
          filter: 'blur(4px)',
          zIndex: 0
        }} />
      </div>
      <span style={{
        fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)',
        color: '#f87171',
        marginTop: '0.5rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        {label}
      </span>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes tailwindPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .tailwind-pulse {
          animation: tailwindPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.5rem, 2vw, 1.5rem)',
        margin: 'clamp(1.5rem, 4vw, 3rem) 0'
      }}>
        <Digit value={timeLeft.days} label="Days" />
        <div className="tailwind-pulse" style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: '#ef4444', paddingBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>:</div>
        <Digit value={timeLeft.hours} label="Hours" />
        <div className="tailwind-pulse" style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: '#ef4444', paddingBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>:</div>
        <Digit value={timeLeft.minutes} label="Minutes" />
        <div className="tailwind-pulse" style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', fontWeight: 'bold', color: '#ef4444', paddingBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>:</div>
        <Digit value={timeLeft.seconds} label="Seconds" />
      </div>
    </>
  );
};

export default CountdownTimer;
