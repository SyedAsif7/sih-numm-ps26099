import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { catalogService } from './src/services/catalogService.js';
import { extractAttributes, calculateMatchConfidence } from './src/services/aiEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets directory and root
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(__dirname));
app.use(express.static(__dirname));

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Search materials across CPSEs with cluster grouping
app.get('/api/search', (req, res) => {
  try {
    const query = req.query.q || '';
    const results = catalogService.search(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get full materials catalog
app.get('/api/materials', (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const items = catalogService.getMaterials(limit);
    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. AI NLP Attribute Extraction from raw text
app.post('/api/extract', (req, res) => {
  try {
    const raw = req.body.text || req.body.description;
    if (!raw) {
      return res.status(400).json({ error: "Text or description payload required" });
    }
    const extracted = extractAttributes(raw);
    res.json(extracted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Calculate Match Confidence between two items
app.post('/api/match', (req, res) => {
  try {
    const { itemA, itemB } = req.body;
    if (!itemA || !itemB) {
      return res.status(400).json({ error: "itemA and itemB required" });
    }
    const comparison = calculateMatchConfidence(itemA, itemB);
    res.json(comparison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4B. Interactive End-to-End Pair Harmonization Showcase
app.post('/api/harmonize-pair', (req, res) => {
  try {
    const { recordA, recordB, cpseA = "CPCL", cpseB = "IOCL" } = req.body;
    if (!recordA || !recordB) {
      return res.status(400).json({ error: "recordA and recordB required" });
    }
    const attrA = extractAttributes(recordA);
    const attrB = extractAttributes(recordB);
    const comparison = calculateMatchConfidence({ extractedAttributes: attrA }, { extractedAttributes: attrB });
    
    res.json({
      success: true,
      recordA: { cpse: cpseA, raw: recordA, attributes: attrA },
      recordB: { cpse: cpseB, raw: recordB, attributes: attrB },
      match: comparison,
      canonicalNummCode: attrA.nummCode || attrB.nummCode,
      suggestedMapping: [
        { cpse: cpseA, legacyText: recordA, canonicalCode: attrA.nummCode || attrB.nummCode },
        { cpse: cpseB, legacyText: recordB, canonicalCode: attrA.nummCode || attrB.nummCode }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get active HITL queue
app.get('/api/hitl/queue', (req, res) => {
  try {
    const queue = catalogService.getHitlQueue();
    res.json({ count: queue.length, queue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Process HITL action (APPROVE / REJECT)
app.post('/api/hitl/action', (req, res) => {
  try {
    const { queueId, action, notes, officer, proposedNummCode, candidatePair } = req.body;
    if (!queueId || !action) {
      return res.status(400).json({ error: "queueId and action required" });
    }
    const result = catalogService.processHitlAction({ queueId, action, notes, officer, proposedNummCode, candidatePair });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 7. Get full Audit Log
app.get('/api/hitl/audit-log', (req, res) => {
  try {
    const logs = catalogService.getAuditLog();
    res.json({ count: logs.length, logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Analytics & Financial Savings Metrics
app.get('/api/analytics', (req, res) => {
  try {
    const analytics = catalogService.getAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Ingest new raw material records (from CSV or JSON array)
app.post('/api/ingest', (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Array of items required" });
    }
    const results = catalogService.ingestItems(items);
    res.json({ count: results.length, results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Export harmonized catalog as CSV
app.get('/api/export/csv', (req, res) => {
  try {
    const csvContent = catalogService.exportToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="NUMM_Unified_Master_Catalog.csv"');
    res.status(200).send(csvContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10B. Export Executive Harmonization Reduction Report as CSV
app.get('/api/export/harmonization-report', (req, res) => {
  try {
    const csvContent = catalogService.exportHarmonizationReportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="NUMM_Harmonization_Reduction_Report.csv"');
    res.status(200).send(csvContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Export harmonized catalog as JSON (SAP / Oracle bridge)
app.get('/api/export/json', (req, res) => {
  try {
    const items = catalogService.getMaterials(500);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="NUMM_SAP_Oracle_Sync.json"');
    res.json({
      system: "NUMM-National-Master",
      exportedAt: new Date().toISOString(),
      schemaVersion: "2024.1",
      syncStandard: "ISO 8000 / ASME B31.3",
      records: items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA / static fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
