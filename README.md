# nova
# Practice Layer

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

# 🎯 The Problem

Education programs often have well-designed interventions and extensive teacher training, but there is a major gap between:

**Training → Classroom Practice**

Program teams may know:

* Which teachers attended training
* Which schools received support
* Which learning outcomes were measured

But they often cannot easily see:

> **What is actually happening inside the classroom every week?**

Existing monitoring systems frequently depend on:

* Manual data entry
* Long checklists
* Tablet-based forms
* Periodic classroom observations
* Reports prepared after the fact

This creates additional workload for teachers and mentors while producing limited real-time information about classroom practice.

---

# 💡 Our Solution

Practice Layer creates a lightweight **Practice Intelligence Loop**:

```text
TEACHER EVIDENCE
      ↓
CAPTURE
Photo + Voice Note
      ↓
AI UNDERSTANDS
Speech + Evidence Analysis
      ↓
AI COACHES
One Specific Next Step
      ↓
MENTOR / CRP
Prioritized Support
      ↓
VERIFY
Practice Observation
      ↓
PROGRAM INSIGHT
Training → Practice
      ↓
Better Support
      ↺
```

The goal is not to replace teachers or mentors.

The goal is to make their existing work **more visible, actionable and measurable**.

---

# ⭐ Key Features

## 1. 📸 Low-Effort Evidence Capture

Teachers don't need to complete complicated digital forms.

They can submit:

* A photo of their existing tracker
* A short voice note
* Evidence in their preferred supported language

The existing paper-based workflow can remain in place.

---

## 2. 🎙️ Local-Language Voice Input

Teachers can describe their classroom experience naturally through voice.

The system can convert speech into structured information using speech recognition.

Example:

> "आज मुलांना त्यांच्या पातळीनुसार गट केले आणि नंबर लाईनचा वापर केला..."

The goal is to reduce typing and data-entry burden.

---

## 3. 🤖 AI Practice Analysis

The AI analyzes submitted evidence against a defined classroom-practice rubric.

Example:

| Practice                       | Status             |
| ------------------------------ | ------------------ |
| Learners grouped by level      | ✅ Observed         |
| Activity matched learner level | ✅ Observed         |
| Understanding checked          | 🟡 Partly observed |
| Learners actively practiced    | ✅ Observed         |
| Instruction adapted            | ⚪ Not observed     |

The system focuses on **observable practice**, not assumptions about teacher quality.

---

## 4. 💡 AI Coach

Instead of generating a long report, the system provides **one practical next step**.

Example:

> **Tomorrow, try this:**
> After grouping learners, give each group a task matched to its current level and spend three minutes checking whether the task is working.

The coaching can be connected to a library of activities and examples from experienced local teachers and mentors.

---

## 5. 📚 Activity Library

Teachers can discover practical classroom activities based on:

* Grade
* Subject
* Learning level
* Duration
* Language
* Practice area

Example:

**Number Line Challenge**

* Grade: 3–5
* Duration: 10 minutes
* Materials: Chalk + number cards
* Practice: Level-based learning

---

# 👨‍🏫 Mentor / CRP Support

Practice Layer converts teacher evidence into useful information for mentors and CRPs.

### Mentor Dashboard

Mentors can see:

* Schools requiring support
* Recent practice signals
* Evidence history
* Previous visits
* Open actions
* Recommended demonstration activities

---

## 🗺️ Transparent Visit Planning

The system uses a transparent rules-based approach to prioritize school visits.

For example:

```text
Repeated Practice Signal
        +
No Recent Mentor Visit
        +
Teacher Requested Support
        ↓
Higher Support Priority
```

The prioritization is deliberately **not a black-box AI prediction**.

Mentors and officers should be able to understand why a school appears on their priority list.

---

# 🎙️ Mentor Voice Notes

After a school visit, mentors can record a natural voice observation instead of completing a long report.

AI can convert the note into structured observations such as:

* Observed
* Partly observed
* Not observed

The mentor can then review and edit the generated observation before sharing it with the teacher.

---

# 📋 Action Ledger

The Action Ledger tracks decisions and follow-up actions.

Each action contains:

* Action
* Owner
* School
* Created date
* Due date
* Evidence
* Status

Example:

```text
Action:
Demonstrate level-based grouping

Owner:
CRP

Due:
25 September

Status:
In Progress
```

Actions can move through:

**Open → In Progress → Verified → Closed**

---

# 📊 Training → Practice

One of the core differentiators of Practice Layer is the ability to connect:

**Teacher Training → Classroom Practice**

Program teams can see which training modules appear to translate into observable classroom practices.

Example:

| Training Module        | Adoption |
| ---------------------- | -------: |
| Level-Based Grouping   |      82% |
| Checking Understanding |      71% |
| Learner Practice       |      64% |
| Adaptive Teaching      |      49% |

This creates a feedback loop for improving future teacher training.

---

# 🧠 What AI Does

AI is used where it reduces manual effort and helps convert unstructured evidence into useful information.

### AI-powered components

* Speech-to-text
* Voice-note understanding
* Evidence extraction
* Practice rubric coding
* Coaching suggestions
* Mentor note structuring
* Activity recommendations
* Training-to-practice analysis

---

# 🚫 What AI Does NOT Decide

Some decisions intentionally remain transparent and human-controlled.

AI does **not** independently decide:

* Which teacher should be penalized
* Which teacher is "good" or "bad"
* Final school support priorities
* Whether a teacher has failed
* Final program decisions

The platform is designed for **support allocation, not teacher ranking**.

---

# 🔄 Practice Intelligence Loop

The complete system works as a continuous feedback loop:

### 1. Capture

Teacher submits evidence already produced during classroom practice.

↓

### 2. Understand

AI converts speech and other evidence into structured practice signals.

↓

### 3. Coach

Teacher receives one specific, actionable next step.

↓

### 4. Route

Mentors receive evidence about where support may be needed.

↓

### 5. Verify

Mentors observe practice and record follow-up evidence.

↓

### 6. Learn

Program teams see which training and support approaches are translating into practice.

↓

### 7. Improve

The insights inform future coaching and training.

---

# 🏗️ System Architecture

```text
                    PRACTICE LAYER
                         │
          ┌──────────────┴──────────────┐
          │                             │
     TEACHER APP                  MENTOR / CRP
          │                             │
   Photo + Voice                  Visit + Voice
          │                             │
          └──────────────┬──────────────┘
                         ↓
                 EVIDENCE PROCESSING
                         │
              ┌──────────┴──────────┐
              │                     │
          Speech AI             Vision AI
              │                     │
              └──────────┬──────────┘
                         ↓
                 PRACTICE RUBRIC
                         │
                         ↓
                 AI COACHING LAYER
                         │
              ┌──────────┴──────────┐
              │                     │
           Teacher              Mentor
          Coaching             Support
              │                     │
              └──────────┬──────────┘
                         ↓
                  VERIFICATION
                         │
                         ↓
                PROGRAM ANALYTICS
                         │
                         ↓
                 TRAINING → PRACTICE
```

---

# 🛡️ Responsible AI & Privacy

Practice Layer is designed around responsible use of classroom evidence.

### Privacy principles

* Child faces are not required
* Audio can be deleted after transcription
* Teachers should know what evidence is collected
* Teachers can see the practice evidence associated with them
* AI-generated observations can be reviewed by humans
* Data is intended for support allocation rather than teacher ranking

### Human-in-the-loop

AI outputs should remain reviewable by teachers, mentors and program teams.

---

# 📐 Measuring AI Performance

The system should be evaluated against expert mentor coding.

One proposed target is:

> **Cohen's κ ≥ 0.6**

for agreement between AI-generated practice coding and expert mentor coding.

Other important metrics include:

### Teacher Action Rate

```text
Teachers acting on AI suggestions
---------------------------------
Teachers receiving suggestions
```

### Practice Adoption

```text
Observed practice after support
--------------------------------
Target practice opportunities
```

### Mentor Efficiency

Measure the reduction in time required to prepare school visits and observations.

### Cost per Teacher

Measure the actual operational cost of supporting each teacher rather than assuming a target cost.

---

# 🧪 Current Prototype

The current hackathon prototype focuses primarily on the **Teacher Practice Loop**.

### Currently demonstrated

* Teacher evidence capture
* Voice input
* AI practice analysis
* Practice rubric
* AI-generated coaching
* Activity recommendations
* Premium teacher dashboard

### Prototype / Demo components

The following components may use synthetic/demo data during the hackathon:

* Mentor visit planning
* Action Ledger
* Training → Practice analytics
* Program-level reports

Synthetic data is clearly separated from real classroom data.

---

# 🎯 Initial Scope

To keep the solution focused, the initial implementation targets:

**Grade 3–5 numeracy during the TaRL learning hour.**

The system can later expand to additional:

* Grades
* Subjects
* Learning interventions
* Languages
* States
* Education programs

---

# 🚀 Future Roadmap

### Phase 1 — Prototype

* Teacher evidence capture
* Voice transcription
* Practice analysis
* AI coaching

### Phase 2 — Mentor Integration

* CRP dashboard
* School visit planning
* Voice-based observation
* Action tracking

### Phase 3 — Program Intelligence

* Training → Practice analytics
* Program dashboards
* Evidence quality monitoring
* Longitudinal practice tracking

### Phase 4 — Scale

* More Indian languages
* More interventions
* State-level deployments
* Integration with existing education systems

---

# 🌍 Potential Impact

Practice Layer aims to make the **implementation layer of education programs measurable**.

Instead of asking only:

> "Did we train the teacher?"

or:

> "Did student outcomes improve?"

the system helps answer:

> **"What changed in classroom practice, and what support is needed next?"**

This can help education programs move from:

**Training → Monitoring → Reporting**

toward:

**Evidence → Coaching → Support → Verification → Learning**

---

# 💻 Technology Direction

The platform is designed to integrate:

* Modern web frontend
* Backend APIs
* Speech recognition / Indic ASR
* AI reasoning and structured extraction
* Image/document understanding
* Practice-rubric engine
* Analytics dashboards
* Secure data storage

The exact AI and infrastructure stack can evolve as the prototype moves toward deployment.

---

# 🏆 Why Practice Layer?

Most education technology focuses directly on the learner.

Practice Layer focuses on the **implementation layer between a proven intervention and its real-world classroom execution**.

```text
Proven Intervention
        ↓
Teacher Practice
        ↓
Evidence
        ↓
AI Support
        ↓
Mentor Action
        ↓
Verified Practice
        ↓
Program Learning
```

The platform is designed to make that layer **visible, actionable and measurable**.

---

## 📌 Project Status

**Status:** Hackathon Prototype 🚧

The project is actively being developed and evaluated as a proof of concept.

> The prototype demonstrates the core workflow. Some mentor, program-management and analytics components use synthetic data and are intended for future integration with real deployment systems.

---

## 👥 Target Users

* Teachers
* CRPs / Mentors
* Block-level education officers
* Teacher trainers
* Education program managers
* NGOs and implementation organizations
* Education departments

---

## 📄 License

Add the appropriate project license here.

---

## ⭐ Core Idea

> **Don't make teachers enter more data.
> Make the evidence they already create useful.**

**Practice Layer — Making classroom practice visible, actionable and measurable.**
