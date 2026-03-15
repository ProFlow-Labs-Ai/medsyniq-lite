---
description: Interpret a laboratory panel with clinical correlation
---

# /lab-interpret

## What This Command Does

The `/lab-interpret` command analyzes laboratory results in clinical context, identifies abnormal patterns, generates a differential for the laboratory findings, and recommends follow-up testing. It correlates lab values with each other and with the clinical presentation to provide a coherent interpretation.

## When to Use

- When a lab panel reveals multiple abnormalities requiring integrated interpretation
- When an unexpected lab result needs clinical correlation and workup planning
- When teaching trainees to interpret complex metabolic, hematologic, or other panels
- When trying to identify a unifying diagnosis from scattered lab abnormalities

## How It Works

1. Parses individual lab values and identifies abnormalities against reference ranges
2. Delegates to the **diagnostic-specialist** agent for integrated interpretation
3. Identifies patterns across lab values (e.g., anion gap metabolic acidosis, hepatorenal syndrome)
4. Generates a differential diagnosis for the lab abnormality pattern
5. Recommends confirmatory or follow-up testing
6. Flags critical values requiring immediate action

## Example Usage

**Input:**
```
/lab-interpret Na 128, K 5.8, Cr 3.2, BUN 45, pH 7.28, bicarb 15
```

**Output:**
```
LABORATORY INTERPRETATION

RESULTS WITH REFERENCE RANGES:
  Na   128 mEq/L   (LOW)    [ref: 136-145]
  K    5.8 mEq/L   (HIGH*)  [ref: 3.5-5.0]  *CRITICAL
  Cr   3.2 mg/dL   (HIGH)   [ref: 0.7-1.3]
  BUN  45 mg/dL    (HIGH)   [ref: 7-20]
  pH   7.28        (LOW)    [ref: 7.35-7.45]
  HCO3 15 mEq/L   (LOW)    [ref: 22-28]

PATTERN RECOGNITION:

1. NON-ANION GAP METABOLIC ACIDOSIS (NAGMA)
   Anion gap = Na - (Cl + HCO3) = [requires Cl to calculate]
   If Cl is elevated → hyperchloremic NAGMA
   If AG is elevated → consider mixed AG + NAGMA

2. ACUTE KIDNEY INJURY
   BUN/Cr ratio = 14:1 (intrinsic renal pattern)
   Creatinine 3.2 suggests significant renal dysfunction
   Staging: KDIGO Stage 3 if baseline Cr is normal

3. HYPERKALEMIA — CRITICAL VALUE
   K 5.8 in the setting of AKI and metabolic acidosis
   Acidosis shifts K extracellularly (0.6 mEq/L per 0.1 pH drop)
   True total body K may be normal or low despite elevated serum K

4. HYPONATREMIA
   Likely dilutional in the setting of renal failure
   Need serum osmolality and urine studies to classify

UNIFYING DIAGNOSIS CONSIDERATIONS:
- Acute kidney injury (intrinsic) with resultant acidosis, hyperkalemia,
  and dilutional hyponatremia
- Consider: ATN, acute GN, obstructive uropathy, AIN

IMMEDIATE ACTIONS NEEDED:
- ECG STAT for hyperkalemia (look for peaked T waves, QRS widening)
- Calcium gluconate if ECG changes present
- Consider insulin/glucose, albuterol for acute K management
- Assess volume status and urine output
- Renal ultrasound to rule out obstruction

RECOMMENDED FOLLOW-UP LABS:
- Chloride (to calculate accurate anion gap)
- Serum osmolality, urine Na, urine osmolality
- Urinalysis with microscopy (casts, cells)
- Phosphorus, calcium, magnesium
- Lactate if perfusion concerns
- Baseline creatinine for AKI staging
```

## Important Notes

- **DISCLAIMER: This tool provides educational and clinical decision support only. Critical lab values require immediate clinical action and direct communication with the treating team. AI-generated lab interpretations must be verified by a qualified clinician and correlated with the full clinical picture. Never delay treatment of critical values pending AI analysis.**
- Always correlate lab values with the full clinical context
- Critical values (K >6.0, Na <120, etc.) require immediate intervention
- Consider pre-analytical errors (hemolysis, lipemia) for unexpected results
- Trending lab values over time is often more informative than single values

## Related Agents

- `diagnostic-specialist` — Primary agent for lab interpretation
- `clinical-reasoner` — For integrating lab findings into clinical reasoning
- `internist` — For management recommendations based on lab findings
