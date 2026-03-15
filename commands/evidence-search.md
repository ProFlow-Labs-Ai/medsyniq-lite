---
description: Search for evidence on a clinical question using PICO
---

# /evidence-search

## What This Command Does

The `/evidence-search` command searches for and synthesizes the best available clinical evidence relevant to a specific clinical question. It structures the query using the PICO framework, identifies the highest level of evidence, and provides a summary with quality assessment.

## When to Use

- When you need to find evidence to support a clinical decision
- When evaluating whether a treatment, diagnostic test, or intervention is supported by research
- When preparing evidence-based arguments for clinical discussions or guidelines
- When a patient or colleague asks about the evidence behind a specific practice

## How It Works

1. Structures the clinical question using the PICO framework (Population, Intervention, Comparison, Outcome)
2. Delegates to the **evidence-appraiser** agent for systematic evidence retrieval
3. Identifies and ranks evidence by level (systematic reviews, RCTs, cohort studies, etc.)
4. Summarizes key findings with effect sizes and confidence intervals where available
5. Assesses quality of evidence using GRADE or Oxford criteria
6. Highlights gaps in evidence and areas of uncertainty

## Example Usage

**Input:**
```
/evidence-search SGLT2 inhibitors vs placebo in heart failure with preserved ejection fraction
```

**Output:**
```
EVIDENCE SUMMARY

PICO FRAMEWORK:
P: Adults with heart failure with preserved ejection fraction (HFpEF)
I: SGLT2 inhibitors (empagliflozin, dapagliflozin)
C: Placebo
O: Cardiovascular death, heart failure hospitalization, quality of life

HIGHEST LEVEL EVIDENCE:

1. EMPEROR-Preserved (Anker et al., NEJM 2021)
   Design: Double-blind RCT, n=5988
   Finding: Empagliflozin reduced composite of CV death/HF hospitalization
            HR 0.79 (95% CI 0.69-0.90), p<0.001
   Quality: HIGH (GRADE)

2. DELIVER (Solomon et al., NEJM 2022)
   Design: Double-blind RCT, n=6263
   Finding: Dapagliflozin reduced composite of CV death/worsening HF
            HR 0.82 (95% CI 0.73-0.92), p<0.001
   Quality: HIGH (GRADE)

3. Meta-analysis (Vaduganathan et al., Lancet 2022)
   Pooled analysis confirms class effect across EF spectrum

OVERALL EVIDENCE QUALITY: HIGH
RECOMMENDATION STRENGTH: Strong in favor of SGLT2i in HFpEF

EVIDENCE GAPS:
- Long-term outcomes beyond 2-3 years
- Head-to-head comparisons between SGLT2i agents
- Optimal timing of initiation
```

## Important Notes

- **DISCLAIMER: This tool provides educational and clinical decision support only. It does not replace clinical judgment or formal systematic literature review. Evidence summaries must be independently verified by a qualified healthcare professional. Treatment decisions should integrate evidence with clinical expertise and patient preferences.**
- Evidence landscapes change; always check for the most recent publications
- Search results are illustrative and should be supplemented with formal database searches (PubMed, Cochrane)
- Effect sizes and statistical results should be verified against original publications
- Consider applicability of evidence to your specific patient population

## Related Agents

- `evidence-appraiser` — Primary agent for evidence search and appraisal
- `systematic-reviewer` — For comprehensive systematic evidence synthesis
- `biostatistician` — For interpretation of statistical results
