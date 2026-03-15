#!/usr/bin/env node

/**
 * Post-edit hook: Disclaimer Check
 *
 * Checks if medical outputs contain a disclaimer or educational-purpose
 * notice. Scans for clinical content (drug names, diagnoses, dosing) and
 * verifies disclaimer-type language is present. Warns if missing.
 *
 * Exit 0 (non-blocking) — outputs warnings to stderr.
 */

const fs = require("fs");

// Patterns indicating clinical/medical content
const CLINICAL_CONTENT_PATTERNS = [
  /\b\d+\s*(?:mg|mcg|µg|g|mL|units?|IU)\b/i, // dosing
  /\b(?:dose|dosage|dosing)\b/i,
  /\b(?:prescribe|prescription|administer)\b/i,
  /\b(?:diagnos(?:is|e|ed|tic)|differential)\b/i,
  /\b(?:treatment|therapy|therapeutic)\b/i,
  /\b(?:prognosis|mortality|morbidity)\b/i,
  /\b(?:contraindication|adverse effect|side effect)\b/i,
  /\b(?:IV|IM|SC|PO|PR|SL|topical)\s+(?:administration|route)?\b/,
  /\b(?:antibiotic|antihypertensive|antidiabetic|analgesic|antipyretic)\b/i,
  /\b(?:insulin|metformin|lisinopril|amlodipine|omeprazole|levothyroxine)\b/i,
  /\b(?:warfarin|heparin|enoxaparin|aspirin|clopidogrel)\b/i,
  /\b(?:amoxicillin|ciprofloxacin|azithromycin|metronidazole)\b/i,
  /\b(?:ibuprofen|acetaminophen|paracetamol|morphine|fentanyl)\b/i,
  /\b(?:hypertension|diabetes|pneumonia|sepsis|stroke|MI|STEMI|NSTEMI)\b/i,
  /\b(?:surgery|surgical|operative|procedure)\b/i,
  /\b(?:ICU|CCU|ED|emergency department|intensive care)\b/i,
];

// Patterns indicating disclaimer/educational notice
const DISCLAIMER_PATTERNS = [
  /\b(?:not (?:a )?substitute for (?:professional )?medical advice)\b/i,
  /\b(?:consult (?:a |your )?(?:physician|doctor|healthcare|medical))\b/i,
  /\b(?:for (?:educational|informational) purposes? only)\b/i,
  /\b(?:does not constitute medical advice)\b/i,
  /\b(?:should not (?:be used to )?replace (?:professional )?medical)\b/i,
  /\b(?:seek (?:immediate )?medical (?:attention|advice|help))\b/i,
  /\b(?:clinical judgment|clinical decision[- ]making)\b/i,
  /\b(?:disclaimer|⚠️|⚕️)\b/i,
  /\b(?:verify (?:with|against) (?:current|local|institutional))\b/i,
  /\b(?:AI[- ]generated|AI[- ]assisted).*(?:verify|review|confirm)\b/i,
  /\b(?:not intended (?:to|as) (?:diagnos|treat|medical))\b/i,
  /\b(?:always (?:verify|confirm|check) (?:with|before))\b/i,
  /\b(?:educational (?:purposes?|use) only)\b/i,
  /\bnote:.*(?:verify|confirm|clinical|professional)\b/i,
];

function hasClinicalContent(text) {
  let matchCount = 0;
  for (const pattern of CLINICAL_CONTENT_PATTERNS) {
    if (pattern.test(text)) {
      matchCount++;
      if (matchCount >= 2) return true; // Require at least 2 clinical indicators
    }
  }
  return false;
}

function hasDisclaimer(text) {
  return DISCLAIMER_PATTERNS.some((pattern) => pattern.test(text));
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

  // Only check if content appears to be clinical
  if (!hasClinicalContent(content)) {
    process.exit(0);
  }

  if (!hasDisclaimer(content)) {
    process.stderr.write(
      `\n⚕️  Disclaimer Check: Clinical content detected without disclaimer\n`
    );
    process.stderr.write(
      `   This content contains clinical information (drug names, diagnoses, or dosing)\n`
    );
    process.stderr.write(
      `   but no educational-purpose notice or disclaimer was found.\n`
    );
    process.stderr.write(
      `   → Add a disclaimer such as:\n`
    );
    process.stderr.write(
      `     "This information is for educational purposes only and does not constitute\n`
    );
    process.stderr.write(
      `      medical advice. Always consult a qualified healthcare professional."\n\n`
    );
  }

  process.exit(0);
}

main();
