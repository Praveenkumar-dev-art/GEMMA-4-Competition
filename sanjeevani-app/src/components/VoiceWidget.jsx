import React from 'react';
import { useTriage } from '../context/TriageContext';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { REGIONAL_PRESETS } from '../data/mockData';

export const VoiceWidget = () => {
  const { 
    activeLanguage, 
    isRecording, 
    setIsRecording, 
    isPlayingAudio, 
    setIsPlayingAudio,
    processUserPrompt 
  } = useTriage();

  const presetsForLang = REGIONAL_PRESETS.filter(p => p.language === activeLanguage);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate audio processing
      setTimeout(() => {
        setIsRecording(false);
        const sampleText = presetsForLang[0]?.dialect_text || 'நெஞ்சு வலிக்குது';
        processUserPrompt(sampleText);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handlePresetClick = (preset) => {
    processUserPrompt(preset.dialect_text);
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#f9fafb', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#38bdf8" />
          Voice & Dialect Input (Gemma 4 Multimodal)
        </h3>

        {isPlayingAudio && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8' }}>
            <Volume2 size={16} className="pulse-emergency" />
            <span>Reading out in {activeLanguage}...</span>
          </div>
        )}
      </div>

      {/* Mic Recorder Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <button
          onClick={toggleRecording}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: '12px',
            border: isRecording ? '1px solid #ef4444' : '1px solid rgba(56, 189, 248, 0.4)',
            background: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.15)',
            color: isRecording ? '#ef4444' : '#38bdf8',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          <span>{isRecording ? 'Listening to speech...' : 'Tap & Speak Symptom'}</span>
        </button>

        {isRecording && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        )}
      </div>

      {/* Preset Phrases */}
      <div>
        <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
          Try sample regional dialect phrases ({activeLanguage}):
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {presetsForLang.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontSize: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              "{preset.dialect_text}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
