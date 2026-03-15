#!/usr/bin/env node

/**
 * Post-edit hook: Drug Interaction Warning
 *
 * Pattern-matches drug names in content and flags known critical interaction
 * pairs. Covers top 30 critical drug-drug interactions organized by mechanism
 * and clinical significance.
 *
 * Exit 0 (non-blocking) — outputs warnings to stderr.
 */

const fs = require("fs");

// Critical interaction pairs: [drugA_aliases, drugB_aliases, severity, mechanism, clinical_note]
const CRITICAL_INTERACTIONS = [
  // Warfarin interactions
  {
    drugs_a: ["warfarin", "coumadin"],
    drugs_b: ["ibuprofen", "naproxen", "diclofenac", "indomethacin", "ketorolac", "meloxicam", "piroxicam", "celecoxib"],
    severity: "HIGH",
    type: "Bleeding risk",
    note: "NSAIDs increase anticoagulant effect and GI bleeding risk",
  },
  {
    drugs_a: ["warfarin", "coumadin"],
    drugs_b: ["aspirin", "acetylsalicylic acid"],
    severity: "HIGH",
    type: "Bleeding risk",
    note: "Dual antiplatelet/anticoagulant effect; GI hemorrhage risk",
  },
  {
    drugs_a: ["warfarin", "coumadin"],
    drugs_b: ["fluconazole", "diflucan"],
    severity: "HIGH",
    type: "CYP2C9 inhibition",
    note: "Fluconazole inhibits warfarin metabolism; INR may double",
  },
  {
    drugs_a: ["warfarin", "coumadin"],
    drugs_b: ["metronidazole", "flagyl"],
    severity: "HIGH",
    type: "CYP2C9 inhibition",
    note: "Metronidazole potentiates warfarin; monitor INR closely",
  },
  {
    drugs_a: ["warfarin", "coumadin"],
    drugs_b: ["trimethoprim-sulfamethoxazole", "tmp-smx", "bactrim", "co-trimoxazole", "sulfamethoxazole"],
    severity: "HIGH",
    type: "CYP2C9 inhibition",
    note: "TMP-SMX significantly increases INR; one of the most common warfarin interactions",
  },
  // Methotrexate interactions
  {
    drugs_a: ["methotrexate", "mtx"],
    drugs_b: ["trimethoprim-sulfamethoxazole", "tmp-smx", "bactrim", "co-trimoxazole", "sulfamethoxazole"],
    severity: "CRITICAL",
    type: "Antifolate synergy",
    note: "Combined antifolate toxicity — pancytopenia risk; potentially fatal",
  },
  {
    drugs_a: ["methotrexate", "mtx"],
    drugs_b: ["ibuprofen", "naproxen", "diclofenac", "indomethacin", "ketorolac", "meloxicam"],
    severity: "HIGH",
    type: "Reduced renal clearance",
    note: "NSAIDs reduce methotrexate clearance; toxicity risk (esp. high-dose MTX)",
  },
  // Digoxin interactions
  {
    drugs_a: ["digoxin", "digitoxin", "lanoxin"],
    drugs_b: ["amiodarone", "cordarone"],
    severity: "HIGH",
    type: "P-gp inhibition + reduced clearance",
    note: "Amiodarone increases digoxin levels ~70%; reduce digoxin dose by 50%",
  },
  {
    drugs_a: ["digoxin", "digitoxin", "lanoxin"],
    drugs_b: ["verapamil", "calan", "isoptin"],
    severity: "HIGH",
    type: "P-gp inhibition + additive bradycardia",
    note: "Verapamil increases digoxin levels; combined AV block risk",
  },
  // Lithium interactions
  {
    drugs_a: ["lithium", "lithobid", "eskalith"],
    drugs_b: ["ibuprofen", "naproxen", "diclofenac", "indomethacin", "ketorolac", "meloxicam", "piroxicam"],
    severity: "HIGH",
    type: "Reduced renal clearance",
    note: "NSAIDs increase lithium levels 15-50%; toxicity risk",
  },
  {
    drugs_a: ["lithium", "lithobid", "eskalith"],
    drugs_b: ["lisinopril", "enalapril", "ramipril", "captopril", "benazepril", "fosinopril", "perindopril", "quinapril", "trandolapril"],
    severity: "HIGH",
    type: "Reduced renal clearance",
    note: "ACE inhibitors reduce lithium excretion; monitor levels",
  },
  // Serotonin syndrome
  {
    drugs_a: ["phenelzine", "tranylcypromine", "isocarboxazid", "selegiline", "moclobemide", "maoi"],
    drugs_b: ["fluoxetine", "sertraline", "paroxetine", "citalopram", "escitalopram", "fluvoxamine", "venlafaxine", "duloxetine", "desvenlafaxine", "ssri", "snri"],
    severity: "CRITICAL",
    type: "Serotonin syndrome",
    note: "CONTRAINDICATED — serotonin syndrome risk; 5-week washout for fluoxetine",
  },
  {
    drugs_a: ["phenelzine", "tranylcypromine", "isocarboxazid", "selegiline", "moclobemide", "maoi"],
    drugs_b: ["tramadol", "meperidine", "pethidine", "fentanyl", "dextromethorphan"],
    severity: "CRITICAL",
    type: "Serotonin syndrome",
    note: "CONTRAINDICATED — serotonergic opioids with MAOIs; fatal reactions reported",
  },
  // QT prolongation combinations
  {
    drugs_a: ["amiodarone", "cordarone", "sotalol", "dofetilide"],
    drugs_b: ["ciprofloxacin", "levofloxacin", "moxifloxacin"],
    severity: "HIGH",
    type: "Additive QT prolongation",
    note: "Combined QTc prolongation; risk of torsades de pointes",
  },
  {
    drugs_a: ["amiodarone", "cordarone", "sotalol", "dofetilide"],
    drugs_b: ["azithromycin", "erythromycin", "clarithromycin"],
    severity: "HIGH",
    type: "Additive QT prolongation",
    note: "Combined QTc prolongation; macrolides add independent QT risk",
  },
  {
    drugs_a: ["ciprofloxacin", "levofloxacin", "moxifloxacin"],
    drugs_b: ["azithromycin", "erythromycin", "clarithromycin"],
    severity: "MODERATE",
    type: "Additive QT prolongation",
    note: "Both classes prolong QT; avoid combination especially with electrolyte imbalance",
  },
  {
    drugs_a: ["haloperidol", "droperidol", "ziprasidone"],
    drugs_b: ["amiodarone", "sotalol", "ciprofloxacin", "moxifloxacin", "erythromycin"],
    severity: "HIGH",
    type: "Additive QT prolongation",
    note: "Antipsychotics + QT-prolonging agents; TdP risk especially with IV haloperidol",
  },
  // Potassium / hyperkalemia triad
  {
    drugs_a: ["spironolactone", "eplerenone", "amiloride", "triamterene"],
    drugs_b: ["lisinopril", "enalapril", "ramipril", "captopril", "losartan", "valsartan", "irbesartan", "candesartan", "olmesartan", "telmisartan"],
    severity: "HIGH",
    type: "Hyperkalemia",
    note: "Potassium-sparing diuretic + ACE/ARB; monitor K+ closely, especially with renal impairment",
  },
  {
    drugs_a: ["spironolactone", "eplerenone", "amiloride", "triamterene"],
    drugs_b: ["potassium chloride", "potassium", "k-dur", "klor-con", "slow-k"],
    severity: "HIGH",
    type: "Hyperkalemia",
    note: "Potassium-sparing diuretic + K+ supplement; risk of fatal hyperkalemia",
  },
  {
    drugs_a: ["lisinopril", "enalapril", "ramipril", "captopril", "losartan", "valsartan", "irbesartan"],
    drugs_b: ["potassium chloride", "potassium", "k-dur", "klor-con", "slow-k"],
    severity: "MODERATE",
    type: "Hyperkalemia",
    note: "ACE/ARB + K+ supplement; monitor electrolytes, especially in CKD",
  },
  // Clopidogrel + PPI
  {
    drugs_a: ["clopidogrel", "plavix"],
    drugs_b: ["omeprazole", "esomeprazole"],
    severity: "HIGH",
    type: "CYP2C19 inhibition",
    note: "Omeprazole/esomeprazole reduce clopidogrel activation; use pantoprazole instead",
  },
  // Statin myopathy
  {
    drugs_a: ["simvastatin", "lovastatin"],
    drugs_b: ["amiodarone", "cordarone"],
    severity: "HIGH",
    type: "CYP3A4 inhibition",
    note: "Amiodarone increases statin exposure; simvastatin max 20mg with amiodarone",
  },
  {
    drugs_a: ["simvastatin", "lovastatin"],
    drugs_b: ["diltiazem", "cardizem"],
    severity: "HIGH",
    type: "CYP3A4 inhibition",
    note: "Diltiazem increases statin levels; rhabdomyolysis risk; simvastatin max 10mg",
  },
  {
    drugs_a: ["simvastatin", "lovastatin"],
    drugs_b: ["verapamil", "calan", "isoptin"],
    severity: "HIGH",
    type: "CYP3A4 inhibition",
    note: "Verapamil increases statin levels; myopathy/rhabdomyolysis risk; simvastatin max 10mg",
  },
  {
    drugs_a: ["simvastatin", "lovastatin", "atorvastatin"],
    drugs_b: ["clarithromycin", "erythromycin", "itraconazole", "ketoconazole"],
    severity: "HIGH",
    type: "CYP3A4 inhibition",
    note: "Strong CYP3A4 inhibitors dramatically increase statin levels; rhabdomyolysis risk",
  },
  // Theophylline + ciprofloxacin
  {
    drugs_a: ["theophylline", "aminophylline"],
    drugs_b: ["ciprofloxacin", "enoxacin"],
    severity: "HIGH",
    type: "CYP1A2 inhibition",
    note: "Ciprofloxacin inhibits theophylline metabolism; seizure and arrhythmia risk",
  },
  // Additional critical pairs
  {
    drugs_a: ["carbamazepine", "tegretol"],
    drugs_b: ["erythromycin", "clarithromycin", "verapamil", "diltiazem"],
    severity: "HIGH",
    type: "CYP3A4 inhibition",
    note: "Increased carbamazepine levels; neurotoxicity risk (ataxia, nystagmus, diplopia)",
  },
  {
    drugs_a: ["sildenafil", "tadalafil", "vardenafil"],
    drugs_b: ["nitroglycerin", "isosorbide mononitrate", "isosorbide dinitrate", "nitrate"],
    severity: "CRITICAL",
    type: "Synergistic hypotension",
    note: "CONTRAINDICATED — PDE5 inhibitors + nitrates; life-threatening hypotension",
  },
  {
    drugs_a: ["clozapine", "clozaril"],
    drugs_b: ["carbamazepine", "tegretol"],
    severity: "CRITICAL",
    type: "Additive bone marrow suppression",
    note: "CONTRAINDICATED — combined agranulocytosis risk",
  },
  {
    drugs_a: ["allopurinol", "zyloprim"],
    drugs_b: ["azathioprine", "mercaptopurine", "6-mp", "imuran"],
    severity: "CRITICAL",
    type: "Xanthine oxidase inhibition",
    note: "Allopurinol inhibits azathioprine/6-MP metabolism; reduce dose by 75% or use alternative",
  },
];

function findDrugsInText(text) {
  const lowerText = text.toLowerCase();
  const found = new Set();

  CRITICAL_INTERACTIONS.forEach((interaction) => {
    [...interaction.drugs_a, ...interaction.drugs_b].forEach((drug) => {
      const drugLower = drug.toLowerCase();
      // Word boundary match
      const regex = new RegExp(`\\b${drugLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (regex.test(lowerText)) {
        found.add(drugLower);
      }
    });
  });

  return found;
}

function checkInteractions(text) {
  const lowerText = text.toLowerCase();
  const warnings = [];

  CRITICAL_INTERACTIONS.forEach((interaction) => {
    const foundA = interaction.drugs_a.some((drug) => {
      const regex = new RegExp(`\\b${drug.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return regex.test(lowerText);
    });
    const foundB = interaction.drugs_b.some((drug) => {
      const regex = new RegExp(`\\b${drug.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      return regex.test(lowerText);
    });

    if (foundA && foundB) {
      const drugA = interaction.drugs_a.find((d) => {
        const r = new RegExp(`\\b${d.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        return r.test(lowerText);
      });
      const drugB = interaction.drugs_b.find((d) => {
        const r = new RegExp(`\\b${d.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        return r.test(lowerText);
      });

      warnings.push({
        drugA,
        drugB,
        severity: interaction.severity,
        type: interaction.type,
        note: interaction.note,
      });
    }
  });

  return warnings;
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
    // Raw content, use as-is
  }

  if (typeof content !== "string" || content.length === 0) {
    process.exit(0);
  }

  const warnings = checkInteractions(content);

  if (warnings.length > 0) {
    process.stderr.write(
      `\n💊 Drug Interaction Warning: ${warnings.length} potential interaction(s) detected\n`
    );
    warnings.forEach((w) => {
      process.stderr.write(
        `   ${formatSeverity(w.severity)} | ${w.drugA} + ${w.drugB}\n`
      );
      process.stderr.write(`     Type: ${w.type}\n`);
      process.stderr.write(`     Note: ${w.note}\n`);
    });
    process.stderr.write(
      `   → Verify interactions with clinical pharmacist or drug interaction database.\n\n`
    );
  }

  process.exit(0);
}

main();
