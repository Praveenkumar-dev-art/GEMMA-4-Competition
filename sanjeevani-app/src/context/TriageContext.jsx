import React, { createContext, useContext, useState } from 'react';
import { REGIONAL_PRESETS } from '../data/mockData';

const TriageContext = createContext();

export const TriageProvider = ({ children }) => {
  const [activeLanguage, setActiveLanguage] = useState('Tamil');
  const [activeState, setActiveState] = useState('Tamil Nadu');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'வணக்கம்! I am Sanjeevani, your multilingual health triage assistant. Speak or type your symptoms in Tamil, Malayalam, or Telugu.',
      translation: 'Hello! I am Sanjeevani, your multilingual health triage assistant.'
    }
  ]);
  const [currentTriage, setCurrentTriage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showTriagePassModal, setShowTriagePassModal] = useState(false);

  const switchLanguage = (lang, stateName) => {
    setActiveLanguage(lang);
    setActiveState(stateName);
  };

  const processUserPrompt = (userText) => {
    // Check if matching preset exists
    const matchingPreset = REGIONAL_PRESETS.find(
      p => p.language === activeLanguage && userText.toLowerCase().includes(p.dialect_text.slice(0, 5).toLowerCase())
    ) || REGIONAL_PRESETS.find(p => p.language === activeLanguage) || REGIONAL_PRESETS[0];

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      language: activeLanguage
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Simulate Gemma 4 interpretation delay
    setTimeout(() => {
      const result = matchingPreset.triage_result;
      setCurrentTriage(result);

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `[Gemma 4 Triage Result]: Severity is ${result.severity}. ${result.recommended_action}`,
        triageData: result
      };

      setMessages(prev => [...prev, botReply]);

      if (result.severity === 'RED') {
        setShowEmergencyModal(true);
      }
    }, 1200);
  };

  return (
    <TriageContext.Provider value={{
      activeLanguage,
      activeState,
      switchLanguage,
      messages,
      currentTriage,
      setCurrentTriage,
      isRecording,
      setIsRecording,
      isPlayingAudio,
      setIsPlayingAudio,
      showEmergencyModal,
      setShowEmergencyModal,
      showTriagePassModal,
      setShowTriagePassModal,
      processUserPrompt
    }}>
      {children}
    </TriageContext.Provider>
  );
};

export const useTriage = () => useContext(TriageContext);
