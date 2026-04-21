import React from 'react';

export default function GlanceFitReport() {
  return (
    <div className="report-content-inner">
      <div style={{ display: 'flex', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>Atomic Habits in UI</h2>
          <p style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, marginBottom: '24px' }}>
            GlanceFit's core hypothesis was that friction—not motivation—is the primary barrier to fitness. We designed a 'Zero-Step' interface that surfaced workout prompts directly on the lock screen.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['In-Depth UX Testing', 'Behavioral Psychology Integration', 'Retention Benchmarking'].map(item => (
              <li key={item} style={{ padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '14px', color: 'rgba(0,0,0,0.5)' }}>
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>
        <img 
          src="https://picsum.photos/seed/fitness/500/700" 
          alt="GlanceFit UI" 
          referrerPolicy="no-referrer"
          style={{ width: '300px', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
        />
      </div>
    </div>
  );
}
