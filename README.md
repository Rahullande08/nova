# Practice Layer: EdTech Fidelity Platform

### AI-powered classroom practice monitoring and coaching for real-world implementation of proven education interventions.

> **Practice Layer turns the evidence teachers already produce into actionable coaching for teachers, targeted support for mentors, and measurable insights for education program teams.**

---

## 🚀 Overview

**Practice Layer** is an AI-powered education technology platform designed to help proven classroom interventions such as **Teaching at the Right Level (TaRL)** run with greater fidelity in real, multi-grade classrooms.

Instead of asking teachers to fill lengthy digital forms, the platform works with evidence they already create during teaching.

After a classroom session, a teacher can:

1. 📸 Upload a photo of their existing classroom tracker
2. 🎙️ Send a short voice note describing what happened
3. 🤖 Receive an AI-generated practice analysis
4. 💡 Get one specific next step for the next classroom session

The same evidence can then support mentors/CRPs during school visits and help program officers understand whether training is actually translating into classroom practice.

---

## 🌟 The Practice Intelligence Loop

```text
TEACHER EVIDENCE
      ↓
CAPTURE
Photo + Voice Note (Marathi / Hindi / English)
      ↓
UNDERSTAND
AI extracts practice signals via 5-point non-judgmental rubric
      ↓
COACH
One concise next step for tomorrow's classroom + TTS Voice Guidance
      ↓
ROUTE
Cluster Resource Person (CRP) deterministic visit queue (Rule-based SLA)
      ↓
VERIFY
Classroom demonstration & observed pedagogical shift
      ↓
LEARN
State training modules calibrated from classroom friction
      ↺
```

---

## 🎨 Visual Source of Truth & Stitch Design System

This frontend is faithfully implemented from the **Practice Layer Stitch Design System** (Project ID: `16814568900563264006`):
- **Typography:** Geist (Headings & Metrics) + Inter (Optical Body Legibility)
- **Palette:** Institutional Navy (`#0F172A`), Electric Interactive Blue (`#2563EB`), Emerald Verified (`#059669`), Coral Attention (`#DC2626`)
- **Elevation:** Low-contrast keylines (`1px solid #E2E8F0`) with hyper-diffuse contact drop shadows
- **Responsiveness:** Full multi-tier support for Desktop (1440px), Tablet (1024px), and Mobile Touch (390px)

---

## ⭐ Core Modules & Implemented Workflows

### 1. 📊 Overview Dashboard
- Live Operational Pulse header & Haveli cluster sync status
- 6-Stage Interactive Practice Loop stepper banner
- 2x2 Top KPI Cards (Schools Covered, Teachers Active, Practice Signals, Actions Closed)
- Practice Health Funnel (Observed → Acted On → Field Verified)
- AI Practice Pulse (Dominant friction callout & suggested system response)
- Priority Schools Action Queue with pedagogical tags & deterministic reasons
- 8-Week Competency Adoption SVG Area Chart

### 2. 👩‍🏫 Teacher Practice
- **Capture Evidence:**
  - Rapid capture pipeline (< 60s)
  - Group Tracker Photo OCR upload & TaRL Level Matrix (Beginner, Letter, Word, Paragraph)
  - Real microphone voice note recording with live frequency visualizer & timer
  - Multilingual speech selector (Hindi, Marathi, English, Auto Detect)
  - Institutional trust guardrails (Zero child faces stored, audio purged post-transcription)
- **AI Practice Analysis:**
  - 5-Point non-judgmental rubric with confidence scores & evidence citations
- **AI Instructional Coach:**
  - "Tomorrow, try this: Your Next Step" (Concise single action)
  - Targeted Activity Pick with materials & duration
  - Text-To-Speech (TTS) Voice Coaching playback in Marathi / Hindi
  - "Send to My Tomorrow Plan" micro-interaction
- **My Practice History:**
  - Practice logs timeline, strengths, and targeted focus areas
- **Activity Library:**
  - Searchable and filterable FLN activity catalogue with step-by-step facilitation guides

### 3. 👨‍🏫 Mentor / Cluster Resource Person (CRP)
- **Mentor Dashboard:**
  - Schools to visit, priority schools, actions due, follow-ups
  - In-Visit Fast Capture with quick rubric taps & voice recording
  - Deterministic governance rule breakdown ("Why this school?")
- **Visit Plan:**
  - Daily priority route calendar
- **School Evidence Feed:**
  - Deep-dive into teacher audio clips, trackers, and student level distribution
- **Mentor Visit Workflow:**
  - Structured classroom observation flow with AI note structuring & pre-drafted WhatsApp action notes

### 4. 📋 Program Management & Governance
- **Action Ledger:**
  - Search, status filtering (Open, In Progress, Verified, Closed), SLA tracker, and verification drawer
- **Training → Practice Analytics:**
  - Workshop completion vs daily classroom practice adoption transfer gap analytics
- **Reports & Insights:**
  - Executive diagnostic metrics with one-click CSV export and print-ready PDF reporting
- **AI Transparency & Governance:**
  - Interactive pipeline detailing explicit separation between AI synthesis vs Human deterministic decisions

---

## 🛡️ Responsible AI & Privacy

Practice Layer is designed around responsible use of classroom evidence:
- **Child faces are strictly prohibited** and never stored.
- **Audio is purged** immediately following clinical transcription verification.
- **Data is used solely for targeted coaching allocation**, never teacher evaluation or ranking.
- **Human-in-the-loop audit trail** ensures all flags and priorities remain transparent.

---

## 💻 Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```
