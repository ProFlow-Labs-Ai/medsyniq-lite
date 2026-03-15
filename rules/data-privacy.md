# Medical Data Privacy

## HIPAA Compliance (US)

ALWAYS protect patient data — never store, transmit, or display Protected Health Information (PHI):

- **PHI includes** (18 Safe Harbor identifiers):
  - Names
  - Dates (except year) — including birth date, admission/discharge dates, date of death
  - Telephone and fax numbers
  - Email addresses
  - Social Security numbers
  - Medical record numbers (MRN)
  - Health plan beneficiary numbers
  - Account numbers
  - Certificate/license numbers
  - Vehicle identifiers and serial numbers
  - Device identifiers and serial numbers
  - Web URLs and IP addresses
  - Biometric identifiers (fingerprints, voiceprints)
  - Full-face photographs and comparable images
  - Any other unique identifying number, characteristic, or code

## GDPR / DSGVO (EU)

Health data is a **special category** under Article 9 GDPR:

- **Explicit consent** required for processing health data — general consent is insufficient
- **Purpose limitation**: health data may only be processed for the stated, specific purpose
- **Data minimization**: collect and use only what is strictly necessary
- **Storage limitation**: define retention periods, delete when no longer needed
- **Right to access, rectification, and erasure**: patients can request their data or its deletion
- **Data Protection Impact Assessment (DPIA)**: required for large-scale health data processing
- **Data Protection Officer (DPO)**: mandatory for organizations systematically processing health data

## De-Identification

- **Safe Harbor method**: remove all 18 HIPAA identifiers, no actual knowledge that residual information can identify an individual
- **Expert Determination**: qualified statistical expert certifies that re-identification risk is very small
- When creating case presentations: always use de-identified data, change non-essential details (age ranges instead of exact ages, altered timelines, modified demographics)
- Never use real patient data in examples, training, demonstrations, or educational materials

## Research Data

- Anonymize or pseudonymize research data before processing
- **Data Processing Agreements (DPA)** required with all third parties handling health data
- Institutional Review Board (IRB) or Ethics Committee approval required before data collection
- Informed consent must specify data use, storage duration, and sharing scope

## Electronic Health Records

- Respect role-based access controls — minimum necessary standard
- Maintain audit trail requirements — all access must be logged and reviewable
- **Cross-border data transfer**: ensure adequate protection level
  - EU-US Data Privacy Framework
  - Standard Contractual Clauses (SCCs)
  - Binding Corporate Rules (BCRs)
  - Country-specific adequacy decisions

## Quality Gate

Before finalizing any output:
- [ ] No identifiable patient information present
- [ ] Examples use fictional or fully de-identified cases
- [ ] Data handling recommendations comply with HIPAA and GDPR
- [ ] Cross-border transfer considerations addressed where applicable
- [ ] Consent and purpose limitation requirements stated
