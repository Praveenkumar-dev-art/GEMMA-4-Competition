# Sanjeevani: Multilingual Health Triage Assistant

Sanjeevani is a generative AI-powered, multilingual assistant built for the **Build with Gemma 4 - AI Durg Hackathon (Track 2)**. It conducts initial health triaging by analyzing user-reported symptoms in local dialects, providing evidence-based guidance, and recommending whether a patient needs immediate professional care.

---

## 📋 Table of Contents
1. [Overview](./README.md#overview)
2. [Target Region & Dialects](./README.md#target-region--dialects)
3. [Safety & Escalation Protocol](./README.md#safety--escalation-protocol)
4. [Architecture & CI/CD](./README.md#architecture--cicd)

---

## 🔍 Overview
Sanjeevani is designed to bridge the healthcare accessibility gap in rural areas, where language barriers and a lack of local medical practitioners make it hard for patients to get timely guidance.

> **Key Rule**: This tool functions strictly as a **triage assistant**, NOT a diagnosis tool. It advises patients on the urgency of seeking care rather than identifying or naming specific diseases.

Refer to the official [problem statement](./problem%20statement.txt) and [hackathon rules](./important%20things%20to%20note.txt) for more details.

---

## 🗣️ Target Region & Dialects
* **Primary Region**: Central/North India (focusing on Hindi and local dialects like Chhattisgarhi/Surgujia).
* **Objective**: Interpret symptoms spoken or typed in these local dialects and map them to clean, structured medical metadata using Gemma 4's multilingual understanding.

---

## ⚠️ Safety & Escalation Protocol
Every triage session includes:
* **Prominent Disclaimer**: A permanent, visible reminder that Sanjeevani is not a doctor and cannot diagnose conditions.
* **Red Flag Escalation**: Immediate escalation logic when emergency/red-flag symptoms are detected (e.g., chest pain, breathing difficulty, severe bleeding).
* **Decision Rationale**: A clear explanation of *why* a specific triage advice level (Emergency, Urgent, or Self-Care) was recommended.

---

## 🛠️ Architecture & CI/CD
* **Frontend**: React + Vite + CSS (planned premium interface).
* **AI Model**: Google Gemma 4.
* **CI/CD**: GitHub Actions workflow (defined in [ci.yml](./.github/workflows/ci.yml)) automatically checks syntax, installs dependencies, and builds the project on pull requests or pushes to `main`.
