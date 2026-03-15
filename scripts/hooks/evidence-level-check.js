#!/usr/bin/env node

/**
 * Post-edit hook: Evidence Level Check
 *
 * Scans written content for clinical claims and warns if evidence level
 * annotations are missing. Checks for recommendation-type language without
 * accompanying evidence grading (GRADE, Oxford CEBM, guideline reference).
 *
 * Exit 0 (non-blocking) — outputs warnings to stderr.
 */

const fs = require("fs");

const CLAIM_PATTERNS = [
  /\bis recommended\b/gi,
  /\bshould be used\b/gi,
  /\bis effective\b/gi,
  /\bis the treatment of choice\b/gi,
  /\bis first[- ]line\b/gi,
  /\bis indicated\b/gi,
  /\bis contraindicated\b/gi,
  /\bhas been shown to\b/gi,
  /\breduces (?:the )?risk\b/gi,
  /\bimproves (?:outcomes?|survival|mortality)\b/gi,
  /\bis superior to\b/gi,
  /\bis preferred\b/gi,
  /\bshould be considered\b/gi,
  /\bis associated with (?:improved|reduced|increased)\b/gi,
  /\bis the standard of care\b/gi,
  /\bevidence supports\b/gi,
  /\bguidelines recommend\b/gi,
  /\bstrongly recommended\b/gi,
  /\bshould not be used\b/gi,
  /\bis not recommended\b/gi,
];

const EVIDENCE_MARKERS = [
  /\bGRADE\b/,
  /\b(?:Level|Class)\s+[I1][A-Ca-c]?\b/,
  /\bLevel\s+[1-5][a-c]?\b/,
  /\bOxford\s+CEBM\b/i,
  /\bStrength\s+of\s+(?:Recommendation|Evidence)\b/i,
  /\b(?:RCT|randomized controlled trial|systematic review|meta-analysis)\b/i,
  /\b(?:AHA|ACC|ESC|NICE|WHO|USPSTF|ACCP)\b/,
  /\bClass\s+[I]{1,3}[A-Ca-c]?\b/,
  /\bEvidence\s+(?:Level|Quality|Certainty)\b/i,
  /\bRecommendation\s+(?:Grade|Strength)\b/i,
  /\[\d+\]/, // citation reference
  /\((?:et al\.?|20\d{2}|19\d{2})\)/, // author/year citation
];

function hasEvidenceMarker(text) {
  return EVIDENCE_MARKERS.some((pattern) => pattern.test(text));
}

function getContextWindow(lines, lineIndex, windowSize = 3) {
  const start = Math.max(0, lineIndex - windowSize);
  const end = Math.min(lines.length, lineIndex + windowSize + 1);
  return lines.slice(start, end).join("\n");
}

function checkContent(content, filePath) {
  const lines = content.split("\n");
  const warnings = [];

  lines.forEach((line, index) => {
    CLAIM_PATTERNS.forEach((pattern) => {
      const match = line.match(pattern);
      if (match) {
        const context = getContextWindow(lines, index);
        if (!hasEvidenceMarker(context)) {
          warnings.push({
            file: filePath,
            line: index + 1,
            claim: match[0],
            text: line.trim(),
          });
        }
      }
    });
  });

  return warnings;
}

function main() {
  let input = "";

  if (process.stdin.isTTY) {
    // Read from file argument
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
    // Read from stdin (hook mode)
    try {
      input = fs.readFileSync("/dev/stdin", "utf8");
    } catch {
      process.exit(0);
    }
  }

  let hookData;
  try {
    hookData = JSON.parse(input);
  } catch {
    // Not JSON — treat as raw content
    const warnings = checkContent(input, "content");
    if (warnings.length > 0) {
      process.stderr.write(
        `\n⚠️  Evidence Level Check: ${warnings.length} clinical claim(s) without evidence annotations\n`
      );
      warnings.forEach((w) => {
        process.stderr.write(
          `   Line ${w.line}: "${w.claim}" — ${w.text.substring(0, 80)}\n`
        );
      });
      process.stderr.write(
        `   → Add GRADE, Oxford CEBM level, or guideline reference for each claim.\n\n`
      );
    }
    process.exit(0);
  }

  // Hook mode: extract content from tool result
  const content =
    hookData.tool_result?.content ||
    hookData.content ||
    hookData.output ||
    "";
  const filePath =
    hookData.tool_input?.file_path || hookData.file_path || "unknown";

  if (typeof content !== "string" || content.length === 0) {
    process.exit(0);
  }

  const warnings = checkContent(content, filePath);

  if (warnings.length > 0) {
    process.stderr.write(
      `\n⚠️  Evidence Level Check: ${warnings.length} clinical claim(s) without evidence annotations\n`
    );
    warnings.forEach((w) => {
      process.stderr.write(
        `   Line ${w.line}: "${w.claim}" — ${w.text.substring(0, 80)}\n`
      );
    });
    process.stderr.write(
      `   → Add GRADE, Oxford CEBM level, or guideline reference for each claim.\n\n`
    );
  }

  process.exit(0);
}

main();
