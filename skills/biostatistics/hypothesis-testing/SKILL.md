---
name: Hypothesis Testing
description: Statistical hypothesis testing framework including null and alternative hypotheses, error types, p-value interpretation, confidence intervals, parametric and non-parametric test selection, and one-sided vs two-sided testing.
origin: ECMed
---

# Hypothesis Testing

## Conceptual Framework

### Null Hypothesis (H0)
The null hypothesis states there is no effect, no difference, or no association. It is the default assumption that the treatment or exposure has no impact.

- H0 for difference in means: mu_1 - mu_2 = 0
- H0 for odds ratio: OR = 1
- H0 for correlation: rho = 0

The null hypothesis is never "proven" — it is either rejected or not rejected. "Failure to reject" is not the same as "accepting" H0.

### Alternative Hypothesis (H1 or Ha)
The alternative hypothesis states that an effect exists. It is what the researcher seeks evidence for.

- **Two-sided:** mu_1 ≠ mu_2 (effect in either direction)
- **One-sided:** mu_1 > mu_2 (effect in a specific direction)

The alternative hypothesis should be specified before data collection.

## Error Types

### Type I Error (Alpha, False Positive)
- Rejecting H0 when it is actually true
- Concluding a treatment works when it does not
- Controlled by setting the significance level (conventionally alpha = 0.05)
- The significance level is the maximum acceptable probability of Type I error

### Type II Error (Beta, False Negative)
- Failing to reject H0 when it is actually false
- Missing a real treatment effect
- Related to statistical power: Power = 1 - beta
- Conventional beta = 0.20 (power = 80%) or beta = 0.10 (power = 90%)

### Relationship Between Errors
- For a fixed sample size, reducing alpha increases beta (and vice versa)
- Increasing sample size reduces both errors simultaneously
- The only free lunch: larger sample sizes improve both Type I and Type II error control

### Type III Error (Directional Error)
Correctly rejecting H0 but concluding the effect is in the wrong direction. Relevant primarily in one-sided testing contexts.

## P-Value Interpretation

### What a P-Value IS
The p-value is the probability of observing data at least as extreme as the actual data, assuming the null hypothesis is true.

P(data this extreme or more | H0 is true)

### What a P-Value Is NOT
- **NOT the probability that H0 is true.** P(H0 | data) ≠ p-value. This confusion (the "prosecutor's fallacy" or "transposed conditional") is the single most common misinterpretation in medical research.
- **NOT the probability that the result is due to chance.** The p-value assumes chance (H0) is true and asks about the data; it does not assign a probability to chance being the explanation.
- **NOT the probability of making an error.** The p-value is a property of the data, not of any decision.
- **NOT a measure of effect size or clinical importance.** A tiny, clinically meaningless effect can produce a very small p-value with a large sample.
- **NOT a measure of evidence strength** in an absolute sense. A p-value of 0.04 is not dramatically more "significant" than 0.06.

### ASA Statement on P-Values (2016)
Six principles:
1. P-values indicate how incompatible data are with a specified statistical model
2. P-values do not measure the probability that the studied hypothesis is true
3. Scientific conclusions should not be based only on whether a p-value passes a specific threshold
4. Proper reporting requires full transparency
5. A p-value does not measure the size or importance of an effect
6. By itself, a p-value does not provide a good measure of evidence regarding a model or hypothesis

### The 0.05 Threshold
- Arbitrary convention (Fisher suggested it as a convenient reference point; Neyman-Pearson formalized it as a decision threshold)
- "Statistically significant" does not mean "clinically significant"
- Results just above or below 0.05 should be interpreted similarly, not as qualitatively different
- Some fields have moved to stricter thresholds (particle physics: 5-sigma; genomics: 5x10^-8)
- Consider reporting exact p-values rather than threshold declarations

## Confidence Intervals

### Interpretation
A 95% confidence interval means: if we repeated the study infinitely and calculated a CI each time, 95% of those intervals would contain the true parameter value.

It does NOT mean: there is a 95% probability that the true value lies within this specific interval (the true value either is or is not in the interval; we do not know which).

### Advantages Over P-Values
- Provide information about effect magnitude and precision
- Width reflects sample size and variability (narrow CI = precise estimate)
- CI exclusion of the null value is equivalent to a significant p-value at the corresponding alpha
- Can assess both statistical and clinical significance: does the CI include clinically meaningful values?

### Relationship to Hypothesis Testing
- A 95% CI excluding zero (for differences) or one (for ratios) corresponds to p < 0.05 (two-sided)
- The CI provides strictly more information than the p-value
- CI can show a "statistically significant" result that is clinically trivial (entire CI within clinically negligible range)
- CI can show a "non-significant" result that is clinically compatible with an important effect (wide CI spanning both trivial and important values — an inconclusive study, not a negative study)

## Test Selection Framework

### Decision Flowchart

**Step 1: What is the research question?**
- Comparison of groups? Association between variables? Agreement?

**Step 2: How many groups?**
- Two groups or more than two?

**Step 3: What type of data?**
- Continuous (interval/ratio)
- Ordinal
- Categorical (nominal, binary)
- Time-to-event

**Step 4: Are assumptions met?**
- Normality (Shapiro-Wilk test, Q-Q plots, histogram inspection)
- Equal variances (Levene's test, F-test)
- Independence of observations
- Adequate sample size

### Parametric Tests (Assume Normal Distribution)

| Scenario | Test |
|---|---|
| One sample vs known value | One-sample t-test |
| Two independent groups, continuous | Independent samples t-test (Welch's preferred) |
| Two paired/matched groups | Paired t-test |
| >2 independent groups | One-way ANOVA |
| >2 related groups | Repeated measures ANOVA |
| Two factors | Two-way ANOVA |
| Continuous predictor/outcome | Pearson correlation, linear regression |

### Non-Parametric Tests (No Distribution Assumption)

| Scenario | Test |
|---|---|
| One sample vs known value | Wilcoxon signed-rank |
| Two independent groups | Mann-Whitney U (Wilcoxon rank-sum) |
| Two paired groups | Wilcoxon signed-rank |
| >2 independent groups | Kruskal-Wallis |
| >2 related groups | Friedman test |
| Correlation | Spearman rank correlation |
| Two categorical variables | Chi-square, Fisher's exact |
| Ordered categorical outcome | Cochran-Armitage trend test |

### When to Use Non-Parametric Tests
- Clearly non-normal data (heavy skew, outliers, bounded scales)
- Small samples where normality cannot be assessed
- Ordinal data (Likert scales — debated, but non-parametric is conservative)
- Data with floor/ceiling effects
- When the median is a more appropriate summary than the mean

### When Parametric Tests Are Robust
- t-tests and ANOVA are robust to moderate non-normality when sample sizes are adequate (n > 30 per group, Central Limit Theorem)
- Welch's t-test (default) is robust to unequal variances
- Log transformation can normalize right-skewed data (common in biology/medicine)

## One-Sided vs Two-Sided Testing

### Two-Sided (Default)
Tests for a difference in either direction. Used when an effect in either direction is possible and scientifically relevant.

- Standard in clinical trials (regulatory expectation)
- Alpha split between both tails (0.025 each for alpha = 0.05)
- Conservative — requires stronger evidence than one-sided

### One-Sided
Tests for a difference in one direction only.

- Appropriate only when an effect in the opposite direction is impossible or would be interpreted the same as no effect
- Uses full alpha in one tail — easier to achieve "significance"
- Requires strong a priori justification
- Regulatory agencies generally require two-sided tests

### When One-Sided Is Defensible
- Non-inferiority trials (inherently one-sided — testing that new treatment is not worse)
- Equivalence testing (two one-sided tests — TOST)
- Vaccine trials where the question is "does it protect?" (harm from vaccine in terms of the disease endpoint is not a plausible scientific question)
- Safety monitoring where only harm is of concern

### Common Misuse
Using one-sided tests to convert a "non-significant" two-sided p-value (e.g., 0.07) into a "significant" one-sided result (0.035). This is alpha manipulation and scientifically dishonest if not pre-specified.

## Multiple Testing

When multiple hypotheses are tested simultaneously, the probability of at least one Type I error exceeds alpha. With k independent tests at alpha = 0.05:

P(at least one false positive) = 1 - (1 - 0.05)^k

For 20 tests: P = 1 - 0.95^20 = 0.64 (64% chance of at least one false positive).

See the dedicated multiple-comparisons skill for correction methods.

## Practical Recommendations

1. **Pre-specify** the hypothesis, primary outcome, and analysis method before data collection.
2. **Report exact p-values** (p = 0.032, not "p < 0.05"). For very small values, report p < 0.001.
3. **Always report confidence intervals** alongside p-values.
4. **Always report effect sizes** — they convey clinical meaning that p-values cannot.
5. **Do not equate statistical significance with clinical importance.** A large trial can find a statistically significant but clinically trivial effect.
6. **Do not equate non-significance with "no effect."** A small trial may miss a real effect (Type II error). Report the CI — if it includes clinically important values, the study is inconclusive, not negative.
7. **Consider the prior probability** of the hypothesis. A p = 0.04 for a biologically plausible hypothesis in a well-designed trial is more convincing than p = 0.04 from an implausible exploratory analysis.
8. **Avoid dichotomous thinking.** A result with p = 0.049 and one with p = 0.051 are essentially identical in evidential strength.
