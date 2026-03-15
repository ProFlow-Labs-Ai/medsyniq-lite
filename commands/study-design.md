---
description: Design a clinical study
---

# /study-design

## What This Command Does

The `/study-design` command generates a comprehensive clinical study design framework including study type selection, population definition, intervention details, endpoints, randomization strategy, blinding approach, and key methodological considerations. It provides a structured foundation for protocol development.

## When to Use

- When planning a new clinical research study from concept stage
- When choosing between different study designs for a research question
- When developing a grant application that requires study methodology
- When reviewing or critiquing a proposed study design
- When teaching clinical research methodology to trainees

## How It Works

1. Analyzes the research question and clinical context
2. Delegates to the **clinical-trialist** agent for study design expertise
3. Recommends the optimal study design based on the research question
4. Defines population, intervention, comparator, and endpoints
5. Specifies randomization, blinding, and allocation strategies
6. Identifies key methodological challenges and mitigation strategies
7. Estimates timeline and feasibility considerations

## Example Usage

**Input:**
```
/study-design compare new oral anticoagulant vs warfarin in mechanical heart valves
```

**Output:**
```
CLINICAL STUDY DESIGN

RESEARCH QUESTION:
Is [novel oral anticoagulant] non-inferior to warfarin for the
prevention of thromboembolic events in patients with mechanical
heart valves?

RECOMMENDED DESIGN: Randomized, open-label, blinded-endpoint
(PROBE design), non-inferiority trial

RATIONALE FOR DESIGN:
- RCT required for definitive efficacy comparison
- Open-label necessary as INR monitoring inherent to warfarin arm
- PROBE design mitigates bias through blinded endpoint adjudication
- Non-inferiority design appropriate: warfarin is proven effective,
  new agent offers potential convenience advantage

POPULATION:
Inclusion criteria:
- Adults >= 18 years with mechanical heart valve (aortic and/or mitral)
- >= 3 months post valve implantation
- Currently on stable warfarin therapy (INR 2.5-3.5)

Exclusion criteria:
- Recent thromboembolic event (<3 months)
- Active bleeding or high bleeding risk
- Severe renal impairment (CrCl <30 mL/min)
- Concomitant strong CYP3A4 inhibitors/inducers
- Pregnancy or planned pregnancy

INTERVENTION:
- Experimental: [NOAC] at [dose], administered [frequency]
- Comparator: Warfarin, dose-adjusted to target INR 2.5-3.5
  (per AHA/ACC guidelines for mechanical valves)

PRIMARY ENDPOINT:
Composite of stroke, systemic embolism, valve thrombosis,
and cardiovascular death — time to first event

NON-INFERIORITY MARGIN: HR 1.38 (based on regulatory guidance
and clinical relevance; preserving >50% of warfarin effect)

SECONDARY ENDPOINTS:
- Major bleeding (ISTH criteria)
- All-cause mortality
- Individual components of the primary composite
- Valve thrombosis detected by echocardiography
- Net clinical benefit (composite of efficacy + major bleeding)

SAMPLE SIZE ESTIMATE: See /sample-size for formal calculation
Preliminary: ~2,000-3,000 patients per arm (event-driven)

RANDOMIZATION: 1:1, stratified by valve position (aortic vs mitral
vs both) and center. Centralized, computer-generated randomization.

SAFETY CONSIDERATIONS:
- CRITICAL: RE-ALIGN trial (dabigatran in mechanical valves) was
  stopped early for excess thromboembolic and bleeding events
- Independent Data Safety Monitoring Board (DSMB) mandatory
- Pre-specified stopping rules for excess thromboembolism
- Frequent echocardiographic surveillance for valve thrombosis

ESTIMATED TIMELINE: 5-7 years (2 years enrollment, 3-5 years follow-up)
```

## Important Notes

- **DISCLAIMER: This tool provides research design support only. All clinical studies must be designed in collaboration with qualified biostatisticians, methodologists, and subject matter experts. Study protocols require IRB/ethics committee approval before implementation. AI-generated study designs are starting frameworks and must undergo rigorous peer review. Regulatory requirements vary by jurisdiction.**
- The RE-ALIGN trial precedent makes NOAC studies in mechanical valves particularly high-risk
- Regulatory authority engagement (FDA, EMA) should occur early for novel comparisons
- Independent DSMB oversight is essential for trials in high-risk populations
- Consider adaptive designs for early safety signal detection

## Related Agents

- `clinical-trialist` — Primary agent for study design
- `biostatistician` — For statistical design and sample size
- `research-ethicist` — For ethical considerations in trial design
- `regulatory-affairs` — For regulatory strategy alignment
