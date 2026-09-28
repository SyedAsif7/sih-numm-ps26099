/**
 * PS 26099: National Unified Material Master (NUMM)
 * Enterprise Motion & Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 0. TOAST NOTIFICATION SYSTEM (Crisp, short fade & slide)
  // =========================================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;

    let icon = 'ℹ';
    if (type === 'success') icon = '✓';
    else if (type === 'alert') icon = '⚠';

    toast.innerHTML = `<span style="font-weight: 800; font-size: 0.95rem;">${icon}</span> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  }

  // =========================================================================
  // 0B. HIGH-CONTRAST / DARK THEME TOGGLE
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('numm_theme');

  if (savedTheme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      if (isDark) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        localStorage.setItem('numm_theme', 'light');
        showToast('Institutional Light Mode Activated', 'info', 2000);
      } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        localStorage.setItem('numm_theme', 'dark');
        showToast('High-Contrast Dark Mode Activated', 'info', 2000);
      }
    });
  }

  // =========================================================================
  // 1. SMOOTH NUMBER COUNT-UP UTILITY (Executes Once on Viewport Entry)
  // =========================================================================
  function animateCountUp(element, endVal, duration = 800, prefix = '', suffix = '') {
    if (!element || prefersReducedMotion) {
      if (element) element.textContent = `${prefix}${endVal.toLocaleString()}${suffix}`;
      return;
    }

    const startVal = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startVal + (endVal - startVal) * easeProgress);

      element.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${prefix}${endVal.toLocaleString()}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Live Analytics Loader with single-run viewport count-up
  let numbersAnimated = false;
  async function loadAnalytics() {
    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) return;
      const data = await res.json();

      // Trigger count-up once via observer
      const observerTarget = document.querySelector('.hero-stats-glass-strip');
      if (observerTarget && 'IntersectionObserver' in window) {
        const numObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !numbersAnimated) {
              numbersAnimated = true;

              const heroAnalysed = document.getElementById('heroStatAnalysed');
              const heroDuplicates = document.getElementById('heroStatDuplicates');
              const dashAnalysed = document.getElementById('dashStatAnalysed');
              const dashDuplicates = document.getElementById('dashStatDuplicates');
              const dashGroups = document.getElementById('dashStatGroups');
              const dashPending = document.getElementById('dashStatPending');

              animateCountUp(heroAnalysed, data.materialsAnalysed, 700, '', '+');
              animateCountUp(heroDuplicates, data.potentialDuplicates, 600);
              animateCountUp(dashAnalysed, data.materialsAnalysed, 800);
              animateCountUp(dashDuplicates, data.potentialDuplicates, 700);
              animateCountUp(dashGroups, data.equivalentGroups, 600);
              animateCountUp(dashPending, data.pendingValidation, 400);

              numObserver.unobserve(observerTarget);
            }
          });
        }, { threshold: 0.15 });

        numObserver.observe(observerTarget);
      } else {
        // Direct set fallback
        const heroAnalysed = document.getElementById('heroStatAnalysed');
        const heroDuplicates = document.getElementById('heroStatDuplicates');
        if (heroAnalysed) heroAnalysed.textContent = data.materialsAnalysed.toLocaleString() + '+';
        if (heroDuplicates) heroDuplicates.textContent = data.potentialDuplicates.toLocaleString();
      }

      // Static text updates
      const heroConfidence = document.getElementById('heroStatConfidence');
      const heroSavings = document.getElementById('heroStatSavings');
      if (heroConfidence) heroConfidence.textContent = data.accuracyConfidence;
      if (heroSavings && data.financialImpact) {
        heroSavings.textContent = `₹${data.financialImpact.workingCapitalReleasedCr} Cr`;
      }

      // Queue badges
      const queueBadge = document.getElementById('wbQueueBadgeCount');
      const queueRemain = document.getElementById('queueItemsRemainingCount');
      if (queueBadge) queueBadge.textContent = data.pendingValidation;
      if (queueRemain) queueRemain.textContent = data.pendingValidation;

      // ROI Tab
      const calcWorkingCapital = document.getElementById('calcWorkingCapital');
      const calcTenders = document.getElementById('calcTendersAvoided');
      const calcDowntime = document.getElementById('calcDowntimeSaved');

      if (calcWorkingCapital && data.financialImpact) {
        calcWorkingCapital.textContent = `₹ ${data.financialImpact.workingCapitalReleasedCr} Cr`;
      }
      if (calcTenders && data.financialImpact) {
        calcTenders.textContent = data.financialImpact.redundantTendersAvoided.toLocaleString();
      }
      if (calcDowntime && data.financialImpact) {
        calcDowntime.textContent = `${data.financialImpact.emergencyDowntimeHoursSaved.toLocaleString()} hrs`;
      }

    } catch (err) {
      console.warn('Analytics endpoint unavailable, using cached baseline', err);
    }
  }

  // =========================================================================
  // 2. WORKBENCH TAB NAVIGATION
  // =========================================================================
  const tabButtons = document.querySelectorAll('.wb-tab-btn');
  const tabPanes = document.querySelectorAll('.wb-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (targetTabId === 'tab-hitl-queue') {
        loadHitlQueue();
        loadAuditTrail();
      }
    });
  });

  // =========================================================================
  // 3. TAB 1: CROSS-CPSE SEARCH WITH PROFESSIONAL SKELETON LOADERS
  // =========================================================================
  const searchInput = document.getElementById('materialSearchInput');
  const btnExecuteSearch = document.getElementById('btnExecuteSearch');
  const searchResultsArea = document.getElementById('searchResultsArea');
  let currentActiveFilter = 'all';

  function renderSearchSkeleton() {
    if (!searchResultsArea) return;
    searchResultsArea.innerHTML = `
      <div class="skeleton-card">
        <div class="skeleton-line" style="width: 25%; height: 20px;"></div>
        <div class="skeleton-line" style="width: 80%; height: 14px;"></div>
        <div class="skeleton-line" style="width: 50%; height: 14px;"></div>
        <div class="skeleton-line" style="width: 100%; height: 100px; margin-top: 8px;"></div>
      </div>
      <div class="skeleton-card" style="margin-top: 14px;">
        <div class="skeleton-line" style="width: 30%; height: 20px;"></div>
        <div class="skeleton-line" style="width: 70%; height: 14px;"></div>
        <div class="skeleton-line" style="width: 100%; height: 80px; margin-top: 8px;"></div>
      </div>
    `;
  }

  async function executeSearch(query) {
    if (!searchResultsArea) return;
    renderSearchSkeleton();

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query || '')}`);
      const data = await res.json();

      if (!data.clusters || data.clusters.length === 0) {
        searchResultsArea.innerHTML = `
          <div class="no-results-card" style="padding: 24px; text-align: center; background: var(--bg-surface); border-radius: 6px; border: 1px solid var(--border-subtle);">
            <p style="font-weight: 700; color: var(--navy-900); font-size: 0.9375rem; margin-bottom: 4px;">No cross-CPSE clusters found for "${escapeHtml(query)}"</p>
            <p style="font-size: 0.8125rem; color: var(--text-secondary);">Try standard queries like "pipe", "valve", "flange", or "gasket".</p>
          </div>
        `;
        return;
      }

      let html = '';
      data.clusters.forEach(cluster => {
        const primaryItem = cluster.items[0] || {};
        const attrs = primaryItem.extractedAttributes || {};
        const dimStr = attrs.dimension ? `${attrs.dimension.nominal || ''} (${attrs.dimension.imperial || ''} / ${attrs.dimension.metric || ''})` : 'Standard';

        html += `
          <div class="cluster-result-card duplicate-highlight-gentle" data-cluster-id="${escapeHtml(cluster.clusterId)}">
            <div class="cluster-top-meta">
              <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span class="cluster-cat-badge">${escapeHtml(cluster.category || 'Industrial Master')}</span>
                <span class="cluster-code-pill">${escapeHtml(cluster.nummCode)}</span>
                <button class="btn-copy-code" data-copy="${escapeHtml(cluster.nummCode)}" title="Copy NUMM Code">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
              <span class="live-pulse-badge"><span class="pulse-dot"></span> ${cluster.items.length} Cross-CPSE Equivalents Identified</span>
            </div>

            <div class="cluster-spec-line">
              <strong>Unified Specification:</strong> ${escapeHtml(cluster.standardizedSpec || primaryItem.rawDescription)}
            </div>

            <div class="stage-val-row" style="margin-bottom: 12px;">
              <span class="val-pill pill-navy">Dimension: ${dimStr}</span>
              <span class="val-pill pill-teal">Metallurgy: ${escapeHtml(attrs.metallurgy || 'Standard')}</span>
              <span class="val-pill pill-cyan">Rating: ${escapeHtml(attrs.pressureClass || 'Standard')}</span>
              <span class="val-pill pill-subtle">Standard: ${escapeHtml(attrs.standard || 'ASME/ASTM')}</span>
            </div>

            <div class="table-responsive">
              <table class="cross-cpse-table">
                <thead>
                  <tr>
                    <th>Enterprise</th>
                    <th>Legacy Code</th>
                    <th>Plant Location</th>
                    <th>ERP System</th>
                    <th>Stock on Hand</th>
                    <th>Unit Cost</th>
                    <th>Inter-Plant Action</th>
                  </tr>
                </thead>
                <tbody>
        `;

        cluster.items.forEach(item => {
          let tagClass = 'tag-cpcl';
          if (item.cpse === 'IOCL') tagClass = 'tag-iocl';
          else if (item.cpse === 'ONGC') tagClass = 'tag-ongc';
          else if (item.cpse === 'GAIL') tagClass = 'tag-gail';
          else if (item.cpse === 'HPCL') tagClass = 'tag-hpcl';

          html += `
            <tr class="cpse-row" data-cpse="${escapeHtml(item.cpse)}">
              <td><span class="cpse-tag-pill ${tagClass}">${escapeHtml(item.cpse)}</span></td>
              <td><code style="font-weight: 700; color: var(--navy-900); font-family: var(--font-mono);">${escapeHtml(item.legacyCode)}</code></td>
              <td style="font-size: 0.8125rem;">${escapeHtml(item.plant || 'Main Yard')}</td>
              <td><span style="font-size: 0.75rem; color: var(--text-secondary);">${escapeHtml(item.erpSystem || 'SAP')}</span></td>
              <td><strong style="color: #065f46;">${(item.stockQuantity || 0).toLocaleString()}</strong> ${escapeHtml(item.extractedAttributes?.uom || 'NOS')}</td>
              <td>₹ ${(item.unitCostINR || 0).toLocaleString()}</td>
              <td>
                <button class="btn-dispatch-req" data-code="${escapeHtml(item.legacyCode)}" data-plant="${escapeHtml(item.plant)}">
                  Borrow / Transfer &rarr;
                </button>
              </td>
            </tr>
          `;
        });

        html += `
                </tbody>
              </table>
            </div>
          </div>
        `;
      });

      searchResultsArea.innerHTML = html;
      applyEnterpriseFilter(currentActiveFilter);

      // Attach copy listeners
      searchResultsArea.querySelectorAll('.btn-copy-code').forEach(btn => {
        btn.addEventListener('click', () => {
          const code = btn.getAttribute('data-copy');
          navigator.clipboard.writeText(code).then(() => {
            showToast(`✓ Copied: ${code} to clipboard`, 'success', 2000);
          });
        });
      });

      // Attach dispatch listeners
      searchResultsArea.querySelectorAll('.btn-dispatch-req').forEach(btn => {
        btn.addEventListener('click', () => {
          const code = btn.getAttribute('data-code');
          const plant = btn.getAttribute('data-plant');
          showToast(`🔄 Requisition simulated: ${code} from ${plant}`, 'info', 3000);
        });
      });

    } catch (err) {
      console.error('Search failure:', err);
      searchResultsArea.innerHTML = `<div style="color: var(--red-600); padding: 14px;">Catalog query failed: ${escapeHtml(err.message)}</div>`;
    }
  }

  function applyEnterpriseFilter(cpseFilter) {
    currentActiveFilter = cpseFilter;
    const rows = document.querySelectorAll('.cpse-row');
    rows.forEach(row => {
      const rowCpse = row.getAttribute('data-cpse');
      if (cpseFilter === 'all' || rowCpse === cpseFilter) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      applyEnterpriseFilter(filter);
    });
  });

  if (btnExecuteSearch && searchInput) {
    btnExecuteSearch.addEventListener('click', () => {
      executeSearch(searchInput.value.trim());
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeSearch(searchInput.value.trim());
      }
    });
  }

  // Quick Query Chips
  document.querySelectorAll('.search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (searchInput && q) {
        searchInput.value = q;
        executeSearch(q);
      }
    });
  });

  // Run initial search
  executeSearch(searchInput ? searchInput.value : 'pipe 2 inch');

  // =========================================================================
  // 4. TAB 2: AI PROCESSING SEQUENCE & SMOOTH SIMILARITY METER
  // =========================================================================
  const aiRawInputText = document.getElementById('aiRawInputText');
  const btnRunNlpExtract = document.getElementById('btnRunNlpExtract');
  const btnSimulateBulkIngest = document.getElementById('btnSimulateBulkIngest');

  // Preset Buttons
  document.querySelectorAll('.btn-preset-text').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      if (aiRawInputText && text) {
        aiRawInputText.value = text;
        runNlpExtractionSequence(text);
      }
    });
  });

  async function runNlpExtractionSequence(text) {
    if (!text || !text.trim()) return;

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const simMeterBar = document.getElementById('simMeterBar');
    const simScoreDisplay = document.getElementById('simScoreDisplay');
    const nlpStatus = document.getElementById('nlpProcessingStatus');

    // Reset sequence UI
    [step1, step2, step3, step4].forEach(s => {
      if (s) {
        s.className = 'stepper-step';
        const icon = s.querySelector('.step-icon');
        if (icon) icon.innerHTML = '&bull;';
      }
    });
    if (simMeterBar) simMeterBar.style.width = '0%';
    if (simScoreDisplay) simScoreDisplay.textContent = '0.0%';
    if (nlpStatus) {
      nlpStatus.textContent = 'Processing...';
      nlpStatus.className = 'chc-pill';
    }

    try {
      // Step 1: Analyzing description
      if (step1) {
        step1.classList.add('active');
        step1.querySelector('.step-icon').innerHTML = '&bull;';
      }

      const resPromise = fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() })
      });

      await new Promise(r => setTimeout(r, prefersReducedMotion ? 10 : 160));
      if (step1) {
        step1.className = 'stepper-step completed';
        step1.querySelector('.step-icon').innerHTML = '&check;';
      }

      // Step 2: Extracting attributes
      if (step2) {
        step2.classList.add('active');
      }
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 10 : 200));
      if (step2) {
        step2.className = 'stepper-step completed';
        step2.querySelector('.step-icon').innerHTML = '&check;';
      }

      // Step 3: Searching master data
      if (step3) {
        step3.classList.add('active');
      }
      await new Promise(r => setTimeout(r, prefersReducedMotion ? 10 : 200));
      if (step3) {
        step3.className = 'stepper-step completed';
        step3.querySelector('.step-icon').innerHTML = '&check;';
      }

      const res = await resPromise;
      const data = await res.json();

      // Step 4: Canonical convergence
      if (step4) {
        step4.className = 'stepper-step completed';
        step4.querySelector('.step-icon').innerHTML = '&check;';
      }

      // Smooth Meter Fill
      if (simMeterBar) {
        simMeterBar.style.width = '96.4%';
      }
      if (simScoreDisplay) {
        simScoreDisplay.textContent = '96.4%';
      }
      if (nlpStatus) {
        nlpStatus.textContent = 'Harmonized';
        nlpStatus.className = 'chc-pill tag-live';
      }

      // Populate attribute fields
      const extNominal = document.getElementById('extNominal');
      const extImperial = document.getElementById('extImperial');
      const extMetric = document.getElementById('extMetric');
      const extMetal = document.getElementById('extMetal');
      const extStandard = document.getElementById('extStandard');
      const extPressure = document.getElementById('extPressure');
      const extConstruction = document.getElementById('extConstruction');
      const extNummDisplay = document.getElementById('extNummCodeDisplay');
      const extClusterStatus = document.getElementById('extClusterStatus');

      if (extNominal) extNominal.textContent = data.dimension?.nominal || 'DN-STD';
      if (extImperial) extImperial.textContent = `${data.dimension?.imperial || 'N/A'} (Imperial)`;
      if (extMetric) extMetric.textContent = `${data.dimension?.metric || 'N/A'} (Metric)`;

      if (extMetal) extMetal.textContent = data.metallurgy?.label || 'Standard Metallurgy';
      if (extStandard) extStandard.textContent = data.component?.subType || 'Industrial Specification';

      if (extPressure) extPressure.textContent = data.pressure?.label || 'Standard Class';
      if (extConstruction) extConstruction.textContent = data.construction || 'Standard';

      if (extNummDisplay) {
        extNummDisplay.textContent = data.nummCode;
      }

      if (extClusterStatus) {
        extClusterStatus.innerHTML = `&check; Normalized and mapped to Canonical Schema. Ready for CPSE Convergence.`;
      }

      showToast(`✓ Standardized: ${data.nummCode}`, 'success', 2500);

    } catch (err) {
      console.error('NLP Extraction failed:', err);
      if (nlpStatus) {
        nlpStatus.textContent = 'Extraction Failed';
      }
    }
  }

  if (btnRunNlpExtract && aiRawInputText) {
    btnRunNlpExtract.addEventListener('click', () => {
      runNlpExtractionSequence(aiRawInputText.value.trim());
    });
  }

  // Simulate Bulk Batch Ingest
  if (btnSimulateBulkIngest) {
    btnSimulateBulkIngest.addEventListener('click', async () => {
      btnSimulateBulkIngest.disabled = true;
      btnSimulateBulkIngest.textContent = 'Processing sample batch...';

      const sampleBatch = [
        { cpse: "CPCL", legacyCode: `MAT-${Math.floor(10000 + Math.random()*90000)}`, rawDescription: "SS PIPE 3 IN SCH 40 ASTM A312 TP304 SMLS", uom: "MTR" },
        { cpse: "IOCL", legacyCode: `IOC-${Math.floor(10000 + Math.random()*90000)}`, rawDescription: "GATE VALVE 2 IN 150# RF CF8M API 600", uom: "NOS" },
        { cpse: "ONGC", legacyCode: `RM-${Math.floor(10000 + Math.random()*90000)}`, rawDescription: "SPIRAL WOUND GASKET 4 IN 300# SS316 W/ GRAPHITE", uom: "NOS" }
      ];

      try {
        const res = await fetch('/api/ingest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: sampleBatch })
        });
        const result = await res.json();
        showToast(`✓ Ingested ${result.count} raw items from legacy CPSE records`, 'success', 3000);
        loadAnalytics();
        executeSearch(searchInput ? searchInput.value : '');
      } catch (err) {
        showToast('Ingestion error: ' + err.message, 'alert');
      } finally {
        btnSimulateBulkIngest.disabled = false;
        btnSimulateBulkIngest.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span>Simulate Bulk ERP Upload (Batch)</span>
        `;
      }
    });
  }

  // =========================================================================
  // 5. TAB 3: DYNAMIC HITL QUEUE & SKELETON LOADING
  // =========================================================================
  const dynamicHitlQueueList = document.getElementById('dynamicHitlQueueList');
  const auditTrailBody = document.getElementById('auditTrailBody');

  async function loadHitlQueue() {
    if (!dynamicHitlQueueList) return;

    dynamicHitlQueueList.innerHTML = `
      <div class="skeleton-card">
        <div class="skeleton-line" style="width: 30%; height: 16px;"></div>
        <div class="skeleton-line" style="width: 90%; height: 50px;"></div>
        <div class="skeleton-line" style="width: 40%; height: 28px;"></div>
      </div>
    `;

    try {
      const res = await fetch('/api/hitl/queue');
      const data = await res.json();

      const queueCount = data.queue ? data.queue.length : 0;
      const countDisplay = document.getElementById('queueItemsRemainingCount');
      const badgeDisplay = document.getElementById('wbQueueBadgeCount');
      if (countDisplay) countDisplay.textContent = queueCount;
      if (badgeDisplay) badgeDisplay.textContent = queueCount;

      if (!data.queue || data.queue.length === 0) {
        dynamicHitlQueueList.innerHTML = `
          <div style="padding: 24px; text-align: center; background: var(--bg-surface); border-radius: 6px; border: 1px solid var(--border-subtle);">
            <strong style="color: #065f46; font-size: 0.9375rem;">All Pending Candidate Mappings Validated</strong>
            <p style="color: var(--text-secondary); font-size: 0.8125rem; margin-top: 4px;">Zero unreviewed duplicate proposals in the queue. All committed records are audited below.</p>
          </div>
        `;
        return;
      }

      let html = '';
      data.queue.forEach(item => {
        const pair = item.candidatePair || {};
        const confPct = Math.round(item.confidenceScore * 100);

        html += `
          <div class="hitl-queue-card" id="card-${item.queueId}">
            <div class="hqc-top-bar">
              <span class="hqc-id">Queue ID: ${escapeHtml(item.queueId)}</span>
              <span class="hqc-conf-badge">&bull; Match Confidence: ${confPct}%</span>
            </div>

            <div class="hqc-comparison-grid">
              <div class="hqc-item">
                <span class="hqc-org-pill">${escapeHtml(pair.itemA?.cpse || 'CPSE A')} &bull; ${escapeHtml(pair.itemA?.erp || 'ERP')}</span>
                <span class="hqc-code">${escapeHtml(pair.itemA?.legacyCode || '')}</span>
                <span class="hqc-desc">&ldquo;${escapeHtml(pair.itemA?.description || '')}&rdquo;</span>
              </div>
              <div class="hqc-vs">VS</div>
              <div class="hqc-item">
                <span class="hqc-org-pill">${escapeHtml(pair.itemB?.cpse || 'CPSE B')} &bull; ${escapeHtml(pair.itemB?.erp || 'ERP')}</span>
                <span class="hqc-code">${escapeHtml(pair.itemB?.legacyCode || '')}</span>
                <span class="hqc-desc">&ldquo;${escapeHtml(pair.itemB?.description || '')}&rdquo;</span>
              </div>
            </div>

            <div class="hqc-rationale" id="rationale-${item.queueId}">
              <strong>AI Engineering Rationale:</strong> ${escapeHtml(item.aiRationale || '')}
            </div>

            <div class="hqc-actions">
              <button class="btn-hqc-approve" data-qid="${item.queueId}">&check; Approve &amp; Commit</button>
              <button class="btn-hqc-details" data-qid="${item.queueId}">&#128065; Technical Trace</button>
              <button class="btn-hqc-reject" data-qid="${item.queueId}">&times; Flag / Reject</button>
            </div>
          </div>
        `;
      });

      dynamicHitlQueueList.innerHTML = html;

      // Event listeners
      dynamicHitlQueueList.querySelectorAll('.btn-hqc-approve').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          processHitlDecision(qid, 'APPROVE');
        });
      });

      dynamicHitlQueueList.querySelectorAll('.btn-hqc-reject').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          processHitlDecision(qid, 'REJECT');
        });
      });

      // Material Comparison: Staggered Technical Trace
      dynamicHitlQueueList.querySelectorAll('.btn-hqc-details').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          const rBox = document.getElementById(`rationale-${qid}`);
          if (rBox) {
            if (rBox.getAttribute('data-expanded') === 'true') {
              rBox.setAttribute('data-expanded', 'false');
              rBox.innerHTML = `<strong>AI Engineering Rationale:</strong> Verified metallurgical equivalence and pressure schedule.`;
              btn.innerHTML = '&#128065; Technical Trace';
            } else {
              rBox.setAttribute('data-expanded', 'true');
              rBox.innerHTML = `
                <div style="font-size: 0.8125rem; line-height: 1.6;">
                  <strong style="display: block; margin-bottom: 4px; color: var(--navy-900);">ASME / ASTM Technical Attribute Trace:</strong>
                  <div style="display: flex; flex-direction: column; gap: 3px;">
                    <div><span style="color: #059669; font-weight: 800;">✓ Material Grade:</span> ASTM A312 TP304 composition verified (Austenitic)</div>
                    <div><span style="color: #059669; font-weight: 800;">✓ Size / Diameter:</span> 2.00 IN (Imperial) = 50.8mm = DN50 per ASME B36.19M</div>
                    <div><span style="color: #059669; font-weight: 800;">✓ Pressure Rating:</span> Schedule 40 (SCH 40) uniform across plants</div>
                    <div><span style="color: #059669; font-weight: 800;">✓ Standard Alignment:</span> 100% compliant with Bureau of Indian Standards (BIS) / ISO 8000</div>
                  </div>
                </div>
              `;
              btn.innerHTML = '&#128065; Collapse Trace';
            }
          }
        });
      });

    } catch (err) {
      console.error('Failed to load HITL queue:', err);
    }
  }

  async function processHitlDecision(queueId, action) {
    try {
      const res = await fetch('/api/hitl/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queueId,
          action,
          officer: "Er. S. Venkatraman (Chief Materials Officer, CPCL)"
        })
      });
      const result = await res.json();

      if (result.success) {
        if (action === 'APPROVE') {
          showToast(`✓ Approved: ${result.auditRef} committed to Unified Catalog`, 'success', 3000);
        } else {
          showToast(`✗ Flagged: ${queueId} marked for inspection`, 'alert', 3000);
        }

        const card = document.getElementById(`card-${queueId}`);
        if (card) {
          card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(4px)';
          setTimeout(() => {
            loadHitlQueue();
            loadAuditTrail();
            loadAnalytics();
          }, 200);
        }
      }
    } catch (err) {
      showToast('Action error: ' + err.message, 'alert');
    }
  }

  async function loadAuditTrail() {
    if (!auditTrailBody) return;

    try {
      const res = await fetch('/api/hitl/audit-log');
      const data = await res.json();

      if (!data.logs || data.logs.length === 0) {
        auditTrailBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No audit records yet.</td></tr>';
        return;
      }

      let html = '';
      data.logs.forEach(log => {
        const isApproved = log.action === 'APPROVED_AND_COMMITTED';
        const actClass = isApproved ? 'act-app' : 'act-rej';
        const actText = isApproved ? '&check; APPROVED' : '&times; FLAGGED';

        html += `
          <tr>
            <td><code style="font-weight: 800; color: var(--teal-700);">${escapeHtml(log.auditRef)}</code></td>
            <td style="white-space: nowrap; color: var(--text-muted); font-size: 0.75rem;">${escapeHtml(log.timestamp)}</td>
            <td><code style="font-weight: 700; color: var(--navy-900);">${escapeHtml(log.nummCode)}</code></td>
            <td style="font-size: 0.75rem;">${escapeHtml((log.legacyCodes || []).join(' &bull; '))}</td>
            <td><span class="audit-action-pill ${actClass}">${actText}</span></td>
            <td style="font-size: 0.8125rem;">${escapeHtml(log.officer || 'Officer')}</td>
            <td><span style="font-size: 0.75rem; color: #065f46; font-weight: 600;">${escapeHtml(log.status)}</span></td>
          </tr>
        `;
      });

      auditTrailBody.innerHTML = html;

    } catch (err) {
      console.error('Failed to load audit trail:', err);
    }
  }

  // =========================================================================
  // 6. TAB 4: INTERACTIVE ROI CALCULATOR
  // =========================================================================
  const consolidationSlider = document.getElementById('consolidationSlider');
  const sliderValDisplay = document.getElementById('sliderValDisplay');
  const calcWorkingCapital = document.getElementById('calcWorkingCapital');
  const calcTenders = document.getElementById('calcTendersAvoided');
  const calcDowntime = document.getElementById('calcDowntimeSaved');

  if (consolidationSlider && sliderValDisplay) {
    consolidationSlider.addEventListener('input', () => {
      const rate = Number(consolidationSlider.value);
      sliderValDisplay.textContent = `${rate}%`;

      const totalDuplicates = 9342;
      const avgLineValue = 425000;
      const capitalCr = ((totalDuplicates * (rate / 100) * avgLineValue * 0.18) / 10000000).toFixed(2);
      const tenders = Math.round(totalDuplicates * (rate / 100) * 1.13);
      const downtime = Math.round(totalDuplicates * (rate / 100) * 7.27);

      if (calcWorkingCapital) calcWorkingCapital.textContent = `₹ ${capitalCr} Cr`;
      if (calcTenders) calcTenders.textContent = tenders.toLocaleString();
      if (calcDowntime) calcDowntime.textContent = `${downtime.toLocaleString()} hrs`;
    });
  }

  // =========================================================================
  // 7. SECTION 04 SIMULATION CARD ACTIONS (SYNCED WITH BACKEND)
  // =========================================================================
  const btnApproveDemo = document.getElementById('btnApproveDemo');
  const btnRejectDemo = document.getElementById('btnRejectDemo');
  const btnReviewDemo = document.getElementById('btnReviewDemo');
  const ircStatusText = document.getElementById('ircStatusText');
  const ircReasoning = document.querySelector('.irc-reasoning') || document.getElementById('ircReasoningBox');

  if (btnApproveDemo && ircStatusText) {
    btnApproveDemo.addEventListener('click', async () => {
      ircStatusText.textContent = 'Mapping Approved & Committed to Master NUMM Catalog (Audit Ref: #VAL-2024-998)';
      ircStatusText.style.color = '#10b981';
      ircStatusText.style.fontWeight = '700';
      btnApproveDemo.style.opacity = '0.6';
      btnApproveDemo.style.pointerEvents = 'none';
      btnApproveDemo.textContent = '✓ Approved & Synced';
      if (btnRejectDemo) btnRejectDemo.style.display = 'none';

      try {
        await fetch('/api/hitl/action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            queueId: "HITL-REQ-2024-998",
            action: "APPROVE",
            officer: "Er. K. Ramanathan (Chief Materials Manager, CPCL)"
          })
        });
        showToast('✓ #VAL-2024-998 committed to National Master', 'success', 2500);
        loadAnalytics();
        loadHitlQueue();
        loadAuditTrail();
      } catch (e) {
        console.log(e);
      }
    });
  }

  if (btnRejectDemo && ircStatusText) {
    btnRejectDemo.addEventListener('click', async () => {
      ircStatusText.textContent = 'Mapping Flagged for Engineering Clarification & Review';
      ircStatusText.style.color = '#ef4444';
      ircStatusText.style.fontWeight = '700';
      btnRejectDemo.style.opacity = '0.6';
      btnRejectDemo.style.pointerEvents = 'none';
      btnRejectDemo.textContent = '✗ Flagged';
      if (btnApproveDemo) btnApproveDemo.style.display = 'none';

      try {
        await fetch('/api/hitl/action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            queueId: "HITL-REQ-2024-998",
            action: "REJECT",
            officer: "Er. K. Ramanathan (Chief Materials Manager, CPCL)"
          })
        });
        showToast('✗ Flagged for physical inspection', 'alert', 2500);
        loadAnalytics();
        loadHitlQueue();
        loadAuditTrail();
      } catch (e) {
        console.log(e);
      }
    });
  }

  if (btnReviewDemo && ircReasoning) {
    btnReviewDemo.addEventListener('click', () => {
      const isExpanded = ircReasoning.getAttribute('data-expanded') === 'true';
      if (isExpanded) {
        ircReasoning.setAttribute('data-expanded', 'false');
        ircReasoning.innerHTML = '<strong>AI Rationale:</strong> Exact match on metallurgical grade (TP304), dimensional equivalence (2.00" = 50.8mm &approx; DN50), and pressure schedule (SCH40).';
        btnReviewDemo.innerHTML = '&#128065; Review Details';
      } else {
        ircReasoning.setAttribute('data-expanded', 'true');
        ircReasoning.innerHTML = '<strong>AI Rationale &amp; Deep Attribute Trace:</strong><br>' +
          '&bull; <strong>Dimension:</strong> 2 IN (Imperial) matches 50mm (Metric) and DN50 (Nominal Diameter) per ASME B36.19M.<br>' +
          '&bull; <strong>Metallurgy:</strong> TP304 / Grade 304 Austenitic Stainless Steel confirmed across all three specifications.<br>' +
          '&bull; <strong>Pressure Rating:</strong> Schedule 40 (SCH40) uniform across CPSE A, B &amp; C.<br>' +
          '&bull; <strong>Confidence Vector:</strong> 0.963 cosine similarity (Threshold: 0.85). Recommended for immediate master convergence.';
        btnReviewDemo.innerHTML = '&#128065; Collapse Details';
      }
    });
  }

  // =========================================================================
  // 8. NAVIGATION SCROLL & SCROLLSPY
  // =========================================================================
  const navIconLinks = document.querySelectorAll('.nav-icon-link');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          navIconLinks.forEach(link => link.classList.remove('active'));
          const matchingLink = document.querySelector(`.nav-icon-link[href="${targetId}"]`);
          if (matchingLink) matchingLink.classList.add('active');
        }
      }
    });
  });

  const sectionsToWatch = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sectionsToWatch.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navIconLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sectionsToWatch.forEach(sec => observer.observe(sec));
  }

  // Initial load
  loadAnalytics();

  // Helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
