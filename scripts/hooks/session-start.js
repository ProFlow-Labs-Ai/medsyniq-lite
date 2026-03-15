#!/usr/bin/env node

/**
 * Session start hook: Welcome Message
 *
 * Prints welcome message listing all 30 available medical commands,
 * grouped by category (Clinical, Research, Pharma). Includes disclaimer
 * reminder and active context mode.
 */

const WELCOME = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚕️  Medical AI Assistant — Plugin Loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CLINICAL COMMANDS (Patient Care)
  ─────────────────────────────────
  /differential      Generate differential diagnosis
  /lab-interpret     Interpret laboratory results
  /medication-review Review medication list for interactions
  /drug-check        Check drug dosing, interactions, contraindications
  /discharge-summary Generate discharge summary template
  /consultation      Draft consultation note
  /clinical-rule     Apply clinical decision rules (Wells, CURB-65, etc.)
  /emergency         Emergency medicine protocols and algorithms
  /imaging           Imaging interpretation framework
  /patient-education Generate patient education materials

  RESEARCH COMMANDS (Academic & Evidence)
  ───────────────────────────────────────
  /study-design      Design clinical study (RCT, cohort, case-control)
  /sample-size       Calculate sample size and power analysis
  /statistics        Statistical analysis plan and interpretation
  /manuscript        Manuscript preparation (CONSORT, STROBE, PRISMA)
  /grant             Grant writing assistance
  /systematic-review Systematic review methodology
  /meta-analysis     Meta-analysis framework
  /critical-appraisal Critically appraise a study (CASP)
  /search-strategy   Build literature search strategy
  /guideline         Guideline summary and recommendation extraction

  PHARMACEUTICAL COMMANDS (Industry & Regulatory)
  ────────────────────────────────────────────────
  /regulatory-brief  Regulatory submission brief
  /heor-model        Health economics and outcomes research model
  /protocol          Clinical trial protocol template
  /pharmacovigilance Adverse event assessment and reporting
  /drug-development  Clinical development plan overview
  /pico              PICO framework for clinical questions
  /nnt               Number needed to treat/harm calculation
  /forest-plot       Forest plot interpretation guide
  /bias-assessment   Risk of bias assessment (RoB 2, ROBINS-I)
  /evidence-table    Generate evidence summary table

  ACTIVE HOOKS
  ─────────────
  ✓ Evidence level check     — flags clinical claims without GRADE/CEBM
  ✓ Drug interaction warning — detects 30+ critical drug pairs
  ✓ Disclaimer check         — ensures educational notice is present
  ✓ Patient data guard       — scans for PHI (HIPAA/GDPR)
  ✓ Content quality check    — flags absolute claims, unsupported superlatives

  CONTEXTS: /context clinical | research | review

  ⚠️  DISCLAIMER: All outputs are for educational and decision-support
  purposes only. Clinical content must be verified by a qualified
  healthcare professional before any patient care decisions.
  AI-generated content does not constitute medical advice.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

process.stdout.write(WELCOME);
process.exit(0);
