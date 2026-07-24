export const REGIONAL_PRESETS = [
  // TAMIL PRESETS
  {
    id: 'tamil_red',
    language: 'Tamil',
    state: 'Tamil Nadu',
    dialect_text: 'ரொம்ப நெஞ்சு வலிக்குது, அப்புறம் மூச்சு விட முடியல ஐயா',
    english_translation: 'Severe chest pain, and unable to breathe sir',
    triage_result: {
      detected_language: 'Tamil',
      original_symptoms: 'ரொம்ப நெஞ்சு வலிக்குது, அப்புறம் மூச்சு விட முடியல ஐயா',
      translated_symptoms: 'Severe acute chest pain accompanied by dyspnea (shortness of breath)',
      severity: 'RED',
      clinical_rationale: 'Symptoms indicate acute cardiovascular or severe respiratory crisis (red flag). Patient requires immediate life-support intervention.',
      recommended_action: 'Proceed immediately to the nearest emergency room or call Emergency Hotline 108.',
      trigger_function: {
        name: 'showEmergencyContacts',
        parameters: { location: 'Coimbatore, Tamil Nadu' }
      }
    }
  },
  {
    id: 'tamil_yellow',
    language: 'Tamil',
    state: 'Tamil Nadu',
    dialect_text: 'வயிர் பயங்கரமா வலிக்குது, வாந்தி வர்ற மாதிரி இருக்கு',
    english_translation: 'Stomach is hurting badly, feels like vomiting',
    triage_result: {
      detected_language: 'Tamil',
      original_symptoms: 'வயிர் பயங்கரமா வலிக்குது, வாந்தி வர்ற மாதிரி இருக்கு',
      translated_symptoms: 'Moderate to severe abdominal discomfort with nausea',
      severity: 'YELLOW',
      clinical_rationale: 'Persistent abdominal pain and nausea without immediate life-threatening markers (no vomiting blood, no collapse). Requires evaluation within 24 hours.',
      recommended_action: 'Visit a Primary Health Centre (PHC) within 24 hours for gastrointestinal clinical assessment.',
      trigger_function: {
        name: 'findNearbyPHC',
        parameters: { location: 'Coimbatore, Tamil Nadu' }
      }
    }
  },

  // MALAYALAM PRESETS
  {
    id: 'malayalam_red',
    language: 'Malayalam',
    state: 'Kerala',
    dialect_text: 'നെഞ്ച് കടുപ്പത്തിൽ വേദനിക്കുന്നു, ശ്വാസം മുട്ടുന്നുണ്ട്',
    english_translation: 'Chest hurts severely, experiencing tightness and shortness of breath',
    triage_result: {
      detected_language: 'Malayalam',
      original_symptoms: 'നെഞ്ച് കടുപ്പത്തിൽ വേദനിക്കുന്നു, ശ്വാസം മുട്ടുന്നുണ്ട്',
      translated_symptoms: 'Severe retrosternal chest pain with respiratory distress',
      severity: 'RED',
      clinical_rationale: 'Red-flag clinical symptoms suggesting potential cardiac ischemia or acute pulmonary emergency.',
      recommended_action: 'Immediate transportation to hospital via ambulance (Dial 108/102).',
      trigger_function: {
        name: 'showEmergencyContacts',
        parameters: { location: 'Thiruvananthapuram, Kerala' }
      }
    }
  },
  {
    id: 'malayalam_yellow',
    language: 'Malayalam',
    state: 'Kerala',
    dialect_text: 'കടുത്ത പനിയും തലവേദനയും ഉണ്ട്, ശരീരം മൊത്തം വേദനയാ',
    english_translation: 'Severe fever and headache, whole body is aching',
    triage_result: {
      detected_language: 'Malayalam',
      original_symptoms: 'കടുത്ത പനിയും തലവേദനയും ഉണ്ട്, ശരീരം മൊത്തം വേദനയാ',
      translated_symptoms: 'High fever, cephalalgia (headache), and generalized myalgia',
      severity: 'YELLOW',
      clinical_rationale: 'Systemic febrile illness with moderate body aches. Requires medical screening for acute viral infection.',
      recommended_action: 'Consult a medical officer at the local Family Health Centre (FHC) within 24 hours.',
      trigger_function: {
        name: 'findNearbyPHC',
        parameters: { location: 'Thiruvananthapuram, Kerala' }
      }
    }
  },

  // TELUGU PRESETS
  {
    id: 'telugu_green',
    language: 'Telugu',
    state: 'Andhra Pradesh',
    dialect_text: 'ఒంటి నొప్పులు మరియు కొద్దిగా జ్వరం ఉంది నాయనా',
    english_translation: 'Body pain and mild fever is present sir',
    triage_result: {
      detected_language: 'Telugu',
      original_symptoms: 'ఒంటి నొప్పులు మరియు కొద్దిగా జ్వరం ఉంది నాయనా',
      translated_symptoms: 'Mild pyrexia (fever) and minor physical fatigue',
      severity: 'GREEN',
      clinical_rationale: 'Mild transient symptoms without red flags. Patient can manage safely at home with hydration and rest.',
      recommended_action: 'Maintain oral hydration, take adequate rest, and monitor body temperature. Seek care if fever exceeds 102°F.',
      trigger_function: {
        name: 'none',
        parameters: {}
      }
    }
  },
  {
    id: 'telugu_red',
    language: 'Telugu',
    state: 'Andhra Pradesh',
    dialect_text: 'ఛాతీ లో విపరీతమైన నొప్పి ఉంది, ఊపిరి ఆడటం లేదు',
    english_translation: 'Severe pain in the chest, unable to take breath',
    triage_result: {
      detected_language: 'Telugu',
      original_symptoms: 'ఛాతీ లో విపరీతమైన నొప్పి ఉంది, ఊపిరి ఆడటం లేదు',
      translated_symptoms: 'Severe acute thoracic pain accompanied by respiratory compromise',
      severity: 'RED',
      clinical_rationale: 'High-risk cardiovascular crisis signature. Requires emergency ambulance and immediate medical intervention.',
      recommended_action: 'Call Emergency Services 108 immediately and keep patient lying flat.',
      trigger_function: {
        name: 'showEmergencyContacts',
        parameters: { location: 'Visakhapatnam, Andhra Pradesh' }
      }
    }
  }
];

export const MOCK_PHC_DIRECTORY = {
  'Tamil Nadu': [
    {
      name: 'Government Primary Health Centre (PHC)',
      location: 'Thudiyalur, Coimbatore District',
      distance: '2.4 km',
      timing: '24 Hours Emergency / 8 AM - 4 PM OPD',
      doctor: 'Dr. R. Selvam, M.B.B.S.',
      contact: '+91 422 2642100'
    },
    {
      name: 'Community Health Centre (CHC)',
      location: 'Perur, Coimbatore District',
      distance: '5.1 km',
      timing: '24 Hours Open',
      doctor: 'Dr. K. Meenakshi, M.D.',
      contact: '+91 422 2608400'
    }
  ],
  'Kerala': [
    {
      name: 'Government Family Health Centre (FHC)',
      location: 'Kaniyapuram, Thiruvananthapuram',
      distance: '1.8 km',
      timing: '24 Hours Emergency / 9 AM - 6 PM OPD',
      doctor: 'Dr. Anoop Nair, M.B.B.S.',
      contact: '+91 471 2750300'
    },
    {
      name: 'Primary Health Centre',
      location: 'Kazhakkoottam, Thiruvananthapuram',
      distance: '4.2 km',
      timing: '24 Hours Open',
      doctor: 'Dr. Priya Varma, M.D.',
      contact: '+91 471 2418200'
    }
  ],
  'Andhra Pradesh': [
    {
      name: 'Government Primary Health Centre',
      location: 'Anandapuram, Visakhapatnam',
      distance: '3.1 km',
      timing: '24 Hours Emergency / 8 AM - 2 PM OPD',
      doctor: 'Dr. V. Srinivas, M.B.B.S.',
      contact: '+91 891 2521100'
    },
    {
      name: 'Area Hospital & CHC',
      location: 'Bheemunipatnam, Visakhapatnam',
      distance: '6.5 km',
      timing: '24 Hours Open',
      doctor: 'Dr. S. Lakshmi, M.D.',
      contact: '+91 891 2795400'
    }
  ]
};
