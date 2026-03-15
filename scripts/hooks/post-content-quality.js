#!/usr/bin/env node

/**
 * Post-edit hook: Content Quality Check
 *
 * Checks medical content quality indicators:
 * - Absolute claims without qualifiers ("always", "never", "100%")
 * - Unsupported superlatives ("best treatment", "gold standard" without citation)
 * - Appropriate uncertainty language
 *
 * Scores and outputs findings. Exit 0 (non-blocking).
 */

const fs = require("fs");

// Absolute claims that should have qualifiers
const ABSOLUTE_PATTERNS = [
  {
    pattern: /\balways\s+(?:use|give|prescribe|administer|recommend|results?\s+in)\b/gi,
    issue: "Absolute claim: 'always' — consider qualifying with 'generally', 'in most cases', or citing evidence",
  },
  {
    pattern: /\bnever\s+(?:use|give|prescribe|administer|recommend)\b/gi,
    issue: "Absolute claim: 'never' — consider 'rarely', 'avoid when possible', or specifying contraindication",
  },
  {
    pattern: /\b100\s*%\s*(?:effective|sensitive|specific|accurate|safe)\b/gi,
    issue: "Absolute percentage claim — no test or treatment is 100% effective/sensitive/specific",
  },
  {
    pattern: /\b(?:all|every)\s+patients?\s+(?:should|must|will|need)\b/gi,
    issue: "Universal patient claim — consider individual variation, contraindications, and shared decision-making",
  },
  {
    pattern: /\bno\s+(?:risk|side effects?|adverse|complications?|contraindications?)\b/gi,
    issue: "Absolute safety claim — all interventions carry some risk",
  },
  {
    pattern: /\bguarantee[sd]?\b/gi,
    issue: "Guarantee language — outcomes in medicine cannot be guaranteed",
  },
  {
    pattern: /\bwill\s+(?:cure|eliminate|resolve|fix)\b/gi,
    issue: "Deterministic outcome claim — consider 'may', 'is expected to', 'typically'",
  },
  {
    pattern: /\bdefinitely\s+(?:is|has|will|does|causes?)\b/gi,
    issue: "Deterministic claim — consider expressing degree of certainty",
  },
  {
    pattern: /\bimpossible\s+(?:to|for|that)\b/gi,
    issue: "Absolute impossibility claim — consider 'extremely unlikely', 'very rare'",
  },
];

// Superlatives that should have citations
const SUPERLATIVE_PATTERNS = [
  {
    pattern: /\bbest\s+(?:treatment|therapy|drug|medication|approach|option|strategy|choice)\b/gi,
    issue: "Unsupported superlative: 'best' — cite comparative evidence or guideline",
  },
  {
    pattern: /\bgold\s+standard\b/gi,
    issue: "Superlative: 'gold standard' — cite the basis for this designation",
  },
  {
    pattern: /\bmost\s+(?:effective|important|common|dangerous|significant)\b/gi,
    issue: "Superlative: 'most' — provide supporting data or reference",
  },
  {
    pattern: /\bsuperior\s+(?:to|compared|over)\b/gi,
    issue: "Comparative superiority claim — cite head-to-head trial or meta-analysis",
  },
  {
    pattern: /\bonly\s+(?:treatment|option|drug|therapy|approach)\b/gi,
    issue: "Exclusivity claim: 'only treatment' — verify no alternatives exist",
  },
  {
    pattern: /\bfirst[- ]choice\b/gi,
    issue: "Preference claim: 'first choice' — cite guideline recommending first-line status",
  },
  {
    pattern: /\bworst\s+(?:outcome|prognosis|scenario)\b/gi,
    issue: "Negative superlative — provide context or evidence for severity ranking",
  },
  {
    pattern: /\bsafest\s+(?:option|drug|treatment|approach)\b/gi,
    issue: "Safety superlative — cite comparative safety data",
  },
];

// Evidence/citation markers that might justify a superlative
const CITATION_NEARBY = [
  /\[\d+\]/,
  /\((?:et al\.?|20\d{2}|19\d{2})\)/,
  /\b(?:according to|per|based on|as per)\b/i,
  /\b(?:GRADE|Level|Class)\s+[1-5I][A-Ca-c]?\b/,
  /\b(?:RCT|meta-analysis|systematic review|Cochrane)\b/i,
  /\b(?:AHA|ACC|ESC|NICE|WHO|USPSTF)\b/,
  /\bguideline[s]?\b/i,
];

function hasCitationNearby(text, matchIndex, windowSize = 200) {
  const start = Math.max(0, matchIndex - windowSize);
  const end = Math.min(text.length, matchIndex + windowSize);
  const window = text.substring(start, end);
  return CITATION_NEARBY.some((pattern) => pattern.test(window));
}

function getLineNumber(text, index) {
  return text.substring(0, index).split("\n").length;
}

function checkQuality(content) {
  const findings = [];
  let score = 100;

  // Check absolute claims
  ABSOLUTE_PATTERNS.forEach(({ pattern, issue }) => {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = getLineNumber(content, match.index);
      findings.push({
        category: "ABSOLUTE CLAIM",
        line,
        matched: match[0],
        issue,
        penalty: 10,
      });
      score -= 10;
    }
  });

  // Check superlatives without citations
  SUPERLATIVE_PATTERNS.forEach(({ pattern, issue }) => {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (!hasCitationNearby(content, match.index)) {
        const line = getLineNumber(content, match.index);
        findings.push({
          category: "UNSUPPORTED SUPERLATIVE",
          line,
          matched: match[0],
          issue,
          penalty: 5,
        });
        score -= 5;
      }
    }
  });

  return {
    findings,
    score: Math.max(0, score),
  };
}

function scoreLabel(score) {
  if (score >= 90) return "EXCELLENT";
  if (score >= 75) return "GOOD";
  if (score >= 60) return "FAIR";
  if (score >= 40) return "NEEDS IMPROVEMENT";
  return "POOR";
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

  // Only check content with sufficient length (skip trivial edits)
  if (content.length < 100) {
    process.exit(0);
  }

  const { findings, score } = checkQuality(content);

  if (findings.length > 0) {
    process.stderr.write(
      `\n📋 Content Quality Check: ${scoreLabel(score)} (${score}/100)\n`
    );
    process.stderr.write(
      `   ${findings.length} issue(s) found:\n\n`
    );

    findings.forEach((f) => {
      process.stderr.write(
        `   [${f.category}] Line ${f.line}: "${f.matched}"\n`
      );
      process.stderr.write(
        `     → ${f.issue}\n`
      );
    });

    process.stderr.write(
      `\n   Tip: Use hedging language (may, can, typically, in most cases) and\n`
    );
    process.stderr.write(
      `   support claims with evidence levels or guideline references.\n\n`
    );
  }

  process.exit(0);
}

main();
