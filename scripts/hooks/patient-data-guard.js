#!/usr/bin/env node

/**
 * Post-edit hook: Patient Data Guard (PHI Detection)
 *
 * Scans content for Protected Health Information (PHI) patterns including
 * MRN formats, dates of birth, phone numbers, email addresses, and names
 * in "Patient: X" format. Critical for HIPAA/GDPR compliance.
 *
 * Exit 0 (non-blocking) — outputs warnings to stderr.
 */

const fs = require("fs");

const PHI_PATTERNS = [
  // Medical Record Numbers (various formats)
  {
    name: "Medical Record Number (MRN)",
    pattern: /\bMRN[:\s#]*\d{4,12}\b/gi,
    severity: "CRITICAL",
  },
  {
    name: "Medical Record Number (MRN)",
    pattern: /\b(?:medical record|chart)\s*(?:number|#|no\.?)[:\s]*\d{4,12}\b/gi,
    severity: "CRITICAL",
  },
  {
    name: "MRN-format ID",
    pattern: /\b\d{2,4}[-]\d{3,4}[-]\d{3,4}\b/g,
    severity: "HIGH",
  },

  // Date of Birth patterns
  {
    name: "Date of Birth",
    pattern: /\b(?:DOB|date of birth|born|birthday)[:\s]*\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/gi,
    severity: "CRITICAL",
  },
  {
    name: "Date of Birth (DD.MM.YYYY)",
    pattern: /\bDOB[:\s]*\d{2}\.\d{2}\.\d{4}\b/gi,
    severity: "CRITICAL",
  },

  // Social Security Number
  {
    name: "Social Security Number",
    pattern: /\b(?:SSN|social security)[:\s#]*\d{3}[-]?\d{2}[-]?\d{4}\b/gi,
    severity: "CRITICAL",
  },
  {
    name: "SSN-format number",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    severity: "HIGH",
  },

  // Phone numbers
  {
    name: "Phone number",
    pattern: /\b(?:phone|tel|mobile|cell|contact)[:\s]*[+]?[\d\s()-]{7,15}\b/gi,
    severity: "HIGH",
  },
  {
    name: "Phone number (US format)",
    pattern: /\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    severity: "MODERATE",
  },

  // Email addresses
  {
    name: "Email address",
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    severity: "HIGH",
  },

  // Patient name patterns
  {
    name: "Patient name identifier",
    pattern: /\bPatient(?:\s+name)?[:\s]+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/g,
    severity: "CRITICAL",
  },
  {
    name: "Patient name (Mr/Mrs/Ms)",
    pattern: /\b(?:Mr\.?|Mrs\.?|Ms\.?|Dr\.?)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g,
    severity: "MODERATE",
  },

  // Address patterns
  {
    name: "Street address",
    pattern: /\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Ct|Court)\.?\b/gi,
    severity: "HIGH",
  },

  // Insurance / account numbers
  {
    name: "Insurance ID",
    pattern: /\b(?:insurance|policy|member)\s*(?:ID|number|#|no\.?)[:\s]*[A-Z0-9]{6,15}\b/gi,
    severity: "HIGH",
  },

  // Hospital-specific identifiers
  {
    name: "Admission/Encounter number",
    pattern: /\b(?:admission|encounter|visit|case)\s*(?:number|#|no\.?|ID)[:\s]*\d{4,12}\b/gi,
    severity: "HIGH",
  },

  // National ID / Passport
  {
    name: "National ID / Passport",
    pattern: /\b(?:passport|national ID|ID number)[:\s]*[A-Z0-9]{6,12}\b/gi,
    severity: "HIGH",
  },
];

// Common false positives to exclude
const FALSE_POSITIVE_CONTEXTS = [
  /\b(?:example|sample|test|dummy|placeholder|template|fictitious|hypothetical)\b/i,
  /\b(?:e\.g\.|for instance|such as)\b/i,
  /\bJohn\s+Doe\b/i,
  /\bJane\s+Doe\b/i,
  /\b(?:000[-]?00[-]?0000|123[-]?45[-]?6789|555[-]?\d{4})\b/, // obvious test numbers
];

function isFalsePositive(text, matchIndex, matchLength) {
  const contextStart = Math.max(0, matchIndex - 50);
  const contextEnd = Math.min(text.length, matchIndex + matchLength + 50);
  const context = text.substring(contextStart, contextEnd);

  return FALSE_POSITIVE_CONTEXTS.some((pattern) => pattern.test(context));
}

function scanForPHI(content) {
  const findings = [];

  PHI_PATTERNS.forEach(({ name, pattern, severity }) => {
    // Reset regex lastIndex
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (!isFalsePositive(content, match.index, match[0].length)) {
        // Find line number
        const lineNumber =
          content.substring(0, match.index).split("\n").length;

        // Redact the matched value for the warning
        const redacted =
          match[0].substring(0, 4) + "***" + match[0].substring(match[0].length - 2);

        findings.push({
          type: name,
          severity,
          line: lineNumber,
          redacted,
        });
      }
    }
  });

  return findings;
}

function formatSeverity(severity) {
  switch (severity) {
    case "CRITICAL":
      return "🔴 CRITICAL";
    case "HIGH":
      return "🟠 HIGH";
    case "MODERATE":
      return "🟡 MODERATE";
    default:
      return severity;
  }
}

function main() {
  let input = "";

  if (process.stdin.isTTY) {
    const filePath = process.argv[2];
    if (!filePath) {
      process.exit(0);
    }
    try {
      input = fs.readFileSync(filePath, "utf8");
    } catch {
      process.exit(0);
    }
  } else {
    try {
      input = fs.readFileSync("/dev/stdin", "utf8");
    } catch {
      process.exit(0);
    }
  }

  let content = input;
  try {
    const hookData = JSON.parse(input);
    content =
      hookData.tool_result?.content ||
      hookData.content ||
      hookData.output ||
      input;
  } catch {
    // Raw content
  }

  if (typeof content !== "string" || content.length === 0) {
    process.exit(0);
  }

  const findings = scanForPHI(content);

  if (findings.length > 0) {
    process.stderr.write(
      `\n🔒 PATIENT DATA GUARD: ${findings.length} potential PHI pattern(s) detected!\n`
    );
    process.stderr.write(
      `   ⚠️  Protected Health Information may be present in this content.\n`
    );
    process.stderr.write(
      `   This may violate HIPAA, GDPR, or institutional data protection policies.\n\n`
    );

    findings.forEach((f) => {
      process.stderr.write(
        `   ${formatSeverity(f.severity)} | Line ${f.line}: ${f.type} (${f.redacted})\n`
      );
    });

    process.stderr.write(
      `\n   → Remove or de-identify all patient-identifiable information before sharing.\n`
    );
    process.stderr.write(
      `   → Use placeholder names (e.g., "Patient A") and redact identifiers.\n`
    );
    process.stderr.write(
      `   → Consult your institution's data protection officer if unsure.\n\n`
    );
  }

  process.exit(0);
}

main();
