import React from 'react';
import { useTriage } from '../context/TriageContext';
import { MOCK_PHC_DIRECTORY } from '../data/mockData';
import { MapPin, Phone, UserCheck, Clock } from 'lucide-react';

export const ClinicLocator = () => {
  const { activeState, currentTriage } = useTriage();

  const clinics = MOCK_PHC_DIRECTORY[activeState] || MOCK_PHC_DIRECTORY['Tamil Nadu'];

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#f9fafb',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <MapPin size={16} color="#38bdf8" />
        Primary Health Centres ({activeState})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {clinics.map((clinic, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <strong style={{ color: '#f9fafb', fontSize: '13px' }}>{clinic.name}</strong>
              <span style={{ fontSize: '11px', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                {clinic.distance}
              </span>
            </div>

            <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <MapPin size={12} color="#6b7280" />
              <span>{clinic.location}</span>
            </div>

            <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Clock size={12} color="#6b7280" />
              <span>{clinic.timing}</span>
            </div>

            <div style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <UserCheck size={12} color="#6b7280" />
              <span>Duty Medical Officer: {clinic.doctor}</span>
            </div>

            <a
              href={`tel:${clinic.contact}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#10b981',
                fontSize: '12px',
                fontWeight: '500',
                textDecoration: 'none',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}
            >
              <Phone size={12} />
              <span>{clinic.contact}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
