import React from 'react';

export default function PrivyReport() {
  return (
    <div className="report-content-inner">
      <div style={{ padding: '64px', background: '#1a1a1a', borderRadius: '16px', color: 'white', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>Leveling Up Local Talent</h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '500px' }}>
          Bridging the gap between academic knowledge and industry-standard design performance.
        </p>
      </div>
      <div style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '24px' }}>
          The Privy Acceleration Program was designed as a high-intensity, 12-week bootcamp for emerging designers. The curriculum focused on "Thinking through Making," forcing students to iterate on real-world constraints.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <img src="https://picsum.photos/seed/edu1/400/400" alt="Session 1" style={{ borderRadius: '8px' }} referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/edu2/400/400" alt="Session 2" style={{ borderRadius: '8px' }} referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/edu3/400/400" alt="Session 3" style={{ borderRadius: '8px' }} referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
}
