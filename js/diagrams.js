'use strict';

/**
 * Neutral schematic SVG diagrams for genital piercing placements.
 * Abstract, clinical cross-sectional tissue diagrams.
 * Non-explicit, labeled, fully readable in greyscale and print.
 */

window.getPlacementDiagram = function(id) {
  const commonHeader = `<svg viewBox="0 0 400 220" class="schematic-svg" role="img" aria-label="${window.t('diagram.common.aria_label')}">`;
  const styleDefs = `
    <defs>
      <pattern id="diag-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-opacity="0.2" stroke-width="1.2" />
      </pattern>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.75" />
      </marker>
    </defs>
  `;

  switch(id) {
    case 'vch':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <path d="M 90 40 C 130 40, 160 70, 160 140 C 160 180, 130 190, 110 190 C 85 190, 80 160, 80 130 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <circle cx="100" cy="150" r="28" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4,3" />
        <text x="100" y="154" font-size="11" font-weight="600" text-anchor="middle" fill="currentColor">${window.t('diagram.vch.glans')}</text>
        <line x1="130" y1="50" x2="130" y2="135" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="130" cy="50" r="5" fill="var(--primary)" />
        <circle cx="130" cy="135" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="160" y1="70" x2="250" y2="55" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="58" font-size="12" fill="currentColor">${window.t('diagram.vch.prepuce')}</text>
        <line x1="135" y1="90" x2="250" y2="95" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="98" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.vch.channel')}</text>
        <line x1="135" y1="135" x2="250" y2="135" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="138" font-size="12" fill="currentColor">${window.t('diagram.vch.exit')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.sagittal_footnote')}</text>
      </svg>`;

    case 'hch':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <path d="M 60 70 Q 140 30 220 70 Q 200 150 140 160 Q 80 150 60 70 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="80" y1="85" x2="200" y2="85" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="80" cy="85" r="5" fill="var(--primary)" />
        <circle cx="200" cy="85" r="5" fill="var(--primary)" />
        <circle cx="140" cy="130" r="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3,3" />
        <text x="140" y="134" font-size="11" text-anchor="middle" fill="currentColor">${window.t('diagram.hch.glans_below')}</text>
        <!-- Labels -->
        <line x1="140" y1="80" x2="260" y2="50" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="266" y="53" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.hch.passage')}</text>
        <line x1="190" y1="110" x2="260" y2="110" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="266" y="113" font-size="12" fill="currentColor">${window.t('diagram.hch.upper_fold')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.coronal_footnote')}</text>
      </svg>`;

    case 'triangle':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Pubic bone boundary -->
        <path d="M 40 40 L 40 180" stroke="currentColor" stroke-width="3" stroke-dasharray="6,4" />
        <text x="45" y="175" font-size="11" fill="currentColor">${window.t('diagram.triangle.pubic_bone')}</text>
        <!-- Clitoral shaft & pocket -->
        <path d="M 40 80 Q 120 75 140 110 Q 110 135 40 130" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <circle cx="85" cy="115" r="8" fill="var(--primary)" />
        <circle cx="85" cy="115" r="14" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="3,2" />
        <!-- Labels -->
        <line x1="85" y1="100" x2="210" y2="60" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="216" y="64" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.triangle.passage')}</text>
        <line x1="120" y1="120" x2="210" y2="110" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="216" y="113" font-size="12" fill="currentColor">${window.t('diagram.triangle.sub_shaft_void')}</text>
        <line x1="85" y1="135" x2="210" y2="155" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="216" y="158" font-size="12" fill="currentColor">${window.t('diagram.triangle.nerve_clearance')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.sagittal_depth_footnote')}</text>
      </svg>`;

    case 'christina':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <path d="M 70 30 Q 140 50 140 120 Q 130 180 60 190" fill="none" stroke="currentColor" stroke-width="2.5" />
        <path d="M 70 30 Q 120 70 110 120 Q 100 170 60 190 Z" fill="url(#diag-hatch)" opacity="0.5" />
        <!-- L-bar path -->
        <path d="M 125 55 L 125 125 L 90 125" fill="none" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="125" cy="55" r="5" fill="var(--primary)" />
        <circle cx="90" cy="125" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="130" y1="55" x2="230" y2="45" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="48" font-size="12" fill="currentColor">${window.t('diagram.christina.mons_entry')}</text>
        <line x1="125" y1="95" x2="230" y2="95" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="98" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.christina.subdermal_channel')}</text>
        <line x1="90" y1="130" x2="230" y2="145" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="148" font-size="12" fill="currentColor">${window.t('diagram.christina.exit')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.sagittal_surface_footnote')}</text>
      </svg>`;

    case 'inner_labia':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Labium minora fold -->
        <path d="M 90 30 Q 150 70 150 120 Q 140 170 80 190 Q 100 130 90 30 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <circle cx="125" cy="115" r="18" fill="none" stroke="var(--primary)" stroke-width="3" />
        <circle cx="125" cy="97" r="4" fill="var(--primary)" />
        <circle cx="125" cy="133" r="4" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="145" y1="70" x2="240" y2="60" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="63" font-size="12" fill="currentColor">${window.t('diagram.inner_labia.tissue_fold')}</text>
        <line x1="140" y1="115" x2="240" y2="115" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="118" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.inner_labia.channel')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.tissue_fold_footnote')}</text>
      </svg>`;

    case 'outer_labia':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Fleshy majora mound -->
        <path d="M 60 40 C 160 30, 180 160, 70 180 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <path d="M 120 70 Q 150 110 120 150" fill="none" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="120" cy="70" r="5" fill="var(--primary)" />
        <circle cx="120" cy="150" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="140" y1="55" x2="240" y2="55" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="58" font-size="12" fill="currentColor">${window.t('diagram.outer_labia.adipose_fold')}</text>
        <line x1="140" y1="110" x2="240" y2="110" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="113" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.outer_labia.curved_bar')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.subcutaneous_footnote')}</text>
      </svg>`;

    case 'fourchette':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Posterior fourchette fold -->
        <path d="M 60 60 Q 150 70 150 120 Q 120 170 50 170 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="130" y1="80" x2="130" y2="145" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="130" cy="80" r="5" fill="var(--primary)" />
        <circle cx="130" cy="145" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="150" y1="95" x2="240" y2="85" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="88" font-size="12" fill="currentColor">${window.t('diagram.fourchette.tissue_flap')}</text>
        <line x1="135" y1="120" x2="240" y2="125" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="128" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.fourchette.channel')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.posterior_rim_footnote')}</text>
      </svg>`;

    case 'pa':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Glans outline and urethra -->
        <path d="M 60 60 Q 140 50 170 110 Q 130 165 60 160 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="60" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2" stroke-dasharray="4,3" />
        <text x="95" y="104" font-size="11" fill="currentColor">${window.t('diagram.pa.urethral_lumen')}</text>
        <!-- PA ring curving out inferiorly -->
        <path d="M 170 110 Q 150 155 110 150" fill="none" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="170" cy="110" r="5" fill="var(--primary)" />
        <circle cx="110" cy="150" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="170" y1="105" x2="250" y2="70" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="73" font-size="12" fill="currentColor">${window.t('diagram.pa.meatus_entry')}</text>
        <line x1="140" y1="145" x2="250" y2="135" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="138" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.pa.glans_exit')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.sagittal_glans_footnote')}</text>
      </svg>`;

    case 'reverse_pa':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Glans outline and urethra -->
        <path d="M 60 60 Q 140 50 170 110 Q 130 165 60 160 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="60" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2" stroke-dasharray="4,3" />
        <!-- Reverse PA curving out superiorly -->
        <path d="M 170 110 Q 150 65 110 65" fill="none" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="170" cy="110" r="5" fill="var(--primary)" />
        <circle cx="110" cy="65" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="170" y1="105" x2="250" y2="115" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="118" font-size="12" fill="currentColor">${window.t('diagram.reverse_pa.meatus_entry')}</text>
        <line x1="130" y1="65" x2="250" y2="65" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="256" y="68" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.reverse_pa.glans_exit')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.sagittal_glans_footnote')}</text>
      </svg>`;

    case 'apadravya':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Glans cross-section -->
        <path d="M 60 60 Q 140 50 170 110 Q 130 165 60 160 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="60" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2" stroke-dasharray="4,3" />
        <!-- Vertical straight barbell passing through urethra -->
        <line x1="120" y1="50" x2="120" y2="165" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="120" cy="50" r="5" fill="var(--primary)" />
        <circle cx="120" cy="165" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="120" y1="50" x2="230" y2="50" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="53" font-size="12" fill="currentColor">${window.t('diagram.apadravya.top_glans')}</text>
        <line x1="125" y1="110" x2="230" y2="105" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="108" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.apadravya.trans_urethral_pass')}</text>
        <line x1="120" y1="165" x2="230" y2="160" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="163" font-size="12" fill="currentColor">${window.t('diagram.apadravya.bottom_glans')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.vertical_trans_glans_footnote')}</text>
      </svg>`;

    case 'ampallang':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Glans coronal cross-section (oval) -->
        <ellipse cx="120" cy="110" rx="70" ry="55" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <ellipse cx="120" cy="110" rx="14" ry="10" fill="var(--bg-input)" stroke="currentColor" stroke-width="1.5" />
        <text x="120" y="113" font-size="9" text-anchor="middle" fill="currentColor">${window.t('diagram.ampallang.urethra')}</text>
        <!-- Horizontal straight bar -->
        <line x1="35" y1="110" x2="205" y2="110" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="35" cy="110" r="5" fill="var(--primary)" />
        <circle cx="205" cy="110" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="120" y1="55" x2="240" y2="55" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="58" font-size="12" fill="currentColor">${window.t('diagram.ampallang.erectile_tissue')}</text>
        <line x1="205" y1="110" x2="240" y2="110" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="113" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.ampallang.horizontal_bar')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.coronal_glans_footnote')}</text>
      </svg>`;

    case 'frenum':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Penile shaft cylinder section -->
        <rect x="50" y="50" width="130" height="90" rx="6" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <text x="115" y="95" font-size="11" text-anchor="middle" fill="currentColor">${window.t('diagram.frenum.shaft_body')}</text>
        <!-- Ventral loose skin pinch -->
        <path d="M 60 140 Q 115 175 170 140" fill="none" stroke="currentColor" stroke-width="2" />
        <line x1="85" y1="158" x2="145" y2="158" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="85" cy="158" r="5" fill="var(--primary)" />
        <circle cx="145" cy="158" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="145" y1="158" x2="230" y2="155" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="158" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.frenum.subdermal_bar')}</text>
        <line x1="165" y1="140" x2="230" y2="110" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="113" font-size="12" fill="currentColor">${window.t('diagram.frenum.skin_fold')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.shaft_skin_footnote')}</text>
      </svg>`;

    case 'guiche':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Perineal ridge -->
        <path d="M 50 60 Q 140 70 140 135 Q 120 175 50 175 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <line x1="120" y1="90" x2="120" y2="155" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="120" cy="90" r="5" fill="var(--primary)" />
        <circle cx="120" cy="155" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="140" y1="100" x2="230" y2="90" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="93" font-size="12" fill="currentColor">${window.t('diagram.guiche.raphe_fold')}</text>
        <line x1="125" y1="125" x2="230" y2="135" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="236" y="138" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.guiche.raphe_channel')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.perineal_ridge_footnote')}</text>
      </svg>`;

    case 'dydoe':
      return `${commonHeader}${styleDefs}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <!-- Coronal rim shelf -->
        <path d="M 50 80 Q 110 65 145 90 Q 155 125 120 160 L 50 160 Z" fill="url(#diag-hatch)" stroke="currentColor" stroke-width="2" />
        <!-- Curved barbell through the rim shelf -->
        <path d="M 125 80 Q 155 105 135 130" fill="none" stroke="var(--primary)" stroke-width="3.5" />
        <circle cx="125" cy="80" r="5" fill="var(--primary)" />
        <circle cx="135" cy="130" r="5" fill="var(--primary)" />
        <!-- Labels -->
        <line x1="145" y1="85" x2="240" y2="70" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="73" font-size="12" fill="currentColor">${window.t('diagram.dydoe.lip')}</text>
        <line x1="145" y1="110" x2="240" y2="115" stroke="currentColor" stroke-width="1" opacity="0.6" marker-end="url(#arrow)" />
        <text x="246" y="118" font-size="12" font-weight="600" fill="var(--primary)">${window.t('diagram.dydoe.anchor')}</text>
        <text x="20" y="200" font-size="11" fill="var(--text-muted)">${window.t('diagram.common.coronal_shelf_footnote')}</text>
      </svg>`;

    default:
      return `${commonHeader}
        <rect x="10" y="10" width="380" height="200" rx="8" fill="var(--bg-input)" stroke="var(--border)" stroke-width="1" />
        <text x="200" y="115" font-size="14" text-anchor="middle" fill="var(--text-muted)">${window.t('diagram.common.fallback')}</text>
      </svg>`;
  }
};
