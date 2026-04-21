import React from 'react';

export default function KShopReport() {
  return (
    <div className="report-content-inner">
      <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>Failing Fast in Social Commerce</h2>
      <p style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, marginBottom: '32px' }}>
        K-Shop was a Series A venture aimed at digitizing social trust in Southeast Asia. This report documents the three major pivots we executed before successfully finding a model that balanced CAC and LTV.
      </p>
      <div style={{ background: '#f9f8f6', padding: '40px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px', color: '#f26522' }}>MVP ITERATIONS</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['1. C2C Group Buying Model', '2. Reseller/Micro-Influencer Dashboard', '3. Direct-to-Community Logistics'].map((step, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
              <span style={{ fontWeight: 500 }}>{step}</span>
              <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: '12px' }}>TESTED // FAILED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
