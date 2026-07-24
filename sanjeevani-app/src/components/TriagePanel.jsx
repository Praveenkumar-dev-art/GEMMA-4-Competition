import React from 'react';
import { useTriage } from '../context/TriageContext';
import { Activity, ShieldAlert, Clock, CheckCircle2, FileText } from 'lucide-react';

export const TriagePanel = () => {
  const { currentTriage, setShowTriagePassModal, activeState } = useTriage();

  if (!currentTriage) {
    return (
      <div className="glass-panel" style={{
        padding: '30px',
        textAlign: 'center',
        color: '#6b7280',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px'
      }}>
        <Activity size={40} color="#38bdf8" style={{ opacity: 0.5, marginBottom: '12px' }} />
        <h4 style={{ color: '#9ca3af', fontSize: '16px', fontWeight: '500' }}>No Active Triage Session</h4>
        <p style={{ fontSize: '13px', marginTop: '6px', maxWidth: '280px' }}>
          Speak or type symptoms on the left panel to trigger Gemma 4 triage interpretation.
        </p>
      </div>
    );
  }

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'RED':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid #ef4444',
          color: '#ef4444',
          label: 'RED (Emergency)',
          icon: <ShieldAlert size={20} color="#ef4444" />
        };
      case 'YELLOW':
        return {
          bg: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid #f59e0b',
          color: '#f59e0b',
          label: 'YELLOW (Urgent Care)',
          icon: <Clock size={20} color="#f59e0b" />
        };
      case 'GREEN':
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          color: '#10b981',
          label: 'GREEN (Self-Care)',
          icon: <CheckCircle2 size={20} color="#10b981" />
        };
    }
  };

  const styleInfo = getSeverityStyle(currentTriage.severity);

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          WHO Triage Level
        </span>
        <span style={{ fontSize: '12px', color: '#38bdf8' }}>Region: {activeState}</span>
      </div>

      {/* Severity Badge */}
      <div style={{
        background: styleInfo.bg,
        border: styleInfo.border,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {styleInfo.icon}
        <div>
          <div style={{ color: styleInfo.color, fontWeight: '700', fontSize: '16px' }}>
            {styleInfo.label}
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '2px' }}>
            Detected Language: {currentTriage.detected_language}
          </div>
        </div>
      </div>

      {/* Symptoms Parsed */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
          Clinical Interpretation:
        </span>
        <p style={{ fontSize: '14px', color: '#f9fafb', background: 'rgba(0, 0, 0, 0.2)', padding: '10px 12px', borderRadius: '8px' }}>
          "{currentTriage.translated_symptoms}"
        </p>
      </div>

      {/* Clinical Rationale */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
          Evidence-Based Rationale:
        </span>
        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.5' }}>
          {currentTriage.clinical_rationale}
        </p>
      </div>

      {/* Action Recommendation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '14px',
        borderRadius: '10px',
        borderLeft: `4px solid ${styleInfo.color}`,
        marginBottom: '20px'
      }}>
        <strong style={{ color: '#f9fafb', fontSize: '13px', display: 'block', marginBottom: '4px' }}>Recommended Care Plan:</strong>
        <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{currentTriage.recommended_action}</span>
      </div>

      {/* Export Triage Pass Button */}
      <button
        onClick={() => setShowTriagePassModal(true)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          color: '#38bdf8',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <FileText size={16} />
        <span>Generate Diagnostic Triage Pass</span>
      </button>
    </div>
  );
};
