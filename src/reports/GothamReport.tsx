import React from 'react';

export default function GothamReport() {
  return (
    <div className="report-content-inner" style={{ fontFamily: 'var(--font-sans)', color: '#1a1a1a' }}>
      <section style={{ marginBottom: '64px' }}>
        <img 
          src="https://picsum.photos/seed/gotham-1/1200/600" 
          alt="Gotham Risk Analysis" 
          referrerPolicy="no-referrer"
          style={{ width: '100%', borderRadius: '8px', marginBottom: '32px' }}
        />
        <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.03em' }}>Overview</h2>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(0,0,0,0.8)', marginBottom: '24px' }}>
          Gotham was developed as a response to the increasing complexity of decentralized financial protocols. Our goal was to create a "Risk Intelligence" layer that could autonomously identify unsustainable yield structures before they impacted the broader ecosystem.
        </p>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <img 
            src="https://picsum.photos/seed/gotham-2/600/400" 
            alt="Data Mapping" 
            referrerPolicy="no-referrer"
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <img 
            src="https://picsum.photos/seed/gotham-3/600/400" 
            alt="UI Interface" 
            referrerPolicy="no-referrer"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>The SURE Framework</h3>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(0,0,0,0.7)', marginBottom: '16px' }}>
          We established the SURE Framework—Sustainability, Utility, Reserve, and Entity—as the four pillars of our analysis. By mapping these vectors, we were able to predict the collapse of three major algorithmic stablecoins with 98.4% accuracy.
        </p>
      </section>

      <section style={{ padding: '48px', background: '#f6f6f1', borderRadius: '12px', marginBottom: '64px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#f26522' }}>Key Outcome</h3>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(0,0,0,0.8)' }}>
          By the end of the pilot, Gotham had monitored over $4.2B in locked value across 12 chains, identifying 2,400+ entities with questionable financial integrity. The project has since been integrated into the core risk stack of two major institutional custodians.
        </p>
      </section>
    </div>
  );
}
