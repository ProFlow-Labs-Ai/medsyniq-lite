---
name: RCT Design
description: Comprehensive guidance on randomized controlled trial design including randomization methods, blinding strategies, analysis populations, and CONSORT reporting standards.
origin: ECMed
---

# Randomized Controlled Trial Design

## Core Design Elements

### Randomization
Randomization is the defining feature of the RCT. It eliminates selection bias and, on average, balances known and unknown confounders between groups.

**Methods of randomization:**
- **Simple randomization** — coin-flip equivalent. Acceptable for large trials (n > 200) but can produce imbalanced groups in small trials.
- **Block randomization** — guarantees balance at defined intervals. Use variable block sizes (e.g., 4, 6, 8) to prevent predictability. Fixed block size with open-label treatment is a protocol vulnerability.
- **Stratified randomization** — block randomization within strata defined by key prognostic factors (e.g., site, disease severity). Limit to 2-3 stratification factors; excessive stratification creates sparse cells.
- **Minimization (dynamic allocation)** — algorithmic approach that balances multiple factors simultaneously. Deterministic minimization is controversial (some regulators consider it quasi-random); adding a random element (e.g., 80% probability of favored allocation) addresses this.
- **Cluster randomization** — randomizes groups (clinics, hospitals, communities) rather than individuals. Requires inflation of sample size by the design effect: DE = 1 + (m - 1) * ICC, where m is cluster size and ICC is intra-cluster correlation coefficient.

### Allocation Concealment
Distinct from blinding. Allocation concealment prevents foreknowledge of upcoming assignments. Failure of concealment biases enrollment decisions.

**Adequate methods:** central telephone/web-based system, sequentially numbered sealed opaque envelopes (SNOSE), pharmacy-controlled allocation.
**Inadequate methods:** open random number tables, alternation, date of birth, hospital number.

Allocation concealment is ALWAYS possible regardless of whether blinding is feasible.

### Blinding
- **Open-label (unblinded)** — both participant and investigator know assignment. Required when interventions are obviously different (surgery vs. medicine). Use blinded outcome assessment (PROBE design) to mitigate bias.
- **Single-blind** — usually participant blinded, investigator aware. Ambiguous term; specify who is blinded.
- **Double-blind** — participant and investigator blinded. Gold standard for drug trials. Requires matched placebo or double-dummy technique.
- **Triple-blind** — adds blinding of outcome assessors or data analysts.

Blinding adequacy should be assessed (e.g., James blinding index, Bang blinding index).

## Analysis Populations

### Intention-to-Treat (ITT)
All participants analyzed in their randomized group regardless of adherence, crossover, or withdrawal. Preserves the benefits of randomization. Conservative for superiority trials (biases toward null). The full ITT requires no exclusions; the modified ITT (mITT) may exclude participants who never received treatment or lack any post-baseline data.

### Per-Protocol (PP)
Includes only participants who completed the study without major protocol deviations. Susceptible to bias because deviation is often related to treatment. Important as a sensitivity analysis.

### For Non-Inferiority Trials
Both ITT and PP must be presented. ITT is NOT conservative for NI (non-adherence dilutes differences, pushing toward NI conclusion). Concordance between ITT and PP strengthens conclusions.

## Trial Architectures

### Parallel Group
Most common. Each participant receives one treatment. Simple analysis but requires larger sample sizes than crossover designs for the same power.

### Crossover
Each participant receives all treatments in sequence. See dedicated crossover-trials skill for details.

### Factorial Design
Tests two or more interventions simultaneously in a single trial. A 2x2 factorial tests interventions A and B: participants receive A alone, B alone, both, or neither. Efficient when no interaction exists — effectively runs two trials for the cost of one. If interaction is present, interpretation becomes complex and the trial is underpowered for interaction testing.

### Cluster Randomized
Unit of randomization is a group. Used when individual randomization is impractical (e.g., policy interventions, infection control). Key considerations: ICC estimation, variable cluster sizes (coefficient of variation), analysis must account for clustering (GEE, mixed models), fewer clusters is a bigger problem than fewer individuals per cluster.

## Superiority, Non-Inferiority, and Equivalence

### Superiority
Tests whether experimental treatment is better than control. Two-sided test: H0: difference = 0. One-sided is rarely acceptable unless strong biological rationale.

### Non-Inferiority
Tests whether experimental treatment is not unacceptably worse than active control. See dedicated non-inferiority-trials skill.

### Equivalence
Tests whether two treatments produce the same effect within a defined margin. Uses two one-sided tests (TOST). Common in bioequivalence studies (80-125% for AUC and Cmax). Distinct from non-inferiority — equivalence requires ruling out both directions.

## CONSORT Reporting Standards

The CONSORT 2010 statement provides a 25-item checklist and flow diagram for transparent reporting of RCTs.

**Key CONSORT requirements:**
- Title identifies study as randomized
- Structured abstract with trial design, methods, results, conclusions
- Scientific background and rationale
- Specific objectives and hypotheses
- Eligibility criteria and settings
- Precisely defined interventions
- Pre-specified primary and secondary outcomes with measurement timing
- Sample size determination
- Randomization: sequence generation, allocation concealment, implementation
- Blinding: who was blinded and how
- Statistical methods including subgroup and sensitivity analyses
- Participant flow diagram (enrollment, allocation, follow-up, analysis)
- Baseline demographic and clinical characteristics by group
- Number analyzed per group (ITT denominator)
- Effect estimates with precision (CI) for each outcome
- Harms and unintended effects
- Trial registration number and protocol access

**CONSORT extensions exist for:** cluster trials, non-inferiority/equivalence, pragmatic trials, PRO outcomes, harms, abstracts, herbal interventions, non-pharmacological treatments, pilot/feasibility studies.

## Common Pitfalls

1. **Inadequate allocation concealment** — single most important source of bias in RCTs.
2. **Post-randomization exclusions** — always analyze as randomized; describe exclusions transparently.
3. **Multiplicity without adjustment** — multiple primary endpoints, interim analyses, and subgroup analyses inflate Type I error.
4. **Undisclosed protocol amendments** — register protocols prospectively (clinicaltrials.gov, ISRCTN). Report deviations from protocol.
5. **Selective outcome reporting** — compare published results against registered protocol. All pre-specified outcomes must be reported.
6. **Composite endpoints** — components should be of similar clinical importance, occur at similar frequency, and be similarly affected by treatment. Driven by a single component is misleading.

## Regulatory Considerations

- Two adequate and well-controlled trials historically required by FDA (21 CFR 314.126), though single pivotal trials accepted with robust evidence.
- EMA accepts single pivotal trial more readily if supported by additional evidence.
- ICH E9 (Statistical Principles for Clinical Trials) and E9(R1) (Estimands) are foundational guidance documents.
- Pre-specification of the statistical analysis plan (SAP) before unblinding is essential.
