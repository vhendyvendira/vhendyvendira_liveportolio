import React from 'react';

export default function MetaGoReport() {
  return (
    <div className="report-content-inner" style={{ fontFamily: 'var(--font-sans)', color: '#1a1a1a' }}>
      <section style={{ marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '64px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.04em' }}>A Tokenized Cinema Experiment</h2>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(0,0,0,0.8)', marginBottom: '32px' }}>
              MetaGo was born from the intersection of film production and decentralized finance. We asked a simple question: Can a community of fans successfully act as a film studio executive board?
            </p>
          </div>
          <div style={{ padding: '32px', background: 'white', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: '#f26522', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.1em' }}>STATISTICS</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>12,400+</div>
              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Active token holders</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 600 }}>3 Projects</div>
              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Funded by treasury</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <img 
          src="https://picsum.photos/seed/crypto-film/1200/500" 
          alt="Film Production" 
          referrerPolicy="no-referrer"
          style={{ width: '100%', borderRadius: '12px', marginBottom: '40px' }}
        />
        <div style={{ columns: 2, columnGap: '48px', color: 'rgba(0,0,0,0.7)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '24px' }}>
            Our GTM strategy leveraged the power of niche communities. We didn't target broad crypto investors; we targeted independent filmmakers and cinephiles who were tired of the traditional studio gatekeeping model.
          </p>
          <p>
            The technical implementation involved a DAO governance structure that awarded voting weight based on both token quantity and length of holding, preventing short-term market manipulation from dictating artistic direction.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px', background: '#000', color: '#fff', borderRadius: '16px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px' }}>Legacy & Aftermath</h3>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
          While MetaGo eventually merged with a larger media conglomerate, it pioneered the "Watch-to-Earn" model and provided a blueprint for future decentralized intellectual property management.
        </p>
      </section>
    </div>
  );
}
