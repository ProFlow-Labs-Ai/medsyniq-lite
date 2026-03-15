---
description: Find and interpret relevant clinical practice guidelines
---

# /guideline

## What This Command Does

The `/guideline` command identifies and interprets the most relevant clinical practice guidelines for a given clinical scenario. It summarizes key recommendations, their evidence grades, and highlights areas where major guidelines may differ.

## When to Use

- When initiating management of a newly diagnosed condition
- When verifying that current practice aligns with the latest guideline recommendations
- When guidelines from different societies may conflict and you need comparison
- When preparing for board examinations or clinical teaching

## How It Works

1. Identifies the clinical condition or management question from the input
2. Delegates to the **guideline-interpreter** agent for guideline retrieval and analysis
3. Locates the most recent and authoritative guidelines from major societies (e.g., ACC/AHA, ESC, NICE, WHO)
4. Extracts key recommendations with their class of recommendation and level of evidence
5. Highlights any discrepancies between major guidelines
6. Notes recent updates or changes from prior guideline versions

## Example Usage

**Input:**
```
/guideline management of newly diagnosed atrial fibrillation
```

**Output:**
```
CLINICAL PRACTICE GUIDELINES: ATRIAL FIBRILLATION

PRIMARY GUIDELINES IDENTIFIED:
1. 2023 ACC/AHA/ACCP/HRS Guideline for Diagnosis and Management of AF
2. 2024 ESC Guidelines for Management of Atrial Fibrillation
3. 2021 NICE Guideline NG196: Atrial Fibrillation

KEY RECOMMENDATIONS:

ANTICOAGULATION:
- Assess stroke risk using CHA2DS2-VASc score (Class I, LOE A)
- DOACs preferred over warfarin for eligible patients (Class I, LOE A)
- Anticoagulation recommended if CHA2DS2-VASc >= 2 (men) or >= 3 (women)
- ESC 2024 adopts CHA2DS2-VA (removes sex category from score)

RATE CONTROL:
- Initial rate control target <110 bpm at rest (Class I, LOE B)
- Beta-blockers or non-dihydropyridine CCBs as first-line (Class I, LOE B)
- Avoid in pre-excitation (WPW) — use IV procainamide or ibutilide

RHYTHM CONTROL:
- Early rhythm control favored within 1 year of diagnosis (Class IIa, LOE B)
- Catheter ablation as first-line rhythm control option (Class IIa, LOE A)
- EAST-AFNET 4 trial supports early rhythm control strategy

NOTABLE GUIDELINE DIFFERENCES:
- ESC 2024 uses AF-CARE pathway; ACC/AHA uses stepwise approach
- ESC removes sex from stroke risk score; ACC/AHA retains CHA2DS2-VASc
- Catheter ablation positioning differs slightly between societies

RECENT UPDATES:
- 2024 ESC guideline represents major revision from 2020 version
- Increased emphasis on early rhythm control and ablation
```

## Important Notes

- **DISCLAIMER: This tool provides educational and clinical decision support only. It does not replace reading the full guideline documents or exercising independent clinical judgment. Guidelines must be applied in the context of individual patient circumstances, preferences, and local practice patterns. Always verify recommendations against the original published guidelines.**
- Guidelines are updated periodically; always confirm the most current version
- Recommendations may vary by region and healthcare system
- Individual patient factors may warrant deviation from guideline recommendations
- Local institutional protocols may supplement or modify society guidelines

## Related Agents

- `guideline-interpreter` — Primary agent for guideline retrieval and analysis
- `clinical-reasoner` — For applying guidelines to specific patient scenarios
- `pharmacologist` — For drug-specific guideline recommendations
