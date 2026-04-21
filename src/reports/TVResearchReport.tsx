import React from 'react';

export default function TVResearchReport() {
  return (
    <div className="report-content-inner">
      <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>The Persistence of the 'Living Room'</h2>
      <p style={{ fontSize: '19px', color: 'rgba(0,0,0,0.7)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '700px' }}>
        Our research found that despite the rise of personal devices, the television remains the primary 'anchor' for social cohesion within the household. It has evolved from a broadcaster to a shared digital canvas.
      </p>
      <img 
        src="https://picsum.photos/seed/television/1200/500" 
        alt="Research Visualization" 
        referrerPolicy="no-referrer"
        style={{ width: '100%', borderRadius: '12px', marginBottom: '48px' }}
      />
      <div style={{ padding: '40px', borderLeft: '4px solid #f26522', background: 'rgba(242,101,34,0.03)' }}>
        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Key Finding</h4>
        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '15px' }}>
          74% of participants reported using their mobile devices *while* watching TV, indicating that TV is now part of a multi-screen ritual rather than a standalone attention-grabber.
        </p>
      </div>
    </div>
  );
}
