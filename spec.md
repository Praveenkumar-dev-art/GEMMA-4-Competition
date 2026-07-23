# 📝 Sanjeevani: Technical Specification (spec.md)

This specification defines the functional requirements, system architecture, folder structure, UI layout, and mock datasets for **Sanjeevani**. It serves as a blueprint for the development team.

---

## 🏗️ 1. File Structure
The frontend application will be scaffolded under `./sanjeevani-app/` with the following structure:

```
sanjeevani-app/
├── public/
│   └── sounds/              # Audio assets for voice readouts
├── src/
│   ├── assets/              # Static icons and assets
│   ├── components/
│   │   ├── ChatContainer.jsx # Conversational interface for symptom input
│   │   ├── TriagePanel.jsx   # Side panel displaying active triage results
│   │   ├── AudioWidget.jsx   # Visual voice-input/readout controller
│   │   ├── ClinicLocator.jsx # Mock hospital finder for Southern states
│   │   ├── TriagePass.jsx    # Exportable patient diagnostic pass
│   │   └── Disclaimer.jsx    # Mandatory medical safety warning
│   ├── context/
│   │   └── TriageContext.jsx # Global state (language, history, triage status)
│   ├── index.css             # Main styling & theme definitions
│   ├── App.jsx               # Entry component
│   └── main.jsx              # DOM mounting point
├── vite.config.js
├── package.json
└── README.md
```

---

## 🎨 2. Design System & Theme
We will implement a premium, dark glassmorphism theme using CSS variables:
* **Background**: Deep charcoal gradient (`#0B0F19` to `#111827`).
* **Card Surface**: Translucent dark (`rgba(17, 24, 39, 0.7)` with `backdrop-filter: blur(12px)`).
* **Severity Colors**:
  * **Emergency (RED)**: `#EF4444` (Vibrant Neon Red)
  * **Urgent (YELLOW)**: `#F59E0B` (Amber Yellow)
  * **Self-Care (GREEN)**: `#10B981` (Emerald Green)
* **Fonts**: Outfit or Inter (Google Fonts) for a modern, clean look.

---

## 🤖 3. Gemma 4 Parsing Schema & Prompts
To triage dialect descriptions, the system instructs Gemma 4 to parse input according to a strict prompt template:

```
[System Prompt]
You are Sanjeevani, an AI Triage Assistant. Your role is strictly to assess care urgency (Emergency, Urgent, Self-Care) based on WHO guidelines. You do NOT diagnose disease.

Extract and respond strictly with the following JSON schema:
{
  "detected_language": "Tamil | Malayalam | Telugu",
  "original_symptoms": "string",
  "translated_symptoms": "string",
  "severity": "RED | YELLOW | GREEN",
  "clinical_rationale": "string explaining why this severity was selected",
  "recommended_action": "string detailing immediate next steps",
  "trigger_function": {
    "name": "showEmergencyContacts | findNearbyPHC | none",
    "parameters": {
      "location": "string"
    }
  }
}
```

---

## 📂 4. Mock Translation & Triage Database
To ensure the app runs immediately and reliably in a demonstration workspace, we define a dataset mapping colloquial inputs to Gemma 4 outputs:

### Tamil Dataset (Tamil Nadu)
* **Input**: *"ரொம்ப நெஞ்சு வலிக்குது, மூச்சு விட முடியல"* (Severe chest pain, cannot breathe)
  * **Severity**: `RED`
  * **Trigger**: `showEmergencyContacts`
* **Input**: *"வயிர் வலிக்குது அப்புறம் வாந்தி வர மாதிரி இருக்கு"* (Stomach is aching, feels like vomiting)
  * **Severity**: `YELLOW`
  * **Trigger**: `findNearbyPHC`

### Malayalam Dataset (Kerala)
* **Input**: *"നെഞ്ച് വേദനിക്കുന്നു, ശ്വാസം മുട്ടുന്നു"* (Chest pain, breathing difficulty)
  * **Severity**: `RED`
  * **Trigger**: `showEmergencyContacts`
* **Input**: *"തല കറങ്ങുന്നു, ക്ഷീണം തോന്നുന്നു"* (Dizziness, feeling tired)
  * **Severity**: `YELLOW`
  * **Trigger**: `findNearbyPHC`

### Telugu Dataset (Andhra Pradesh)
* **Input**: *"ఛాతీ నొప్పిగా ఉంది, ఊపిరి ఆడటం లేదు"* (Chest is aching, not able to breathe)
  * **Severity**: `RED`
  * **Trigger**: `showEmergencyContacts`
* **Input**: *"ఒంటి నొప్పులు మరియు కొద్దిగా జ్వరం"* (Body pain and mild fever)
  * **Severity**: `GREEN`
  * **Trigger**: `none`

---

## 🏥 5. Southern States PHC Mock Directory
Based on the coordinates or location, Sanjeevani queries a mock directory of Primary Health Centers (PHCs):

* **Tamil Nadu**:
  * *Government Primary Health Centre*, Thudiyalur, Coimbatore District.
  * *Primary Health Centre*, Keelakarai, Ramanathapuram District.
* **Kerala**:
  * *Family Health Centre*, Kaniyapuram, Thiruvananthapuram District.
  * *Government PHC*, Kumarakom, Kottayam District.
* **Andhra Pradesh**:
  * *Primary Health Centre*, Chandragiri, Chittoor District.
  * *Government PHC*, Anandapuram, Visakhapatnam District.

---

## 🔒 6. Safety Guardrails & Disclaimers
* **Disclaimer Banner**: Displayed permanently at the top of the interface: *"Disclaimer: Sanjeevani is an automated triage tool. It does not provide medical diagnoses or replace clinical evaluations."*
* **Red Alert Overlays**: If a `RED` status is triggered, block normal navigation and overlay a prominent call-to-action button to call the emergency number (`108`).
