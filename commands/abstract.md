---
description: Write a structured scientific abstract
---

# /abstract

## What This Command Does

The `/abstract` command generates a structured scientific abstract following standard medical journal conventions (IMRAD format) and relevant reporting guidelines (CONSORT, STROBE, PRISMA, etc.). It organizes study data into a publication-ready abstract with appropriate word counts and structure.

## When to Use

- When writing an abstract for journal submission
- When preparing a conference abstract or poster presentation
- When summarizing a completed study in structured format
- When adapting an abstract between different journal requirements
- When teaching trainees how to write effective scientific abstracts

## How It Works

1. Identifies the study type and applicable reporting guidelines
2. Delegates to the **medical-writer** agent for structured abstract creation
3. Applies the appropriate abstract structure (structured vs. unstructured)
4. Ensures all required elements are included per reporting guidelines
5. Optimizes word count for typical journal limits (250-350 words)
6. Flags missing data elements that should be included

## Example Usage

**Input:**
```
/abstract for our RCT on early rehabilitation in stroke patients

Design: Multicenter RCT, 12 hospitals, n=480
Intervention: Physiotherapy within 24h vs standard care (48-72h)
Primary outcome: mRS at 90 days
Results: Mean mRS 2.1 vs 2.6, p=0.003
Secondary: Length of stay 8.2 vs 11.4 days
Safety: No significant difference in adverse events
```

**Output:**
```
STRUCTURED ABSTRACT (CONSORT-compliant)
[Word count: 298 / Target: 250-350]

BACKGROUND:
Early mobilization after acute stroke may improve functional
outcomes, but the optimal timing of rehabilitation initiation
remains uncertain. We aimed to determine whether physiotherapy
initiated within 24 hours of stroke onset improves functional
recovery compared with standard timing.

METHODS:
We conducted a multicenter, parallel-group, randomized controlled
trial across 12 hospitals. Adults with acute ischemic or
hemorrhagic stroke (NIHSS 4-20) were randomly assigned (1:1) to
early rehabilitation (physiotherapy within 24 hours of onset) or
standard care (physiotherapy at 48-72 hours). Randomization was
stratified by stroke type and severity. The primary outcome was
functional status measured by the modified Rankin Scale (mRS) at
90 days, analyzed by intention-to-treat. (Trial registration:
[NCT number])

RESULTS:
Between [dates], 480 patients were enrolled (early rehabilitation
n=241; standard care n=239). Baseline characteristics were well
balanced between groups. At 90 days, mean mRS was significantly
lower in the early rehabilitation group (2.1 vs 2.6; mean
difference -0.5, 95% CI -0.83 to -0.17; p=0.003). Patients in
the early rehabilitation group had shorter hospital stays (8.2 vs
11.4 days; mean difference -3.2 days, 95% CI -4.1 to -2.3;
p<0.001). Rates of serious adverse events did not differ
significantly between groups (12.4% vs 13.8%; p=0.64), including
no difference in early neurological deterioration.

CONCLUSIONS:
Physiotherapy initiated within 24 hours of acute stroke onset
significantly improved functional outcomes at 90 days and reduced
hospital length of stay without increasing adverse events. These
findings support early rehabilitation as a standard component of
acute stroke care.

REPORTING GUIDELINE: CONSORT 2010 (RCT)
ELEMENTS TO ADD BEFORE SUBMISSION:
- Trial registration number
- Enrollment dates
- Funding source
- Confidence intervals for all comparisons (partially included)
```

## Important Notes

- **DISCLAIMER: This tool provides writing support only. All data presented in abstracts must be accurate and verified against original study data. Scientific abstracts are the responsibility of the study investigators and must accurately represent the study findings. AI-generated abstracts require thorough review by all co-authors. Compliance with specific journal requirements is the author's responsibility.**
- Always verify numerical results against original data analyses
- Adhere to the specific word count and format of the target journal
- Apply the appropriate reporting guideline checklist for the study type
- All co-authors must review and approve the final abstract

## Related Agents

- `medical-writer` — Primary agent for abstract and manuscript writing
- `biostatistician` — For verification of statistical reporting
- `clinical-trialist` — For study design description accuracy
