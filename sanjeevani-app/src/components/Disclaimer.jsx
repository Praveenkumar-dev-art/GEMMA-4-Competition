import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer = () => {
  return (
    <div style={{
      background: 'rgba(245, 158, 11, 0.1)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      fontSize: '13px',
      color: '#fef08a'
    }}>
      <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
      <span>
        <strong>Medical Disclaimer:</strong> Sanjeevani is an automated triage decision support tool. It evaluates care urgency based on WHO guidelines and does <em>not</em> provide medical diagnoses. For life-threatening emergencies, call <strong>108</strong> immediately.
      </span>
    </div>
  );
};
