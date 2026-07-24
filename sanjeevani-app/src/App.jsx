import React from 'react';
import { TriageProvider } from './context/TriageContext';
import { Header } from './components/Header';
import { Disclaimer } from './components/Disclaimer';
import { VoiceWidget } from './components/VoiceWidget';
import { ChatContainer } from './components/ChatContainer';
import { TriagePanel } from './components/TriagePanel';
import { ClinicLocator } from './components/ClinicLocator';
import { TriagePass } from './components/TriagePass';
import { EmergencyModal } from './components/EmergencyModal';

export default function App() {
  return (
    <TriageProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Disclaimer />

        {/* Main Content Layout */}
        <main style={{
          flex: 1,
          maxWidth: '1380px',
          width: '100%',
          margin: '0 auto',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: '24px'
        }}>
          {/* Left Column: Voice Recorder & Chat Feed */}
          <div>
            <VoiceWidget />
            <ChatContainer />
          </div>

          {/* Right Column: Active Triage Dashboard & PHC Directory */}
          <div>
            <TriagePanel />
            <ClinicLocator />
          </div>
        </main>

        <TriagePass />
        <EmergencyModal />

        {/* Footer */}
        <footer style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280',
          background: 'rgba(11, 15, 25, 0.9)'
        }}>
          Sanjeevani • Built for Kaggle Gemma 4 Hackathon (Track 2: Multilingual Health Triage) • Powered by Google DeepMind Gemma 4
        </footer>
      </div>
    </TriageProvider>
  );
}
