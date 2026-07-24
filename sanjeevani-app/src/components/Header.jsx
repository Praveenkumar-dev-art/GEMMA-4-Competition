import React from 'react';
import { useTriage } from '../context/TriageContext';
import { Activity, ShieldAlert, Globe } from 'lucide-react';

export const Header = () => {
  const { activeLanguage, switchLanguage } = useTriage();

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 28px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)'
    }}>
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
        }}>
          <Activity size={24} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#f9fafb', letterSpacing: '-0.02em' }}>
            SANJEEVANI <span style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Gemma 4 Triage</span>
          </h1>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>Multilingual Health Triage Assistant • Southern India</p>
        </div>
      </div>

      {/* Language Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px' }}>
          <Globe size={16} color="#38bdf8" />
          <span>Regional Dialect:</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => switchLanguage('Tamil', 'Tamil Nadu')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              background: activeLanguage === 'Tamil' ? '#38bdf8' : 'transparent',
              color: activeLanguage === 'Tamil' ? '#0b0f19' : '#9ca3af',
              transition: 'all 0.2s ease'
            }}
          >
            தமிழ் (Tamil)
          </button>
          
          <button
            onClick={() => switchLanguage('Malayalam', 'Kerala')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              background: activeLanguage === 'Malayalam' ? '#38bdf8' : 'transparent',
              color: activeLanguage === 'Malayalam' ? '#0b0f19' : '#9ca3af',
              transition: 'all 0.2s ease'
            }}
          >
            മലയാളം (Malayalam)
          </button>

          <button
            onClick={() => switchLanguage('Telugu', 'Andhra Pradesh')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              background: activeLanguage === 'Telugu' ? '#38bdf8' : 'transparent',
              color: activeLanguage === 'Telugu' ? '#0b0f19' : '#9ca3af',
              transition: 'all 0.2s ease'
            }}
          >
            తెలుగు (Telugu)
          </button>
        </div>
      </div>
    </header>
  );
};
