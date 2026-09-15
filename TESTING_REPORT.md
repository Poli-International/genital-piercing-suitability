# Testing Report: Genital Piercing Anatomy Suitability V2

Date: 2026-09-15. Run by Poli International against the files in this
repository, served locally and driven with Playwright (Chromium). No automated
test suite ships with this tool; what follows is only what was actually run.

This file replaces an earlier report that carried a table of PASS verdicts for
tests nobody had run, and described a `PIERCINGS` data array that this version
does not have.

## Languages

274 keys in each of English, French, German, Italian, Spanish, Portuguese and
Dutch. Verified by parsing the dictionaries: identical key sets, no key missing
on either side, no value identical to the English, no interpolation token
dropped or renamed, no empty value. The language selector lists all seven,
stores the choice under `poli_tools_language` and is read back on load.

A language change was driven in the browser and redraws the rendered content,
not only the elements carrying `data-i18n`: the placement card, its section
headings, the placement dropdown, the shared refusal reasons, the consultation
talking points and the printed sheet all come back in the new language, and the
reader's own notes and their selected placement survive the switch. Checked end
to end in German.

## The reference cards

- 14 placements, each with anatomy required, what is assessed in person, the
  common reasons a piercer says no, typical healing, starting jewellery, and
  four questions to ask.
- No output states that a reader's anatomy is or is not suitable. There is no
  score, no percentage and no verdict anywhere in the tool.
- Search by common name resolves: "clit hood" returns VCH and HCH, "prince
  albert" returns PA and reverse PA.
- One schematic SVG per placement, collapsed behind a show/hide control so the
  page can be read in public. Drawn with `currentColor`, so it survives
  greyscale and print. Labels are translated with the rest of the interface.

## The worksheet and the printed sheet

- Private notes are not stored unless the reader ticks the box; the clear
  button empties both the field and the browser storage, confirmed by reading
  `localStorage` afterwards.
- The worksheet ends with the talking points for the placement being read.
- The printed sheet carries the placement, the anatomy required, healing,
  starting jewellery, the talking points and the reader's own notes, in the
  active language. Printing was intercepted in the browser to confirm the sheet
  renders and that `window.print` is called once. Paper size is A4.

## Browser behaviour

- No page or console errors in English or German.
- No horizontal overflow at 1280px or at 390px; the language selector stays
  reachable on a phone.
- No external host in any script or link tag, no `fetch` or `XMLHttpRequest`,
  no service worker, no network request of any kind.
- Nothing in the CSS overrides the `hidden` attribute.

## Not tested

- Real printing to paper, and PDF output quality.
- Screen readers.
- Browsers other than Chromium.
- The clinical content itself, which is editorial and not something a test can
  settle.
