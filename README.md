# National Unified Material Master (NUMM)
### AI-Powered Material Code Harmonization & Duplicate Elimination Platform
**Smart India Hackathon (SIH 2026) | Problem Statement: PS 26099**  
**Nodal Ministry:** Ministry of Petroleum & Natural Gas (MoPNG) | **Lead CPSE:** Chennai Petroleum Corporation Limited (CPCL)

---

## 📌 Executive Summary

India's central public sector enterprises (CPSEs) in the hydrocarbon sector—including **CPCL**, **IOCL**, **ONGC**, **GAIL**, and **HPCL**—manage millions of industrial inventory line items across distinct SAP S/4HANA, Oracle ERP, and legacy systems. Because each refinery and enterprise historically configured material descriptions with differing abbreviations, imperial/metric unit systems, and non-standard nomenclature, identical physical materials are assigned disparate internal material codes.

This fragmentation causes:
- **Redundant procurement tenders** for materials already sitting idle in sister CPSE warehouses.
- **Inflated working capital locked** in redundant safety stocks.
- **Costly refinery downtime** waiting for imported or long-lead items that could have been borrowed from an adjacent refinery.
- **Diminished volume discounts** due to fragmented procurement lots.

**NUMM (National Unified Material Master)** is an enterprise AI harmonization engine that ingests heterogeneous material records, standardizes dimensional and metallurgical attributes into canonical schema, detects cross-enterprise duplicates with high semantic confidence, and delivers an auditable Human-in-the-Loop (HITL) governance workflow with bidirectional ERP interoperability.

---

## 🏛️ Regulatory & Standards Compliance

| Domain | Standard / Guideline | Implementation in NUMM |
|---|---|---|
| **Data Quality** | **ISO 8000-110:2021** | Formal master data syntax, dictionary resolution, and semantic attribute validation |
| **Piping Standards** | **ASME B36.10M / B36.19M** | Imperial ($0.5''$–$48''$) to Metric ($15\,\text{mm}$–$1200\,\text{mm}$) and Nominal ($DN15$–$DN1200$) cross-mapping |
| **Metallurgy** | **ASTM / ASME Sec II** | Strict alloy equivalence (e.g., $SS304 \leftrightarrow 1.4301$, $A106\,\text{Gr B} \leftrightarrow A53\,\text{Gr B}$ conditional checks) |
| **Public Procurement** | **GFR 2017 & CVC Guidelines** | Immutable audit logs with timestamped approval IDs (`VAL-2026-XXXX`) for transparency |
| **Legal Branding** | **State Emblem of India Act, 2005** | Custom SVG Harmonization Crest used to respect statutory insignia guidelines |

---

## ⚡ Key Architectural Capabilities

### 1. Cross-CPSE Material Discovery
- Full-text semantic search clustering identical components across CPCL, IOCL, ONGC, GAIL, and HPCL.
- Visual CPSE presence badges, stock level aggregation, and unit cost comparisons.
- High-confidence duplicate flag indicators.

### 2. Multi-Dimensional Industrial NLP Engine
- Real-time rule-assisted and embedding-weighted attribute parser for raw industrial procurement text.
- Extracts **Component Class** (`PIP`, `VLV`, `FLG`, `GSK`, `FIT`, `MEC`), **Nominal Dimension** (`DN15`–`DN600`), **Metallurgy** (`CS106B`, `SS304`, `SS316L`, `WCB`), and **Pressure/Schedule** (`SCH40`, `CL150`, `CL300`, `CL600`).
- Generates canonical, unambiguous NUMM code syntax: `NUMM-[CAT]-[GRADE]-[DN]-[RATING]-[CONSTRUCTION]`.

### 3. Human-in-the-Loop (HITL) Governance Queue
- Critical plant engineering safety prevents blind automated merging.
- Pairs with confidence scores between $70\%$ and $95\%$ are flagged for review by Chief Materials Managers.
- Side-by-side attribute discrepancy comparison table with single-click Approval or Rejection.
- Commits generate immutable compliance audit records (`#VAL-2026-XXXX`) synchronized across all participating ERPs.

### 4. Inter-CPSE Inventory Pooling & ROI Capital Model
- Real-time dynamic calculator quantifying unlocked working capital:
  $$\text{Released Capital (₹ Cr)} = \sum (\text{Redundant Stock Units} \times \text{Avg Unit Cost}) \times \text{Holding Cost Factor}$$
- Tracks redundant tenders eliminated, downtime hours saved, and emergency transfer turnaround reduction.

### 5. Zero-Disruption Bidirectional ERP Integration
- Refinery plant engineers **do not need to abandon** their existing SAP S/4HANA or Oracle ERP material codes.
- NUMM acts as a universal bridge, maintaining 1:1 and 1:N mappings between legacy codes (`MAT-10452`, `M-77821`, `RM-2941`) and the canonical NUMM master code.
- Immediate CSV and JSON catalog exports ready for standard SAP IDoc and Oracle FBDI ingestion.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)

### Installation & Launch

1. Clone or navigate to the repository directory:
   ```bash
   cd sih-99-main
   ```

2. Install runtime dependencies:
   ```bash
   npm install
   ```

3. Launch the NUMM server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Sample Payload / Params |
|---|---|---|---|
| `GET` | `/api/materials` | Fetch full catalog with optional limit | `?limit=50` |
| `GET` | `/api/search` | Cross-CPSE semantic search | `?q=pipe+sch+40` |
| `POST` | `/api/extract` | Ingest raw material text & return attributes | `{"text": "PIPE CS SMLS SCH 40 2 INCH ASTM A106"}` |
| `POST` | `/api/match` | Calculate similarity between two items | `{"itemA": {...}, "itemB": {...}}` |
| `GET` | `/api/hitl/queue` | Retrieve pending governance queue items | None |
| `POST` | `/api/hitl/action` | Approve/Reject a candidate duplicate pair | `{"queueId": "HITL-REQ-2024-1001", "action": "APPROVE", "notes": "..."}` |
| `GET` | `/api/hitl/audit-log` | Retrieve immutable compliance audit trail | None |
| `GET` | `/api/analytics` | Summary of duplicates, clusters, and savings | None |
| `POST` | `/api/ingest` | Batch upload raw legacy records | `{"items": [...]}` |
| `GET` | `/api/export/csv` | Download CSV for SAP S/4HANA & Oracle ERP | None |
| `GET` | `/api/export/json` | Download JSON master data schema | None |

---

## 🎨 Enterprise UI & Motion Principles

The user interface follows strict Government & PSU enterprise standards:
- **No Disorienting Visuals:** Free from neon glows, high-frequency particle animations, and disruptive page shifts.
- **Enterprise Cadence:** 250–350ms subtle fade-in transitions with clean typography.
- **Single-Run Count-Up:** Real-time data cards smoothly count from 0 to live values once on viewport intersection.
- **Sequential AI Stepper:** Ingestion workflow clearly displays distinct operational stages:
  $$\text{Analyzing Description} \longrightarrow \text{Extracting Attributes} \longrightarrow \text{Searching Master Data} \longrightarrow \text{Match Verified}$$
- **Accessibility:** Full compliance with W3C `@media (prefers-reduced-motion: reduce)`.

---

## 👥 Hackathon Team Attribution
- **Event:** Smart India Hackathon (SIH 2026)
- **Problem Statement ID:** PS 26099
- **Domain:** Smart Automation / Enterprise Resource Harmonization
- **Participating CPSEs Simulated:** CPCL, IOCL, ONGC, GAIL, HPCL
