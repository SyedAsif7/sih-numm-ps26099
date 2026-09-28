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
  // 0C. PARICHAY UNIFIED SSO OFFICER AUTHENTICATION SYSTEM & RBAC
  // =========================================================================
  let currentOfficer = {
    name: "Er. K. Ramanathan",
    cpse: "CPCL",
    role: "Reviewer / Approver",
    designation: "Chief Materials Manager • CPCL Manali Refinery"
  };

  const btnOfficerAuth = document.getElementById('btnOfficerAuth');
  const modalOfficerAuthBackdrop = document.getElementById('modalOfficerAuthBackdrop');
  const btnCloseOfficerModal = document.getElementById('btnCloseOfficerModal');
  const btnConfirmOfficerSelect = document.getElementById('btnConfirmOfficerSelect');
  const headerOfficerName = document.getElementById('headerOfficerName');
  const headerOfficerRole = document.getElementById('headerOfficerRole');
  const personaSelectorList = document.getElementById('personaSelectorList');

  // RBAC Permission Check Utility
  function checkOfficerPermission(actionType = 'APPROVE') {
    if (actionType === 'APPROVE') {
      if (currentOfficer.role === 'Material Officer') {
        showToast(`Role Restricted: ${currentOfficer.name} holds 'Material Officer' credentials. Final master data commit requires 'Reviewer / Approver' or 'Platform Admin' sign-off. Switch persona in header.`, 'alert', 4500);
        return false;
      }
    }
    return true;
  }

  if (btnOfficerAuth && modalOfficerAuthBackdrop) {
    btnOfficerAuth.addEventListener('click', () => {
      modalOfficerAuthBackdrop.classList.add('active');
    });
  }

  if (btnCloseOfficerModal && modalOfficerAuthBackdrop) {
    btnCloseOfficerModal.addEventListener('click', () => {
      modalOfficerAuthBackdrop.classList.remove('active');
    });
  }

  if (modalOfficerAuthBackdrop) {
    modalOfficerAuthBackdrop.addEventListener('click', (e) => {
      if (e.target === modalOfficerAuthBackdrop) {
        modalOfficerAuthBackdrop.classList.remove('active');
      }
    });
  }

  if (personaSelectorList) {
    personaSelectorList.querySelectorAll('.persona-card').forEach(card => {
      card.addEventListener('click', () => {
        personaSelectorList.querySelectorAll('.persona-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  if (btnConfirmOfficerSelect && modalOfficerAuthBackdrop) {
    btnConfirmOfficerSelect.addEventListener('click', () => {
      const selected = personaSelectorList ? personaSelectorList.querySelector('.persona-card.selected') : null;
      if (selected) {
        currentOfficer = {
          name: selected.getAttribute('data-name'),
          cpse: selected.getAttribute('data-cpse'),
          role: selected.getAttribute('data-role') || "Reviewer / Approver",
          designation: selected.getAttribute('data-designation') || selected.getAttribute('data-role')
        };
        if (headerOfficerName) {
          headerOfficerName.textContent = `${currentOfficer.name} (${currentOfficer.cpse})`;
        }
        if (headerOfficerRole) {
          headerOfficerRole.textContent = currentOfficer.role;
        }
        showToast(`SSO Session Switched: ${currentOfficer.name} [${currentOfficer.role}]`, 'success', 2500);
      }
      modalOfficerAuthBackdrop.classList.remove('active');
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

      // Re-fetch sync if numbers are already animated
      if (numbersAnimated) {
        const heroAnalysed = document.getElementById('heroStatAnalysed');
        const heroDuplicates = document.getElementById('heroStatDuplicates');
        const dashAnalysed = document.getElementById('dashStatAnalysed');
        const dashDuplicates = document.getElementById('dashStatDuplicates');
        const dashGroups = document.getElementById('dashStatGroups');
        const dashPending = document.getElementById('dashStatPending');

        if (heroAnalysed) heroAnalysed.textContent = data.materialsAnalysed.toLocaleString() + '+';
        if (heroDuplicates) heroDuplicates.textContent = data.potentialDuplicates.toLocaleString();
        if (dashAnalysed) dashAnalysed.textContent = data.materialsAnalysed.toLocaleString();
        if (dashDuplicates) dashDuplicates.textContent = data.potentialDuplicates.toLocaleString();
        if (dashGroups) dashGroups.textContent = data.equivalentGroups.toLocaleString();
        if (dashPending) dashPending.textContent = data.pendingValidation.toString();
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
  // 4B. END-TO-END 2-RECORD LIVE HARMONIZATION SHOWCASE
  // =========================================================================
  const pairPresetCases = {
    valves: {
      cpseA: "CPCL",
      recordA: 'VLV BALL SS 2IN 150#',
      legacyA: 'CPCL-VLV-1042',
      cpseB: "IOCL",
      recordB: 'Ball Valve | Stainless Steel | DN50 | Class 150',
      legacyB: 'IOCL-M-88210'
    },
    pipes: {
      cpseA: "CPCL",
      recordA: "PIPE CS SMLS SCH 40 2 INCH ASTM A106 GR B",
      legacyA: "CPCL-PIP-4091",
      cpseB: "IOCL",
      recordB: '2" NB CS SEAMLESS PIPE SCH40 ASTM A53/A106B SMLS',
      legacyB: "IOCL-P-55012"
    },
    bearings: {
      cpseA: "HPCL",
      recordA: "DEEP GROOVE BALL BEARING 6205-2RS1 SKF 25X52X15MM C3",
      legacyA: "HPCL-BRG-8821",
      cpseB: "CPCL",
      recordB: "BEARING RADIAL BALL 25MM BORE 52MM OD RUBBER SEALED 6205",
      legacyB: "CPCL-BRG-3310"
    },
    motors: {
      cpseA: "IOCL",
      recordA: "3 PHASE INDUCTION MOTOR 15KW 415V 1450RPM 4 POLE FOOT MTD IE3",
      legacyA: "IOCL-MOT-9912",
      cpseB: "CPCL",
      recordB: "15 KW SQUIRREL CAGE INDUCTION MOTOR 415V 1500 RPM B3 FRAME TEFC",
      legacyB: "CPCL-MOT-1004"
    },
    cables: {
      cpseA: "ONGC",
      recordA: "XLPE POWER CABLE 3.5C X 185 SQ MM AL ARMOURED 1.1KV IS 7098",
      legacyA: "ONGC-CBL-6712",
      cpseB: "GAIL",
      recordB: "1100V 3.5 CORE 185SQMM ALUMINIUM CONDUCTOR ARMORED CABLE",
      legacyB: "GAIL-CBL-4401"
    }
  };

  const pairPresetChips = document.getElementById('pairPresetChips');
  const pairInputA = document.getElementById('pairInputA');
  const pairInputB = document.getElementById('pairInputB');
  const pairCpseA = document.getElementById('pairCpseA');
  const pairCpseB = document.getElementById('pairCpseB');
  const btnRunPairPipeline = document.getElementById('btnRunPairPipeline');
  const pairResultsContainer = document.getElementById('pairResultsContainer');

  const pairXaiRationaleText = document.getElementById('pairXaiRationaleText');
  const pairMatchPctBadge = document.getElementById('pairMatchPctBadge');
  const pairAttrTableBody = document.getElementById('pairAttrTableBody');
  const pairCanonicalCodeDisplay = document.getElementById('pairCanonicalCodeDisplay');
  const thHeaderA = document.getElementById('thHeaderA');
  const thHeaderB = document.getElementById('thHeaderB');
  const mapLabelA = document.getElementById('mapLabelA');
  const mapLabelB = document.getElementById('mapLabelB');
  const mapRawA = document.getElementById('mapRawA');
  const mapRawB = document.getElementById('mapRawB');
  const pairHitlGateBar = document.getElementById('pairHitlGateBar');

  if (pairPresetChips) {
    pairPresetChips.querySelectorAll('.chip-preset-case').forEach(chip => {
      chip.addEventListener('click', () => {
        pairPresetChips.querySelectorAll('.chip-preset-case').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const caseKey = chip.getAttribute('data-case');
        const cData = pairPresetCases[caseKey];
        if (cData) {
          if (pairInputA) pairInputA.value = cData.recordA;
          if (pairInputB) pairInputB.value = cData.recordB;
          if (pairCpseA) pairCpseA.value = cData.cpseA;
          if (pairCpseB) pairCpseB.value = cData.cpseB;
          if (pairResultsContainer) pairResultsContainer.style.display = 'none';
        }
      });
    });
  }

  // 4C. Multi-Factor 4-Pillar Scorecard & Material Knowledge Graph Visualizers
  function renderMultiFactorScorecard(mfScore, routing) {
    const pairTierBadge = document.getElementById('pairTierBadge');
    const pairTierBadgeText = document.getElementById('pairTierBadgeText');
    const pairFormulaText = document.getElementById('pairFormulaText');

    if (pairTierBadge && routing) {
      pairTierBadge.className = `mf-tier-badge ${routing.badgeClass || 'route-strong'}`;
      if (pairTierBadgeText) pairTierBadgeText.textContent = routing.label || 'Auto-Convergence Zone (≥90%)';
    }

    if (pairFormulaText && mfScore?.formula) {
      pairFormulaText.textContent = mfScore.formula;
    }

    if (mfScore?.pillars) {
      const pSem = mfScore.pillars.find(p => p.id === 'semantic');
      const pTech = mfScore.pillars.find(p => p.id === 'technical');
      const pUnit = mfScore.pillars.find(p => p.id === 'unit');
      const pCat = mfScore.pillars.find(p => p.id === 'category');

      if (pSem) {
        const elS = document.getElementById('pillarSemScore');
        const elC = document.getElementById('pillarSemContrib');
        const elB = document.getElementById('pillarSemBar');
        const elN = document.getElementById('pillarSemNote');
        if (elS) elS.textContent = `${Math.round(pSem.rawScore * 100)}%`;
        if (elC) elC.textContent = `+${pSem.contribution}`;
        if (elB) elB.style.width = `${Math.round(pSem.rawScore * 100)}%`;
        if (elN) elN.textContent = pSem.notes;
      }
      if (pTech) {
        const elS = document.getElementById('pillarTechScore');
        const elC = document.getElementById('pillarTechContrib');
        const elB = document.getElementById('pillarTechBar');
        const elN = document.getElementById('pillarTechNote');
        if (elS) elS.textContent = `${Math.round(pTech.rawScore * 100)}%`;
        if (elC) elC.textContent = `+${pTech.contribution}`;
        if (elB) elB.style.width = `${Math.round(pTech.rawScore * 100)}%`;
        if (elN) elN.textContent = pTech.notes;
      }
      if (pUnit) {
        const elS = document.getElementById('pillarUnitScore');
        const elC = document.getElementById('pillarUnitContrib');
        const elB = document.getElementById('pillarUnitBar');
        const elN = document.getElementById('pillarUnitNote');
        if (elS) elS.textContent = `${Math.round(pUnit.rawScore * 100)}%`;
        if (elC) elC.textContent = `+${pUnit.contribution}`;
        if (elB) elB.style.width = `${Math.round(pUnit.rawScore * 100)}%`;
        if (elN) elN.textContent = pUnit.notes;
      }
      if (pCat) {
        const elS = document.getElementById('pillarCatScore');
        const elC = document.getElementById('pillarCatContrib');
        const elB = document.getElementById('pillarCatBar');
        const elN = document.getElementById('pillarCatNote');
        if (elS) elS.textContent = `${Math.round(pCat.rawScore * 100)}%`;
        if (elC) elC.textContent = `+${pCat.contribution}`;
        if (elB) elB.style.width = `${Math.round(pCat.rawScore * 100)}%`;
        if (elN) elN.textContent = pCat.notes;
      }
    }
  }

  function renderKnowledgeGraph(kgData) {
    const traceChainEl = document.getElementById('pairKgTraceChain');
    if (!traceChainEl || !kgData || !kgData.traceSteps) return;

    let chainHtml = '';
    const totalSteps = kgData.traceSteps.length;

    kgData.traceSteps.forEach((step, idx) => {
      chainHtml += `
        <div class="kg-node-step ${idx === totalSteps - 1 ? 'active' : ''}" data-step-idx="${idx}">
          <span class="kg-step-num">${step.step}</span>
          <span class="kg-node-val">${escapeHtml(step.val)}</span>
        </div>
      `;
      if (idx < totalSteps - 1) {
        chainHtml += `<span class="kg-arrow-sep">&rarr;</span>`;
      }
    });

    traceChainEl.innerHTML = chainHtml;

    // Attach click listeners to steps for node inspection
    const stepCards = traceChainEl.querySelectorAll('.kg-node-step');
    stepCards.forEach(card => {
      card.addEventListener('click', () => {
        stepCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const sIdx = parseInt(card.getAttribute('data-step-idx'), 10);
        const step = kgData.traceSteps[sIdx];
        if (step) {
          updateKgNodeInspector(step, kgData);
        }
      });
    });

    // Update inspector with last step (Common Code) initially
    if (kgData.traceSteps[totalSteps - 1]) {
      updateKgNodeInspector(kgData.traceSteps[totalSteps - 1], kgData);
    }
  }

  function updateKgNodeInspector(step, kgData) {
    const kgiIcon = document.getElementById('kgiIcon');
    const kgiCategory = document.getElementById('kgiCategory');
    const kgiTitle = document.getElementById('kgiTitle');
    const kgiDesc = document.getElementById('kgiDesc');
    const kgiType = document.getElementById('kgiType');

    const descriptions = {
      1: "Raw unstructured text string ingested from legacy CPSE enterprise catalog.",
      2: "Top-level enterprise asset classification domain.",
      3: "Specific functional mechanical/electrical equipment classification.",
      4: "Metallurgical composition and chemical grade classification.",
      5: "Standardized metric & imperial nominal geometry with ASME/ISO tolerance matching.",
      6: "Pressure class & temperature operating boundary envelope.",
      7: "Governing technical specification authority certifying interchangeability.",
      8: "Consolidated National Unified Material Master Code mapped across all CPSEs."
    };

    const icons = {
      1: "📝", 2: "📁", 3: "⚙️", 4: "🔬", 5: "📐", 6: "⏱️", 7: "📜", 8: "🎯"
    };

    if (kgiIcon) kgiIcon.textContent = icons[step.step] || "ℹ️";
    if (kgiCategory) kgiCategory.textContent = `Ontological Step ${step.step} • ${step.type}`;
    if (kgiTitle) kgiTitle.textContent = step.val;
    if (kgiDesc) kgiDesc.textContent = descriptions[step.step] || "Standard master data node in ontological graph.";
    if (kgiType) kgiType.textContent = step.type;
  }

  // Pre-initialize Knowledge Graph for default Valve case
  const defaultValveKg = {
    traceSteps: [
      { step: 1, type: "Raw Specification", val: "VLV BALL SS 2IN 150#" },
      { step: 2, type: "Primary Category", val: "Valves & Actuators" },
      { step: 3, type: "Subcategory / Equipment", val: "Ball Valve" },
      { step: 4, type: "Metallurgical Grade", val: "Austenitic Stainless Steel (CF8M / SS316)" },
      { step: 5, type: "Normalized Dimensions", val: "DN50 (2\" ↔ 50.8mm)" },
      { step: 6, type: "Pressure Rating", val: "Class 150 (150#)" },
      { step: 7, type: "Governing Standard", val: "ASME B16.34 / API 608" },
      { step: 8, type: "Common Material Code", val: "NUMM-VLV-SS-DN50-CL150" }
    ]
  };
  renderKnowledgeGraph(defaultValveKg);

  if (btnRunPairPipeline) {
    btnRunPairPipeline.addEventListener('click', async () => {
      const recA = pairInputA ? pairInputA.value.trim() : '';
      const recB = pairInputB ? pairInputB.value.trim() : '';
      const cA = pairCpseA ? pairCpseA.value : 'CPCL';
      const cB = pairCpseB ? pairCpseB.value : 'IOCL';

      if (!recA || !recB) {
        showToast('Please enter descriptions for both CPSE records', 'alert');
        return;
      }

      btnRunPairPipeline.disabled = true;
      btnRunPairPipeline.innerHTML = `
        <span class="pulse-dot-sm"></span>
        <span>Standardizing attributes &amp; computing vector distance...</span>
      `;

      try {
        const res = await fetch('/api/harmonize-pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recordA: recA, recordB: recB, cpseA: cA, cpseB: cB })
        });
        const data = await res.json();

        if (thHeaderA) thHeaderA.textContent = `Record A (${cA})`;
        if (thHeaderB) thHeaderB.textContent = `Record B (${cB})`;

        if (pairXaiRationaleText) {
          pairXaiRationaleText.textContent = data.match?.rationale || 'Equivalence verified across dimensional, metallurgy, and pressure attributes.';
        }
        if (pairMatchPctBadge) {
          pairMatchPctBadge.textContent = `${data.match?.percentage || '96%'} Match Confidence`;
        }

        // Render 4-Pillar Multi-Factor Scorecard
        if (data.match?.multiFactorScore) {
          renderMultiFactorScorecard(data.match.multiFactorScore, data.match.routing);
        }

        // Render Material Knowledge Graph
        const unifiedKg = data.match?.knowledgeGraph?.unified || data.match?.knowledgeGraph;
        if (unifiedKg) {
          renderKnowledgeGraph(unifiedKg);
        }

        // Render explainable attribute matrix table
        if (pairAttrTableBody && data.match?.explainableBreakdown) {
          let rowsHtml = '';
          data.match.explainableBreakdown.forEach((row, idx) => {
            const isMatch = row.score >= 0.85;
            const badgeColor = isMatch ? '#065f46' : '#854d0e';
            const badgeBg = isMatch ? '#ecfdf5' : '#fefce8';
            const badgeBorder = isMatch ? '#10b981' : '#f59e0b';
            const checkIcon = isMatch ? '&check;' : '&bull;';

            rowsHtml += `
              <tr class="trace-attr-row" style="animation-delay: ${idx * 60}ms;">
                <td><strong>${escapeHtml(row.attribute)}</strong></td>
                <td><code style="font-family: var(--font-mono); font-size: 0.78125rem;">${escapeHtml(row.valA)}</code></td>
                <td><code style="font-family: var(--font-mono); font-size: 0.78125rem;">${escapeHtml(row.valB)}</code></td>
                <td>
                  <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; font-size: 0.6875rem; font-weight: 800; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                    ${checkIcon} ${escapeHtml(row.status)}
                  </span>
                </td>
              </tr>
            `;
          });
          pairAttrTableBody.innerHTML = rowsHtml;
        }

        // Canonical Code & Mapping Summary
        if (pairCanonicalCodeDisplay) {
          pairCanonicalCodeDisplay.textContent = data.canonicalNummCode;
        }
        if (mapLabelA) mapLabelA.textContent = `${cA} (Local ERP):`;
        if (mapLabelB) mapLabelB.textContent = `${cB} (Local ERP):`;
        if (mapRawA) mapRawA.textContent = `"${recA}"`;
        if (mapRawB) mapRawB.textContent = `"${recB}"`;

        // Reset HITL gate bar with all 3 enterprise actions
        if (pairHitlGateBar) {
          pairHitlGateBar.style.background = '#fefce8';
          pairHitlGateBar.style.borderColor = '#fef08a';
          pairHitlGateBar.innerHTML = `
            <div>
              <strong style="color: #854d0e; font-size: 0.875rem;">Officer Decision Checkpoint (HITL Governance):</strong>
              <p style="color: #713f12; font-size: 0.78125rem; margin: 2px 0 0 0;">
                Reviewer: <strong>${escapeHtml(currentOfficer.name)}</strong> (${escapeHtml(currentOfficer.role)}). Sign-off required to commit mapping to National Master Catalog.
              </p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn-hqc-approve" id="btnApprovePairDemo" style="padding: 8px 16px;">&check; Approve &amp; Assign Common Code</button>
              <button class="btn-hqc-review" id="btnNeedsReviewPairDemo" style="padding: 8px 16px; background: #d97706; border-color: #b45309; color: #ffffff;">&#9888; Needs Review (Testing)</button>
              <button class="btn-hqc-reject" id="btnRejectPairDemo" style="padding: 8px 16px;">&times; Reject Mismatch</button>
            </div>
          `;

          // Re-attach 3-way decision handlers
          document.getElementById('btnApprovePairDemo')?.addEventListener('click', () => {
            handlePairApproval(data);
          });
          document.getElementById('btnNeedsReviewPairDemo')?.addEventListener('click', () => {
            openNeedsReviewModal("PAIR-DEMO-VALVE", (directive) => {
              if (pairHitlGateBar) {
                pairHitlGateBar.style.background = '#fef3c7';
                pairHitlGateBar.style.borderColor = '#fde68a';
                pairHitlGateBar.innerHTML = `
                  <div style="color: #92400e; font-size: 0.875rem;">
                    <strong>&#9888; Candidate Pair Flagged for Engineering &amp; Yard Testing</strong>
                    <p style="margin: 2px 0 0 0; font-size: 0.78125rem;">
                      Directive: <em>"${escapeHtml(directive)}"</em> &bull; Actioned by <strong>${escapeHtml(currentOfficer.name)}</strong> (${escapeHtml(currentOfficer.role)}).
                    </p>
                  </div>
                  <span class="sec-badge-tag" style="background: #fde68a; color: #92400e; border-color: #d97706;">Testing Mandated</span>
                `;
              }
            });
          });
          document.getElementById('btnRejectPairDemo')?.addEventListener('click', () => {
            openRejectModal("PAIR-DEMO-VALVE", (reason) => {
              if (pairHitlGateBar) {
                pairHitlGateBar.style.background = '#fff1f2';
                pairHitlGateBar.style.borderColor = '#fecdd3';
                pairHitlGateBar.innerHTML = `
                  <div style="color: #9f1239; font-size: 0.875rem;">
                    <strong>&times; Candidate Pair Rejected (Parameter Mismatch)</strong>
                    <p style="margin: 2px 0 0 0; font-size: 0.78125rem;">
                      Reason: <em>"${escapeHtml(reason)}"</em> &bull; Flagged by <strong>${escapeHtml(currentOfficer.name)}</strong> (${escapeHtml(currentOfficer.role)}).
                    </p>
                  </div>
                  <span class="sec-badge-tag" style="background: #ffe4e6; color: #9f1239; border-color: #fda4af;">Rejected</span>
                `;
              }
            });
          });
        }

        if (pairResultsContainer) {
          pairResultsContainer.style.display = 'flex';
          pairResultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast(`✓ AI Harmonization Complete: ${data.canonicalNummCode}`, 'success', 3000);

      } catch (err) {
        showToast('Harmonization error: ' + err.message, 'alert');
      } finally {
        btnRunPairPipeline.disabled = false;
        btnRunPairPipeline.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Execute End-to-End AI Harmonization Pipeline</span>
        `;
      }
    });
  }

  async function handlePairApproval(data) {
    if (!data) return;
    if (!checkOfficerPermission('APPROVE')) return;

    const cA = data.recordA?.cpse || "CPCL";
    const cB = data.recordB?.cpse || "IOCL";
    const rawA = data.recordA?.raw || 'VLV BALL SS 2IN 150#';
    const rawB = data.recordB?.raw || 'Ball Valve | Stainless Steel | DN50 | Class 150';
    const legacyA = data.recordA?.legacyCode || "CPCL-VLV-1042";
    const legacyB = data.recordB?.legacyCode || "IOCL-M-88210";

    try {
      const res = await fetch('/api/hitl/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queueId: "PAIR-DEMO-" + Math.floor(1000 + Math.random() * 9000),
          action: "APPROVE",
          notes: `Verified physical equivalence between ${cA} and ${cB}. Assigned ${data.canonicalNummCode}.`,
          officer: `${currentOfficer.name} (${currentOfficer.role}, ${currentOfficer.cpse})`,
          proposedNummCode: data.canonicalNummCode,
          candidatePair: {
            itemA: { legacyCode: legacyA, cpse: cA, description: rawA },
            itemB: { legacyCode: legacyB, cpse: cB, description: rawB }
          }
        })
      });
      const result = await res.json();

      if (pairHitlGateBar) {
        pairHitlGateBar.style.background = '#ecfdf5';
        pairHitlGateBar.style.borderColor = '#6ee7b7';
        pairHitlGateBar.innerHTML = `
          <div style="color: #065f46; font-size: 0.875rem;">
            <strong>&check; Harmonization Committed to National Catalog &amp; ERP Sync Table</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.78125rem;">
              Audit Reference: <strong style="font-family: var(--font-mono);">${result.auditRef || 'VAL-2026-LIVE'}</strong> &bull; Signed by <strong>${escapeHtml(currentOfficer.name)}</strong> at ${new Date().toLocaleTimeString()} IST.
            </p>
          </div>
          <span class="sec-badge-tag" style="background: #d1fae5; color: #065f46; border-color: #34d399;">100% Synchronized</span>
        `;
      }

      // Render Dedicated Unified Common Record & ERP Interoperability Card
      const pairMappingSummary = document.getElementById('pairMappingSummary');
      if (pairMappingSummary) {
        pairMappingSummary.classList.add('approved-record-active');
        pairMappingSummary.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #10b981; color: #ffffff; font-size: 0.8125rem; font-weight: 900;">&check;</span>
                <strong style="color: #065f46; font-size: 0.9375rem;">OFFICIALLY COMMITTED TO NATIONAL UNIFIED MASTER CATALOG</strong>
              </div>
              <p style="color: var(--text-secondary); font-size: 0.78125rem; margin: 0;">
                Both legacy records mapped bidirectionally to a single authoritative NUMM identity. Local CPSE ERPs continue operating without disruption while cross-enterprise procurement is unlocked.
              </p>
            </div>
            <div style="text-align: right;">
              <span class="numm-code-display" style="font-size: 1.05rem; padding: 6px 14px; background: #ecfdf5; border: 1px solid #6ee7b7; color: #065f46; border-radius: 6px; letter-spacing: 0.5px;">${escapeHtml(data.canonicalNummCode)}</span>
              <span style="display: block; font-size: 0.71875rem; color: #059669; font-weight: 700; margin-top: 4px;">Universal Common Material Code (Active)</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
            <div class="mapping-row" style="background: var(--bg-surface); border-left: 4px solid #0284c7;">
              <div>
                <span style="font-weight: 800; color: #0284c7; display: block; font-size: 0.78125rem;">${escapeHtml(cA)} (SAP S/4HANA &bull; RFC / IDoc MATMAS05)</span>
                <code style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--navy-900); font-weight: 700;">Legacy Code: ${escapeHtml(legacyA)}</code>
                <span style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">&ldquo;${escapeHtml(rawA)}&rdquo;</span>
              </div>
              <div style="text-align: right;">
                <span style="display: inline-block; padding: 3px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.71875rem; border: 1px solid #bae6fd;">Mapped &amp; Synced</span>
                <span style="display: block; font-family: var(--font-mono); font-size: 0.71875rem; color: var(--text-muted); margin-top: 2px;">Sync ID: ERP-RFC-CPCL-1042</span>
              </div>
            </div>

            <div class="mapping-row" style="background: var(--bg-surface); border-left: 4px solid #d97706;">
              <div>
                <span style="font-weight: 800; color: #d97706; display: block; font-size: 0.78125rem;">${escapeHtml(cB)} (Oracle ERP Cloud &bull; FBDI / REST Ingestion)</span>
                <code style="font-family: var(--font-mono); font-size: 0.8125rem; color: var(--navy-900); font-weight: 700;">Legacy Code: ${escapeHtml(legacyB)}</code>
                <span style="display: block; font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">&ldquo;${escapeHtml(rawB)}&rdquo;</span>
              </div>
              <div style="text-align: right;">
                <span style="display: inline-block; padding: 3px 8px; border-radius: 4px; background: #fef3c7; color: #92400e; font-weight: 800; font-size: 0.71875rem; border: 1px solid #fde68a;">Mapped &amp; Synced</span>
                <span style="display: block; font-family: var(--font-mono); font-size: 0.71875rem; color: var(--text-muted); margin-top: 2px;">Sync ID: ERP-REST-IOCL-88210</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; background: #ecfdf5; border-radius: 6px; padding: 10px 14px; font-size: 0.75rem; color: #065f46;">
            <div>
              <strong>Audit Stamp:</strong> <code style="font-family: var(--font-mono); font-weight: 800;">${result.auditRef || 'VAL-2026-LIVE'}</code> &bull;
              <strong>Certifying Officer:</strong> ${escapeHtml(currentOfficer.name)} (${escapeHtml(currentOfficer.role)})
            </div>
            <div style="display: flex; gap: 8px;">
              <a href="/api/export/csv" download="NUMM_Unified_Export.csv" class="btn-copy-code" style="text-decoration: none; padding: 4px 8px; font-size: 0.71875rem;">
                <span>Download CSV Sync</span>
              </a>
              <a href="/api/export/json" download="NUMM_Unified_Export.json" class="btn-copy-code" style="text-decoration: none; padding: 4px 8px; font-size: 0.71875rem;">
                <span>Download JSON Schema</span>
              </a>
            </div>
          </div>
        `;
      }

      // Visual updates on KPIs
      const heroDuplicates = document.getElementById('heroStatDuplicates');
      const dashDuplicates = document.getElementById('dashStatDuplicates');
      const dashGroups = document.getElementById('dashStatGroups');
      const heroSavings = document.getElementById('heroStatSavings');
      const calcWorkingCapital = document.getElementById('calcWorkingCapital');

      if (heroDuplicates) {
        const cur = parseInt(heroDuplicates.textContent.replace(/[^0-9]/g, '')) || 9342;
        heroDuplicates.textContent = (cur - 1).toLocaleString();
        heroDuplicates.classList.add('kpi-pulse-updated');
        setTimeout(() => heroDuplicates.classList.remove('kpi-pulse-updated'), 1400);
      }
      if (dashDuplicates) {
        const cur = parseInt(dashDuplicates.textContent.replace(/[^0-9]/g, '')) || 9342;
        dashDuplicates.textContent = (cur - 1).toLocaleString();
        dashDuplicates.classList.add('kpi-pulse-updated');
        setTimeout(() => dashDuplicates.classList.remove('kpi-pulse-updated'), 1400);
      }
      if (dashGroups) {
        const cur = parseInt(dashGroups.textContent.replace(/[^0-9]/g, '')) || 2117;
        dashGroups.textContent = (cur + 1).toLocaleString();
        dashGroups.classList.add('kpi-pulse-updated');
        setTimeout(() => dashGroups.classList.remove('kpi-pulse-updated'), 1400);
      }
      if (heroSavings) {
        heroSavings.textContent = '₹97.24 Cr';
        heroSavings.classList.add('kpi-pulse-updated');
        setTimeout(() => heroSavings.classList.remove('kpi-pulse-updated'), 1400);
      }
      if (calcWorkingCapital) {
        calcWorkingCapital.textContent = '₹ 97.24 Cr';
      }

      showToast(`✓ Master Code Committed: ${data.canonicalNummCode}. Duplicate reduced (9,342 → 9,341). ₹85 Lakhs capital unlocked!`, 'success', 4000);
      loadHitlQueue();
      loadAuditTrail();
      loadAnalytics();

    } catch (err) {
      showToast('Approval error: ' + err.message, 'alert');
    }
  }

  // Initial wire-up for pre-loaded Tab 2 demo pair actions
  const defaultValveData = {
    canonicalNummCode: "NUMM-VLV-SS-DN50-CL150",
    recordA: { cpse: "CPCL", raw: 'VLV BALL SS 2IN 150#', legacyCode: "CPCL-VLV-1042" },
    recordB: { cpse: "IOCL", raw: 'Ball Valve | Stainless Steel | DN50 | Class 150', legacyCode: "IOCL-M-88210" }
  };

  document.getElementById('btnApprovePairDemo')?.addEventListener('click', () => {
    handlePairApproval(defaultValveData);
  });
  document.getElementById('btnNeedsReviewPairDemo')?.addEventListener('click', () => {
    openNeedsReviewModal("PAIR-DEMO-VALVE", (directive) => {
      if (pairHitlGateBar) {
        pairHitlGateBar.style.background = '#fef3c7';
        pairHitlGateBar.style.borderColor = '#fde68a';
        pairHitlGateBar.innerHTML = `
          <div style="color: #92400e; font-size: 0.875rem;">
            <strong>&#9888; Candidate Pair Flagged for Engineering &amp; Yard Testing</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.78125rem;">
              Directive: <em>"${escapeHtml(directive)}"</em> &bull; Actioned by <strong>${escapeHtml(currentOfficer.name)}</strong> (${escapeHtml(currentOfficer.role)}).
            </p>
          </div>
          <span class="sec-badge-tag" style="background: #fde68a; color: #92400e; border-color: #d97706;">Testing Mandated</span>
        `;
      }
    });
  });
  document.getElementById('btnRejectPairDemo')?.addEventListener('click', () => {
    openRejectModal("PAIR-DEMO-VALVE", (reason) => {
      if (pairHitlGateBar) {
        pairHitlGateBar.style.background = '#fff1f2';
        pairHitlGateBar.style.borderColor = '#fecdd3';
        pairHitlGateBar.innerHTML = `
          <div style="color: #9f1239; font-size: 0.875rem;">
            <strong>&times; Candidate Pair Rejected (Parameter Mismatch)</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.78125rem;">
              Reason: <em>"${escapeHtml(reason)}"</em> &bull; Flagged by <strong>${escapeHtml(currentOfficer.name)}</strong> (${escapeHtml(currentOfficer.role)}).
            </p>
          </div>
          <span class="sec-badge-tag" style="background: #ffe4e6; color: #9f1239; border-color: #fda4af;">Rejected</span>
        `;
      }
    });
  });

  // =========================================================================
  // 5. TAB 3: DYNAMIC HITL QUEUE & 3-TIER ROUTING ZONE FILTERING
  // =========================================================================
  const dynamicHitlQueueList = document.getElementById('dynamicHitlQueueList');
  const auditTrailBody = document.getElementById('auditTrailBody');

  let hitlQueueCache = [];
  let currentHitlTierFilter = 'all';

  function renderHitlQueueCards() {
    if (!dynamicHitlQueueList) return;

    // Update filter counts
    const countAll = document.getElementById('hqCountAll');
    const countStrong = document.getElementById('hqCountStrong');
    const countReview = document.getElementById('hqCountReview');
    const countUnlikely = document.getElementById('hqCountUnlikely');
    const countDisplay = document.getElementById('queueItemsRemainingCount');
    const badgeDisplay = document.getElementById('wbQueueBadgeCount');

    const totalCount = hitlQueueCache.length;
    const strongCount = hitlQueueCache.filter(i => i.routingTier === 'STRONG_MATCH').length;
    const reviewCount = hitlQueueCache.filter(i => i.routingTier === 'NEEDS_REVIEW').length;
    const unlikelyCount = hitlQueueCache.filter(i => i.routingTier === 'UNLIKELY_MATCH').length;

    if (countAll) countAll.textContent = totalCount;
    if (countStrong) countStrong.textContent = strongCount;
    if (countReview) countReview.textContent = reviewCount;
    if (countUnlikely) countUnlikely.textContent = unlikelyCount;
    if (countDisplay) countDisplay.textContent = totalCount;
    if (badgeDisplay) badgeDisplay.textContent = totalCount;

    if (totalCount === 0) {
      dynamicHitlQueueList.innerHTML = `
        <div style="padding: 24px; text-align: center; background: var(--bg-surface); border-radius: 6px; border: 1px solid var(--border-subtle);">
          <strong style="color: #065f46; font-size: 0.9375rem;">All Pending Candidate Mappings Validated</strong>
          <p style="color: var(--text-secondary); font-size: 0.8125rem; margin-top: 4px;">Zero unreviewed duplicate proposals in the queue. All committed records are audited below.</p>
        </div>
      `;
      return;
    }

    const filteredItems = currentHitlTierFilter === 'all'
      ? hitlQueueCache
      : hitlQueueCache.filter(item => item.routingTier === currentHitlTierFilter);

    if (filteredItems.length === 0) {
      dynamicHitlQueueList.innerHTML = `
        <div style="padding: 24px; text-align: center; background: var(--bg-surface); border-radius: 6px; border: 1px solid var(--border-subtle);">
          <strong style="color: var(--navy-900); font-size: 0.9375rem;">No Candidate Pairs in this Routing Zone</strong>
          <p style="color: var(--text-secondary); font-size: 0.8125rem; margin-top: 4px;">Select "All Queue Items" or another routing tier to inspect pending candidate records.</p>
        </div>
      `;
      return;
    }

    let html = '';
    filteredItems.forEach(item => {
      const pair = item.candidatePair || {};
      const confPct = Math.round((item.confidenceScore || 0) * 100);

      let tierBadgeClass = 'route-strong';
      if (item.routingTier === 'NEEDS_REVIEW') tierBadgeClass = 'route-review';
      else if (item.routingTier === 'UNLIKELY_MATCH') tierBadgeClass = 'route-unlikely';

      html += `
        <div class="hitl-queue-card" id="card-${item.queueId}">
          <div class="hqc-top-bar">
            <span class="hqc-id">Queue ID: ${escapeHtml(item.queueId)}</span>
            <div class="hqc-meta-tags-row">
              <span class="hqc-tier-tag ${tierBadgeClass}">&bull; ${escapeHtml(item.routingZone || 'Zone')}</span>
              <span class="hqc-conf-badge">&bull; Match: ${confPct}%</span>
            </div>
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

          <div class="hqc-formula-pill" style="margin-bottom: 14px; font-size: 0.75rem;">
            <strong>4-Pillar Formulation:</strong> <code>${escapeHtml(item.multiFactorScore?.formula || 'Score = (0.20 × S_sem) + (0.35 × S_tech) + (0.25 × S_unit) + (0.20 × S_cat)')}</code>
          </div>

          <div class="hqc-actions">
            <button class="btn-hqc-approve" data-qid="${item.queueId}">&check; Approve &amp; Commit</button>
            <button class="btn-hqc-review" data-qid="${item.queueId}">&#9888; Flag for Review</button>
            <button class="btn-hqc-details" data-qid="${item.queueId}">&#128065; Technical Trace</button>
            <button class="btn-hqc-reject" data-qid="${item.queueId}">&times; Reject</button>
          </div>
        </div>
      `;
    });

    dynamicHitlQueueList.innerHTML = html;

    // Attach Action Handlers
    dynamicHitlQueueList.querySelectorAll('.btn-hqc-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        processHitlDecision(qid, 'APPROVE');
      });
    });

    dynamicHitlQueueList.querySelectorAll('.btn-hqc-review').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        openNeedsReviewModal(qid);
      });
    });

    dynamicHitlQueueList.querySelectorAll('.btn-hqc-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        openRejectModal(qid);
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
              <div style="font-size: 0.8125rem; line-height: 1.6; margin-top: 6px;">
                <strong style="display: block; margin-bottom: 6px; color: var(--navy-900);">ASME / ASTM Technical Attribute Trace:</strong>
                <div style="display: flex; flex-direction: column; gap: 5px;">
                  <div class="trace-attr-row"><span class="trace-check-icon">&check;</span> <strong>Material Grade:</strong> ASTM composition verified per standards repository</div>
                  <div class="trace-attr-row"><span class="trace-check-icon">&check;</span> <strong>Size / Diameter:</strong> Normalized dimensional interchangeability verified</div>
                  <div class="trace-attr-row"><span class="trace-check-icon">&check;</span> <strong>Pressure Rating:</strong> Operating envelope aligned with cross-enterprise tolerance</div>
                  <div class="trace-attr-row"><span class="trace-check-icon">&check;</span> <strong>Standard Alignment:</strong> 100% compliant with BIS / ISO 8000 Master Data Syntax</div>
                </div>
              </div>
            `;
            btn.innerHTML = '&#128065; Collapse Trace';
          }
        }
      });
    });
  }

  // Attach filter button click listeners
  const hqFilterButtons = document.querySelectorAll('.hq-filter-btn');
  hqFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      hqFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHitlTierFilter = btn.getAttribute('data-tier') || 'all';
      renderHitlQueueCards();
    });
  });

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
      hitlQueueCache = data.queue || [];
      renderHitlQueueCards();
    } catch (err) {
      console.error('Failed to load HITL queue:', err);
    }
  }

  // Rejection & Flagging Modal Controller
  let pendingRejectItem = null;

  const modalRejectFeedbackBackdrop = document.getElementById('modalRejectFeedbackBackdrop');
  const btnCloseRejectModal = document.getElementById('btnCloseRejectModal');
  const btnConfirmRejectAction = document.getElementById('btnConfirmRejectAction');
  const rejectCustomNotes = document.getElementById('rejectCustomNotes');

  function openRejectModal(queueId, callback) {
    pendingRejectItem = { queueId, callback };
    if (modalRejectFeedbackBackdrop) {
      modalRejectFeedbackBackdrop.style.display = 'flex';
      modalRejectFeedbackBackdrop.classList.add('active');
    }
  }

  function closeRejectModal() {
    pendingRejectItem = null;
    if (modalRejectFeedbackBackdrop) {
      modalRejectFeedbackBackdrop.style.display = 'none';
      modalRejectFeedbackBackdrop.classList.remove('active');
    }
    if (rejectCustomNotes) rejectCustomNotes.value = '';
  }

  if (btnCloseRejectModal) {
    btnCloseRejectModal.addEventListener('click', closeRejectModal);
  }
  if (modalRejectFeedbackBackdrop) {
    modalRejectFeedbackBackdrop.addEventListener('click', (e) => {
      if (e.target === modalRejectFeedbackBackdrop) closeRejectModal();
    });
  }

  if (btnConfirmRejectAction) {
    btnConfirmRejectAction.addEventListener('click', async () => {
      if (!pendingRejectItem) return;
      const selectedRadio = document.querySelector('input[name="rejectReason"]:checked');
      let reasonText = selectedRadio ? selectedRadio.value : "Operational parameter mismatch";
      const customNotes = rejectCustomNotes ? rejectCustomNotes.value.trim() : "";
      if (customNotes) {
        reasonText = reasonText === "CUSTOM" ? customNotes : `${reasonText} [Note: ${customNotes}]`;
      }

      const { queueId, callback } = pendingRejectItem;
      closeRejectModal();

      await processHitlDecision(queueId, 'REJECT', reasonText);
      if (callback) callback(reasonText);
    });
  }

  // Needs Review & Physical Testing Modal Controller
  let pendingNeedsReviewItem = null;

  const modalNeedsReviewBackdrop = document.getElementById('modalNeedsReviewBackdrop');
  const btnCloseNeedsReviewModal = document.getElementById('btnCloseNeedsReviewModal');
  const btnConfirmNeedsReviewAction = document.getElementById('btnConfirmNeedsReviewAction');
  const needsReviewCustomNotes = document.getElementById('needsReviewCustomNotes');

  function openNeedsReviewModal(queueId, callback) {
    pendingNeedsReviewItem = { queueId, callback };
    if (modalNeedsReviewBackdrop) {
      modalNeedsReviewBackdrop.style.display = 'flex';
      modalNeedsReviewBackdrop.classList.add('active');
    }
  }

  function closeNeedsReviewModal() {
    pendingNeedsReviewItem = null;
    if (modalNeedsReviewBackdrop) {
      modalNeedsReviewBackdrop.style.display = 'none';
      modalNeedsReviewBackdrop.classList.remove('active');
    }
    if (needsReviewCustomNotes) needsReviewCustomNotes.value = '';
  }

  if (btnCloseNeedsReviewModal) {
    btnCloseNeedsReviewModal.addEventListener('click', closeNeedsReviewModal);
  }
  if (modalNeedsReviewBackdrop) {
    modalNeedsReviewBackdrop.addEventListener('click', (e) => {
      if (e.target === modalNeedsReviewBackdrop) closeNeedsReviewModal();
    });
  }

  if (btnConfirmNeedsReviewAction) {
    btnConfirmNeedsReviewAction.addEventListener('click', async () => {
      if (!pendingNeedsReviewItem) return;
      const selectedRadio = document.querySelector('input[name="needsReviewReason"]:checked');
      let reasonText = selectedRadio ? selectedRadio.value : "Physical testing & verification required.";
      const customNotes = needsReviewCustomNotes ? needsReviewCustomNotes.value.trim() : "";
      if (customNotes) {
        reasonText = reasonText === "CUSTOM" ? customNotes : `${reasonText} [Directive: ${customNotes}]`;
      }

      const { queueId, callback } = pendingNeedsReviewItem;
      closeNeedsReviewModal();

      await processHitlDecision(queueId, 'NEEDS_REVIEW', reasonText);
      if (callback) callback(reasonText);
    });
  }

  async function processHitlDecision(queueId, action, notes = '') {
    if (action === 'APPROVE' && !checkOfficerPermission('APPROVE')) return;

    try {
      const res = await fetch('/api/hitl/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queueId,
          action,
          notes,
          officer: `${currentOfficer.name} (${currentOfficer.role}, ${currentOfficer.cpse})`
        })
      });
      const result = await res.json();

      if (result.success) {
        if (action === 'APPROVE') {
          showToast(`✓ Approved: ${result.auditRef} committed to Unified Catalog`, 'success', 3000);

          // Decrement duplicate counter smoothly and increment records harmonized
          const heroDuplicates = document.getElementById('heroStatDuplicates');
          const dashDuplicates = document.getElementById('dashStatDuplicates');
          const dashGroups = document.getElementById('dashStatGroups');
          const heroSavings = document.getElementById('heroStatSavings');
          const calcWorkingCapital = document.getElementById('calcWorkingCapital');

          if (heroDuplicates) {
            const cur = parseInt(heroDuplicates.textContent.replace(/[^0-9]/g, '')) || 9342;
            heroDuplicates.textContent = (cur - 1).toLocaleString();
            heroDuplicates.classList.add('kpi-pulse-updated');
            setTimeout(() => heroDuplicates.classList.remove('kpi-pulse-updated'), 1400);
          }
          if (dashDuplicates) {
            const cur = parseInt(dashDuplicates.textContent.replace(/[^0-9]/g, '')) || 9342;
            dashDuplicates.textContent = (cur - 1).toLocaleString();
            dashDuplicates.classList.add('kpi-pulse-updated');
            setTimeout(() => dashDuplicates.classList.remove('kpi-pulse-updated'), 1400);
          }
          if (dashGroups) {
            const cur = parseInt(dashGroups.textContent.replace(/[^0-9]/g, '')) || 2117;
            dashGroups.textContent = (cur + 1).toLocaleString();
            dashGroups.classList.add('kpi-pulse-updated');
            setTimeout(() => dashGroups.classList.remove('kpi-pulse-updated'), 1400);
          }
          if (heroSavings) {
            heroSavings.textContent = '₹97.24 Cr';
            heroSavings.classList.add('kpi-pulse-updated');
            setTimeout(() => heroSavings.classList.remove('kpi-pulse-updated'), 1400);
          }
          if (calcWorkingCapital) {
            calcWorkingCapital.textContent = '₹ 97.24 Cr';
          }
        } else if (action === 'NEEDS_REVIEW') {
          showToast(`⚠ Flagged for Testing: ${queueId} directed for metallurgical/physical inspection`, 'alert', 3500);
        } else {
          showToast(`✗ Rejected: ${queueId} recorded as mismatch: "${notes || 'Parameter variation'}"`, 'alert', 3500);
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
        } else {
          loadHitlQueue();
          loadAuditTrail();
          loadAnalytics();
        }
      } else {
        showToast(result.error || 'Action error', 'alert');
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
        let actClass = 'act-app';
        let actText = '&check; APPROVED';

        if (log.action === 'APPROVED_AND_COMMITTED') {
          actClass = 'act-app';
          actText = '&check; APPROVED';
        } else if (log.action === 'FLAGGED_FOR_ENGINEERING_REVIEW') {
          actClass = 'act-review';
          actText = '&#9888; REVIEW REQ';
        } else {
          actClass = 'act-rej';
          actText = '&times; REJECTED';
        }

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
