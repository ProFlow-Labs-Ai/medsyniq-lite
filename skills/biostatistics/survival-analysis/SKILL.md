---
name: Survival Analysis
description: Time-to-event analysis methods including censoring, Kaplan-Meier estimation, log-rank test, Cox proportional hazards modeling, competing risks, and landmark analysis.
origin: ECMed
---

# Survival Analysis

## Censoring

Censoring occurs when the exact event time is unknown for some participants. Proper handling of censoring is what distinguishes survival analysis from other methods.

### Right Censoring (Most Common)
The event has not occurred by the time of last observation. Reasons:
- Study ends before participant experiences the event
- Participant withdraws or is lost to follow-up
- Participant experiences a competing event (addressed separately)

**Assumption:** censoring is non-informative (independent of the event process). If participants are censored because they are doing worse (or better), estimates are biased.

### Left Censoring
The event occurred before observation began, but the exact time is unknown. Example: a screening study detects prevalent disease — disease onset preceded the screen.

### Interval Censoring
The event is known to have occurred within a time interval but the exact time is unknown. Example: a tumor detected at a scheduled visit occurred between the prior visit and the current one. Requires specialized methods (Turnbull estimator, interval-censored Cox model).

### Administrative Censoring
All participants censored at the study end date. Non-informative by design (independent of prognosis).

### Informative Censoring
Censoring related to the outcome — a serious threat to validity. Examples: sicker patients drop out, healthier patients transfer care. Use sensitivity analyses (worst-case imputation, IPCW) to assess impact.

## Kaplan-Meier Estimator

### Method
The KM estimator is a non-parametric method to estimate the survival function S(t) = P(T > t).

At each event time t_i:
- d_i = number of events at time t_i
- n_i = number at risk just before t_i

S(t) = product of (1 - d_i/n_i) for all t_i <= t

### The KM Curve
- Step function that decreases at each event time
- Censored observations marked with tick marks ("+")
- Y-axis: survival probability (0 to 1 or 0% to 100%)
- X-axis: time from study entry (or randomization)
- Always display number at risk below the x-axis at regular intervals
- Median survival: time at which S(t) = 0.50

### Confidence Intervals
- Greenwood's formula for variance of S(t): Var(S(t)) = S(t)^2 * sum(d_i / (n_i * (n_i - d_i)))
- Pointwise CI: S(t) +/- Z * SE(S(t))
- Log-log transformation produces better CI coverage for extreme probabilities: exp(-exp(log(-log(S(t))) +/- Z * SE))
- CIs widen as at-risk numbers decrease — report KM estimates cautiously in the tail

### Restricted Mean Survival Time (RMST)
- Area under the KM curve up to a pre-specified time point tau
- Interpretable as the average event-free survival time within the window [0, tau]
- Does not require the proportional hazards assumption
- Difference in RMST between groups is an intuitive treatment effect measure
- Choice of tau should be clinically motivated and pre-specified

## Log-Rank Test

### Method
Non-parametric test comparing survival distributions between groups. Tests the null hypothesis that survival functions are identical.

At each event time, compare observed vs expected events in each group (based on the number at risk). Sum across all event times:

Chi-square = (sum(O - E))^2 / sum(V)

where V is the variance. Approximately chi-squared distributed with k-1 degrees of freedom (k = number of groups).

### Weighted Variants
- **Standard log-rank (Mantel-Cox)** — equal weight to all time points. Best when hazards are proportional throughout.
- **Wilcoxon (Breslow, Gehan)** — weights by number at risk. More sensitive to early differences (when more patients at risk).
- **Tarone-Ware** — weights by square root of number at risk. Intermediate.
- **Fleming-Harrington (rho, gamma)** — flexible weighting. G(rho=0, gamma=0) = log-rank; G(1,0) emphasizes early; G(0,1) emphasizes late.
- **MaxCombo test** — combines multiple Fleming-Harrington tests. Robust to different patterns (proportional hazards, delayed effect, crossing curves). Increasingly used in immuno-oncology.

### Stratified Log-Rank Test
Computes the test within strata and combines. Controls for confounders without modeling. Used as the primary analysis in many RCTs (stratified by randomization strata).

### Limitations
- Tests for any difference, not the magnitude of difference
- No effect estimate (use Cox model for hazard ratio)
- Assumes non-informative censoring
- Power depends on proportional hazards assumption (optimal when PH holds)

## Cox Proportional Hazards Model

### Model Specification
h(t | X) = h_0(t) * exp(beta_1*X1 + beta_2*X2 + ... + beta_k*Xk)

- h(t | X): hazard at time t given covariates X
- h_0(t): baseline hazard function (unspecified — semi-parametric)
- exp(beta_j): hazard ratio for covariate X_j

### Hazard Ratio Interpretation
- HR = exp(beta)
- HR = 1: no effect on hazard
- HR = 2: the hazard (instantaneous event rate) is twice as high
- HR = 0.5: 50% reduction in hazard
- HR is assumed constant over time (proportional hazards assumption)
- HR is NOT the same as relative risk or odds ratio, though it is often loosely interpreted as such

**Important caveat:** HR is a relative measure of the rate. It does not directly translate to survival probabilities without knowing the baseline hazard. Two trials with the same HR can have very different clinical implications depending on baseline event rates.

### Proportional Hazards Assumption

The PH assumption states that the hazard ratio is constant over time — the survival curves for different groups should have a consistent proportional relationship.

**Testing the PH Assumption:**

1. **Schoenfeld residuals** — regress scaled Schoenfeld residuals against time for each covariate. A significant correlation indicates PH violation. Plot residuals vs time; a flat (zero-slope) line supports PH.

2. **Log-log plot** — plot log(-log(S(t))) vs log(t) for each group. Parallel curves support PH. Crossing or converging curves indicate violation.

3. **Time-dependent covariate** — include an interaction between the covariate and time (or log(time)) in the model. If significant, PH is violated.

4. **Goodness-of-fit test** — Grambsch-Therneau global test based on Schoenfeld residuals.

**When PH Is Violated:**
- **Stratified Cox model** — stratify on the variable that violates PH. Allows different baseline hazards per stratum but assumes PH for other covariates.
- **Time-dependent coefficients** — allow beta to change with time. Piecewise models or penalized splines.
- **Accelerated failure time (AFT) models** — parametric alternative that does not require PH. Models survival time directly.
- **RMST** — non-parametric, does not assume PH.
- **Landmark analysis** — avoid time-dependent bias by analyzing from a fixed time point.

### Model Diagnostics
- **Martingale residuals** — assess functional form of continuous covariates. Plot against covariate; should be linear (flat LOESS). Non-linearity suggests transformation or categorization.
- **Deviance residuals** — symmetric transformation of Martingale residuals. Identify outliers.
- **Cox-Snell residuals** — assess overall model fit. Plot cumulative hazard of Cox-Snell residuals; should follow a unit exponential (45-degree line).
- **dfbeta** — influence of each observation on each coefficient. Identifies influential cases.

### Time-Varying Covariates
For predictors that change value during follow-up (e.g., blood pressure, treatment changes):
- Restructure data into counting process format: (start, stop, event) for each interval
- Each participant has multiple rows, one per covariate interval
- The covariate value is assumed constant within each interval
- Avoids immortal time bias (see below)

## Competing Risks

### The Problem
Standard KM and Cox methods treat competing events as censoring. This is only appropriate if the competing event is independent of the event of interest (often implausible). If a patient dies of cardiovascular disease, they can no longer experience cancer — their risk of cancer is effectively eliminated.

### Cause-Specific Hazard
- Standard Cox model for the event of interest, censoring competing events
- Interpretable as: among those currently event-free (from any cause), what is the instantaneous rate of the specific event?
- Does not directly correspond to a probability of the event over time

### Fine-Gray (Subdistribution Hazard) Model
- Models the cumulative incidence function (CIF) directly
- Keeps participants who experience competing events in the risk set (as "virtual" participants who can never experience the event of interest)
- Subdistribution HR: effect of covariate on the cumulative incidence of the event
- More appropriate for prediction and clinical decision-making (what is the probability of experiencing this event by time t, accounting for the fact that competing events may occur first?)

### Cumulative Incidence Function (CIF)
- Probability of the event of interest occurring by time t, accounting for competing risks
- 1-KM overestimates the probability when competing risks exist
- CIF for all competing causes sums to the overall failure function
- Aalen-Johansen estimator for CIF (generalization of KM)

### When to Use Which
- **Etiologic/causal questions** — cause-specific hazard model (what is the effect on the rate of this event?)
- **Prediction/prognostic questions** — Fine-Gray model (what is the cumulative probability?)
- Report both when possible; discordance between approaches is informative

## Landmark Analysis

### Purpose
Addresses immortal time bias and time-dependent classification.

**The problem:** if patients are classified by a post-baseline event (e.g., response to treatment at 3 months), those who died before 3 months could never have been classified as responders, creating a guarantee of survival (immortal time) that biases the responder group.

### Method
1. Choose a clinically relevant landmark time point (e.g., 3 months, 6 months)
2. Exclude patients who experienced the event or were lost before the landmark
3. Classify patients by their status at the landmark time
4. Analyze survival FROM the landmark time forward

### Limitations
- Excludes early events, reducing sample size
- Choice of landmark time is somewhat arbitrary (sensitivity analysis with multiple landmarks recommended)
- Does not use all available information about time-varying exposures

### Alternative: Simon-Makuch Method
A modified KM that accommodates time-dependent group membership, but has its own limitations and is less commonly accepted.

## Immortal Time Bias

A common and pernicious bias in observational survival studies. Occurs when the period between cohort entry and exposure classification is guaranteed to be event-free (the patient must survive long enough to receive the treatment or be classified).

**Classic example:** patients who receive an organ transplant vs those who do not. Transplant recipients survived long enough to receive the transplant — this survival time is "immortal" and biases in favor of the transplant group.

**Solutions:**
- Treat exposure as a time-varying covariate in a Cox model (person-time before exposure counted as unexposed)
- Landmark analysis
- Exclude immortal time from follow-up
- Clone-censor-weight approaches (emulating target trials)

## Practical Reporting

1. Always show KM curves with numbers at risk
2. Report median survival with 95% CI for each group
3. Report hazard ratios with 95% CI from Cox models
4. State and test the proportional hazards assumption
5. Report the number of events, not just total participants
6. Specify the time origin, event definition, and censoring rules
7. For competing risks, report CIF rather than 1-KM
8. Follow STROBE (observational) or CONSORT (trials) guidelines
