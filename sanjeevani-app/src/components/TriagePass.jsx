import React from 'react';
import { useTriage } from '../context/TriageContext';
import { X, Printer, CheckCircle } from 'lucide-react';

export const TriagePass = () => {
  const { showTriagePassModal, setShowTriagePassModal, currentTriage, activeState } = useTriage();

  if (!showTriagePassModal || !currentTriage) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '520px',
        background: '#0f172a',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        padding: '28px',
        borderRadius: '20px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setShowTriagePassModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Pass Header */}
        <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Official Triage Referral Slip
          </span>
          <h2 style={{ fontSize: '20px', color: '#f9fafb', marginTop: '4px' }}>SANJEEVANI HEALTH TRIAGE PASS</h2>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>Issued for Primary Health Centre (PHC) Consultation • {activeState}</p>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#6b7280' }}>Pass Token ID:</span>
            <strong style={{ color: '#f9fafb', fontFamily: 'monospace' }}>SNJ-2026-04829</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#6b7280' }}>Assessed Language:</span>
            <strong style={{ color: '#f9fafb' }}>{currentTriage.detected_language}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#6b7280' }}>Triage Urgency:</span>
            <strong style={{
              color: currentTriage.severity === 'RED' ? '#ef4444' : currentTriage.severity === 'YELLOW' ? '#f59e0b' : '#10b981'
            }}>
              {currentTriage.severity}
            </strong>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Reported Symptoms:</span>
            <span style={{ fontSize: '13px', color: '#f9fafb', fontStyle: 'italic' }}>"{currentTriage.original_symptoms}"</span>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>Clinical Summary:</span>
            <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{currentTriage.translated_symptoms}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.print()}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              background: '#38bdf8',
              color: '#0b0f19',
              fontWeight: '600',
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Printer size={16} />
            <span>Print Triage Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
