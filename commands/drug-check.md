---
description: Check drug interactions, doses, and contraindications
---

# /drug-check

## What This Command Does

The `/drug-check` command evaluates a medication regimen for drug-drug interactions, dose appropriateness, contraindications based on patient comorbidities, and potential adverse effects. It flags high-risk combinations and provides actionable recommendations.

## When to Use

- When prescribing a new medication to a patient on existing drugs
- When reviewing a complex medication regimen for safety
- When adjusting doses for renal or hepatic impairment
- When evaluating potential drug-related adverse effects
- When checking for pharmacokinetic or pharmacodynamic interactions

## How It Works

1. Parses the medication list and patient context (comorbidities, organ function)
2. Delegates to the **pharmacologist** agent for comprehensive drug analysis
3. Identifies drug-drug interactions with severity classification
4. Checks dose appropriateness based on indication and organ function
5. Flags contraindications based on patient-specific factors
6. Provides recommendations for monitoring or dose adjustments

## Example Usage

**Input:**
```
/drug-check patient on warfarin, amiodarone, and simvastatin with CKD stage 3
```

**Output:**
```
DRUG INTERACTION AND SAFETY CHECK

PATIENT CONTEXT: CKD Stage 3 (eGFR 30-59 mL/min/1.73m2)
MEDICATIONS REVIEWED: Warfarin, Amiodarone, Simvastatin

CRITICAL INTERACTIONS IDENTIFIED:

1. WARFARIN + AMIODARONE [SEVERITY: MAJOR]
   Mechanism: Amiodarone inhibits CYP2C9 and CYP3A4, reducing warfarin metabolism
   Effect: INR may increase 1.5-2x; risk of major bleeding
   Recommendation: Reduce warfarin dose by 30-50% when initiating amiodarone.
   Monitor INR weekly for at least 4 weeks. Effect may persist weeks
   after amiodarone discontinuation due to long half-life (40-55 days).

2. SIMVASTATIN + AMIODARONE [SEVERITY: MAJOR]
   Mechanism: Amiodarone inhibits CYP3A4, increasing simvastatin levels
   Effect: Increased risk of rhabdomyolysis and myopathy
   Recommendation: Simvastatin dose must NOT exceed 20 mg/day with
   concurrent amiodarone (FDA boxed warning). Consider switching to
   a statin with lower interaction potential (rosuvastatin, pravastatin).

DOSE ADJUSTMENTS FOR CKD STAGE 3:
- Warfarin: No specific renal dose adjustment, but increased bleeding
  risk in CKD. Monitor INR more frequently.
- Amiodarone: No renal dose adjustment required (hepatic metabolism)
- Simvastatin: No renal dose adjustment, but CKD increases myopathy risk

MONITORING PLAN:
- INR: Weekly for 4+ weeks after amiodarone initiation
- CK levels: Baseline and if myalgias develop
- Renal function: Every 3 months
- Thyroid function: Every 6 months (amiodarone)
- Liver function: Baseline, then every 6 months (amiodarone)
- Pulmonary function: Annual CXR and PFTs (amiodarone)
```

## Important Notes

- **DISCLAIMER: This tool provides educational and clinical decision support only. It does not replace consultation with a clinical pharmacist, review of official prescribing information, or clinical judgment. All drug interaction checks must be verified using approved drug interaction databases (e.g., Lexicomp, Micromedex). Never alter medications based solely on AI-generated recommendations.**
- Always cross-reference with institutional formulary and pharmacy systems
- Over-the-counter medications, supplements, and herbal products should be included
- Pharmacogenomic considerations may alter interaction significance
- Food interactions (e.g., grapefruit, vitamin K) are also assessed when relevant

## Related Agents

- `pharmacologist` — Primary agent for drug interaction and dosing analysis
- `internist` — For clinical context and management decisions
- `patient-safety-officer` — For medication safety review
