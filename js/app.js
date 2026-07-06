'use strict';

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const PIERCINGS = [
  {
    id: 'vch',
    name: 'VCH (Vertical Clitoral Hood)',
    anatomy: 'female',
    desc: 'Passes vertically through the clitoral hood fold.',
    suitability: 'Approximately 70–80% of anatomy is suitable. The hood must have sufficient depth and forward projection to support the barbell without pressure on the glans.',
    gauge: '14g (1.6 mm)',
    healing: '4–8 weeks',
    material: 'Curved barbell — BioFlex® or implant-grade titanium',
    risks: 'Incorrect sizing causes pressure on the clitoris and nerve sensitivity changes. Hood must be assessed in person by an APP-certified piercer using a taper test.',
    suitabilityTest: 'The Q-tip test: if a Q-tip inserted under the hood can stand upright with only gentle support, anatomy is likely suitable.',
    contraindications: ['Very small or low-set clitoral hood', 'Prior scarring from hood reduction procedures', 'Sensitivity disorders requiring avoidance of pressure'],
  },
  {
    id: 'hch',
    name: 'HCH (Horizontal Clitoral Hood)',
    anatomy: 'female',
    desc: 'Passes horizontally through the top of the clitoral hood.',
    suitability: 'Suitable for most anatomy types. Less dependent on hood depth than VCH, but requires sufficient tissue width for the horizontal placement.',
    gauge: '14g or 16g (1.6–1.2 mm)',
    healing: '4–8 weeks',
    material: 'Curved barbell or small circular barbell — BioFlex® recommended',
    risks: 'Migration is more common than VCH due to surface-type placement. Thin tissue or significant movement increases rejection risk.',
    suitabilityTest: 'Assess hood width and tissue pinchability — tissue must be pinchable to at least 5 mm at the intended placement site.',
    contraindications: ['Very thin hood tissue', 'History of surface piercing rejection', 'Active skin conditions in area'],
  },
  {
    id: 'triangle',
    name: 'Triangle Piercing',
    anatomy: 'female',
    desc: 'Passes horizontally behind the clitoral shaft, beneath the hood.',
    suitability: 'Anatomy-dependent. Requires sufficient space behind the clitoral shaft for the barbell to pass without pressure. Only 40–50% of anatomy assessed as suitable.',
    gauge: '12g (2.0 mm)',
    healing: '6–9 months',
    material: 'Curved barbell — implant-grade titanium preferred for initial piece',
    risks: 'Most anatomy-dependent of all hood piercings. Incorrect placement risks nerve damage. Must be performed only by highly experienced APP-certified piercers.',
    suitabilityTest: 'Requires in-person assessment by an experienced APP piercer. Not assessable without professional examination.',
    contraindications: ['Small or recessed clitoral anatomy', 'Insufficient space behind the shaft', 'History of nerve sensitivity issues'],
  },
  {
    id: 'fourchette',
    name: 'Fourchette',
    anatomy: 'female',
    desc: 'Passes through the tissue at the posterior fourchette (perineum fold).',
    suitability: 'Requires a distinct, pinchable tissue fold at the posterior fourchette. Approximately 50–60% of anatomy has sufficient tissue. Not assessable without in-person examination.',
    gauge: '14g or 16g (1.6–1.2 mm)',
    healing: '6–9 months',
    material: 'Curved barbell — BioFlex® strongly recommended for flexibility during movement',
    risks: 'High migration risk due to movement stress. BioFlex® significantly reduces rejection rate in this placement compared to rigid metal.',
    suitabilityTest: 'Tissue at the fourchette must be distinctly pinchable to at least 6–8 mm depth with no skin tension.',
    contraindications: ['Flat posterior anatomy', 'History of episiotomy or perineal scarring', 'Chronic skin irritation in area'],
  },
  {
    id: 'pa',
    name: 'PA (Prince Albert)',
    anatomy: 'male',
    desc: 'Enters through the urethral opening and exits below the glans.',
    suitability: 'Suitable for the vast majority of male anatomy. The urethral opening must accommodate the gauge — 12g or 14g entry is standard.',
    gauge: '12g or 10g (2.0–2.4 mm)',
    healing: '4–8 weeks',
    material: 'Circular barbell or curved barbell — implant-grade titanium or BioFlex®',
    risks: 'Urine stream redirection is common and permanent post-healing. Downsizing too early risks the piercing closing around the jewellery.',
    suitabilityTest: 'No structural test required — assessed by anatomy and piercer experience. Discuss urine redirection implications pre-piercing.',
    contraindications: ['Active urinary tract infection', 'Urethral stricture or prior urethral surgery', 'Certain prostate conditions — consult a physician'],
  },
  {
    id: 'apadravya',
    name: 'Apadravya',
    anatomy: 'male',
    desc: 'Passes vertically through the glans from the urethral meatus to the top of the glans.',
    suitability: 'Requires sufficient glans thickness for the vertical pass. Most anatomy is structurally suitable, but this is a complex piercing requiring an experienced APP piercer.',
    gauge: '12g or 10g (2.0–2.4 mm)',
    healing: '6–12 months',
    material: 'Straight barbell — implant-grade titanium (initial piece; BioFlex® not recommended for straight barbells in deep tissue)',
    risks: 'Longer healing than PA. Urine stream is affected. Erection-related stress is significant during healing — healing compliance is critical.',
    suitabilityTest: 'In-person assessment only. Glans size and structural depth must be evaluated by the piercer.',
    contraindications: ['Thin or small glans anatomy', 'Active infection', 'Prior failed PA or glans piercings'],
  },
  {
    id: 'ampallang',
    name: 'Ampallang',
    anatomy: 'male',
    desc: 'Passes horizontally through the glans, either through or above the urethra.',
    suitability: 'Anatomy-dependent. Horizontal glans dimension determines suitable barbell length. The urethra position determines transurethral vs supratetral placement.',
    gauge: '12g or 10g (2.0–2.4 mm)',
    healing: '6–12 months',
    material: 'Straight barbell — implant-grade titanium',
    risks: 'One of the slower-healing male genital piercings. Erection stress is high during healing. Incorrect sizing or movement causes significant scar tissue.',
    suitabilityTest: 'In-person assessment of glans width and urethra position required.',
    contraindications: ['Narrow glans', 'Phimosis (unretractable foreskin)', 'Active infection or prior glans scarring'],
  },
  {
    id: 'dydoe',
    name: 'Dydoe',
    anatomy: 'male',
    desc: 'Passes through the ridge of the glans corona, typically placed in pairs.',
    suitability: 'Requires a pronounced, defined glans corona ridge. Flat or subtle anatomy is unsuitable. Often placed in bilateral pairs for balance.',
    gauge: '14g or 12g (1.6–2.0 mm)',
    healing: '4–6 months',
    material: 'Curved barbell — BioFlex® or implant-grade titanium',
    risks: 'High rejection risk if anatomy is insufficiently pronounced. Erection stress during healing can cause migration — flexible material reduces this.',
    suitabilityTest: 'Corona ridge must be distinctly palpable and project sufficiently to allow a curved barbell to seat without riding up the glans.',
    contraindications: ['Flat or rounded corona without defined ridge', 'Uncircumcised anatomy where foreskin creates pressure on placement', 'History of glans piercing rejection'],
  },
];

const piercingSel = document.getElementById('piercing-select');
const anatFilter  = document.getElementById('anatomy-filter');
const infoDiv     = document.getElementById('piercing-info');

function populateSelect() {
  piercingSel.innerHTML = '<option value="">— Select a piercing type —</option>';
  const filter = anatFilter.value;
  PIERCINGS
    .filter(p => filter === 'all' || p.anatomy === filter)
    .forEach(p => {
      piercingSel.insertAdjacentHTML('beforeend', `<option value="${escHtml(p.id)}">${escHtml(p.name)}</option>`);
    });
  infoDiv.innerHTML = '';
}

anatFilter.addEventListener('change', populateSelect);
piercingSel.addEventListener('change', showInfo);
populateSelect();

function showInfo() {
  const p = PIERCINGS.find(x => x.id === piercingSel.value);
  if (!p) { infoDiv.innerHTML = ''; return; }

  const contraHtml = p.contraindications.map(c => `<li>${escHtml(c)}</li>`).join('');

  infoDiv.innerHTML = `
    <div class="info-card">
      <div class="info-name">${escHtml(p.name)}</div>
      <div class="info-desc">${escHtml(p.desc)}</div>

      <div class="info-section">
        <div class="info-section-title">Anatomy suitability</div>
        <p class="info-body">${escHtml(p.suitability)}</p>
      </div>

      <div class="info-section">
        <div class="info-section-title">Suitability assessment</div>
        <p class="info-body">${escHtml(p.suitabilityTest)}</p>
      </div>

      <div class="info-grid">
        <div class="info-field">
          <div class="info-field-label">Standard gauge</div>
          <div class="info-field-val">${escHtml(p.gauge)}</div>
        </div>
        <div class="info-field">
          <div class="info-field-label">Typical healing</div>
          <div class="info-field-val">${escHtml(p.healing)}</div>
        </div>
        <div class="info-field info-field--wide">
          <div class="info-field-label">Recommended material</div>
          <div class="info-field-val">${escHtml(p.material)}</div>
        </div>
      </div>

      <div class="info-section">
        <div class="info-section-title">Key risks</div>
        <p class="info-body risk-text">${escHtml(p.risks)}</p>
      </div>

      <div class="info-section">
        <div class="info-section-title">Contraindications</div>
        <ul class="contra-list">${contraHtml}</ul>
      </div>

      <div class="info-cta">
        All genital piercings require in-person assessment and should only be performed by an
        APP-certified piercer with specific experience in genital work. Use implant-grade materials only —
        <a href="https://poliinternational.com/bioflex/" target="_blank" rel="noopener noreferrer">BioFlex® polymer</a>
        is the recommended flexible option for surface-type and movement-stressed placements.
      </div>
    </div>`;
}
