# 🎨 Sanjeevani: UI/UX Design System & Layout Specification (design.md)

This document defines the visual design system, color palette, component layout, typography, and micro-interaction patterns for the **Sanjeevani Multilingual Health Triage** web application.

---

## 🎯 1. Design Philosophy
Sanjeevani's UI is designed specifically for rural and semi-urban users in Southern India (Tamil Nadu, Kerala, Andhra Pradesh). 

Key design pillars include:
* **High Contrast & Clarity**: Dark glassmorphism background paired with vivid, high-visibility triage indicators.
* **Low-Literacy Friendly**: Voice-first design with prominent audio wave visualizers, audio playback buttons, and intuitive color-coded status badges.
* **Clinical Trust**: Clean, professional interface layout that clearly distinguishes triage urgency without intimidating patients.

---

## 🎨 2. Color Palette & Visual Tokens

### Base & Background System
```css
:root {
  --bg-dark: #0b0f19;
  --bg-gradient: linear-gradient(135deg, #0b0f19 0%, #111827 50%, #0f172a 100%);
  --card-bg: rgba(17, 24, 39, 0.75);
  --card-border: rgba(255, 255, 255, 0.08);
  --card-blur: blur(16px);
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
}
```

### Triage Severity Tokens
| Severity Level | Color Code | Hex Code | Visual Effect |
| :--- | :--- | :--- | :--- |
| **RED (Emergency)** | Neon Crimson | `#EF4444` | Pulsing red glow effect (`box-shadow: 0 0 20px rgba(239, 68, 68, 0.4)`) |
| **YELLOW (Urgent)** | Amber Gold | `#F59E0B` | Warm golden border (`box-shadow: 0 0 15px rgba(245, 158, 11, 0.3)`) |
| **GREEN (Self-Care)**| Emerald Green | `#10B981` | Soft emerald highlight (`box-shadow: 0 0 15px rgba(16, 185, 129, 0.2)`) |

---

## 🔤 3. Typography & Regional Script Support
To support seamless rendering across English, **Tamil**, **Malayalam**, and **Telugu**, we use Google Fonts with fallbacks:

```css
body {
  font-family: 'Inter', 'Outfit', 'Noto Sans Tamil', 'Noto Sans Malayalam', 'Noto Sans Telugu', sans-serif;
}
```

* **Heading Large (H1)**: 28px / 1.2 line-height / SemiBold 600
* **Section Title (H2)**: 20px / 1.3 line-height / Medium 500
* **Body Text**: 15px / 1.5 line-height / Regular 400
* **Dialect Display Quote**: 16px / Italic / `#38bdf8` (Sky Blue)

---

## 📐 4. UI Component Layout & Split-View Architecture

```
+-----------------------------------------------------------------------------------+
|  [Logo] SANJEEVANI    [Disclaimer Badge]    [Language: Tamil | Malayalam | Telugu]  |
+----------------------------------------+------------------------------------------+
|  LEFT PANEL: Input & Chat Feed         |  RIGHT PANEL: Triage & Action Dashboard  |
|                                        |                                          |
|  +----------------------------------+  |  +------------------------------------+  |
|  |  Voice Recorder Widget           |  |  |  Severity Badge: URGENT (YELLOW)   |  |
|  |  [ (•) Tap & Speak (Waveform) ]  |  |  +------------------------------------+  |
|  +----------------------------------+  |  |  Clinical Rationale & Guidance     |  |
|                                        |  |  "Consult PHC within 24 hours..."  |  |
|  +----------------------------------+  |  +------------------------------------+  |
|  |  Conversation Feed               |  |  |  Function Actions                 |  |
|  |  User (Tamil): "வயிர் வலிக்குது"   |  |  |  - [ Nearby Hospitals (PHCs) ]    |  |
|  |  Sanjeevani: "Parsed Symptoms..."|  |  |  - [ Download Triage Pass (PDF) ]  |  |
|  +----------------------------------+  |  +------------------------------------+  |
|                                        |                                          |
+----------------------------------------+------------------------------------------+
|  FOOTER: Permanent Safety Warning & Emergency Hotline Button (108)                |
+-----------------------------------------------------------------------------------+
```

---

## ✨ 5. Micro-Interactions & Animations

1. **Voice Input Wave Visualizer**:
   * When recording audio, an active CSS keyframe wave animation (`@keyframes soundwave`) expands and pulses in sync with microphone input.
2. **Severity Badge Reveal**:
   * Upon Gemma 4 response, the severity badge pops in using a subtle scale-up transition (`transform: scale(0.95)` to `scale(1)` with a 300ms cubic-bezier transition).
3. **Emergency Modal Overlay**:
   * If severity is `RED`, a semi-transparent dark overlay blurs out background interaction and presents a prominent **"Call 108 Emergency"** action button with a pulsing red ring.

---

## 🔗 Related Documents
* [Architecture Plan](./ARCH_PLAN.md)
* [Technical Specification](./spec.md)
