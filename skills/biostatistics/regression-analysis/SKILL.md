---
name: Regression Analysis
description: Regression methods for medical research including linear, logistic, Poisson, and negative binomial regression with model diagnostics, assumption checking, and interpretation guidance.
origin: ECMed
---

# Regression Analysis

## Linear Regression

### Simple Linear Regression
Models the relationship between a continuous outcome (Y) and a single predictor (X):

Y = beta_0 + beta_1 * X + epsilon

- beta_0: intercept (expected Y when X = 0)
- beta_1: slope (change in Y per one-unit increase in X)
- epsilon: random error (assumed normally distributed with constant variance)

### Multiple Linear Regression
Y = beta_0 + beta_1*X1 + beta_2*X2 + ... + beta_k*Xk + epsilon

Each coefficient represents the change in Y per unit change in that predictor, holding all other predictors constant (adjusted effect).

### Assumptions (LINE)
1. **Linearity** — relationship between predictors and outcome is linear. Check: residual vs fitted plot (should show no pattern), component-plus-residual plots.
2. **Independence** — observations are independent. Violated by: clustering, repeated measures, time series. Solution: mixed models, GEE.
3. **Normality** — residuals are normally distributed. Check: Q-Q plot, Shapiro-Wilk test on residuals. Less important with large samples (CLT).
4. **Equal variance (homoscedasticity)** — residual variance constant across fitted values. Check: scale-location plot, Breusch-Pagan test. Solution: robust standard errors (HC estimators), weighted least squares, log transformation.

### Diagnostics
- **Residual plots** — primary diagnostic tool. Plot residuals vs fitted values, vs each predictor, Q-Q plot.
- **Influential observations** — Cook's distance (> 4/n suggests influence), leverage (hat values), DFBETAS.
- **R-squared** — proportion of variance explained. Adjusted R-squared penalizes for number of predictors. R-squared alone does not validate the model.
- **F-test** — overall model significance (at least one predictor is associated with Y).

## Logistic Regression

### Binary Logistic Regression
Models the probability of a binary outcome:

log(p / (1-p)) = beta_0 + beta_1*X1 + ... + beta_k*Xk

Where p/(1-p) is the odds of the outcome.

### Odds Ratio Interpretation
- exp(beta_j) = adjusted odds ratio for predictor X_j
- For a continuous predictor: OR per one-unit increase in X, adjusted for other covariates
- For a categorical predictor: OR comparing category to reference category
- OR = 1: no association; OR > 1: higher odds; OR < 1: lower odds
- Report OR with 95% CI. The CI is more informative than the p-value alone.

### OR vs RR
The OR overestimates the RR when the outcome is common (> 10%). For common outcomes, consider:
- Log-binomial regression (directly estimates RR)
- Modified Poisson regression with robust standard errors (Zou, 2004)
- Report both OR and RR when feasible

### ROC Curve and Model Discrimination
- **ROC curve** — plots sensitivity vs (1-specificity) across all possible thresholds
- **AUC (C-statistic)** — probability that a randomly selected case has a higher predicted probability than a randomly selected non-case
  - AUC = 0.5: no discrimination (coin flip)
  - AUC = 0.7-0.8: acceptable
  - AUC = 0.8-0.9: excellent
  - AUC > 0.9: outstanding
- **Calibration** — does predicted probability match observed probability? Hosmer-Lemeshow test (limited), calibration plots (preferred), calibration slope and intercept.

### Model Fit
- **Hosmer-Lemeshow test** — tests calibration across deciles of predicted probability. Non-significant = adequate fit. Sensitive to grouping strategy and sample size.
- **AIC/BIC** — for model comparison (lower is better)
- **Pseudo R-squared** — Nagelkerke, McFadden, or Cox-Snell. Not directly comparable to linear regression R-squared.

## Multinomial Logistic Regression

For nominal outcomes with > 2 categories (e.g., treatment response: complete, partial, none):
- Models log-odds of each category relative to a reference category
- Produces one set of coefficients for each non-reference category
- Assumes independence of irrelevant alternatives (IIA) — adding/removing a category should not change the relative odds of remaining categories. Test with Hausman-McFadden test.

## Ordinal Logistic Regression

For ordered categorical outcomes (e.g., disease severity: mild, moderate, severe):

### Proportional Odds Model
- Most common ordinal regression
- Estimates a single OR that applies across all cutpoints of the ordinal scale
- **Proportional odds assumption** — the OR is constant regardless of where the outcome is dichotomized. Test with Brant test or score test.
- If assumption violated: consider partial proportional odds model, multinomial logistic, or treat as continuous

### Interpretation
OR represents the odds of being in a higher (worse) category for a one-unit increase in the predictor. A single summary across the entire ordinal scale.

## Poisson Regression

For count outcomes (number of events: ED visits, infections, falls):

log(mu) = beta_0 + beta_1*X1 + ... + beta_k*Xk

- exp(beta_j) = incidence rate ratio (IRR) for predictor X_j
- Assumes mean equals variance (equidispersion)
- Can incorporate an offset term (log of person-time) to model rates rather than counts

### Overdispersion
When variance exceeds the mean (common in medical data):
- **Detection:** deviance/df or Pearson chi-square/df >> 1
- **Consequences:** standard errors too small, p-values too liberal, CIs too narrow
- **Solutions:** quasi-Poisson (scales SE by dispersion parameter), negative binomial regression, or robust standard errors

## Negative Binomial Regression

Extension of Poisson for overdispersed count data:
- Adds a dispersion parameter (alpha or k) to model extra-Poisson variation
- When alpha approaches 0, converges to Poisson
- Preferred over Poisson when overdispersion is present
- Same interpretation: exp(beta) = IRR

### Zero-Inflated Models
When excess zeros exist beyond what Poisson/NB predicts (e.g., many patients with zero hospitalizations):
- **Zero-inflated Poisson (ZIP)** or **Zero-inflated Negative Binomial (ZINB)**
- Two-part model: (1) logistic model for the probability of being a "structural zero" (never at risk) vs "at risk," (2) count model for those at risk
- Requires theoretical justification for the two processes generating zeros
- Compare with standard Poisson/NB using Vuong test or AIC

## Model Building and Selection

### Variable Selection Approaches

**Subject-matter driven (preferred):**
- Select confounders based on clinical knowledge and DAGs
- Include variables known to be associated with both exposure and outcome
- Do NOT use statistical significance of individual predictors to decide inclusion

**Data-driven (use cautiously):**
- **Forward selection** — start with empty model, add variables one at a time based on statistical criteria. Tends to include too few variables.
- **Backward elimination** — start with full model, remove variables. Generally preferred over forward.
- **Stepwise** — combination of forward and backward. Criticized: inflates significance, biased coefficients, unstable across samples.
- **LASSO (L1 regularization)** — penalized regression that shrinks coefficients toward zero, performing variable selection. Better than stepwise for prediction models.

**Recommendation:** Use clinical judgment for explanatory/etiologic models. Use penalized methods (LASSO, elastic net) for prediction models with validation.

### AIC and BIC
- **AIC (Akaike Information Criterion)** — balances model fit and complexity. Lower is better. Penalizes each parameter by 2.
- **BIC (Bayesian Information Criterion)** — stronger penalty for complexity (log(n) per parameter). Favors simpler models, especially with large n.
- Neither provides an absolute measure of fit — only relative comparison between models on the same data.

## Multicollinearity

### Definition
High correlation among predictor variables, causing unstable coefficient estimates and inflated standard errors.

### Detection
- **Variance Inflation Factor (VIF)** — VIF > 5 suggests concern; VIF > 10 indicates serious multicollinearity
- **Correlation matrix** — pairwise correlations > 0.7-0.8 suggest collinearity
- **Condition number** — > 30 indicates problematic collinearity
- **Tolerance** — 1/VIF. Values < 0.2 are concerning

### Consequences
- Individual coefficients unreliable (high SE, wide CI, instability across samples)
- Overall model prediction may still be adequate
- Cannot interpret individual predictor effects

### Solutions
- Remove one of two highly correlated predictors (choose based on clinical relevance)
- Combine correlated predictors into a composite score or index
- Principal component analysis (PCA) to create orthogonal predictors
- Ridge regression (L2 regularization) — shrinks coefficients without eliminating them
- Center continuous variables to reduce structural multicollinearity (with interaction terms)

## Interaction and Effect Modification

### Interaction
An interaction exists when the effect of one predictor on the outcome depends on the level of another predictor.

Y = beta_0 + beta_1*X1 + beta_2*X2 + beta_3*(X1*X2) + epsilon

- beta_3 is the interaction coefficient
- The effect of X1 on Y is: beta_1 + beta_3*X2 (depends on X2)
- Test interaction with the interaction term's p-value or likelihood ratio test comparing models with and without interaction

### Additive vs Multiplicative Interaction
- **Multiplicative interaction** — interaction on the scale of the model (log-odds for logistic, log-rate for Poisson). Default when including product terms.
- **Additive interaction** — interaction on the absolute risk scale. Measured by RERI (Relative Excess Risk due to Interaction), AP (Attributable Proportion), S (Synergy Index). More relevant for public health.
- Presence of multiplicative interaction does not imply additive interaction and vice versa.

## Reporting Standards

Following STROBE and TRIPOD guidelines:
1. Report the number of events per variable (EPV). Minimum EPV of 10 is a rough guideline for logistic regression (though recent work suggests 5-10 is context-dependent).
2. Present unadjusted and adjusted estimates.
3. Report model fit statistics.
4. Describe variable selection method.
5. For prediction models: report discrimination and calibration; perform internal validation (bootstrap, cross-validation).
6. Report confidence intervals for all effect estimates.
7. Check and report assumption verification.
