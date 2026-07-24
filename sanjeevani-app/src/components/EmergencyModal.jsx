import React from 'react';
import { useTriage } from '../context/TriageContext';
import { ShieldAlert, PhoneCall, X } from 'lucide-react';

export const EmergencyModal = () => {
  const { showEmergencyModal, setShowEmergencyModal, currentTriage } = useTriage();

  if (!showEmergencyModal) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(239, 68, 68, 0.25)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#111827',
        border: '2px solid #ef4444',
        padding: '30px',
        borderRadius: '24px',
        textAlign: 'center',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.5)',
        position: 'relative'
      }}>
        <button
          onClick={() => setShowEmergencyModal(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.2)',
          border: '2px solid #ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }} className="pulse-emergency">
          <ShieldAlert size={36} color="#ef4444" />
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>
          EMERGENCY SYMPTOMS DETECTED
        </h2>

        <p style={{ fontSize: '14px', color: '#f3f4f6', lineHeight: '1.5', marginBottom: '20px' }}>
          Gemma 4 has flagged your reported symptoms as <strong>HIGH RISK (RED LEVEL)</strong>. Immediate medical emergency response is required.
        </p>

        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '10px', marginBottom: '24px', textAlign: 'left', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <strong style={{ fontSize: '12px', color: '#fca5a5', display: 'block' }}>Red-Flag Rationale:</strong>
          <span style={{ fontSize: '13px', color: '#fee2e2' }}>{currentTriage?.clinical_rationale}</span>
        </div>

        <a
          href="tel:108"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            background: '#ef4444',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '16px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.6)'
          }}
        >
          <PhoneCall size={22} />
          <span>CALL 108 AMBULANCE NOW</span>
        </a>
      </div>
    </div>
  );
};
