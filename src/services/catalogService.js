/**
 * PS 26099: National Unified Material Master (NUMM)
 * Master Catalog Service, HITL Governance State & Analytics Engine
 */

import { INITIAL_MATERIALS, INITIAL_HITL_QUEUE, INITIAL_AUDIT_LOG } from '../data/mockMaterials.js';
import { extractAttributes, calculateMatchConfidence, searchMaterials } from './aiEngine.js';

class CatalogService {
  constructor() {
    this.materials = [...INITIAL_MATERIALS];
    this.hitlQueue = [...INITIAL_HITL_QUEUE];
    this.auditLog = [...INITIAL_AUDIT_LOG];
    this.stats = {
      baseMaterialsCount: 128450,
      baseDuplicatesCount: 9342,
      baseClustersCount: 2117,
      savingsCrores: 48.75 // ₹48.75 Crores unlocked capital
    };
  }

  // Get full materials list
  getMaterials(limit = 100) {
    return this.materials.slice(0, limit);
  }

  // Search materials and cluster cross-CPSE equivalents
  search(query = "") {
    const rawMatches = searchMaterials(query, this.materials);

    // Group matches by clusterId
    const clusterMap = new Map();
    const standalone = [];

    for (const item of rawMatches) {
      if (item.clusterId) {
        if (!clusterMap.has(item.clusterId)) {
          clusterMap.set(item.clusterId, {
            clusterId: item.clusterId,
            nummCode: item.nummCode,
            standardizedSpec: `${item.category} • ${item.extractedAttributes?.dimension?.nominal || ''} • ${item.extractedAttributes?.pressureClass || ''} • ${item.extractedAttributes?.metallurgy || ''}`,
            category: item.category,
            items: []
          });
        }
        clusterMap.get(item.clusterId).items.push(item);
      } else {
        standalone.push(item);
      }
    }

    return {
      query,
      totalMatched: rawMatches.length,
      clusters: Array.from(clusterMap.values()),
      standalone
    };
  }

  // Get single material by ID or legacy code
  getMaterialById(idOrCode) {
    return this.materials.find(
      m => m.id === idOrCode || m.legacyCode.toLowerCase() === idOrCode.toLowerCase()
    );
  }

  // Get active HITL queue
  getHitlQueue() {
    return this.hitlQueue.filter(item => item.status === "PENDING");
  }

  // Get full audit log
  getAuditLog() {
    return this.auditLog;
  }

  // Process human-in-the-loop governance decision
  processHitlAction({ queueId, action, notes, officer = "Er. S. Venkatraman (Executive Director - Materials, CPCL)" }) {
    const itemIndex = this.hitlQueue.findIndex(q => q.queueId === queueId);
    if (itemIndex === -1) {
      throw new Error(`Queue item ${queueId} not found`);
    }

    const item = this.hitlQueue[itemIndex];
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST';
    const auditRef = `VAL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (action === "APPROVE") {
      item.status = "APPROVED";
      item.auditRef = auditRef;
      item.approvedBy = officer;
      item.approvedAt = timestamp;

      // Add to audit trail
      this.auditLog.unshift({
        auditRef,
        timestamp,
        nummCode: item.proposedNummCode,
        legacyCodes: [
          `${item.candidatePair.itemA.legacyCode} (${item.candidatePair.itemA.cpse})`,
          `${item.candidatePair.itemB.legacyCode} (${item.candidatePair.itemB.cpse})`
        ],
        action: "APPROVED_AND_COMMITTED",
        officer,
        confidence: `${Math.round(item.confidenceScore * 100)}%`,
        status: "Active in Unified Master Catalog",
        notes: notes || item.aiRationale
      });

      // Update analytics counters
      this.stats.baseClustersCount += 1;
      this.stats.savingsCrores += 0.85; // Est. ₹85 Lakhs saved per harmonized procurement item

      return {
        success: true,
        message: `Mapping successfully approved and committed to National Catalog under ${item.proposedNummCode}`,
        auditRef,
        queueId,
        action
      };
    } else if (action === "REJECT") {
      item.status = "REJECTED";
      item.rejectedBy = officer;
      item.rejectedAt = timestamp;

      this.auditLog.unshift({
        auditRef,
        timestamp,
        nummCode: "N/A - REJECTED",
        legacyCodes: [
          `${item.candidatePair.itemA.legacyCode} (${item.candidatePair.itemA.cpse})`,
          `${item.candidatePair.itemB.legacyCode} (${item.candidatePair.itemB.cpse})`
        ],
        action: "FLAGGED_FOR_ENGINEERING_REVIEW",
        officer,
        confidence: `${Math.round(item.confidenceScore * 100)}%`,
        status: "Flagged for Physical Inspection",
        notes: notes || "Rejected by domain specialist due to operational parameter mismatch."
      });

      return {
        success: true,
        message: `Candidate pair flagged for engineering clarification. No changes committed.`,
        auditRef,
        queueId,
        action
      };
    }

    throw new Error(`Unsupported action ${action}`);
  }

  // Get dynamic analytics and procurement savings metrics
  getAnalytics() {
    const pendingHitlCount = this.getHitlQueue().length;
    const harmonizedClustersCount = this.stats.baseClustersCount;

    // Financial ROI calculation
    const avgStockHoldingPerDuplicate = 425000; // ₹4.25 Lakhs per duplicate line item
    const duplicateLinesHarmonized = this.stats.baseDuplicatesCount;
    const workingCapitalReleasedCr = Number(((duplicateLinesHarmonized * avgStockHoldingPerDuplicate * 0.12) / 10000000).toFixed(2));
    const redundantTendersAvoided = Math.round(duplicateLinesHarmonized * 0.28);
    const emergencyDowntimeHoursSaved = Math.round(duplicateLinesHarmonized * 1.8);

    return {
      materialsAnalysed: this.stats.baseMaterialsCount + this.materials.length - INITIAL_MATERIALS.length,
      potentialDuplicates: this.stats.baseDuplicatesCount,
      equivalentGroups: harmonizedClustersCount,
      pendingValidation: pendingHitlCount,
      accuracyConfidence: "96.4%",
      traceabilitySync: "100%",
      financialImpact: {
        workingCapitalReleasedCr: (workingCapitalReleasedCr + this.stats.savingsCrores).toFixed(2),
        redundantTendersAvoided: redundantTendersAvoided + 24,
        emergencyDowntimeHoursSaved: emergencyDowntimeHoursSaved + 180,
        averageCycleReductionDays: 34
      }
    };
  }

  // Ingest raw data rows or text items
  ingestItems(rawList = []) {
    const results = [];

    for (const raw of rawList) {
      const extracted = extractAttributes(raw.description || raw.rawDescription || raw);
      const cpse = raw.cpse || "CPCL (Testing Plant)";
      const legacyCode = raw.legacyCode || `MAT-${Math.floor(10000 + Math.random() * 90000)}`;
      const erp = raw.erp || "SAP S/4HANA";
      const plant = raw.plant || "Plant Yard 4";

      // Check if matches an existing cluster in our catalog
      let bestClusterId = null;
      let highestSim = 0;

      for (const existing of this.materials) {
        const sim = calculateMatchConfidence({ extractedAttributes: extracted }, existing);
        if (sim.confidence > highestSim && sim.confidence >= 0.85) {
          highestSim = sim.confidence;
          bestClusterId = existing.clusterId;
        }
      }

      if (!bestClusterId) {
        bestClusterId = `CLUST-${extracted.component.code}-${Math.floor(100 + Math.random() * 900)}`;
      }

      const newRecord = {
        id: `MAT-${cpse.substring(0, 4)}-${Math.floor(10000 + Math.random() * 90000)}`,
        cpse,
        cpseFullName: cpse,
        plant,
        erpSystem: erp,
        legacyCode,
        rawDescription: raw.description || raw.rawDescription || String(raw),
        category: extracted.component.category,
        extractedAttributes: {
          dimension: extracted.dimension,
          metallurgy: extracted.metallurgy.label,
          pressureClass: extracted.pressure.label,
          construction: extracted.construction,
          standard: "ASME / ASTM Unified",
          uom: raw.uom || "NOS"
        },
        nummCode: extracted.nummCode,
        clusterId: bestClusterId,
        stockQuantity: Number(raw.stockQuantity) || Math.floor(10 + Math.random() * 150),
        unitCostINR: Number(raw.unitCostINR) || Math.floor(1500 + Math.random() * 12000),
        status: "Harmonized",
        auditRef: `VAL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
      };

      this.materials.push(newRecord);
      results.push({
        record: newRecord,
        matchConfidence: highestSim > 0 ? `${Math.round(highestSim * 100)}%` : "New Standard Baseline",
        extracted
      });
    }

    return results;
  }

  // Export catalog to CSV
  exportToCsv() {
    const headers = [
      "UNIFIED_NUMM_CODE",
      "CLUSTER_ID",
      "CPSE_ORG",
      "LEGACY_MATERIAL_CODE",
      "ERP_SYSTEM",
      "RAW_DESCRIPTION",
      "CATEGORY",
      "METALLURGY",
      "NOMINAL_DIMENSION",
      "PRESSURE_CLASS",
      "STOCK_QTY",
      "EST_UNIT_COST_INR",
      "AUDIT_REF"
    ];

    const rows = this.materials.map(m => [
      `"${m.nummCode}"`,
      `"${m.clusterId}"`,
      `"${m.cpse}"`,
      `"${m.legacyCode}"`,
      `"${m.erpSystem}"`,
      `"${m.rawDescription.replace(/"/g, '""')}"`,
      `"${m.category}"`,
      `"${m.extractedAttributes?.metallurgy || ''}"`,
      `"${m.extractedAttributes?.dimension?.nominal || ''}"`,
      `"${m.extractedAttributes?.pressureClass || ''}"`,
      m.stockQuantity,
      m.unitCostINR,
      `"${m.auditRef || ''}"`
    ]);

    return [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  }
}

export const catalogService = new CatalogService();
