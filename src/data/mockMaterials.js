/**
 * PS 26099: National Unified Material Master (NUMM)
 * Industrial Master Material Repository & Sample Multi-CPSE Catalog
 */

export const INITIAL_MATERIALS = [
  // --- Cluster 1: Stainless Steel Pipes DN50 (2 Inch) SCH 40 ---
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
    auditRef: "VAL-2024-001"
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
    auditRef: "VAL-2024-001"
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
    auditRef: "VAL-2024-001"
  },

  // --- Cluster 2: Carbon Steel Seamless Pipe 4 Inch SCH 80 ---
  {
    id: "MAT-CPCL-20188",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "CS-PIP-4-80",
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
    auditRef: "VAL-2024-014"
  },
  {
    id: "MAT-GAIL-55410",
    cpse: "GAIL",
    cpseFullName: "GAIL (India) Limited",
    plant: "Pata Petrochemical Complex",
    erpSystem: "SAP S/4HANA",
    legacyCode: "GL-41092",
    rawDescription: "CARBON STEEL SEAMLESS LINE PIPE 100MM NB SCH80 A106-B",
    category: "Pipes & Tubes",
    extractedAttributes: {
      dimension: { nominal: "DN100", imperial: '4"', metric: "100 mm", outerDia: "114.3 mm" },
      metallurgy: "Carbon Steel (ASTM A106 Gr B)",
      pressureClass: "SCH 80",
      construction: "Seamless",
      endConnection: "Beveled End",
      standard: "ASME B36.10M / API 5L / ASTM A106",
      uom: "MTR"
    },
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    clusterId: "CLUST-PIP-002",
    stockQuantity: 890,
    unitCostINR: 6720,
    status: "Harmonized",
    auditRef: "VAL-2024-014"
  },
  {
    id: "MAT-HPCL-90812",
    cpse: "HPCL",
    cpseFullName: "Hindustan Petroleum Corporation Limited",
    plant: "Visakh Refinery, Visakhapatnam",
    erpSystem: "SAP S/4HANA",
    legacyCode: "HP-CS-100-80",
    rawDescription: "PIPE CS 100NB SCH-80 SMLS ASTM-A-106 GR-B",
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
    stockQuantity: 540,
    unitCostINR: 6850,
    status: "Harmonized",
    auditRef: "VAL-2024-014"
  },

  // --- Cluster 3: Ball Valve 2 Inch Class 300 Stainless Steel ---
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
    nummCode: "NUMM-VLV-BALL-CF8M-DN050-CL300-RF",
    clusterId: "CLUST-VLV-003",
    stockQuantity: 74,
    unitCostINR: 28500,
    status: "Harmonized",
    auditRef: "VAL-2024-042"
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
    nummCode: "NUMM-VLV-BALL-CF8M-DN050-CL300-RF",
    clusterId: "CLUST-VLV-003",
    stockQuantity: 42,
    unitCostINR: 27900,
    status: "Harmonized",
    auditRef: "VAL-2024-042"
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
    nummCode: "NUMM-VLV-BALL-CF8M-DN050-CL300-RF",
    clusterId: "CLUST-VLV-003",
    stockQuantity: 18,
    unitCostINR: 29100,
    status: "Harmonized",
    auditRef: "VAL-2024-042"
  },

  // --- Cluster 4: Spiral Wound Gasket 3 Inch Class 150 ---
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
      pressureClass: "Class 150 (150#)",
      construction: "Spiral Wound with Flexible Graphite filler",
      endConnection: "For ASME B16.5 RF Flanges",
      standard: "ASME B16.20",
      uom: "NOS"
    },
    nummCode: "NUMM-GSK-SPW-SS316-DN080-CL150-GRA",
    clusterId: "CLUST-GSK-004",
    stockQuantity: 380,
    unitCostINR: 620,
    status: "Harmonized",
    auditRef: "VAL-2024-089"
  },
  {
    id: "MAT-IOCL-GSK-312",
    cpse: "IOCL",
    cpseFullName: "Indian Oil Corporation Limited",
    plant: "Mathura Refinery",
    erpSystem: "Oracle ERP Cloud",
    legacyCode: "IOC-GSK-80-150",
    rawDescription: "GASKET METALLIC SPIRAL WOUND 80MM NB 150 LBS SS316/GRAPHITE CS RING",
    category: "Gaskets & Seals",
    extractedAttributes: {
      dimension: { nominal: "DN80", imperial: '3"', metric: "80 mm" },
      metallurgy: "SS 316 / Carbon Steel Guide Rings",
      pressureClass: "150 LBS",
      construction: "Spiral Wound Graphite Filled",
      endConnection: "RF Flange compatibility",
      standard: "ASME B16.20",
      uom: "NOS"
    },
    nummCode: "NUMM-GSK-SPW-SS316-DN080-CL150-GRA",
    clusterId: "CLUST-GSK-004",
    stockQuantity: 620,
    unitCostINR: 595,
    status: "Harmonized",
    auditRef: "VAL-2024-089"
  },

  // --- Cluster 5: Weld Neck Flange 6 Inch Class 300 Carbon Steel ---
  {
    id: "MAT-CPCL-FLG-630",
    cpse: "CPCL",
    cpseFullName: "Chennai Petroleum Corporation Limited",
    plant: "Manali Refinery, Chennai",
    erpSystem: "SAP S/4HANA",
    legacyCode: "FLG-WN-6-300",
    rawDescription: "FLANGE WNRF 6 IN 300# SCH 40 ASTM A105 ASME B16.5",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN150", imperial: '6"', metric: "150 mm" },
      metallurgy: "Forged Carbon Steel (ASTM A105)",
      pressureClass: "Class 300 (300#)",
      construction: "Weld Neck Raised Face (WNRF), SCH 40 bore",
      endConnection: "Buttweld / Flanged RF",
      standard: "ASME B16.5 / ASTM A105",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-WNRF-A105-DN150-CL300-S40",
    clusterId: "CLUST-FLG-005",
    stockQuantity: 145,
    unitCostINR: 7400,
    status: "Harmonized",
    auditRef: "VAL-2024-112"
  },
  {
    id: "MAT-HPCL-FLG-1503",
    cpse: "HPCL",
    cpseFullName: "Hindustan Petroleum Corporation Limited",
    plant: "Mumbai Refinery, Mahul",
    erpSystem: "SAP S/4HANA",
    legacyCode: "HP-FLG-150-300",
    rawDescription: "WELDING NECK FLANGE 150 NB 300 LBS RF BORE SCH40 A-105",
    category: "Flanges",
    extractedAttributes: {
      dimension: { nominal: "DN150", imperial: '6"', metric: "150 mm" },
      metallurgy: "ASTM A105 Carbon Steel",
      pressureClass: "300 LBS",
      construction: "Welding Neck RF, SCH 40",
      endConnection: "Flanged RF / Buttweld",
      standard: "ASME B16.5",
      uom: "NOS"
    },
    nummCode: "NUMM-FLG-WNRF-A105-DN150-CL300-S40",
    clusterId: "CLUST-FLG-005",
    stockQuantity: 98,
    unitCostINR: 7600,
    status: "Harmonized",
    auditRef: "VAL-2024-112"
  }
];

// Initial active HITL review items queue
export const INITIAL_HITL_QUEUE = [
  {
    queueId: "HITL-REQ-2024-998",
    candidatePair: {
      itemA: {
        cpse: "CPCL (Refining)",
        legacyCode: "MAT-10452",
        erp: "SAP S/4HANA",
        description: "SS PIPE 2 IN SCH 40 ASTM A312 TP304 SMLS",
        plant: "Manali Refinery"
      },
      itemB: {
        cpse: "IOCL (Petrochem)",
        legacyCode: "M-77821",
        erp: "Oracle ERP",
        description: "STAINLESS STEEL PIPE, 50mm, SCH40, TP304, SEAMLESS",
        plant: "Panipat Complex"
      }
    },
    proposedNummCode: "NUMM-PIP-SS304-DN050-S40-SMLS",
    confidenceScore: 0.963,
    status: "PENDING",
    aiRationale: "Exact match on metallurgical grade (TP304), dimensional equivalence (2.00\" = 50.8mm ≈ DN50 per ASME B36.19M), and pressure schedule (SCH40).",
    attributeComparison: {
      dimension: { itemA: '2" (Imperial)', itemB: "50mm (Metric)", match: "MATCH (DN50 Nominal)", score: 1.0 },
      metallurgy: { itemA: "ASTM A312 TP304", itemB: "TP304 Stainless", match: "MATCH (Austenitic 304)", score: 1.0 },
      schedule: { itemA: "SCH 40", itemB: "SCH 40", match: "EXACT MATCH", score: 1.0 },
      construction: { itemA: "Seamless (SMLS)", itemB: "Seamless", match: "EXACT MATCH", score: 1.0 }
    }
  },
  {
    queueId: "HITL-REQ-2024-999",
    candidatePair: {
      itemA: {
        cpse: "ONGC (Offshore)",
        legacyCode: "RM-VLV-150-CS",
        erp: "SAP ECC",
        description: "GATE VALVE 4 IN 150# OS&Y BB FLGD RF ASTM A216 WCB",
        plant: "Mumbai High Asset"
      },
      itemB: {
        cpse: "GAIL (Pipeline)",
        legacyCode: "GL-GT-100-150",
        erp: "SAP S/4HANA",
        description: "VALVE GATE 100MM CLASS 150 RF CAST CARBON STEEL A216-WCB TRIM 8",
        plant: "HVJ Pipeline Station"
      }
    },
    proposedNummCode: "NUMM-VLV-GATE-WCB-DN100-CL150-RF",
    confidenceScore: 0.948,
    status: "PENDING",
    aiRationale: "Identical body casting ASTM A216 WCB, pressure class ASME 150#, and dimensional correspondence (4\" = 100mm = DN100). API 600 / API 6D interchangeable.",
    attributeComparison: {
      dimension: { itemA: '4" (Imperial)', itemB: "100mm (Metric)", match: "MATCH (DN100)", score: 1.0 },
      metallurgy: { itemA: "ASTM A216 WCB", itemB: "A216-WCB Cast Steel", match: "EXACT MATCH", score: 1.0 },
      schedule: { itemA: "150# (Class 150)", itemB: "Class 150", match: "EXACT MATCH", score: 1.0 },
      construction: { itemA: "OS&Y Bolted Bonnet", itemB: "Trim 8 Universal", match: "COMPATIBLE", score: 0.9 }
    }
  },
  {
    queueId: "HITL-REQ-2024-1000",
    candidatePair: {
      itemA: {
        cpse: "HPCL (Refinery)",
        legacyCode: "HP-PMP-SEAL-53",
        erp: "SAP S/4HANA",
        description: "CARTRIDGE MECH SEAL PLAN 53A DUAL SEAL FOR SULZER PUMP 65MM",
        plant: "Vizag Refinery"
      },
      itemB: {
        cpse: "CPCL (Refinery)",
        legacyCode: "CP-SL-65-P53",
        erp: "SAP S/4HANA",
        description: "MECHANICAL SEAL DUAL CARTRIDGE API PLAN 53A SHAFT 65MM SIC/TC/FFKM",
        plant: "Manali Refinery"
      }
    },
    proposedNummCode: "NUMM-MEC-SEAL-P53A-S65-DUAL",
    confidenceScore: 0.912,
    status: "PENDING",
    aiRationale: "Both specify Dual Cartridge API 682 Plan 53A configuration with identical 65mm shaft diameter. Recommended for cross-refinery emergency stock sharing.",
    attributeComparison: {
      dimension: { itemA: "Shaft 65mm", itemB: "Shaft 65mm", match: "EXACT MATCH", score: 1.0 },
      metallurgy: { itemA: "Dual Cartridge", itemB: "SiC/TC/FFKM Faces", match: "HIGHLY COMPATIBLE", score: 0.88 },
      schedule: { itemA: "Plan 53A", itemB: "API Plan 53A", match: "EXACT MATCH", score: 1.0 },
      construction: { itemA: "Sulzer OEM Equivalent", itemB: "API 682 Standard", match: "EQUIVALENT", score: 0.85 }
    }
  },
  {
    queueId: "HITL-REQ-2024-1001",
    candidatePair: {
      itemA: {
        cpse: "IOCL (Refinery)",
        legacyCode: "M-PIP-CS-150-40",
        erp: "Oracle ERP",
        description: "PIPE CS 6 INCH SCH 40 SMLS ASTM A53 GRADE B",
        plant: "Koyali Refinery"
      },
      itemB: {
        cpse: "CPCL (Refining)",
        legacyCode: "CP-PIP-CS-DN150-40",
        erp: "SAP S/4HANA",
        description: "PIPE CS DN150 SCH 40 ASTM A106 GR.B SMLS",
        plant: "Manali Refinery"
      }
    },
    proposedNummCode: "NUMM-PIP-CS-DN150-S40-SMLS",
    confidenceScore: 0.842,
    status: "PENDING",
    aiRationale: "Dimensional (6\" = DN150) and schedule (SCH 40) match. Material grade distinction: ASTM A53 Gr B vs ASTM A106 Gr B (high temp). Requires engineering sign-off on operating temperature envelope.",
    attributeComparison: {
      dimension: { itemA: '6" (Imperial)', itemB: "DN150 (Nominal)", match: "MATCH (DN150)", score: 1.0 },
      metallurgy: { itemA: "ASTM A53 Grade B", itemB: "ASTM A106 Grade B", match: "NEAR-MATCH (Dual Certified Check Required)", score: 0.72 },
      schedule: { itemA: "SCH 40", itemB: "SCH 40", match: "EXACT MATCH", score: 1.0 },
      construction: { itemA: "Seamless", itemB: "Seamless", match: "EXACT MATCH", score: 1.0 }
    }
  }
];

// Initial audit trail records
export const INITIAL_AUDIT_LOG = [
  {
    auditRef: "VAL-2024-997",
    timestamp: "2026-09-28 14:22:10 IST",
    nummCode: "NUMM-PIP-CS106B-DN100-S80-SMLS",
    legacyCodes: ["CS-PIP-4-80 (CPCL)", "GL-41092 (GAIL)", "HP-CS-100-80 (HPCL)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Er. K. Ramanathan (Chief Materials Manager, CPCL)",
    confidence: "96.8%",
    status: "Synchronized with SAP S/4HANA & Oracle"
  },
  {
    auditRef: "VAL-2024-996",
    timestamp: "2026-09-28 11:05:43 IST",
    nummCode: "NUMM-VLV-BALL-CF8M-DN050-CL300-RF",
    legacyCodes: ["VLV-BL-2-300 (CPCL)", "IOC-VLV-50-300 (IOCL)", "ON-BV-DN50-300 (ONGC)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Smt. P. Sharma (DGM Procurement, IOCL)",
    confidence: "95.4%",
    status: "Synchronized with SAP S/4HANA & Oracle"
  },
  {
    auditRef: "VAL-2024-995",
    timestamp: "2026-09-27 16:48:19 IST",
    nummCode: "NUMM-GSK-SPW-SS316-DN080-CL150-GRA",
    legacyCodes: ["GSK-SPW-3-150 (CPCL)", "IOC-GSK-80-150 (IOCL)"],
    action: "APPROVED_AND_COMMITTED",
    officer: "Er. V. Deshmukh (Superintending Engineer, ONGC)",
    confidence: "97.1%",
    status: "Synchronized with In-House ERP"
  }
];
