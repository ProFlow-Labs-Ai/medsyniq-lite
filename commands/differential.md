---
description: Generate structured differential diagnosis
---

# /differential

## What This Command Does

The `/differential` command generates a structured, prioritized differential diagnosis based on the clinical presentation provided. It organizes potential diagnoses by likelihood and urgency, identifies key discriminating features, and recommends targeted workup to narrow the differential.

## When to Use

- When evaluating a new patient presentation with an unclear diagnosis
- When reviewing a case and wanting to ensure no critical diagnoses are missed
- When preparing for clinical discussions, rounds, or teaching
- When a patient's presentation changes and the differential needs reassessment

## How It Works

1. Parses the clinical presentation including symptoms, signs, demographics, and relevant history
2. Delegates to the **clinical-reasoner** agent for systematic diagnostic reasoning
3. Generates a tiered differential organized by:
   - **Must not miss** (life-threatening or time-sensitive)
   - **Most likely** (common diagnoses fitting the presentation)
   - **Less likely but possible** (atypical presentations to consider)
4. Identifies key discriminating features and red flags
5. Recommends targeted diagnostic workup for each tier

## Example Usage

**Input:**
```
/differential 45-year-old male with acute onset chest pain, diaphoresis, and dyspnea
```

**Output:**
```
DIFFERENTIAL DIAGNOSIS
Patient: 45-year-old male
Presentation: Acute onset chest pain, diaphoresis, dyspnea

MUST NOT MISS:
1. Acute coronary syndrome (STEMI/NSTEMI)
   - Key features: Acute onset, diaphoresis, male sex, age
   - Workup: ECG (stat), troponin, CXR
2. Pulmonary embolism
   - Key features: Acute dyspnea, chest pain
   - Workup: D-dimer, CT pulmonary angiography, Wells score
3. Aortic dissection
   - Key features: Acute severe chest pain, diaphoresis
   - Workup: CT angiography of chest, bilateral BPs
4. Tension pneumothorax
   - Key features: Acute dyspnea, chest pain
   - Workup: CXR, clinical exam (tracheal deviation, breath sounds)

MOST LIKELY:
5. Acute coronary syndrome (highest pre-test probability)
6. Anxiety/panic attack (diagnosis of exclusion)

LESS LIKELY BUT POSSIBLE:
7. Pericarditis
8. Esophageal rupture (Boerhaave syndrome)

RECOMMENDED IMMEDIATE WORKUP:
- 12-lead ECG within 10 minutes
- Troponin I/T (serial)
- CBC, BMP, coagulation studies
- Chest X-ray (portable)
- D-dimer if PE remains on differential
```

## Important Notes

- **DISCLAIMER: This tool provides educational and clinical decision support only. It does not replace clinical judgment, direct patient evaluation, or established diagnostic protocols. All outputs must be independently verified by a qualified healthcare professional. Never use AI-generated differentials as the sole basis for clinical decisions.**
- The quality of the differential depends on the completeness of the clinical information provided
- Always include relevant demographics, timing, associated symptoms, and pertinent negatives
- Critical diagnoses are prioritized by danger, not probability
- The differential should be reassessed as new data becomes available

## Related Agents

- `clinical-reasoner` — Primary agent for diagnostic reasoning
- `diagnostic-specialist` — For specialized diagnostic workup planning
- `emergency-physician` — For acute and emergent presentations
