---
description: Calculate sample size and power
---

# /sample-size

## What This Command Does

The `/sample-size` command calculates sample size requirements and statistical power for clinical studies. It specifies assumptions, provides formulas, performs calculations, and recommends adjustments for anticipated dropout, non-compliance, and interim analyses.

## When to Use

- When planning a clinical trial and need to determine enrollment targets
- When writing a grant application that requires power calculations
- When evaluating whether a published study was adequately powered
- When comparing sample size requirements across different study designs
- When assessing feasibility of a proposed clinical study

## How It Works

1. Parses the study design parameters (design type, endpoints, effect sizes, error rates)
2. Delegates to the **biostatistician** agent for formal sample size calculation
3. Identifies the appropriate formula based on study design and endpoint type
4. Calculates the required sample size per group and total enrollment
5. Applies adjustments for dropout, non-compliance, and multiplicity
6. Provides sensitivity analyses across a range of assumptions

## Example Usage

**Input:**
```
/sample-size superiority RCT, primary endpoint: 30-day mortality, expected 15% vs 10%, power 80%, alpha 0.05
```

**Output:**
```
SAMPLE SIZE CALCULATION

STUDY PARAMETERS:
  Design:          Two-arm superiority RCT
  Primary endpoint: 30-day mortality (binary)
  Control rate:     15% (p1 = 0.15)
  Experimental rate: 10% (p2 = 0.10)
  Absolute difference: 5 percentage points
  Relative reduction:  33.3%
  Power (1 - beta):  80%
  Alpha (two-sided): 0.05
  Allocation ratio:  1:1

FORMULA:
Chi-square test for two independent proportions (Fleiss with
continuity correction)

n per group = [(Z_alpha/2 + Z_beta)^2 * (p1(1-p1) + p2(1-p2))] /
              (p1 - p2)^2

CALCULATION:
  Z_alpha/2 (two-sided 0.05) = 1.96
  Z_beta (power 0.80) = 0.842

  n per group (uncorrected) = 686
  n per group (with continuity correction) = 710

TOTAL SAMPLE SIZE (unadjusted): 1,420 patients (710 per arm)

ADJUSTMENTS:

1. Dropout adjustment (assumed 10%):
   Adjusted n per group: 710 / 0.90 = 789
   Adjusted total: 1,578

2. Non-compliance adjustment (assumed 5% crossover):
   Adjusted n per group: 789 / 0.95^2 = 874
   Adjusted total: 1,748

3. If one interim analysis planned (O'Brien-Fleming):
   Inflation factor: ~1.01 (minimal with O'Brien-Fleming)
   Adjusted total: ~1,766

RECOMMENDED ENROLLMENT TARGET: 1,800 patients (900 per arm)

SENSITIVITY ANALYSIS:
  Control rate | Experimental rate | n per group | Total
  15%          | 10%               | 710         | 1,420
  15%          | 9%                | 435         | 870
  15%          | 11%               | 1,655       | 3,310
  15%          | 10% (90% power)   | 950         | 1,900
  12%          | 8%                | 1,095       | 2,190

KEY ASSUMPTIONS AND LIMITATIONS:
- Based on two-sided chi-square test; consider logistic regression
  or Cox model in final analysis plan
- Control rate of 15% must be supported by literature or pilot data
- Effect size of 5% absolute reduction should be clinically meaningful
- Intent-to-treat analysis assumed; per-protocol may differ
- Consider competing risks if applicable to mortality endpoint
```

## Important Notes

- **DISCLAIMER: This tool provides statistical decision support only. Formal sample size calculations for regulatory submissions and grant applications must be performed or verified by a qualified biostatistician. AI-generated calculations should be validated using established statistical software (PASS, nQuery, R). Assumptions underlying the calculations must be justified with published data or pilot study results.**
- Sample size is highly sensitive to the assumed effect size; small changes have large impact
- Always perform sensitivity analyses across a range of plausible assumptions
- Discuss feasibility with clinical sites before finalizing enrollment targets
- Regulatory agencies may require specific approaches to sample size justification

## Related Agents

- `biostatistician` — Primary agent for sample size and power calculations
- `clinical-trialist` — For study design context and feasibility
- `medical-writer` — For protocol and grant application writing
