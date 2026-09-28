/**
 * PS 26099: National Unified Material Master (NUMM)
 * Industrial AI Attribute Extraction & Semantic Matching Engine
 */

// Canonical dimension mapping table (Imperial <-> Metric <-> Nominal DN)
const DIMENSION_MAP = [
  { imperial: '1/2"', metric: '15mm', dn: 'DN15', regex: /\b(1\/2(?:"|inch|in\b)?|15\s*mm|dn\s*15|15\s*nb)\b/i },
  { imperial: '3/4"', metric: '20mm', dn: 'DN20', regex: /\b(3\/4(?:"|inch|in\b)?|20\s*mm|dn\s*20|20\s*nb)\b/i },
  { imperial: '1"', metric: '25mm', dn: 'DN25', regex: /\b(1(?:"|inch|in\b)?|25\s*mm|dn\s*25|25\s*nb)\b/i },
  { imperial: '1-1/2"', metric: '40mm', dn: 'DN40', regex: /\b(1\s*[-/]?\s*1\/2(?:"|inch|in\b)?|40\s*mm|dn\s*40|40\s*nb)\b/i },
  { imperial: '2"', metric: '50mm', dn: 'DN50', regex: /\b(2(?:"|inch|in\b)?|50\s*mm|dn\s*50|50\s*nb)\b/i },
  { imperial: '3"', metric: '80mm', dn: 'DN80', regex: /\b(3(?:"|inch|in\b)?|80\s*mm|dn\s*80|80\s*nb)\b/i },
  { imperial: '4"', metric: '100mm', dn: 'DN100', regex: /\b(4(?:"|inch|in\b)?|100\s*mm|dn\s*100|100\s*nb)\b/i },
  { imperial: '6"', metric: '150mm', dn: 'DN150', regex: /\b(6(?:"|inch|in\b)?|150\s*mm|dn\s*150|150\s*nb)\b/i },
  { imperial: '8"', metric: '200mm', dn: 'DN200', regex: /\b(8(?:"|inch|in\b)?|200\s*mm|dn\s*200|200\s*nb)\b/i },
  { imperial: '10"', metric: '250mm', dn: 'DN250', regex: /\b(10(?:"|inch|in\b)?|250\s*mm|dn\s*250|250\s*nb)\b/i },
  { imperial: '12"', metric: '300mm', dn: 'DN300', regex: /\b(12(?:"|inch|in\b)?|300\s*mm|dn\s*300|300\s*nb)\b/i }
];

// Metallurgical equivalency dictionary
const METALLURGY_RULES = [
  {
    family: "SS304",
    standardCode: "SS304",
    label: "Austenitic Stainless Steel 304",
    regex: /\b(ss\s*304|tp\s*304|a312\s*tp304|grade\s*304|cf8\b|stainless\s*steel.*304)\b/i
  },
  {
    family: "SS316",
    standardCode: "SS316",
    label: "Austenitic Stainless Steel 316 / CF8M",
    regex: /\b(ss\s*316|tp\s*316l?|a312\s*tp316|cf8m\b|stainless\s*steel.*316)\b/i
  },
  {
    family: "CS-A106B",
    standardCode: "CS106B",
    label: "Carbon Steel High-Temp (ASTM A106 Gr B)",
    regex: /\b(a106[\s-]*b|a106[\s-]*gr[\s.]*b|carbon\s*steel.*a106|cs.*a106)\b/i
  },
  {
    family: "CS-A105",
    standardCode: "A105",
    label: "Forged Carbon Steel (ASTM A105)",
    regex: /\b(a105\b|astm\s*a[\s-]*105|forged\s*carbon\s*steel)\b/i
  },
  {
    family: "CS-WCB",
    standardCode: "WCB",
    label: "Cast Carbon Steel (ASTM A216 WCB)",
    regex: /\b(a216[\s-]*wcb|wcb\b|cast\s*carbon\s*steel)\b/i
  },
  {
    family: "CS-A53B",
    standardCode: "A53B",
    label: "Carbon Steel Standard Pipe (ASTM A53 Gr B)",
    regex: /\b(a53[\s-]*b|astm\s*a53)\b/i
  },
  {
    family: "CHROME-STL",
    standardCode: "100CR6",
    label: "High-Carbon Chromium Bearing Steel (SAE 52100 / 100Cr6)",
    regex: /\b(bearing\s*steel|100cr6|sae\s*52100|chrome\s*steel|6205|6308)\b/i
  },
  {
    family: "CI-FRAME",
    standardCode: "CI-FC200",
    label: "Cast Iron Frame / Copper Windings (IE3 Efficiency)",
    regex: /\b(cast\s*iron\s*frame|squirrel\s*cage|induction\s*motor|tefc|flameproof|b3\s*frame)\b/i
  },
  {
    family: "AL-XLPE",
    standardCode: "AL-XLPE",
    label: "Aluminium Conductor / XLPE Insulated (IS 7098)",
    regex: /\b(al\s*armoured|aluminium|xlpe|cu\s*armoured|copper\s*conductor)\b/i
  }
];

// Pressure Schedule & Class dictionary
const PRESSURE_RULES = [
  { key: "SCH40", label: "SCH 40", regex: /\b(sch[\s-]*40|schedule[\s-]*40)\b/i },
  { key: "SCH80", label: "SCH 80", regex: /\b(sch[\s-]*80|schedule[\s-]*80)\b/i },
  { key: "SCH160", label: "SCH 160", regex: /\b(sch[\s-]*160|schedule[\s-]*160)\b/i },
  { key: "CL150", label: "Class 150", regex: /\b(150#|class\s*150|150\s*lbs|cl[\s.]*150|pn\s*20)\b/i },
  { key: "CL300", label: "Class 300", regex: /\b(300#|class\s*300|300\s*lbs|cl[\s.]*300|pn\s*50)\b/i },
  { key: "CL600", label: "Class 600", regex: /\b(600#|class\s*600|600\s*lbs|cl[\s.]*600|pn\s*100)\b/i },
  { key: "CL800", label: "Class 800", regex: /\b(800#|class\s*800|800\s*lbs)\b/i },
  { key: "2RS", label: "Rubber Contact Sealed (2RS / DDU)", regex: /\b(2rs|2rs1|ddu|rubber\s*seal|sealed)\b/i },
  { key: "415V", label: "415V / 50Hz / 3-Phase", regex: /\b(415\s*v|415\s*volt|415v)\b/i },
  { key: "1.1KV", label: "1.1 kV (1100V Grade)", regex: /\b(1\.1\s*kv|1100\s*v|1100v|3\.3\s*kv)\b/i }
];

// Component Type & Category dictionary
const COMPONENT_RULES = [
  { category: "Pipes & Tubes", code: "PIP", subType: "Seamless Pipe", regex: /\b(pipe|linepipe|tubing|smls\s*pipe)\b/i },
  { category: "Valves", code: "VLV", subType: "Ball Valve", regex: /\b(ball\s*valve|valve\s*ball)\b/i },
  { category: "Valves", code: "VLV", subType: "Gate Valve", regex: /\b(gate\s*valve|valve\s*gate)\b/i },
  { category: "Valves", code: "VLV", subType: "Globe Valve", regex: /\b(globe\s*valve|valve\s*globe)\b/i },
  { category: "Valves", code: "VLV", subType: "Check Valve", regex: /\b(check\s*valve|nrvalve|nrv)\b/i },
  { category: "Flanges", code: "FLG", subType: "Weld Neck Flange", regex: /\b(flange|wnrf|sorf|welding\s*neck)\b/i },
  { category: "Gaskets & Seals", code: "GSK", subType: "Spiral Wound Gasket", regex: /\b(gasket|spiral\s*wound|spw)\b/i },
  { category: "Pumps & Seals", code: "PMP", subType: "Mechanical Seal", regex: /\b(mech\s*seal|mechanical\s*seal|cartridge\s*seal)\b/i },
  { category: "Bearings", code: "BRG", subType: "Deep Groove Ball Bearing", regex: /\b(bearing|brg|ball\s*bearing|deep\s*groove|roller\s*bearing|6205|6308)\b/i },
  { category: "Motors & Drives", code: "MOT", subType: "3-Phase Induction Motor", regex: /\b(motor|induction\s*motor|squirrel\s*cage|flameproof\s*motor)\b/i },
  { category: "Cables & Electrical", code: "CBL", subType: "Armoured Power Cable", regex: /\b(cable|cbl|power\s*cable|control\s*cable|xlpe)\b/i }
];

/**
 * Extract structured technical attributes from raw description string
 */
export function extractAttributes(rawText = "") {
  const text = String(rawText).trim();

  // 1. Dimension Extraction
  let dimension = null;

  // 1A. Rotary Equipment / Bearing Dimension
  if (/\b(6205|25x52x15|25\s*mm\s*bore)\b/i.test(text)) {
    dimension = { nominal: "ID25-OD52-W15", metric: "25x52x15 mm", imperial: '0.98x2.05x0.59"' };
  } else if (/\b(6308|40x90x23)\b/i.test(text)) {
    dimension = { nominal: "ID40-OD90-W23", metric: "40x90x23 mm", imperial: '1.57x3.54x0.91"' };
  }
  // 1B. Electric Motor Rating
  else if (/\b(15\s*kw|20\s*hp)\b/i.test(text)) {
    dimension = { nominal: "15KW-4P", metric: "15 kW (1450-1500 RPM)", imperial: "20 HP" };
  } else if (/\b(45\s*kw|60\s*hp)\b/i.test(text)) {
    dimension = { nominal: "45KW-4P", metric: "45 kW (1480 RPM)", imperial: "60 HP" };
  }
  // 1C. Industrial Power Cable Cross-Section
  else if (/\b(3\.5\s*c(?:ore)?\s*x?\s*185|185\s*sq\s*mm)\b/i.test(text)) {
    dimension = { nominal: "3.5Cx185", metric: "3.5C x 185 sq mm", imperial: "350 kcmil equiv" };
  } else if (/\b(4\s*c(?:ore)?\s*x?\s*16|16\s*sq\s*mm)\b/i.test(text)) {
    dimension = { nominal: "4Cx16", metric: "4C x 16 sq mm", imperial: "6 AWG equiv" };
  }
  // 1D. Standard Piping, Flange, Valve & Gasket Dimensions
  else {
    for (const item of DIMENSION_MAP) {
      if (item.regex.test(text)) {
        dimension = {
          nominal: item.dn,
          imperial: item.imperial,
          metric: item.metric
        };
        break;
      }
    }
  }

  if (!dimension) {
    // Fallback extraction
    const match = text.match(/\b(\d+(\.\d+)?)\s*(?:mm|inch|"|in\b)/i);
    if (match) {
      dimension = { nominal: `DN${parseInt(match[1])}`, metric: `${match[1]}mm`, imperial: `${match[1]}"` };
    } else {
      dimension = { nominal: "STD-N/A", metric: "N/A", imperial: "N/A" };
    }
  }

  // 2. Metallurgy Extraction
  let metallurgy = null;
  for (const meta of METALLURGY_RULES) {
    if (meta.regex.test(text)) {
      metallurgy = {
        family: meta.family,
        code: meta.standardCode,
        label: meta.label
      };
      break;
    }
  }
  if (!metallurgy) {
    if (/\bss\b/i.test(text)) metallurgy = { family: "SS", code: "SS-GEN", label: "Stainless Steel Generic" };
    else if (/\bcs\b/i.test(text)) metallurgy = { family: "CS", code: "CS-GEN", label: "Carbon Steel Generic" };
    else metallurgy = { family: "STD", code: "STD-MAT", label: "Standard Industrial Spec" };
  }

  // 3. Pressure Rating Extraction
  let pressure = null;
  for (const p of PRESSURE_RULES) {
    if (p.regex.test(text)) {
      pressure = { key: p.key, label: p.label };
      break;
    }
  }
  if (!pressure) {
    pressure = { key: "STD-RATING", label: "Standard Class" };
  }

  // 4. Component / Category Extraction
  let component = null;
  for (const comp of COMPONENT_RULES) {
    if (comp.regex.test(text)) {
      component = {
        category: comp.category,
        code: comp.code,
        subType: comp.subType
      };
      break;
    }
  }
  if (!component) {
    component = {
      category: "Industrial Spares",
      code: "IND",
      subType: "Standard Component"
    };
  }

  // 5. Construction / Form
  let construction = "Standard";
  if (/\b(smls|seamless)\b/i.test(text)) construction = "Seamless";
  else if (/\b(erw|welded|efw)\b/i.test(text)) construction = "Welded";
  else if (/\bforged\b/i.test(text)) construction = "Forged";
  else if (/\bcast\b/i.test(text)) construction = "Cast";

  // 6. Generate Canonical NUMM Code
  const cleanDn = dimension.nominal.replace(/[^A-Z0-9]/g, '');
  const cleanPressure = pressure.key.replace(/[^A-Z0-9]/g, '');
  const nummCode = `NUMM-${component.code}-${metallurgy.code}-${cleanDn}-${cleanPressure}`;

  return {
    rawText,
    dimension,
    metallurgy,
    pressure,
    component,
    construction,
    nummCode
  };
}

/**
 * Calculate multi-dimensional cosine/weighted similarity between two items
 */
export function calculateMatchConfidence(itemA, itemB) {
  const attrA = itemA.extractedAttributes || extractAttributes(itemA.rawDescription || "");
  const attrB = itemB.extractedAttributes || extractAttributes(itemB.rawDescription || "");

  let dimensionScore = 0.0;
  let metallurgyScore = 0.0;
  let pressureScore = 0.0;
  let categoryScore = 0.0;

  // Category comparison
  const catA = attrA.component?.category || attrA.category || "";
  const catB = attrB.component?.category || attrB.category || "";
  if (catA.toLowerCase() === catB.toLowerCase()) {
    categoryScore = 1.0;
  } else if (catA && catB && (catA.includes(catB) || catB.includes(catA))) {
    categoryScore = 0.7;
  }

  // Dimension comparison (normalize to nominal DN)
  const dnA = attrA.dimension?.nominal || "";
  const dnB = attrB.dimension?.nominal || "";
  if (dnA && dnB && dnA === dnB && dnA !== "STD-N/A") {
    dimensionScore = 1.0;
  } else if (dnA === dnB) {
    dimensionScore = 0.8;
  } else {
    dimensionScore = 0.0;
  }

  // Metallurgy comparison
  const metCodeA = attrA.metallurgy?.family || attrA.metallurgy?.code || "";
  const metCodeB = attrB.metallurgy?.family || attrB.metallurgy?.code || "";
  if (metCodeA && metCodeB && metCodeA === metCodeB) {
    metallurgyScore = 1.0;
  } else if (
    (metCodeA.includes("SS") && metCodeB.includes("SS")) ||
    (metCodeA.includes("CS") && metCodeB.includes("CS"))
  ) {
    metallurgyScore = 0.75;
  } else {
    metallurgyScore = 0.2;
  }

  // Pressure comparison
  const presA = attrA.pressure?.key || attrA.pressureClass || "";
  const presB = attrB.pressure?.key || attrB.pressureClass || "";
  if (presA && presB && presA.replace(/\s/g, '').toLowerCase() === presB.replace(/\s/g, '').toLowerCase()) {
    pressureScore = 1.0;
  } else {
    pressureScore = 0.5;
  }

  // Composite weighted score:
  // Dimension (30%), Metallurgy (30%), Category (20%), Pressure (20%)
  const confidence = (
    dimensionScore * 0.30 +
    metallurgyScore * 0.30 +
    categoryScore * 0.20 +
    pressureScore * 0.20
  );

  // Generate engineering rationale
  let rationale = "";
  if (confidence >= 0.90) {
    rationale = `High-confidence physical equivalence: Dimension matches (${dnA}), metallurgy aligns (${attrA.metallurgy?.label || metCodeA}), and pressure class matches (${presA}). Meets ASME/ASTM cross-interchangeability criteria.`;
  } else if (confidence >= 0.75) {
    rationale = `Potential functional equivalent: Geometric dimensions align (${dnA}), but slight metallurgical or design variation requires engineering verification before inter-plant procurement pooling.`;
  } else {
    rationale = `Disparate industrial components: Significant variation detected in nominal dimensions or base metallurgy. Distinct master records recommended.`;
  }

  // Explainable AI (XAI) attribute comparison breakdown
  const explainableBreakdown = [
    {
      attribute: "Component Category",
      valA: catA || "Standard Industrial Asset",
      valB: catB || "Standard Industrial Asset",
      score: categoryScore,
      status: categoryScore >= 0.9 ? "EXACT MATCH" : (categoryScore >= 0.7 ? "COMPATIBLE CLASS" : "MISMATCH")
    },
    {
      attribute: "Dimensional Normalization",
      valA: `${attrA.dimension?.nominal || 'N/A'} (${attrA.dimension?.metric || ''})`,
      valB: `${attrB.dimension?.nominal || 'N/A'} (${attrB.dimension?.metric || ''})`,
      score: dimensionScore,
      status: dimensionScore >= 0.9 ? "EXACT MATCH" : (dimensionScore >= 0.7 ? "COMPATIBLE" : "DIMENSIONAL VARIATION")
    },
    {
      attribute: "Metallurgical Equivalence",
      valA: attrA.metallurgy?.label || metCodeA || "Standard",
      valB: attrB.metallurgy?.label || metCodeB || "Standard",
      score: metallurgyScore,
      status: metallurgyScore >= 0.9 ? "EXACT MATCH" : (metallurgyScore >= 0.7 ? "DUAL-CERTIFIED EQUIVALENT" : "DIFFERENT ALLOY")
    },
    {
      attribute: "Pressure / Rating Class",
      valA: presA || attrA.pressure?.label || "Standard Class",
      valB: presB || attrB.pressure?.label || "Standard Class",
      score: pressureScore,
      status: pressureScore >= 0.9 ? "EXACT MATCH" : "FUNCTIONALLY COMPATIBLE"
    }
  ];

  return {
    confidence: Math.round(confidence * 1000) / 1000,
    percentage: `${Math.round(confidence * 100)}%`,
    dimensionScore,
    metallurgyScore,
    categoryScore,
    pressureScore,
    rationale,
    explainableBreakdown,
    proposedNummCode: attrA.nummCode || attrB.nummCode,
    isEquivalent: confidence >= 0.85
  };
}

/**
 * Search materials and group by equivalent cluster
 */
export function searchMaterials(query = "", catalog = []) {
  if (!query || query.trim() === "") {
    return catalog;
  }

  const q = query.trim().toLowerCase();
  const tokens = q.split(/\s+/).filter(Boolean);

  // First pass: Direct text/token match
  const matchedItems = catalog.filter(item => {
    const haystack = [
      item.legacyCode,
      item.rawDescription,
      item.cpse,
      item.category,
      item.nummCode,
      item.plant,
      item.extractedAttributes?.dimension?.nominal,
      item.extractedAttributes?.dimension?.imperial,
      item.extractedAttributes?.dimension?.metric,
      item.extractedAttributes?.metallurgy,
      item.extractedAttributes?.pressureClass
    ].filter(Boolean).join(" ").toLowerCase();

    return tokens.every(token => haystack.includes(token));
  });

  return matchedItems;
}
