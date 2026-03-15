---
description: Formulate a searchable PICO clinical question
---

# /clinical-question

## What This Command Does

The `/clinical-question` command transforms a clinical uncertainty into a well-structured, searchable clinical question using the PICO (Population, Intervention, Comparison, Outcome) or related frameworks. It generates search strategies for major medical databases.

## When to Use

- When you have a clinical uncertainty that needs a structured approach
- When preparing to search the literature for evidence-based answers
- When formulating questions for journal club or evidence-based practice
- When teaching trainees how to ask answerable clinical questions
- When initiating an evidence-based practice project

## How It Works

1. Analyzes the clinical question or scenario provided
2. Delegates to the **evidence-appraiser** agent for question structuring
3. Classifies the question type (therapy, diagnosis, prognosis, harm, etiology)
4. Structures the question using the appropriate framework (PICO, PECO, PIO)
5. Identifies optimal study designs to answer the question
6. Generates search strategies with MeSH terms and keywords for PubMed and Cochrane

## Example Usage

**Input:**
```
/clinical-question does early mobilization reduce ICU length of stay?
```

**Output:**
```
STRUCTURED CLINICAL QUESTION

QUESTION TYPE: Therapy / Intervention

PICO FRAMEWORK:
P (Population):  Adult patients admitted to the intensive care unit
I (Intervention): Early mobilization (within 24-72 hours of ICU admission)
C (Comparison):  Standard care / usual mobilization practices
O (Outcome):     ICU length of stay (primary); secondary: ventilator-free
                 days, hospital mortality, functional status at discharge

FOCUSED CLINICAL QUESTION:
"In adult ICU patients, does early mobilization (within 72 hours of
admission) compared with standard care reduce ICU length of stay?"

OPTIMAL STUDY DESIGN: Randomized controlled trial or systematic
review of RCTs

PUBMED SEARCH STRATEGY:
("early mobilization" OR "early ambulation" OR "early rehabilitation"
 OR "early physical therapy")
AND
("intensive care" OR "critical care" OR "ICU")
AND
("length of stay" OR "LOS" OR "duration of stay")

MESH TERMS:
- Early Ambulation [MeSH]
- Intensive Care Units [MeSH]
- Length of Stay [MeSH]

COCHRANE SEARCH STRATEGY:
#1 MeSH descriptor: [Early Ambulation] explode all trees
#2 MeSH descriptor: [Intensive Care Units] explode all trees
#3 (early NEAR/3 (mobili* OR ambul* OR rehab*)):ti,ab
#4 #1 OR #3
#5 #2 AND #4

SUGGESTED FILTERS:
- Systematic Reviews and RCTs
- Published within last 10 years
- Adult population (19+ years)
```

## Important Notes

- **DISCLAIMER: This tool provides educational and research support only. Search strategies should be refined with a medical librarian for formal systematic reviews. The structured questions and search terms are starting points and may need adaptation based on specific database interfaces and evolving MeSH terminology. Clinical decisions should not be based on literature searches alone.**
- PICO is most useful for therapy questions; other frameworks may be more appropriate for different question types
- Search strategies should be iteratively refined based on initial results
- Consider consulting a medical librarian for comprehensive literature searches
- Always assess the quality of retrieved evidence, not just the quantity

## Related Agents

- `evidence-appraiser` — Primary agent for question formulation and evidence appraisal
- `systematic-reviewer` — For comprehensive search strategy development
- `biostatistician` — For understanding study design implications
