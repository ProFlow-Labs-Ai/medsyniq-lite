---
name: IMRAD Structure
description: Comprehensive guidance on structuring medical research manuscripts using the Introduction-Methods-Results-and-Discussion format, with section-specific writing strategies and common pitfalls.
origin: ECMed
---

# IMRAD Structure

## Purpose

IMRAD (Introduction, Methods, Results, and Discussion) is the standard structure for original research articles in biomedical journals. Mastering this structure enables clear, logical, and reproducible presentation of research findings. This skill provides section-by-section guidance for writing each component effectively.

## Overview

IMRAD answers four fundamental questions:
1. **Introduction**: Why did you start? (The problem and objective)
2. **Methods**: What did you do? (How you addressed the problem)
3. **Results**: What did you find? (The data)
4. **Discussion**: What does it mean? (Interpretation and implications)

The structure creates an hourglass (or funnel-to-inverse-funnel) shape:
- Introduction: Broad context → specific gap → focused question
- Methods/Results: Narrow, precise, specific
- Discussion: Specific findings → broader context → implications

## Title

### Principles
- Concise, specific, informative (ideally 10-15 words)
- Include the study design if possible ("A randomized controlled trial," "A retrospective cohort study")
- Include the main exposure and outcome
- Avoid abbreviations (except universally recognized ones: HIV, DNA, MRI)
- Avoid questions as titles (debatable — some journals accept this)
- Avoid "A study of..." or "Investigation into..." — these are filler

### Strong Title Formula
[Intervention/Exposure] and [Outcome] in [Population]: [Study Design]
Example: "Aspirin versus Placebo for Primary Prevention of Cardiovascular Events in Patients with Diabetes: A Randomized Controlled Trial"

## Introduction

### The Funnel Structure
The introduction narrows from broad context to specific question in 3-4 paragraphs:

**Paragraph 1: Establish the territory**
- What is the broad topic and why does it matter?
- Epidemiological context: prevalence, incidence, burden of disease
- Clinical significance: morbidity, mortality, cost, quality of life impact
- Keep it focused — do not write a comprehensive review

**Paragraph 2-3: Identify the gap**
- What is known about the specific aspect you are studying?
- What remains unknown, uncertain, or debated?
- What are the limitations of prior studies?
- Signal the gap explicitly: "However, it remains unclear whether..." or "No study has examined..."

**Final paragraph: State the objective**
- "The aim of this study was to [specific, measurable objective]"
- State the hypothesis if applicable (confirmatory study) or the research question (exploratory)
- Briefly mention the study design and setting if it strengthens the rationale

### Introduction Pitfalls
- Too long (more than 1-1.5 pages double-spaced)
- Literature review that does not build toward the specific question
- Objective that does not clearly follow from the identified gap
- Claiming "this is the first study to..." (hard to verify, often wrong)
- Including results or discussion material in the introduction

## Methods

### Guiding Principle
Someone should be able to replicate your study from the Methods section alone.

### Standard Subsections

**Study design**
- Name the design explicitly: randomized controlled trial, prospective cohort, retrospective cohort, case-control, cross-sectional, etc.
- Reference the relevant reporting guideline (CONSORT, STROBE, etc.)

**Setting and participants**
- Where and when was the study conducted?
- Who was eligible? (Inclusion criteria)
- Who was excluded? (Exclusion criteria — with clinical rationale)
- How were participants recruited or identified?
- Sample size calculation: state the assumptions (effect size, alpha, power, variance). For retrospective studies, describe available sample size and whether it was adequate.

**Exposure / Intervention**
- For RCTs: Describe intervention and control in sufficient detail for replication. Dose, frequency, duration, mode of delivery, provider training.
- For observational studies: Define the exposure precisely. How was it measured? What was the comparison group?

**Outcome measures**
- Primary outcome: stated first, defined precisely, including how and when it was measured
- Secondary outcomes: listed with definitions
- Use validated instruments where possible (cite validation study)
- Specify outcome assessment: who assessed, blinding status, timing

**Data collection**
- Instruments, questionnaires, databases, medical records
- Quality assurance measures (double data entry, range checks, audit)
- Handling of missing data (complete case, imputation — specify method)

**Statistical analysis**
- Describe all statistical tests used and why they were chosen
- State the significance level (typically alpha = 0.05, two-sided)
- Describe adjustment for multiple comparisons if applicable
- Specify software and version (R 4.3.0, Stata 18, SPSS 29)
- Pre-registration: Reference protocol or registry if applicable (ClinicalTrials.gov, PROSPERO)

**Ethical considerations**
- Ethics committee / IRB approval (with reference number)
- Informed consent process
- Data protection measures (GDPR compliance for EU studies)

## Results

### Guiding Principle
Present findings objectively, without interpretation. Let the data speak.

### Structure

**Participant flow**
- Start with how many participants were screened, excluded (with reasons), enrolled, and analyzed
- Flow diagram (CONSORT for RCTs, adapted for other designs)
- Report losses to follow-up with reasons

**Baseline characteristics**
- Table 1: Demographics and clinical characteristics of the study population
- Compare groups (treatment vs control, exposed vs unexposed)
- Do NOT p-test baseline characteristics in RCTs (randomization makes differences random by design; report standardized mean differences instead)
- For observational studies: show unadjusted and (if applicable) PS-adjusted balance

**Primary outcome**
- Present primary outcome first, prominently
- Report effect estimate with 95% confidence interval
- Report absolute numbers AND rates, not just relative measures
- Example: "The primary outcome occurred in 42/500 (8.4%) in the intervention group versus 65/500 (13.0%) in the control group (RR 0.65, 95% CI 0.45-0.93, p = 0.02)"

**Secondary outcomes**
- Present in the order listed in the Methods
- Same format as primary outcome
- Acknowledge multiple comparisons

**Subgroup analyses**
- Pre-specified subgroups only (post-hoc subgroups should be labeled as exploratory)
- Forest plot for subgroup effects
- Test for interaction (not separate p-values within each subgroup)

**Adverse events / Safety**
- Report all serious adverse events
- Report adverse events by group with denominators

### Tables and Figures
- Tables and figures should stand alone (reader should understand them without reading the text)
- Do not duplicate data between tables, figures, and text
- Every table and figure must be referenced in the text
- Table 1: Baseline characteristics
- Table 2: Primary and secondary outcomes
- Figures: Flow diagram, Kaplan-Meier curves, forest plots, graphical data

### Results Pitfalls
- Interpreting results (save for Discussion)
- Reporting p-values without effect estimates and CIs
- Selective reporting (reporting only significant results)
- Not reporting the primary outcome prominently
- Conflating statistical significance with clinical significance

## Discussion

### The Inverse Funnel Structure

**Paragraph 1: Summary of key findings**
- Lead with the main finding (answer the question posed in the Introduction)
- State clearly whether the hypothesis was supported or not
- Keep this paragraph brief — 3-4 sentences

**Paragraph 2-3: Contextualize with existing literature**
- How do your findings compare with prior studies?
- If concordant: strengthen the evidence base
- If discordant: explain potential reasons for differences (population, design, measurement, timing)
- Do not simply list prior studies — synthesize and compare

**Paragraph 4: Strengths**
- Methodological rigor, study design advantages, large sample size, long follow-up, validated measures, pre-registration
- Be specific: "The use of propensity score matching with detailed covariate adjustment reduced confounding bias" is better than "This study has several strengths"

**Paragraph 5: Limitations**
- Be honest and specific about limitations
- Address: confounding (observational studies), generalizability, measurement error, missing data, selection bias, attrition
- For each limitation, state the direction of potential bias
- Do not list limitations you cannot logically explain — demonstrate critical thinking

**Paragraph 6: Clinical implications and future directions**
- What should clinicians, policymakers, or researchers do with these findings?
- Avoid overstating implications beyond what the data support
- Suggest specific future research to address remaining gaps

**Final paragraph: Conclusion**
- One or two sentences directly answering the research question
- No new information
- Do not overstate (avoid "proves," "definitely," "clearly demonstrates")
- Match the conclusion to the data

### Discussion Pitfalls
- Repeating the Results section
- Overstating findings (especially from observational data)
- Ignoring contradictory evidence from prior studies
- Listing limitations without assessing their impact
- Introducing new data not presented in Results
- Making causal claims from observational data without appropriate hedging

## Additional Sections

### Acknowledgments
- People who contributed but do not meet authorship criteria
- Funding sources (also in a separate funding statement in many journals)
- Statistical support, language editing, administrative assistance

### Conflict of Interest Declaration
- All financial and non-financial conflicts must be disclosed
- Follow ICMJE recommendations
- "Nothing to declare" if none exist

### Data Availability Statement
- Increasingly required by journals
- State where data can be accessed or why it cannot be shared
- Consider data repositories (Figshare, Dryad, Zenodo, OpenICPSR)

### References
- Follow journal style (Vancouver, AMA, etc.)
- Use reference management software (Zotero, Mendeley, EndNote)
- Cite primary sources, not review articles, when reporting specific findings
- Avoid excessive self-citation
- Include recent references (reviewers notice outdated literature)

## Word Counts (Typical for Original Research)
| Section | Proportion | Typical Words |
|---------|-----------|---------------|
| Introduction | ~10-15% | 400-600 |
| Methods | ~25-30% | 800-1200 |
| Results | ~25-30% | 800-1200 |
| Discussion | ~30-35% | 1000-1500 |
| **Total** | | **3000-4500** |

Varies by journal — always check the target journal's author guidelines.
