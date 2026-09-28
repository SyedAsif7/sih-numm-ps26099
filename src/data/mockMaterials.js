/**
 * PS 26099: National Unified Material Master (NUMM)
 * Industrial Master Material Repository & Sample Multi-CPSE Catalog
 * Primary Ecosystem: CPCL (Chennai Petroleum), IOCL (Indian Oil), ONGC (Oil & Natural Gas Corp)
 */

export const INITIAL_MATERIALS = [
  // =========================================================================
  // CLUSTER 1: Stainless Steel Pipe 2" (DN50) SCH 40 Seamless ASTM A312 TP304
  // =========================================================================
  {
    id: "MAT-CPCL-10452",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "MAT-10452",
    rawDescription: "SS PIPE 2 IN SCH 40 ASTM A312 TP304 SMLS",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50.8 mm", outerDia: "60.3 mm" },
      metallurgy: "SS 304 (ASTM A312 TP304)",
      pressureClass: "SCH 40",
      construction: "Seamless",
      endConnection: "Plain End (PE)",
      standard: "ASME B36.19M / ASTM A312",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-SS304-DN050-S40-SMLS",
    clusterId: "CLUST-PIP-001",
    stockQuantity: 420,
    unitCostINR: 4250,
    status: "Harmonized",
    auditRef: "VAL-2026-001"
  },
  {
    id: "MAT-IOCL-77821",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Refinery & Petrochemical Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "M-77821",
    rawDescription: "STAINLESS STEEL PIPE, 50mm, SCH40, TP304, SEAMLESS",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm", outerDia: "60.3 mm" },
      metallurgy: "SS 304 (Grade 304)",
      pressureClass: "SCH 40",
      construction: "Seamless",
      endConnection: "Beveled End",
      standard: "ASME B36.19M / ASTM A312",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-SS304-DN050-S40-SMLS",
    clusterId: "CLUST-PIP-001",
    stockQuantity: 680,
    unitCostINR: 4190,
    status: "Harmonized",
    auditRef: "VAL-2026-001"
  },
  {
    id: "MAT-ONGC-2941",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Uran Offshore Processing Plant",
    erpSystem: "In-House ERP / SAP ECC",
    legacyCode: "RM-2941",
    rawDescription: "SS SEAMLESS PIPE DN50 SCH 40 GR 304",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm", outerDia: "60.3 mm" },
      metallurgy: "SS 304 (Austenitic)",
      pressureClass: "SCH 40",
      construction: "Seamless",
      endConnection: "Plain End",
      standard: "ASME B36.19M / ASTM A312",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-SS304-DN050-S40-SMLS",
    clusterId: "CLUST-PIP-001",
    stockQuantity: 310,
    unitCostINR: 4320,
    status: "Harmonized",
    auditRef: "VAL-2026-001"
  },

  // =========================================================================
  // CLUSTER 2: Carbon Steel Seamless Pipe 4" (DN100) SCH 80 ASTM A106 Gr B
  // =========================================================================
  {
    id: "MAT-CPCL-20188",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-PIP-4091",
    rawDescription: "CS PIPE 4 IN SCH 80 ASTM A106 GR.B SMLS BE",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm", outerDia: "114.3 mm" },
      metallurgy: "Carbon Steel (ASTM A106 Grade B)",
      pressureClass: "SCH 80",
      construction: "Seamless",
      endConnection: "Beveled End",
      standard: "ASME B36.10M / ASTM A106",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    clusterId: "CLUST-PIP-002",
    stockQuantity: 1250,
    unitCostINR: 6800,
    status: "Harmonized",
    auditRef: "VAL-2026-014"
  },
  {
    id: "MAT-IOCL-P1008",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Mathura Refinery",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-P-55012",
    rawDescription: "2\" NB CS SEAMLESS PIPE SCH40 ASTM A53/A106B SMLS",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm", outerDia: "114.3 mm" },
      metallurgy: "Carbon Steel (ASTM A106 Gr B)",
      pressureClass: "SCH 80",
      construction: "Seamless",
      endConnection: "Beveled End",
      standard: "ASME B36.10M / ASTM A106",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    clusterId: "CLUST-PIP-002",
    stockQuantity: 890,
    unitCostINR: 6720,
    status: "Harmonized",
    auditRef: "VAL-2026-014"
  },
  {
    id: "MAT-ONGC-480B",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Hazira Gas Processing Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ONGC-P-4-80B",
    rawDescription: "4 INCH CS LINEPIPE SCH 80 ASTM A106B SMLS PE",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm", outerDia: "114.3 mm" },
      metallurgy: "Carbon Steel (ASTM A106 Gr B)",
      pressureClass: "SCH 80",
      construction: "Seamless",
      endConnection: "Plain End",
      standard: "ASME B36.10M / API 5L",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    clusterId: "CLUST-PIP-002",
    stockQuantity: 540,
    unitCostINR: 6850,
    status: "Harmonized",
    auditRef: "VAL-2026-014"
  },

  // =========================================================================
  // CLUSTER 3: Ball Valve 2" (DN50) Class 150 Stainless Steel (KILLER DEMO)
  // =========================================================================
  {
    id: "MAT-CPCL-VLV-1042",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-VLV-1042",
    rawDescription: "VLV BALL SS 2IN 150#",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "SS 304 / CF8M (Austenitic)",
      pressureClass: "Class 150 (150#)",
      construction: "Floating Ball, Full Bore",
      endConnection: "Flanged Raised Face (RF)",
      standard: "ASME B16.34 / API 6D",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-SS-DN50-CL150",
    clusterId: "CLUST-VLV-001",
    stockQuantity: 48,
    unitCostINR: 19800,
    status: "Harmonized",
    auditRef: "VAL-2026-021"
  },
  {
    id: "MAT-IOCL-M-88210",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-M-88210",
    rawDescription: "Ball Valve | Stainless Steel | DN50 | Class 150",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "Stainless Steel (CF8M/316)",
      pressureClass: "Class 150",
      construction: "Full Port Floating Ball",
      endConnection: "Flanged RF",
      standard: "ASME B16.34 / BS 5351",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-SS-DN50-CL150",
    clusterId: "CLUST-VLV-001",
    stockQuantity: 62,
    unitCostINR: 19500,
    status: "Harmonized",
    auditRef: "VAL-2026-021"
  },
  {
    id: "MAT-ONGC-BV-50-150",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Mumbai High Offshore Platform",
    erpSystem: "In-House ERP",
    legacyCode: "ONGC-BV-50-150",
    rawDescription: "VALVE BALL 50MM 150 LBS RF FLGD SS BODY ASTM A351 CF8M",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "ASTM A351 CF8M / SS316",
      pressureClass: "150 LBS (Class 150)",
      construction: "Floating Ball",
      endConnection: "Flanged RF",
      standard: "API 6D / ASME B16.34",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-SS-DN50-CL150",
    clusterId: "CLUST-VLV-001",
    stockQuantity: 34,
    unitCostINR: 20200,
    status: "Harmonized",
    auditRef: "VAL-2026-021"
  },

  // =========================================================================
  // CLUSTER 4: Ball Valve 2" (DN50) Class 300 Stainless Steel
  // =========================================================================
  {
    id: "MAT-CPCL-VAL-302",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "VLV-BL-2-300",
    rawDescription: "BALL VALVE 2 IN CL300 FLANGED RF CF8M / SS316 LEVER OP",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "Body: ASTM A351 CF8M / Trim: SS316",
      pressureClass: "Class 300 (300#)",
      construction: "2-Piece Floating Ball, Full Bore",
      endConnection: "Flanged Raised Face (RF)",
      standard: "API 6D / ASME B16.34",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-CF8M-DN50-CL300",
    clusterId: "CLUST-VLV-002",
    stockQuantity: 74,
    unitCostINR: 28500,
    status: "Harmonized",
    auditRef: "VAL-2026-042"
  },
  {
    id: "MAT-IOCL-VAL-881",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Gujarat Refinery, Vadodara",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOC-VLV-50-300",
    rawDescription: "VALVE BALL 50MM 300LBS RF BODY CF8M BALL SS316 FULL PORT",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "Body: CF8M / Ball: SS316",
      pressureClass: "300 LBS (Class 300)",
      construction: "Full Port Floating Ball",
      endConnection: "Flanged RF",
      standard: "API 6D / BS 5351",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-CF8M-DN50-CL300",
    clusterId: "CLUST-VLV-002",
    stockQuantity: 42,
    unitCostINR: 27900,
    status: "Harmonized",
    auditRef: "VAL-2026-042"
  },
  {
    id: "MAT-ONGC-VLV-119",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Hazira Gas Processing Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ON-BV-DN50-300",
    rawDescription: "DN50 BALL VALVE CLASS 300# FLG RF ASTM A351 GR CF8M",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "ASTM A351 Gr CF8M / 316",
      pressureClass: "Class 300#",
      construction: "Floating Ball Valve",
      endConnection: "Flanged RF",
      standard: "API 6D / ASME B16.34",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-CF8M-DN50-CL300",
    clusterId: "CLUST-VLV-002",
    stockQuantity: 18,
    unitCostINR: 29100,
    status: "Harmonized",
    auditRef: "VAL-2026-042"
  },

  // =========================================================================
  // CLUSTER 5: Gate Valve 4" (DN100) Class 150 Cast Carbon Steel WCB
  // =========================================================================
  {
    id: "MAT-CPCL-GV-100",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CP-GV-100-150",
    rawDescription: "VALVE GATE 4 IN 150# WCB OS&Y BB FLGD RF",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm" },
      metallurgy: "ASTM A216 Gr WCB",
      pressureClass: "Class 150 (150#)",
      construction: "Flexible Wedge, OS&Y",
      endConnection: "Flanged RF",
      standard: "API 600 / ASME B16.34",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-WCB-DN100-CL150",
    clusterId: "CLUST-VLV-005",
    stockQuantity: 36,
    unitCostINR: 24200,
    status: "Harmonized",
    auditRef: "VAL-2026-055"
  },
  {
    id: "MAT-IOCL-GV-100",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Mathura Refinery",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOC-GV-DN100",
    rawDescription: "GATE VALVE 100MM NB CLASS 150 RF CAST CARBON STEEL A216-WCB",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm" },
      metallurgy: "Cast Carbon Steel A216 WCB",
      pressureClass: "Class 150",
      construction: "Rising Stem, Bolted Bonnet",
      endConnection: "Flanged RF",
      standard: "API 600 / ASME B16.34",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-WCB-DN100-CL150",
    clusterId: "CLUST-VLV-005",
    stockQuantity: 28,
    unitCostINR: 23900,
    status: "Harmonized",
    auditRef: "VAL-2026-055"
  },
  {
    id: "MAT-ONGC-GV-100",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Uran Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ON-GV-4-150",
    rawDescription: "4 INCH 150 LBS WCB GATE VALVE FLANGED ENDS API 600",
    category: "Valves",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm" },
      metallurgy: "WCB Carbon Steel",
      pressureClass: "150 LBS",
      construction: "Wedge Gate Valve",
      endConnection: "Flanged",
      standard: "API 600",
      uom: "NOS"
    },
    nummCode: "NUMM-VLV-WCB-DN100-CL150",
    clusterId: "CLUST-VLV-005",
    stockQuantity: 19,
    unitCostINR: 24500,
    status: "Harmonized",
    auditRef: "VAL-2026-055"
  },

  // =========================================================================
  // CLUSTER 6: Weld Neck Flange 2" (DN50) Class 150 RF ASTM A105
  // =========================================================================
  {
    id: "MAT-CPCL-FLG-050",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "FLG-WNRF-2-150",
    rawDescription: "FLANGE WNRF 2 IN 150# SCH 40 ASTM A105",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "Forged Carbon Steel ASTM A105",
      pressureClass: "Class 150 (150#)",
      construction: "Weld Neck Raised Face",
      standard: "ASME B16.5",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-A105-DN50-CL150",
    clusterId: "CLUST-FLG-001",
    stockQuantity: 180,
    unitCostINR: 3200,
    status: "Harmonized",
    auditRef: "VAL-2026-062"
  },
  {
    id: "MAT-IOCL-FLG-050",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOC-FLG-50-150",
    rawDescription: "WELDING NECK FLANGE 50 NB 150 LBS RF BORE SCH40 A-105",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "ASTM A105 Carbon Steel",
      pressureClass: "150 LBS",
      construction: "Weld Neck Bore SCH40",
      standard: "ASME B16.5",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-A105-DN50-CL150",
    clusterId: "CLUST-FLG-001",
    stockQuantity: 240,
    unitCostINR: 3150,
    status: "Harmonized",
    auditRef: "VAL-2026-062"
  },
  {
    id: "MAT-ONGC-FLG-050",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Hazira Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ON-FLG-2-150",
    rawDescription: "2 INCH FLG WELD NECK CL150 RF SCH40 CS FORGED A105",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN50", imperial: '2"', metric: "50 mm" },
      metallurgy: "Forged CS A105",
      pressureClass: "Class 150",
      construction: "Weld Neck Raised Face",
      standard: "ASME B16.5",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-A105-DN50-CL150",
    clusterId: "CLUST-FLG-001",
    stockQuantity: 110,
    unitCostINR: 3280,
    status: "Harmonized",
    auditRef: "VAL-2026-062"
  },

  // =========================================================================
  // CLUSTER 7: Spiral Wound Gasket 3" (DN80) Class 150 SS316 Graphite Filler
  // =========================================================================
  {
    id: "MAT-CPCL-GSK-084",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "GSK-SPW-3-150",
    rawDescription: "SPIRAL WOUND GASKET 3 IN 150# ASME B16.20 SS316 W/ GRAPHITE FILLER",
    category: "Gaskets & Seals",
    extractedAttributes: {
      dimension: { nominal: "DN80", imperial: '3"', metric: "80 mm" },
      metallurgy: "Winding: SS316 / Inner & Outer Ring: CS",
      pressureClass: "Class 150",
      construction: "Spiral Wound with Graphite Filler",
      standard: "ASME B16.20",
      uom: "NOS"
    },
    nummCode: "NUMM-GSK-SS316-DN80-CL150",
    clusterId: "CLUST-GSK-001",
    stockQuantity: 340,
    unitCostINR: 1450,
    status: "Harmonized",
    auditRef: "VAL-2026-078"
  },
  {
    id: "MAT-IOCL-GSK-080",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Mathura Refinery",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOC-GSK-80-150",
    rawDescription: "SPW GASKET 80MM NB 150 LBS SS316 W/ GRAPHITE FILLER",
    category: "Gaskets & Seals",
    extractedAttributes: {
      dimension: { nominal: "DN80", imperial: '3"', metric: "80 mm" },
      metallurgy: "SS316 / Flexible Graphite",
      pressureClass: "150 LBS",
      construction: "Spiral Wound",
      standard: "ASME B16.20 / BS 3381",
      uom: "NOS"
    },
    nummCode: "NUMM-GSK-SS316-DN80-CL150",
    clusterId: "CLUST-GSK-001",
    stockQuantity: 520,
    unitCostINR: 1420,
    status: "Harmonized",
    auditRef: "VAL-2026-078"
  },
  {
    id: "MAT-ONGC-GSK-080",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Offshore Platform",
    erpSystem: "SAP ECC",
    legacyCode: "ON-GSK-3-150",
    rawDescription: "GASKET SPIRAL WOUND 3 INCH CLASS 150 ASME B16.20 316L/FG",
    category: "Gaskets & Seals",
    extractedAttributes: {
      dimension: { nominal: "DN80", imperial: '3"', metric: "80 mm" },
      metallurgy: "SS 316L / Graphite",
      pressureClass: "Class 150",
      construction: "Spiral Wound with Centering Ring",
      standard: "ASME B16.20",
      uom: "NOS"
    },
    nummCode: "NUMM-GSK-SS316-DN80-CL150",
    clusterId: "CLUST-GSK-001",
    stockQuantity: 210,
    unitCostINR: 1490,
    status: "Harmonized",
    auditRef: "VAL-2026-078"
  },

  // =========================================================================
  // CLUSTER 8: Deep Groove Ball Bearing 6205-2RS (25x52x15mm)
  // =========================================================================
  {
    id: "MAT-CPCL-BRG-6205",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-BRG-3310",
    rawDescription: "BEARING RADIAL BALL 25MM BORE 52MM OD RUBBER SEALED 6205",
    category: "Bearings",
    extractedAttributes: {
      dimension: { nominal: "ID25-OD52-W15", imperial: '0.98x2.05x0.59"', metric: "25x52x15 mm" },
      metallurgy: "Bearing Steel SAE 52100 / 100Cr6",
      pressureClass: "Rubber Sealed (2RS/DDU)",
      construction: "Single Row Deep Groove",
      standard: "ISO 15 / DIN 625-1",
      uom: "NOS"
    },
    nummCode: "NUMM-BRG-100CR6-ID25OD52W15-2RS",
    clusterId: "CLUST-BRG-001",
    stockQuantity: 145,
    unitCostINR: 850,
    status: "Harmonized",
    auditRef: "VAL-2026-088"
  },
  {
    id: "MAT-IOCL-BRG-6205",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-BRG-8821",
    rawDescription: "DEEP GROOVE BALL BEARING 6205-2RS1 SKF 25X52X15MM C3",
    category: "Bearings",
    extractedAttributes: {
      dimension: { nominal: "ID25-OD52-W15", imperial: '0.98x2.05x0.59"', metric: "25x52x15 mm" },
      metallurgy: "100Cr6 Chrome Steel",
      pressureClass: "Contact Seal (2RS1)",
      construction: "Deep Groove Radial Ball",
      standard: "ISO 15 / DIN 625-1",
      uom: "NOS"
    },
    nummCode: "NUMM-BRG-100CR6-ID25OD52W15-2RS",
    clusterId: "CLUST-BRG-001",
    stockQuantity: 210,
    unitCostINR: 820,
    status: "Harmonized",
    auditRef: "VAL-2026-088"
  },
  {
    id: "MAT-ONGC-BRG-6205",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Uran Offshore Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ONGC-BRG-6205",
    rawDescription: "BALL BEARING SINGLE ROW 6205 2RS DDU 25X52X15 BEARING STEEL",
    category: "Bearings",
    extractedAttributes: {
      dimension: { nominal: "ID25-OD52-W15", imperial: '0.98x2.05x0.59"', metric: "25x52x15 mm" },
      metallurgy: "SAE 52100",
      pressureClass: "Synthetic Rubber Sealed",
      construction: "Radial Ball Bearing",
      standard: "ISO 15 / DIN 625-1",
      uom: "NOS"
    },
    nummCode: "NUMM-BRG-100CR6-ID25OD52W15-2RS",
    clusterId: "CLUST-BRG-001",
    stockQuantity: 95,
    unitCostINR: 890,
    status: "Harmonized",
    auditRef: "VAL-2026-088"
  },

  // =========================================================================
  // CLUSTER 9: 3-Phase Induction Motor 15kW IE3 415V Foot-Mounted B3
  // =========================================================================
  {
    id: "MAT-CPCL-MOT-15",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-MOT-1004",
    rawDescription: "15 KW SQUIRREL CAGE INDUCTION MOTOR 415V 1500 RPM B3 FRAME TEFC",
    category: "Motors & Drives",
    extractedAttributes: {
      dimension: { nominal: "15KW-4P", imperial: "20 HP", metric: "15 kW (1500 RPM)" },
      metallurgy: "Cast Iron Frame / Copper Windings",
      pressureClass: "415V / 50Hz / 3-Phase",
      construction: "TEFC, B3 Foot Mounted",
      standard: "IS 12615 / IEC 60034-30 (IE3)",
      uom: "NOS"
    },
    nummCode: "NUMM-MOT-15KW-4P-415V-IE3-B3",
    clusterId: "CLUST-MOT-001",
    stockQuantity: 12,
    unitCostINR: 78500,
    status: "Harmonized",
    auditRef: "VAL-2026-094"
  },
  {
    id: "MAT-IOCL-MOT-15",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-MOT-9912",
    rawDescription: "3 PHASE INDUCTION MOTOR 15KW 415V 1450RPM 4 POLE FOOT MTD IE3",
    category: "Motors & Drives",
    extractedAttributes: {
      dimension: { nominal: "15KW-4P", imperial: "20 HP", metric: "15 kW (1450 RPM)" },
      metallurgy: "Cast Iron Frame (FC200)",
      pressureClass: "415V, 50Hz",
      construction: "Foot Mounted B3 TEFC",
      standard: "IEC 60034-30 / IS 12615",
      uom: "NOS"
    },
    nummCode: "NUMM-MOT-15KW-4P-415V-IE3-B3",
    clusterId: "CLUST-MOT-001",
    stockQuantity: 18,
    unitCostINR: 77900,
    status: "Harmonized",
    auditRef: "VAL-2026-094"
  },
  {
    id: "MAT-ONGC-MOT-20",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Hazira Processing Plant",
    erpSystem: "SAP ECC",
    legacyCode: "ONGC-MOT-20HP",
    rawDescription: "20 HP 415V 3PH 50HZ 1460 RPM FOOT MOUNTED INDUCTION MOTOR TEFC",
    category: "Motors & Drives",
    extractedAttributes: {
      dimension: { nominal: "15KW-4P", imperial: "20 HP", metric: "14.9 kW (1460 RPM)" },
      metallurgy: "Heavy Cast Iron Casing",
      pressureClass: "415 Volts 3 Phase",
      construction: "B3 Foot Mounted TEFC",
      standard: "IS 12615 / IEC 60034",
      uom: "NOS"
    },
    nummCode: "NUMM-MOT-15KW-4P-415V-IE3-B3",
    clusterId: "CLUST-MOT-001",
    stockQuantity: 8,
    unitCostINR: 79200,
    status: "Harmonized",
    auditRef: "VAL-2026-094"
  },

  // =========================================================================
  // CLUSTER 10: XLPE Power Cable 3.5C x 185 sqmm Aluminium Armoured 1.1kV
  // =========================================================================
  {
    id: "MAT-CPCL-CBL-185",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-CBL-185",
    rawDescription: "1.1 KV 3.5C X 185 SQMM AL ARMOURED XLPE CABLE IS 7098",
    category: "Cables & Electrical",
    extractedAttributes: {
      dimension: { nominal: "3.5Cx185", metric: "3.5 Core x 185 sqmm", imperial: "350 MCM eq." },
      metallurgy: "Stranded Aluminium Conductor / XLPE Insulated",
      pressureClass: "1.1 kV (1100V Grade)",
      construction: "Galvanized Steel Flat Strip Armoured",
      standard: "IS 7098 (Part 1)",
      uom: "MTR"
    },
    nummCode: "NUMM-CBL-AL-3.5C185-1.1KV-AR",
    clusterId: "CLUST-CBL-001",
    stockQuantity: 2800,
    unitCostINR: 1150,
    status: "Harmonized",
    auditRef: "VAL-2026-102"
  },
  {
    id: "MAT-IOCL-CBL-185",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-CBL-4401",
    rawDescription: "1100V 3.5 CORE 185SQMM ALUMINIUM CONDUCTOR ARMORED CABLE",
    category: "Cables & Electrical",
    extractedAttributes: {
      dimension: { nominal: "3.5Cx185", metric: "3.5C x 185 sq.mm", imperial: "350 MCM eq." },
      metallurgy: "Aluminium Conductor / XLPE Insulation",
      pressureClass: "1100V Grade",
      construction: "Strip Armoured PVC Outer Sheath",
      standard: "IS 7098 Part 1",
      uom: "MTR"
    },
    nummCode: "NUMM-CBL-AL-3.5C185-1.1KV-AR",
    clusterId: "CLUST-CBL-001",
    stockQuantity: 3400,
    unitCostINR: 1120,
    status: "Harmonized",
    auditRef: "VAL-2026-102"
  },
  {
    id: "MAT-ONGC-CBL-185",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Offshore Asset",
    erpSystem: "SAP ECC",
    legacyCode: "ONGC-CBL-6712",
    rawDescription: "XLPE POWER CABLE 3.5C X 185 SQ MM AL ARMOURED 1.1KV IS 7098",
    category: "Cables & Electrical",
    extractedAttributes: {
      dimension: { nominal: "3.5Cx185", metric: "3.5C x 185 sqmm", imperial: "350 MCM eq." },
      metallurgy: "Aluminium / XLPE",
      pressureClass: "1.1 kV",
      construction: "Armoured Heavy Duty",
      standard: "IS 7098",
      uom: "MTR"
    },
    nummCode: "NUMM-CBL-AL-3.5C185-1.1KV-AR",
    clusterId: "CLUST-CBL-001",
    stockQuantity: 1900,
    unitCostINR: 1180,
    status: "Harmonized",
    auditRef: "VAL-2026-102"
  },

  // =========================================================================
  // STANDALONE CRITICAL SPARES
  // =========================================================================
  {
    id: "MAT-CPCL-PMP-SEAL",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CPCL-PMP-SEAL-01",
    rawDescription: "MECHANICAL CARTRIDGE SEAL 50MM FOR SULZER REFINERY PUMP API 682",
    category: "Pumps & Seals",
    extractedAttributes: {
      dimension: { nominal: "50MM-SHAFT", metric: "50mm Shaft Diameter", imperial: '2" Shaft' },
      metallurgy: "Silicon Carbide vs Carbon / Hastelloy C Springs",
      pressureClass: "Plan 53A Barrier Pressure 25 bar",
      construction: "Single Cartridge Seal",
      standard: "API 682 4th Edition",
      uom: "NOS"
    },
    nummCode: "NUMM-PMP-SEAL-DN50-API682",
    clusterId: null,
    stockQuantity: 6,
    unitCostINR: 145000,
    status: "Standalone",
    auditRef: "VAL-2026-118"
  },
  {
    id: "MAT-IOCL-PIP-P11",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Panipat Complex",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOCL-PIP-P11-4",
    rawDescription: "ALLOY STEEL PIPE 4 IN SCH 80 ASTM A335 GR.P11 SMLS",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm" },
      metallurgy: "1.25Cr-0.5Mo Alloy Steel (ASTM A335 Gr P11)",
      pressureClass: "SCH 80",
      construction: "Seamless High-Temp Service",
      standard: "ASME B36.10M / ASTM A335",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-P11-DN100-S80-SMLS",
    clusterId: null,
    stockQuantity: 310,
    unitCostINR: 14200,
    status: "Standalone",
    auditRef: "VAL-2026-122"
  },
  {
    id: "MAT-ONGC-FLG-RTJ",
    cpse: "ONGC",
    cpseFullName: "Oil and Natural Gas Corporation",
    plant: "Offshore Platform",
    erpSystem: "SAP ECC",
    legacyCode: "ONGC-FLG-RTJ-4-600",
    rawDescription: "4 INCH 600# RTJ WELD NECK FLANGE ASTM A105 CS",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm" },
      metallurgy: "ASTM A105 Forged Carbon Steel",
      pressureClass: "Class 600 (600#)",
      construction: "Ring Type Joint (RTJ)",
      standard: "ASME B16.5",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-A105-DN100-CL600-RTJ",
    clusterId: null,
    stockQuantity: 44,
    unitCostINR: 11800,
    status: "Standalone",
    auditRef: "VAL-2026-125"
  }
];

// =========================================================================
// INITIAL HUMAN-IN-THE-LOOP (HITL) QUEUE
// Spans 3 Configurable Routing Zones:
// 1. Strong Match (>=90%)
// 2. Needs Review Zone (70% - 89%) - Uncertain Cases
// 3. Unlikely Match (<70%)
// =========================================================================
export const INITIAL_HITL_QUEUE = [
  // 1. STRONG MATCH (>=90%) - High-Confidence Auto-Convergence Zone
  {
    queueId: "HITL-REQ-2026-001",
    candidatePair: {
      itemA: {
        cpse: "CPCL (Refining)",
        legacyCode: "CPCL-VLV-1042",
        erp: "SAP S/4HANA",
        description: "VLV BALL SS 2IN 150#",
        plant: "Manali Refinery"
      },
      itemB: {
        cpse: "IOCL (Petrochem)",
        legacyCode: "IOCL-M-88210",
        erp: "Oracle ERP Cloud",
        description: "Ball Valve | Stainless Steel | DN50 | Class 150",
        plant: "Panipat Complex"
      }
    },
    proposedNummCode: "NUMM-VLV-SS-DN50-CL150",
    confidenceScore: 0.98,
    routingTier: "STRONG_MATCH",
    routingZone: "Auto-Convergence Zone (≥90%)",
    status: "PENDING",
    aiRationale: "High-confidence physical equivalence (98% Multi-Factor Match): AI recognizes 2 inch ≈ DN50 (50mm nominal bore per ASME B16.34). Technical extraction verifies identical austenitic stainless steel metallurgy (SS) and ASME Class 150 pressure rating.",
    multiFactorScore: {
      compositeScore: 0.98,
      percentage: "98%",
      weights: { semantic: 0.20, technical: 0.35, unit: 0.25, category: 0.20 },
      formula: "Score = (0.20 × 0.94) + (0.35 × 1.00) + (0.25 × 0.98) + (0.20 × 1.00) = 97.6%"
    }
  },

  // 2. NEEDS REVIEW ZONE (70% - 89%) - Uncertain Case 1: High-Temp ASTM A53 vs A106 Gr B
  {
    queueId: "HITL-REQ-2026-002",
    candidatePair: {
      itemA: {
        cpse: "IOCL (Refining)",
        legacyCode: "IOC-P-6-40-A53",
        erp: "Oracle ERP Cloud",
        description: "PIPE CS 6 INCH SCH 40 ASTM A53 GRADE B SMLS BE",
        plant: "Mathura Refinery"
      },
      itemB: {
        cpse: "CPCL (Refining)",
        legacyCode: "CPCL-PIP-6-40-106",
        erp: "SAP S/4HANA",
        description: "PIPE CS DN150 SCH 40 ASTM A106 GR.B SMLS BE",
        plant: "Manali Refinery"
      }
    },
    proposedNummCode: "NUMM-PIP-CS-DN150-S40-SMLS",
    confidenceScore: 0.84,
    routingTier: "NEEDS_REVIEW",
    routingZone: "Needs Review Zone (70%–89%)",
    status: "PENDING",
    aiRationale: "Uncertain candidate match (84% Multi-Factor Match): Dimensional normalization verified (6\" = DN150 per ASME B36.10M, SCH 40). However, metallurgy exhibits grade divergence: ASTM A53 Gr B (general structural/utility) vs ASTM A106 Gr B (high-temperature crude service). Mandates physical PMI metallurgy testing and process temperature sign-off before master code consolidation.",
    multiFactorScore: {
      compositeScore: 0.84,
      percentage: "84%",
      weights: { semantic: 0.20, technical: 0.35, unit: 0.25, category: 0.20 },
      formula: "Score = (0.20 × 0.82) + (0.35 × 0.72) + (0.25 × 0.98) + (0.20 × 1.00) = 83.9%"
    }
  },

  // 3. NEEDS REVIEW ZONE (70% - 89%) - Uncertain Case 2: Bearing Seal Equivalent Tolerance
  {
    queueId: "HITL-REQ-2026-003",
    candidatePair: {
      itemA: {
        cpse: "ONGC (Offshore)",
        legacyCode: "ONGC-BRG-6205-Z",
        erp: "SAP ECC",
        description: "BALL BEARING 6205-ZZ METAL SHIELDED 25X52X15MM",
        plant: "Mumbai High"
      },
      itemB: {
        cpse: "CPCL (Refining)",
        legacyCode: "CPCL-BRG-6205-2RS",
        erp: "SAP S/4HANA",
        description: "BEARING RADIAL BALL 25MM BORE 52MM OD RUBBER SEALED 6205-2RS",
        plant: "Manali Refinery"
      }
    },
    proposedNummCode: "NUMM-BRG-100CR6-ID25OD52W15-REV",
    confidenceScore: 0.78,
    routingTier: "NEEDS_REVIEW",
    routingZone: "Needs Review Zone (70%–89%)",
    status: "PENDING",
    aiRationale: "Uncertain candidate match (78% Multi-Factor Match): Boundary dimensions are 100% identical (25x52x15mm per ISO 15). However, enclosure standard differs: ZZ (Non-contact metal dust shield for high-speed dry environment) vs 2RS (Contact nitrile rubber seal for moist/chemical washdown). Physical inspection of operating ambient environment required.",
    multiFactorScore: {
      compositeScore: 0.78,
      percentage: "78%",
      weights: { semantic: 0.20, technical: 0.35, unit: 0.25, category: 0.20 },
      formula: "Score = (0.20 × 0.75) + (0.35 × 0.68) + (0.25 × 1.00) + (0.20 × 1.00) = 77.8%"
    }
  },

  // 4. UNLIKELY MATCH (<70%) - Divergent Material Alert
  {
    queueId: "HITL-REQ-2026-004",
    candidatePair: {
      itemA: {
        cpse: "CPCL (Refining)",
        legacyCode: "CPCL-VLV-GT-04",
        erp: "SAP S/4HANA",
        description: "VALVE GATE 4 IN 150# WCB FLANGED OS&Y",
        plant: "Manali Refinery"
      },
      itemB: {
        cpse: "IOCL (Petrochem)",
        legacyCode: "IOCL-VLV-BL-02",
        erp: "Oracle ERP Cloud",
        description: "BALL VALVE 2 INCH 300# CF8M FLANGED",
        plant: "Panipat Complex"
      }
    },
    proposedNummCode: "NUMM-VLV-MISMATCH-DETECTED",
    confidenceScore: 0.52,
    routingTier: "UNLIKELY_MATCH",
    routingZone: "Unlikely Match Zone (<70%)",
    status: "PENDING",
    aiRationale: "Divergent candidate pair (52% Multi-Factor Match, Unlikely): Severe operational mismatch detected. Dimension mismatch (4\" vs 2\"), equipment mechanism mismatch (Gate vs Ball), metallurgy mismatch (Carbon Steel WCB vs Stainless CF8M), and pressure mismatch (150# vs 300#). Automatic rejection recommended.",
    multiFactorScore: {
      compositeScore: 0.52,
      percentage: "52%",
      weights: { semantic: 0.20, technical: 0.35, unit: 0.25, category: 0.20 },
      formula: "Score = (0.20 × 0.60) + (0.35 × 0.30) + (0.25 × 0.00) + (0.20 × 0.70) = 52.0%"
    }
  }
];

// =========================================================================
// INITIAL AUDIT TRAIL LOGS
// =========================================================================
export const INITIAL_AUDIT_LOG = [
  {
    auditRef: "VAL-2026-997",
    timestamp: "2026-09-28 14:22:10 IST",
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    legacyCodes: ["CPCL-PIP-4091 (CPCL)", "IOCL-P-55012 (IOCL)", "ONGC-P-4-80B (ONGC)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Er. K. Ramanathan (Reviewer / Approver, CPCL)",
    confidence: "96.8%",
    status: "Synchronized with SAP S/4HANA & Oracle Cloud"
  },
  {
    auditRef: "VAL-2026-996",
    timestamp: "2026-09-28 11:05:43 IST",
    nummCode: "NUMM-VLV-CF8M-DN50-CL300",
    legacyCodes: ["VLV-BL-2-300 (CPCL)", "IOC-VLV-50-300 (IOCL)", "ON-BV-DN50-300 (ONGC)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Smt. P. Sharma (Material Officer, IOCL)",
    confidence: "95.4%",
    status: "Synchronized with SAP S/4HANA & Oracle Cloud"
  },
  {
    auditRef: "VAL-2026-995",
    timestamp: "2026-09-27 16:48:19 IST",
    nummCode: "NUMM-GSK-SS316-DN80-CL150",
    legacyCodes: ["GSK-SPW-3-150 (CPCL)", "IOC-GSK-80-150 (IOCL)", "ON-GSK-3-150 (ONGC)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Er. V. Deshmukh (Platform Admin, ONGC)",
    confidence: "97.1%",
    status: "Synchronized with In-House ERP & SAP ECC"
  }
];
