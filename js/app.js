'use strict';

/**
 * Genital Piercing Anatomy Suitability Checker, V2 Application Logic
 * Pure client-side, zero external libraries.
 */

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const PLACEMENTS = [
  {
    id: 'vch',
    anatomy: 'female',
    aliases: ['vch', 'vertical clitoral hood', 'clit hood piercing', 'hood piercing', 'vertical hood', 'clitoral hood', 'clit piercing', 'hood'],
    nameKey: 'piercing.vch.name',
    descKey: 'piercing.vch.desc',
    anatomyReqKey: 'piercing.vch.anatomy_req',
    inPersonEvalKey: 'piercing.vch.in_person_eval',
    whyRefusedKey: 'piercing.vch.why_refused',
    healingKey: 'piercing.vch.healing_text',
    jewelleryKey: 'piercing.vch.jewellery_text',
    questionKeys: [
      'piercing.vch.q1',
      'piercing.vch.q2',
      'piercing.vch.q3',
      'piercing.vch.q4'
    ]
  },
  {
    id: 'hch',
    anatomy: 'female',
    aliases: ['hch', 'horizontal clitoral hood', 'horizontal hood', 'hood', 'clit hood horizontal'],
    nameKey: 'piercing.hch.name',
    descKey: 'piercing.hch.desc',
    anatomyReqKey: 'piercing.hch.anatomy_req',
    inPersonEvalKey: 'piercing.hch.in_person_eval',
    whyRefusedKey: 'piercing.hch.why_refused',
    healingKey: 'piercing.hch.healing_text',
    jewelleryKey: 'piercing.hch.jewellery_text',
    questionKeys: [
      'piercing.hch.q1',
      'piercing.hch.q2',
      'piercing.hch.q3',
      'piercing.hch.q4'
    ]
  },
  {
    id: 'triangle',
    anatomy: 'female',
    aliases: ['triangle', 'triangle piercing', 'deep hood', 'sub shaft'],
    nameKey: 'piercing.triangle.name',
    descKey: 'piercing.triangle.desc',
    anatomyReqKey: 'piercing.triangle.anatomy_req',
    inPersonEvalKey: 'piercing.triangle.in_person_eval',
    whyRefusedKey: 'piercing.triangle.why_refused',
    healingKey: 'piercing.triangle.healing_text',
    jewelleryKey: 'piercing.triangle.jewellery_text',
    questionKeys: [
      'piercing.triangle.q1',
      'piercing.triangle.q2',
      'piercing.triangle.q3',
      'piercing.triangle.q4'
    ]
  },
  {
    id: 'christina',
    anatomy: 'female',
    aliases: ['christina', 'venus', 'venus piercing', 'pubic piercing', 'pubic mound', 'mons pubis'],
    nameKey: 'piercing.christina.name',
    descKey: 'piercing.christina.desc',
    anatomyReqKey: 'piercing.christina.anatomy_req',
    inPersonEvalKey: 'piercing.christina.in_person_eval',
    whyRefusedKey: 'piercing.christina.why_refused',
    healingKey: 'piercing.christina.healing_text',
    jewelleryKey: 'piercing.christina.jewellery_text',
    questionKeys: [
      'piercing.christina.q1',
      'piercing.christina.q2',
      'piercing.christina.q3',
      'piercing.christina.q4'
    ]
  },
  {
    id: 'inner_labia',
    anatomy: 'female',
    aliases: ['inner labia', 'labia minora', 'labia', 'inner lips', 'minora'],
    nameKey: 'piercing.inner_labia.name',
    descKey: 'piercing.inner_labia.desc',
    anatomyReqKey: 'piercing.inner_labia.anatomy_req',
    inPersonEvalKey: 'piercing.inner_labia.in_person_eval',
    whyRefusedKey: 'piercing.inner_labia.why_refused',
    healingKey: 'piercing.inner_labia.healing_text',
    jewelleryKey: 'piercing.inner_labia.jewellery_text',
    questionKeys: [
      'piercing.inner_labia.q1',
      'piercing.inner_labia.q2',
      'piercing.inner_labia.q3',
      'piercing.inner_labia.q4'
    ]
  },
  {
    id: 'outer_labia',
    anatomy: 'female',
    aliases: ['outer labia', 'labia majora', 'outer lips', 'majora'],
    nameKey: 'piercing.outer_labia.name',
    descKey: 'piercing.outer_labia.desc',
    anatomyReqKey: 'piercing.outer_labia.anatomy_req',
    inPersonEvalKey: 'piercing.outer_labia.in_person_eval',
    whyRefusedKey: 'piercing.outer_labia.why_refused',
    healingKey: 'piercing.outer_labia.healing_text',
    jewelleryKey: 'piercing.outer_labia.jewellery_text',
    questionKeys: [
      'piercing.outer_labia.q1',
      'piercing.outer_labia.q2',
      'piercing.outer_labia.q3',
      'piercing.outer_labia.q4'
    ]
  },
  {
    id: 'fourchette',
    anatomy: 'female',
    aliases: ['fourchette', 'posterior fourchette', 'perineum female', 'fourchet'],
    nameKey: 'piercing.fourchette.name',
    descKey: 'piercing.fourchette.desc',
    anatomyReqKey: 'piercing.fourchette.anatomy_req',
    inPersonEvalKey: 'piercing.fourchette.in_person_eval',
    whyRefusedKey: 'piercing.fourchette.why_refused',
    healingKey: 'piercing.fourchette.healing_text',
    jewelleryKey: 'piercing.fourchette.jewellery_text',
    questionKeys: [
      'piercing.fourchette.q1',
      'piercing.fourchette.q2',
      'piercing.fourchette.q3',
      'piercing.fourchette.q4'
    ]
  },
  {
    id: 'pa',
    anatomy: 'male',
    aliases: ['pa', 'prince albert', 'prince albert piercing', 'urethral piercing', 'urethra'],
    nameKey: 'piercing.pa.name',
    descKey: 'piercing.pa.desc',
    anatomyReqKey: 'piercing.pa.anatomy_req',
    inPersonEvalKey: 'piercing.pa.in_person_eval',
    whyRefusedKey: 'piercing.pa.why_refused',
    healingKey: 'piercing.pa.healing_text',
    jewelleryKey: 'piercing.pa.jewellery_text',
    questionKeys: [
      'piercing.pa.q1',
      'piercing.pa.q2',
      'piercing.pa.q3',
      'piercing.pa.q4'
    ]
  },
  {
    id: 'reverse_pa',
    anatomy: 'male',
    aliases: ['reverse pa', 'reverse prince albert', 'dorsal pa', 'top pa'],
    nameKey: 'piercing.reverse_pa.name',
    descKey: 'piercing.reverse_pa.desc',
    anatomyReqKey: 'piercing.reverse_pa.anatomy_req',
    inPersonEvalKey: 'piercing.reverse_pa.in_person_eval',
    whyRefusedKey: 'piercing.reverse_pa.why_refused',
    healingKey: 'piercing.reverse_pa.healing_text',
    jewelleryKey: 'piercing.reverse_pa.jewellery_text',
    questionKeys: [
      'piercing.reverse_pa.q1',
      'piercing.reverse_pa.q2',
      'piercing.reverse_pa.q3',
      'piercing.reverse_pa.q4'
    ]
  },
  {
    id: 'apadravya',
    anatomy: 'male',
    aliases: ['apadravya', 'apa', 'vertical glans', 'glans vertical', 'trans glans'],
    nameKey: 'piercing.apadravya.name',
    descKey: 'piercing.apadravya.desc',
    anatomyReqKey: 'piercing.apadravya.anatomy_req',
    inPersonEvalKey: 'piercing.apadravya.in_person_eval',
    whyRefusedKey: 'piercing.apadravya.why_refused',
    healingKey: 'piercing.apadravya.healing_text',
    jewelleryKey: 'piercing.apadravya.jewellery_text',
    questionKeys: [
      'piercing.apadravya.q1',
      'piercing.apadravya.q2',
      'piercing.apadravya.q3',
      'piercing.apadravya.q4'
    ]
  },
  {
    id: 'ampallang',
    anatomy: 'male',
    aliases: ['ampallang', 'horizontal glans', 'glans horizontal', 'cross glans'],
    nameKey: 'piercing.ampallang.name',
    descKey: 'piercing.ampallang.desc',
    anatomyReqKey: 'piercing.ampallang.anatomy_req',
    inPersonEvalKey: 'piercing.ampallang.in_person_eval',
    whyRefusedKey: 'piercing.ampallang.why_refused',
    healingKey: 'piercing.ampallang.healing_text',
    jewelleryKey: 'piercing.ampallang.jewellery_text',
    questionKeys: [
      'piercing.ampallang.q1',
      'piercing.ampallang.q2',
      'piercing.ampallang.q3',
      'piercing.ampallang.q4'
    ]
  },
  {
    id: 'frenum',
    anatomy: 'male',
    aliases: ['frenum', 'frenulum', 'underside shaft', 'frenum ladder', 'shaft piercing'],
    nameKey: 'piercing.frenum.name',
    descKey: 'piercing.frenum.desc',
    anatomyReqKey: 'piercing.frenum.anatomy_req',
    inPersonEvalKey: 'piercing.frenum.in_person_eval',
    whyRefusedKey: 'piercing.frenum.why_refused',
    healingKey: 'piercing.frenum.healing_text',
    jewelleryKey: 'piercing.frenum.jewellery_text',
    questionKeys: [
      'piercing.frenum.q1',
      'piercing.frenum.q2',
      'piercing.frenum.q3',
      'piercing.frenum.q4'
    ]
  },
  {
    id: 'guiche',
    anatomy: 'neutral',
    aliases: ['guiche', 'perineum', 'perineal piercing', 'raphe', 'perineal raphe'],
    nameKey: 'piercing.guiche.name',
    descKey: 'piercing.guiche.desc',
    anatomyReqKey: 'piercing.guiche.anatomy_req',
    inPersonEvalKey: 'piercing.guiche.in_person_eval',
    whyRefusedKey: 'piercing.guiche.why_refused',
    healingKey: 'piercing.guiche.healing_text',
    jewelleryKey: 'piercing.guiche.jewellery_text',
    questionKeys: [
      'piercing.guiche.q1',
      'piercing.guiche.q2',
      'piercing.guiche.q3',
      'piercing.guiche.q4'
    ]
  },
  {
    id: 'dydoe',
    anatomy: 'male',
    aliases: ['dydoe', 'corona ridge', 'glans ridge', 'corona', 'dydoes'],
    nameKey: 'piercing.dydoe.name',
    descKey: 'piercing.dydoe.desc',
    anatomyReqKey: 'piercing.dydoe.anatomy_req',
    inPersonEvalKey: 'piercing.dydoe.in_person_eval',
    whyRefusedKey: 'piercing.dydoe.why_refused',
    healingKey: 'piercing.dydoe.healing_text',
    jewelleryKey: 'piercing.dydoe.jewellery_text',
    questionKeys: [
      'piercing.dydoe.q1',
      'piercing.dydoe.q2',
      'piercing.dydoe.q3',
      'piercing.dydoe.q4'
    ]
  }
];

// DOM references
const langSelect = document.getElementById('language-select');
const searchInput = document.getElementById('placement-search');
const clearSearchBtn = document.getElementById('clear-search-btn');
const anatomyFilter = document.getElementById('anatomy-filter');
const placementSelect = document.getElementById('placement-select');
const placementCardContainer = document.getElementById('placement-card-container');
const clientNotesArea = document.getElementById('client-notes-area');
const saveNotesCheckbox = document.getElementById('save-notes-checkbox');
const clearNotesBtn = document.getElementById('clear-notes-btn');
const printSheetBtn = document.getElementById('print-sheet-btn');
const sharedReasonsContainer = document.getElementById('shared-reasons-container');
const talkingPointsMount = document.getElementById('talking-points-mount');

// State
let selectedPlacementId = 'vch';
let openDiagrams = {};
const STORAGE_NOTES_KEY = 'poli_genital_suitability_notes';
const STORAGE_OPTIN_KEY = 'poli_genital_suitability_save_optin';

// Initialize Language Selector
function initLanguageSelector() {
  if (!langSelect) return;
  langSelect.innerHTML = '';
  window.I18N_LANGUAGES.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang.code;
    opt.textContent = lang.name;
    if (lang.code === window.getCurrentLanguage()) {
      opt.selected = true;
    }
    langSelect.appendChild(opt);
  });
  langSelect.addEventListener('change', () => {
    window.setLanguage(langSelect.value);
  });
}

// Update static i18n strings in DOM
function translateStaticDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = window.t(key);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    const [attr, key] = spec.split(':');
    el.setAttribute(attr, window.t(key));
  });
  const pageTitle = window.t('app.page_title');
  if (pageTitle && pageTitle !== 'app.page_title') {
    document.title = pageTitle;
  }
}

// Filter and populate placements in the dropdown
function populatePlacementSelect() {
  const filter = anatomyFilter.value;
  const term = (searchInput.value || '').trim().toLowerCase();

  const filtered = PLACEMENTS.filter(p => {
    const matchesAnatomy = filter === 'all' || p.anatomy === filter || (filter === 'neutral' && p.anatomy === 'neutral');
    if (!matchesAnatomy) return false;
    if (!term) return true;

    // Search term matching against name, id, and aliases
    const name = window.t(p.nameKey).toLowerCase();
    const matchesTerm = p.id.toLowerCase().includes(term) ||
      name.includes(term) ||
      p.aliases.some(alias => alias.includes(term));
    return matchesTerm;
  });

  placementSelect.innerHTML = `<option value="">${escHtml(window.t('action.select_placement_option'))}</option>`;
  filtered.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = window.t(p.nameKey);
    if (p.id === selectedPlacementId) {
      opt.selected = true;
    }
    placementSelect.appendChild(opt);
  });

  // If currently selected placement is not in filtered list, pick the first one
  if (filtered.length > 0 && !filtered.some(p => p.id === selectedPlacementId)) {
    selectedPlacementId = filtered[0].id;
    placementSelect.value = selectedPlacementId;
  } else if (filtered.length === 0) {
    selectedPlacementId = '';
  }

  renderPlacementCard();
}

// Render the active placement card
function renderPlacementCard() {
  if (!placementCardContainer) return;
  const p = PLACEMENTS.find(item => item.id === selectedPlacementId);
  if (!p) {
    placementCardContainer.innerHTML = `
      <div class="card card--empty">
        <p>${escHtml(window.t('action.select_placement_empty'))}</p>
      </div>`;
    renderTalkingPoints();
    return;
  }

  const isDiagramOpen = !!openDiagrams[p.id];
  const diagramHtml = window.getPlacementDiagram ? window.getPlacementDiagram(p.id) : '';

  const questionsListHtml = p.questionKeys
    .map((qKey, i) => `<li><strong>${escHtml(window.t('question.prefix', { num: i + 1 }))}</strong> ${escHtml(window.t(qKey))}</li>`)
    .join('');

  placementCardContainer.innerHTML = `
    <article class="card card--placement" id="card-${escHtml(p.id)}">
      <header class="card-header">
        <div class="card-title-row">
          <h2 class="card-title">${escHtml(window.t(p.nameKey))}</h2>
          <span class="badge badge--anatomy">${escHtml(window.t('anatomy.' + p.anatomy))}</span>
        </div>
        <p class="card-desc">${escHtml(window.t(p.descKey))}</p>
      </header>

      <!-- Quiet reading: Collapsible schematic diagram -->
      <div class="diagram-section">
        <button type="button" class="btn btn--toggle-diagram" id="btn-toggle-diagram-${escHtml(p.id)}" aria-expanded="${isDiagramOpen}">
          <span class="btn-icon" aria-hidden="true">${isDiagramOpen ? '▼' : '►'}</span>
          <span>${escHtml(isDiagramOpen ? window.t('action.hide_diagram') : window.t('action.show_diagram'))}</span>
        </button>
        <div class="diagram-container" id="diagram-container-${escHtml(p.id)}" ${isDiagramOpen ? '' : 'hidden'}>
          <div class="diagram-wrapper">
            ${diagramHtml}
          </div>
        </div>
      </div>

      <!-- Section: Anatomy Required & Why -->
      <div class="card-section">
        <h3 class="section-heading">${escHtml(window.t('section.anatomy_req_title'))}</h3>
        <p class="section-body">${escHtml(window.t(p.anatomyReqKey))}</p>
      </div>

      <!-- Section: In-Person Assessment -->
      <div class="card-section">
        <h3 class="section-heading">${escHtml(window.t('section.in_person_eval_title'))}</h3>
        <p class="section-body">${escHtml(window.t(p.inPersonEvalKey))}</p>
      </div>

      <!-- Section: Common Reasons a Piercer Says No -->
      <div class="card-section card-section--warning">
        <h3 class="section-heading heading--warning">${escHtml(window.t('section.why_refused_title'))}</h3>
        <p class="section-body">${escHtml(window.t(p.whyRefusedKey))}</p>
      </div>

      <!-- Section: Healing and Starting Jewellery Facts -->
      <div class="card-section card-section--facts">
        <h3 class="section-heading">${escHtml(window.t('section.healing_jewellery_title'))}</h3>
        <div class="facts-grid">
          <div class="fact-item">
            <span class="fact-label">${escHtml(window.t('fact.typical_healing'))}:</span>
            <span class="fact-value">${escHtml(window.t(p.healingKey))}</span>
            <a href="https://poliinternational.com/aftercare-schedule-generator/" target="_top" class="fact-link">${escHtml(window.t('fact.aftercare_link'))} →</a>
          </div>
          <div class="fact-item">
            <span class="fact-label">${escHtml(window.t('fact.starting_jewellery'))}:</span>
            <span class="fact-value">${escHtml(window.t(p.jewelleryKey))}</span>
            <a href="https://poliinternational.com/jewelry-size-visualizer/" target="_top" class="fact-link">${escHtml(window.t('fact.sizing_link'))} →</a>
          </div>
        </div>
        <div class="fact-item fact-item--extra">
          <a href="https://poliinternational.com/piercing-migration-risk/" target="_top" class="fact-link">${escHtml(window.t('fact.migration_link'))} →</a>
        </div>
        <p class="fact-subtext">${escHtml(window.t('fact.bioflex_note'))}</p>
      </div>

      <!-- Section: Questions to Ask Your Piercer -->
      <div class="card-section card-section--questions">
        <div class="questions-header">
          <h3 class="section-heading">${escHtml(window.t('section.questions_title'))}</h3>
        </div>
        <ul class="questions-list">
          ${questionsListHtml}
        </ul>
        <div class="card-actions">
          <button type="button" class="btn btn--primary" id="btn-print-from-card" onclick="window.printConsultationSheet()">
            <span aria-hidden="true">🖨️ </span>${escHtml(window.t('action.print_sheet'))}
          </button>
        </div>
      </div>
    </article>`;

  renderTalkingPoints();

  // Bind diagram toggle
  const toggleBtn = document.getElementById(`btn-toggle-diagram-${p.id}`);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      openDiagrams[p.id] = !openDiagrams[p.id];
      renderPlacementCard();
    });
  }
}

// The worksheet's ending: the points to raise at the consultation, taken from
// the placement currently being read. Re-rendered with the card, so it follows
// both a placement change and a language change.
function renderTalkingPoints() {
  if (!talkingPointsMount) return;
  const p = PLACEMENTS.find(item => item.id === selectedPlacementId);
  if (!p) {
    talkingPointsMount.innerHTML = '';
    return;
  }
  const items = p.questionKeys
    .map(qKey => `<li>${escHtml(window.t(qKey))}</li>`)
    .join('');
  talkingPointsMount.innerHTML = `
    <h3 class="talking-points__title">${escHtml(window.t('prompt.talking_points'))}</h3>
    <p class="talking-points__context">${escHtml(window.t(p.nameKey))}</p>
    <ul class="talking-points__list">${items}</ul>`;
}

// Render the shared "Why a Piercer Says No" section
function renderSharedReasons() {
  if (!sharedReasonsContainer) return;
  sharedReasonsContainer.innerHTML = `
    <div class="shared-reasons-grid">
      <div class="shared-reason-card">
        <h4>${escHtml(window.t('shared.reason.1_title'))}</h4>
        <p>${escHtml(window.t('shared.reason.1_desc'))}</p>
      </div>
      <div class="shared-reason-card">
        <h4>${escHtml(window.t('shared.reason.2_title'))}</h4>
        <p>${escHtml(window.t('shared.reason.2_desc'))}</p>
      </div>
      <div class="shared-reason-card">
        <h4>${escHtml(window.t('shared.reason.3_title'))}</h4>
        <p>${escHtml(window.t('shared.reason.3_desc'))}</p>
      </div>
      <div class="shared-reason-card">
        <h4>${escHtml(window.t('shared.reason.4_title'))}</h4>
        <p>${escHtml(window.t('shared.reason.4_desc'))}</p>
      </div>
      <div class="shared-reason-card">
        <h4>${escHtml(window.t('shared.reason.5_title'))}</h4>
        <p>${escHtml(window.t('shared.reason.5_desc'))}</p>
      </div>
    </div>`;
}

// Print consultation sheet helper
window.printConsultationSheet = function() {
  const p = PLACEMENTS.find(item => item.id === selectedPlacementId) || PLACEMENTS[0];
  const printContainer = document.getElementById('printable-consultation-sheet');
  if (!printContainer) {
    window.print();
    return;
  }

  const userNotes = (clientNotesArea && clientNotesArea.value) ? clientNotesArea.value.trim() : '';
  const questionsHtml = p.questionKeys
    .map((qKey, i) => `<li><strong>${escHtml(window.t('question.prefix', { num: i + 1 }))}</strong> ${escHtml(window.t(qKey))}</li>`)
    .join('');

  printContainer.innerHTML = `
    <div class="print-page">
      <div class="print-header">
        <h1>${escHtml(window.t('print.sheet_title'))}</h1>
        <p class="print-sub">${escHtml(window.t('print.notice'))}</p>
      </div>

      <div class="print-section">
        <h2>${escHtml(window.t(p.nameKey))} (${escHtml(window.t('anatomy.' + p.anatomy))})</h2>
        <p><strong>${escHtml(window.t('section.anatomy_req_title'))}:</strong> ${escHtml(window.t(p.anatomyReqKey))}</p>
        <p><strong>${escHtml(window.t('fact.typical_healing'))}:</strong> ${escHtml(window.t(p.healingKey))}</p>
        <p><strong>${escHtml(window.t('fact.starting_jewellery'))}:</strong> ${escHtml(window.t(p.jewelleryKey))}</p>
      </div>

      <div class="print-section">
        <h3>${escHtml(window.t('section.questions_title'))}</h3>
        <ul class="print-list">
          ${questionsHtml}
        </ul>
      </div>

      <div class="print-section">
        <h3>${escHtml(window.t('prompt.talking_points'))}</h3>
        <ul class="print-list">${questionsHtml}</ul>
      </div>

      <div class="print-section">
        <h3>${escHtml(window.t('prompt.personal_notes'))}</h3>
        <div class="print-notes-box">
          ${userNotes ? `<p>${escHtml(userNotes).replace(/\n/g, '<br>')}</p>` : `<p class="print-empty">${escHtml(window.t('print.no_notes'))}</p>`}
        </div>
      </div>

      <div class="print-footer">
        <p>${escHtml(window.t('disclaimer.body'))}</p>
      </div>
    </div>
  `;

  window.print();
};

// Privacy and localStorage notes handling
function loadSavedNotes() {
  try {
    const optIn = localStorage.getItem(STORAGE_OPTIN_KEY) === 'true';
    if (saveNotesCheckbox) {
      saveNotesCheckbox.checked = optIn;
    }
    if (optIn) {
      const savedNotes = localStorage.getItem(STORAGE_NOTES_KEY);
      if (savedNotes && clientNotesArea) {
        clientNotesArea.value = savedNotes;
      }
    }
  } catch (e) {
    // LocalStorage blocked
  }
}

function handleNotesInput() {
  if (saveNotesCheckbox && saveNotesCheckbox.checked) {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, clientNotesArea.value);
    } catch (e) {}
  }
}

function handleOptInToggle() {
  try {
    if (saveNotesCheckbox.checked) {
      localStorage.setItem(STORAGE_OPTIN_KEY, 'true');
      localStorage.setItem(STORAGE_NOTES_KEY, clientNotesArea.value);
    } else {
      localStorage.removeItem(STORAGE_OPTIN_KEY);
      localStorage.removeItem(STORAGE_NOTES_KEY);
    }
  } catch (e) {}
}

function clearAllNotes() {
  if (clientNotesArea) {
    clientNotesArea.value = '';
  }
  if (saveNotesCheckbox) {
    saveNotesCheckbox.checked = false;
  }
  try {
    localStorage.removeItem(STORAGE_OPTIN_KEY);
    localStorage.removeItem(STORAGE_NOTES_KEY);
  } catch (e) {}
}

// Setup Event Listeners
function setupEvents() {
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      populatePlacementSelect();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      populatePlacementSelect();
      searchInput.focus();
    });
  }

  if (anatomyFilter) {
    anatomyFilter.addEventListener('change', () => {
      populatePlacementSelect();
    });
  }

  if (placementSelect) {
    placementSelect.addEventListener('change', () => {
      selectedPlacementId = placementSelect.value;
      renderPlacementCard();
    });
  }

  if (clientNotesArea) {
    clientNotesArea.addEventListener('input', handleNotesInput);
  }

  if (saveNotesCheckbox) {
    saveNotesCheckbox.addEventListener('change', handleOptInToggle);
  }

  if (clearNotesBtn) {
    clearNotesBtn.addEventListener('click', clearAllNotes);
  }

  if (printSheetBtn) {
    printSheetBtn.addEventListener('click', window.printConsultationSheet);
  }

  window.addEventListener('poli-language-changed', () => {
    translateStaticDOM();
    populatePlacementSelect();
    renderSharedReasons();
  });
}

// Initial boot
initLanguageSelector();
translateStaticDOM();
loadSavedNotes();
populatePlacementSelect();
renderSharedReasons();
setupEvents();
