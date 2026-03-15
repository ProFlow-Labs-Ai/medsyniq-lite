---
description: Choose and interpret statistical tests
---

# /statistics

## What This Command Does

The `/statistics` command helps select the appropriate statistical test for a given research question and data structure, explains the test assumptions, interprets results, and provides guidance on reporting. It covers common and advanced statistical methods used in clinical research.

## When to Use

- When choosing the right statistical test for your data and research question
- When interpreting statistical output from software (R, SPSS, Stata, SAS)
- When reviewing a manuscript and evaluating the statistical methods
- When teaching trainees about biostatistics in clinical research
- When determining whether test assumptions are met

## How It Works

1. Analyzes the research question, outcome type, and data structure
2. Delegates to the **biostatistician** agent for statistical consultation
3. Identifies the appropriate statistical test based on variable types and design
4. Lists and explains test assumptions with methods to verify them
5. Provides interpretation framework for results
6. Recommends reporting format per journal guidelines (e.g., SAMPL)

## Example Usage

**Input:**
```
/statistics comparing survival curves between 3 treatment groups with censored data
```

**Output:**
```
STATISTICAL TEST SELECTION

RESEARCH CONTEXT:
- Outcome: Time-to-event (survival) data
- Groups: 3 treatment groups (>2 groups)
- Data characteristic: Right-censored observations
- Comparison: Between-group difference in survival distributions

RECOMMENDED PRIMARY TEST:
LOG-RANK TEST (Mantel-Cox)

Purpose: Tests the null hypothesis that survival curves are
identical across all 3 groups (omnibus test)

Assumptions:
1. Independent observations (patients are independent)
2. Censoring is non-informative (unrelated to outcome)
3. Proportional hazards (hazard ratio is constant over time)
4. Adequate events in each group for statistical power

Test statistic: Chi-square with k-1 = 2 degrees of freedom

IF LOG-RANK TEST IS SIGNIFICANT:
Pairwise comparisons between groups:
- Perform 3 pairwise log-rank tests (A vs B, A vs C, B vs C)
- Apply Bonferroni or Holm correction for multiple comparisons
- Adjusted alpha: 0.05/3 = 0.017 (Bonferroni)

MULTIVARIABLE ANALYSIS:
COX PROPORTIONAL HAZARDS REGRESSION

When to use: To adjust for covariates and estimate hazard ratios
Model: h(t) = h0(t) * exp(beta1*X1 + beta2*X2 + ...)

Key outputs:
- Hazard Ratio (HR) with 95% CI for each group comparison
- Global test (likelihood ratio, Wald, or score test)
- Reference group selection matters for interpretation

CHECKING PROPORTIONAL HAZARDS ASSUMPTION:
1. Schoenfeld residuals test (formal): schoenfeld.test() in R
2. Log-log survival plot: parallel curves suggest PH holds
3. Scaled Schoenfeld residual plot: horizontal trend expected

IF PROPORTIONAL HAZARDS IS VIOLATED:
- Stratified Cox model (stratify by the violating variable)
- Time-varying coefficients
- Restricted mean survival time (RMST) — does not require PH
- Flexible parametric models (Royston-Parmar)
- Landmark analysis at specific time points

ALTERNATIVE TESTS:
- Wilcoxon (Breslow) test: More weight to early events
- Tarone-Ware test: Intermediate weighting
- Fleming-Harrington test: Flexible weighting (G-rho family)
- Restricted mean survival time: Assumption-free summary measure

REPORTING (SAMPL Guidelines):
- Report: Test statistic, degrees of freedom, p-value
- Present Kaplan-Meier curves with number at risk table
- Report median survival with 95% CI per group
- Report HR (95% CI) from Cox model with reference group
- State whether PH assumption was tested and met

EXAMPLE R CODE:
  library(survival)
  # Kaplan-Meier curves
  fit <- survfit(Surv(time, status) ~ group, data = df)
  # Log-rank test
  survdiff(Surv(time, status) ~ group, data = df)
  # Cox regression
  coxph(Surv(time, status) ~ group + age + sex, data = df)
```

## Important Notes

- **DISCLAIMER: This tool provides statistical decision support only. Statistical analyses for clinical research publications and regulatory submissions must be performed or supervised by a qualified biostatistician. AI-generated statistical guidance should be verified against current methodological standards. The choice of statistical method can influence study conclusions; pre-specification in the analysis plan is essential.**
- Statistical test selection should be pre-specified in the analysis plan, not post hoc
- Always verify assumptions before interpreting results
- Multiple comparisons require appropriate correction to control type I error
- Consider both statistical significance and clinical relevance when interpreting results

## Related Agents

- `biostatistician` — Primary agent for statistical methodology
- `clinical-trialist` — For study design context
- `medical-writer` — For statistical reporting in manuscripts
