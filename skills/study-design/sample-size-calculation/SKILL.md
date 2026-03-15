---
name: Sample Size Calculation
description: Comprehensive guide to sample size estimation for clinical trials including formulas for different endpoints, adjustment for dropout, interim analysis impact, non-inferiority designs, and software tools.
origin: ECMed
---

# Sample Size Calculation

## Core Components

Every sample size calculation requires four fundamental elements:

### 1. Significance Level (Alpha)
- Probability of Type I error (rejecting a true null hypothesis)
- Convention: alpha = 0.05 (two-sided) for most clinical trials
- One-sided alpha = 0.025 equivalent to two-sided 0.05
- Regulatory trials almost always use two-sided alpha = 0.05
- For multiple primary endpoints or interim analyses, alpha must be adjusted (split or spent)

### 2. Statistical Power (1 - Beta)
- Probability of detecting a true effect (rejecting false null hypothesis)
- Convention: 80% (beta = 0.20) for most trials; 90% (beta = 0.10) for pivotal regulatory trials
- Higher power requires larger sample size: 90% power requires roughly 33% more subjects than 80% power
- Underpowered trials are both scientifically uninformative and ethically problematic (expose patients to research risk without ability to answer the question)

### 3. Effect Size
- The minimum clinically important difference (MCID) the trial is designed to detect
- Should NOT be based on what is "expected" from preliminary data — should reflect the smallest effect that would change clinical practice
- Overly optimistic effect sizes lead to underpowered studies
- Sources: prior trials, clinician input, MCID literature, regulatory guidance
- For superiority trials: the difference between treatment groups
- For NI trials: the non-inferiority margin

### 4. Variability
- Standard deviation (continuous outcomes), event rate (binary outcomes), or hazard rate (survival outcomes)
- Often the most uncertain parameter — use conservative (larger) estimates
- Sources: pilot studies, published literature, clinical databases
- Consider using the upper bound of the confidence interval for the SD estimate

## Formulas for Common Scenarios

### Two-Group Comparison of Means (Parallel Design)

n per group = 2 * (Z_alpha/2 + Z_beta)^2 * sigma^2 / delta^2

Where:
- Z_alpha/2 = 1.96 (for alpha = 0.05, two-sided)
- Z_beta = 0.842 (for 80% power) or 1.282 (for 90% power)
- sigma = pooled standard deviation
- delta = difference in means to detect

**Example:** detect a 5-point difference in blood pressure (SD = 12), alpha = 0.05, power = 80%:
n = 2 * (1.96 + 0.842)^2 * 144 / 25 = 2 * 7.85 * 144 / 25 = 90.4 per group, round to 91

### Two-Group Comparison of Proportions

n per group = (Z_alpha/2 * sqrt(2 * p_bar * (1-p_bar)) + Z_beta * sqrt(p1*(1-p1) + p2*(1-p2)))^2 / (p1 - p2)^2

Simplified (uncorrected):
n per group approximately = (Z_alpha/2 + Z_beta)^2 * (p1*(1-p1) + p2*(1-p2)) / (p1 - p2)^2

Where p1 and p2 are the expected event rates in the two groups.

**Continuity correction (Yates):** add 2/(n * |p1-p2|) — produces slightly larger n. Recommended for small samples.

### Survival (Time-to-Event) Outcomes

Sample size is driven by the number of required events, not participants.

Required events: d = (Z_alpha/2 + Z_beta)^2 / (ln(HR))^2 * 4

For 1:1 randomization detecting HR = 0.75 with 80% power:
d = (1.96 + 0.842)^2 / (ln(0.75))^2 * 4 = 7.85 / 0.0827 * 4 = 380 events (approximately)

Total participants: N = d / probability of event during follow-up. Depends on accrual rate, follow-up duration, event rate, and censoring pattern. Requires simulation or Lachin-Foulkes formula.

### Chi-Square and Fisher's Exact Test
For contingency tables, the sample size depends on the expected cell proportions and the desired detectable difference. Use specialized formulas or software.

### Paired Designs (Crossover, Matched)
n pairs = (Z_alpha/2 + Z_beta)^2 * sigma_d^2 / delta^2

Where sigma_d is the standard deviation of the within-pair differences. Since sigma_d = sigma * sqrt(2 * (1 - rho)), paired designs require substantially fewer subjects when the within-subject correlation (rho) is high.

## Adjustments

### Dropout and Loss to Follow-Up
Inflate the calculated sample size to account for anticipated attrition:

N_adjusted = N / (1 - dropout_rate)

- For 20% expected dropout: multiply by 1/(1-0.20) = 1.25
- Use the dropout rate observed in similar prior trials
- Consider differential dropout between arms (more complex adjustment)
- Distinguish between dropout (lost entirely) and non-compliance (still followed)

### Unequal Allocation
For k:1 randomization (e.g., 2:1 experimental:control):
- Total N increases compared to 1:1 allocation
- Efficiency factor: (1 + 1/k)^2 / (4/k)
- 2:1 allocation requires approximately 12% more total participants than 1:1
- 3:1 allocation requires approximately 33% more
- Used when: more safety data needed on experimental arm, ethical preference, patient preference

### Clustering (Cluster Randomized Trials)
Multiply the individual-level sample size by the design effect:

DE = 1 + (m - 1) * ICC

Where m = average cluster size and ICC = intra-cluster correlation coefficient.

Total participants: N_cluster = N_individual * DE
Number of clusters: k = N_cluster / m (per arm)

The number of clusters matters more than cluster size for power. Minimum: typically 6-8 clusters per arm.

### Stratified Analyses
If the primary analysis uses stratified methods (e.g., stratified log-rank test, CMH test), sample size should account for stratification. Generally, stratification on prognostic factors improves power slightly.

## Interim Analysis Impact

Interim analyses for efficacy or futility consume alpha (increase the overall Type I error rate) unless accounted for in the design.

### Group Sequential Methods
- O'Brien-Fleming boundaries: conservative early, liberal late. Minimal inflation of total sample size (< 3% for up to 5 looks).
- Pocock boundaries: equal boundary at each look. Requires more inflation (up to 20-30% additional subjects).
- Lan-DeMets alpha-spending: flexible timing of interim looks while controlling overall alpha.

### Information Fraction
The proportion of total planned information (events, subjects) accumulated at each interim analysis. Group sequential boundaries are typically defined in terms of information fractions.

### Sample Size Adjustment
When planning interim analyses, inflate the fixed-sample-size calculation by the inflation factor associated with the spending function:
- O'Brien-Fleming with 1 interim: multiply by approximately 1.015
- Pocock with 1 interim: multiply by approximately 1.10

## Sample Size for Non-Inferiority

n per group = (Z_alpha + Z_beta)^2 * 2 * sigma^2 / (delta - delta_0)^2

Where:
- delta = NI margin
- delta_0 = expected true difference (often 0 if treatments assumed equally effective)
- Z_alpha = Z for one-sided alpha (1.645 for alpha = 0.025)
- Note: one-sided test (alpha, not alpha/2)

If the new treatment is expected to be truly equal (delta_0 = 0):
n per group = (Z_alpha + Z_beta)^2 * 2 * sigma^2 / delta^2

NI trials are typically larger than superiority trials because the margin (delta) is small relative to typical effect sizes.

### Sample Size for Equivalence
Requires sample size adequate for two one-sided tests. Approximately:
n per group = (Z_alpha + Z_beta/2)^2 * 2 * sigma^2 / delta^2

(Using beta/2 because equivalence requires both one-sided tests to be significant.)

## Software Tools

### Free/Open-Source
- **G*Power** — widely used, covers most common designs. Windows/Mac.
- **R packages:** `pwr` (basic), `samplesize` (clinical trials), `gsDesign` (group sequential), `rpact` (confirmatory adaptive), `PowerSurvEpi` (survival epidemiology)
- **PS (Power and Sample Size)** — Vanderbilt. Simple interface for common designs.
- **OpenEpi** — web-based, covers basic epidemiologic designs.
- **Sealed Envelope** — online calculators for common trial designs.

### Commercial
- **nQuery** — comprehensive, covers complex designs including adaptive and group sequential. Industry standard.
- **PASS (NCSS)** — extensive procedure library (over 1000 scenarios).
- **East (Cytel)** — specialized in group sequential and adaptive designs. Regulatory-accepted.
- **SAS PROC POWER** — built into SAS. Covers standard designs.
- **Stata `power` command** — integrated sample size calculation.

### Simulation-Based Approaches
For complex designs where analytical formulas are unavailable or approximate:
- Simulate the trial thousands of times under assumed parameters
- Calculate the proportion of simulations that reject the null (empirical power)
- Vary assumptions to create power curves
- Essential for adaptive designs, complex endpoints, and non-standard analyses

## Sensitivity Analysis

### Parameter Uncertainty
Never rely on a single sample size estimate. Present:
- **Power curves** — plot power as a function of effect size for the planned sample size
- **Sample size tables** — show required n across ranges of effect size and variability
- **Conditional power** — probability of success given interim data (for adaptive sample size re-estimation)

### Conservative Assumptions
- Use the upper bound of the CI for the SD estimate from pilot data
- Consider multiple plausible effect sizes (optimistic, expected, conservative)
- Account for worst-case dropout scenarios
- Factor in potential dilution from non-compliance

## Reporting Sample Size in Protocols and Papers

### Essential Elements (SPIRIT/CONSORT)
1. Primary outcome measure
2. Test statistic and analysis method
3. Type I error rate (one-sided or two-sided) with justification
4. Desired power
5. Assumed effect size with justification (clinical rationale, prior data)
6. Assumed variability (source of estimate)
7. Adjustments applied (dropout, interim analysis, clustering, multiplicity)
8. Software used
9. Final required sample size (total and per group)

### Common Errors
1. **Citing effect size from a single small study** — small studies overestimate effects (winner's curse). Use meta-analytic estimates or MCID.
2. **Ignoring multiplicity** — co-primary endpoints, interim analyses, and subgroups all affect the required sample size.
3. **Post-hoc power** — calculating power after the trial using observed effect size is circular and uninformative. Report confidence intervals instead.
4. **Assuming 1:1 allocation without justification** — 1:1 is most efficient but other ratios may be appropriate.
5. **Insufficient sensitivity analysis** — a single number without exploration of assumptions is inadequate.
