import React, { useState } from 'react';
import { useTriage } from '../context/TriageContext';
import { Send, User, Bot } from 'lucide-react';

export const ChatContainer = () => {
  const { messages, processUserPrompt, activeLanguage } = useTriage();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    processUserPrompt(inputText);
    setInputText('');
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '550px' }}>
      {/* Feed Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '13px',
        fontWeight: '600',
        color: '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>Triage Conversation Stream</span>
        <span style={{ fontSize: '11px', color: '#38bdf8' }}>Dialect: {activeLanguage}</span>
      </div>

      {/* Messages Feed */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: '12px',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            {msg.sender === 'bot' && (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={18} color="#38bdf8" />
              </div>
            )}

            <div style={{
              background: msg.sender === 'user' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: msg.sender === 'user' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 16px',
              borderRadius: '14px',
              color: '#f9fafb',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              <div>{msg.text}</div>
              {msg.translation && (
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px', fontStyle: 'italic' }}>
                  Translation: {msg.translation}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={18} color="#f9fafb" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} style={{
        padding: '14px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type symptoms in ${activeLanguage} or English...`}
          style={{
            flex: 1,
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#f9fafb',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            background: '#38bdf8',
            color: '#0b0f19',
            border: 'none',
            borderRadius: '10px',
            padding: '0 20px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Send</span>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
