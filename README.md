# Codex Medicus Lite

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Codex Medicus Pro](https://img.shields.io/badge/Upgrade-Codex%20Medicus%20Pro-brightgreen)](https://proflowlabsai.com/codex-medicus)

> **5 agents** | **20 skills** | **10 commands** | Free edition of Codex Medicus

---

> **Medical Disclaimer**: This plugin provides AI-assisted tools for informational and educational purposes only. It is not a substitute for professional medical judgment, diagnosis, or treatment. Always consult qualified healthcare providers for clinical decisions.

---

**The free edition of Codex Medicus** — medical intelligence for Claude Code, built by a physician. Covers the essentials: clinical reasoning, evidence-based medicine, pharmacology, biostatistics, and medical writing.

Want the full system? **[Codex Medicus Pro](https://proflowlabsai.com/codex-medicus)** includes 27 agents, 142 skills, 30 commands, 35 clinical specialties, multi-harness support, and backend API services.

---

## Quick Start

```bash
# One command — that's it
claude plugins install github:proflowlabs-ai/codex-medicus-lite
```

```bash
# Generate a differential diagnosis
/differential 65-year-old with acute chest pain and diaphoresis

# Search for evidence
/evidence-search SGLT2 inhibitors in heart failure with preserved EF

# Check drug interactions
/drug-check warfarin, amiodarone, simvastatin, CKD stage 3

# Interpret labs
/lab-interpret Na 128, K 5.8, Cr 3.2, pH 7.28, bicarb 15

# Design a study
/study-design compare new anticoagulant vs warfarin in mechanical valves
```

---

## What's Included

### 5 Agents

| Agent | Role | Model |
|-------|------|-------|
| **clinical-reasoner** | Differential diagnosis, Bayesian reasoning, clinical decision rules | opus |
| **evidence-appraiser** | Critical appraisal, GRADE, NNT/NNH, study quality assessment | opus |
| **pharmacologist** | Drug interactions, dosing, CYP450, therapeutic drug monitoring | opus |
| **biostatistician** | Hypothesis testing, regression, survival analysis, sample size | opus |
| **medical-writer** | IMRAD, abstracts, reporting guidelines, manuscript structure | sonnet |

### 20 Skills

<details>
<summary><strong>Clinical Reasoning (5)</strong></summary>

- `differential-diagnosis` — DDx frameworks (VINDICATE, anatomical, worst-first), cognitive biases
- `clinical-decision-rules` — Wells, CURB-65, CHA2DS2-VASc, HEART, HAS-BLED, Ottawa
- `bayesian-reasoning` — Pre-test probability, likelihood ratios, Fagan nomogram
- `illness-scripts` — Illness script framework, pattern recognition vs analytical reasoning
- `shared-decision-making` — SDM frameworks, decision aids, risk communication
</details>

<details>
<summary><strong>Evidence-Based Medicine (3)</strong></summary>

- `critical-appraisal` — CASP checklists for RCTs, systematic reviews, cohort, case-control
- `evidence-levels` — Oxford CEBM levels, GRADE certainty, evidence hierarchies
- `grade-assessment` — GRADE methodology, downgrading/upgrading, evidence profiles
</details>

<details>
<summary><strong>Pharmacology (3)</strong></summary>

- `drug-interactions` — CYP450, P-glycoprotein, QT prolongation, serotonin syndrome
- `dose-adjustment` — Renal (Cockcroft-Gault), hepatic (Child-Pugh), pediatric, geriatric
- `antimicrobial-stewardship` — Start Smart Then Focus, de-escalation, PK/PD optimization
</details>

<details>
<summary><strong>Diagnostics (2)</strong></summary>

- `lab-interpretation` — CBC, BMP/CMP, coagulation, cardiac markers, thyroid
- `sensitivity-specificity` — 2x2 tables, SnNOut/SpPIn, PPV/NPV, ROC curves
</details>

<details>
<summary><strong>Biostatistics (3)</strong></summary>

- `hypothesis-testing` — p-values, confidence intervals, parametric vs non-parametric
- `regression-analysis` — Linear, logistic, Poisson, model diagnostics
- `survival-analysis` — Kaplan-Meier, Cox PH, competing risks
</details>

<details>
<summary><strong>Medical Writing (2)</strong></summary>

- `imrad-structure` — Introduction, Methods, Results, Discussion guidance
- `abstract-writing` — Structured and unstructured abstract templates
</details>

<details>
<summary><strong>Study Design (2)</strong></summary>

- `rct-design` — Randomization, blinding, ITT, CONSORT
- `sample-size-calculation` — Power analysis, effect size, dropout adjustment
</details>

### 10 Commands

| Command | What It Does |
|---------|-------------|
| `/differential` | Generate structured differential diagnosis |
| `/evidence-search` | Search for evidence using PICO framework |
| `/guideline` | Find and interpret clinical guidelines |
| `/drug-check` | Check drug interactions and dosing |
| `/clinical-question` | Formulate a searchable PICO question |
| `/lab-interpret` | Interpret laboratory panels |
| `/study-design` | Design a clinical study |
| `/sample-size` | Calculate sample size and power |
| `/abstract` | Write a structured scientific abstract |
| `/statistics` | Choose and interpret statistical tests |

### 5 Always-Active Rules

| Rule | What It Enforces |
|------|-----------------|
| **EBM** | Evidence levels (CEBM/GRADE) required for all clinical claims |
| **Patient Safety** | Contraindications, red flags, dose checks always included |
| **Disclaimer** | AI-generated content labeled, not a substitute for clinical judgment |
| **Data Privacy** | HIPAA/GDPR compliance, no PHI in outputs |
| **Research Integrity** | ICMJE authorship, reporting guidelines, COI disclosure |

---

## What's in Codex Medicus Pro?

The free Lite edition covers the essentials. **Pro** is the full medical intelligence system:

| Feature | Lite (Free) | Pro |
|---------|:-----------:|:---:|
| Agents | 5 | **27** |
| Skills | 20 | **142** |
| Commands | 10 | **30** |
| Clinical Specialties | - | **35** (Cardiology, Neurology, Surgery, Peds, etc.) |
| Drug Development & Regulatory | - | **15 skills** |
| Pharmacovigilance & HEOR | - | **9 skills** |
| Epidemiology | - | **6 skills** |
| Systematic Reviews & Meta-Analysis | - | **5 skills** |
| Digital Health & Precision Medicine | - | **8 skills** |
| Specialty Agents (ER, ICU, Oncology, Surgery, Internal Medicine) | - | **5 agents** |
| Multi-Harness (Codex, Cursor, OpenCode, Gemini) | - | included |
| Backend API Services (Drug Interactions, Evidence Search) | - | coming soon |
| Hook Scripts | included | included |
| Contexts (clinical, research, review) | included | included |
| Priority Support | - | included |

**[Upgrade to Codex Medicus Pro](https://proflowlabsai.com/codex-medicus)**

---

## Core Principles

1. **Evidence-Based** — Every clinical claim cites its evidence level
2. **Safety-First** — Contraindications and red flags always flagged
3. **Disclaimer-Aware** — AI-generated, not a substitute for clinical judgment
4. **Privacy-Compliant** — HIPAA/GDPR, no PHI in outputs
5. **Research Integrity** — Reporting guidelines, authorship criteria, COI disclosure

---

## Architecture

```
codex-medicus-lite/
├── agents/           — 5 core medical agents
├── skills/           — 20 essential skills
│   ├── clinical-reasoning/   (5)
│   ├── ebm/                  (3)
│   ├── pharmacology/         (3)
│   ├── diagnostics/          (2)
│   ├── biostatistics/        (3)
│   ├── medical-writing/      (2)
│   └── study-design/         (2)
├── commands/         — 10 slash commands
├── rules/            — 5 always-active rules
├── hooks/            — Quality check hooks
├── scripts/hooks/    — Hook implementations
├── contexts/         — Clinical, research, review modes
└── .claude-plugin/   — Plugin manifest
```

---

## License

MIT — free for personal and commercial use.

For the full Codex Medicus Pro system, see [proflowlabsai.com/codex-medicus](https://proflowlabsai.com/codex-medicus).

---

## Acknowledgments

Built by a physician, for medical professionals. Powered by [Claude Code](https://claude.ai/code).

---

<div align="center">

**Built for medical professionals who build with AI.**

[Get Started](#quick-start) · [View Skills](#20-skills) · [Commands](#10-commands) · [Upgrade to Pro](https://proflowlabsai.com/codex-medicus)

</div>
