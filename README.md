# Unit Atlas · Unit Converter

**A world of measures. Made simple.** A private, single-file unit converter by [TekiDeki](https://github.com/TekiDeki).

**[Open app: https://tekideki.github.io/Unit-Converter/](https://tekideki.github.io/Unit-Converter/)** · [freeHTML.dev hub](https://freehtml.dev/) · [Apache-2.0](LICENSE)

[![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square)](LICENSE) [![Live demo](https://img.shields.io/badge/live-demo-success?style=flat-square&logo=githubpages&logoColor=white)](https://tekideki.github.io/Unit-Converter/) [![Languages](https://img.shields.io/badge/languages-4%20(EN%C2%B7RO%C2%B7SR%C2%B7%D0%A1%D0%A0)-purple?style=flat-square)](#features) [![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](#run-locally)

## Features

- 11 international categories: length, area, volume, mass, temperature, speed, time, pressure, energy, power and digital storage.
- One regional land-measure category with pogon, cadastral jugăr, lanac, jutro, metric dunum and Viennese square rod, next to m², ar and hectare.
- 93 unit entries across the category lists, including the reference units repeated in the regional category.
- Four languages: English, Română, Srpski (lat.) and Српски (ћир.), with numbers formatted for the active language.
- Search across categories and units, including the other three languages.
- Instant conversion, a swap that keeps the full numeric result, and equivalents for the whole category.
- 6, 10 or 15 significant digits; scientific notation for very small or large values.
- Up to 20 explicitly saved conversions, browser only, with single or confirmed bulk deletion.
- Copyable result and shareable link via URL fragment, with no server and no link shortener.
- Light and dark themes, keyboard support, explanatory dialog and a print layout.
- **Download HTML** exports a standalone copy of the file that runs offline, straight from `file://`.

## Privacy

No requests to fonts, libraries, APIs or analytics. Source links (BIPM, NIST) are fetched only when the visitor opens them. Theme, language and saved conversions live under the `atlas-*` keys of `localStorage`; if storage is blocked, saves stay in the tab with a warning. Shared links carry the value and units in the URL fragment; the downloaded HTML never contains user data.

Regional measures are declared conventions (pogon 5000 m², cadastral jugăr/lanac/jutro 1600 square Viennese rods, Viennese rod 1.89648384 m, metric dunum 1000 m²), not claims about any historical document. For land, transactions and legal matters, consult the original deed and the local cadastre; the app shows this warning inside the regional category and the explanatory dialog.

## Run locally

`index.html` is the entire application: HTML, CSS, JavaScript, translations, conversion factors and the embedded icon. No build step, no libraries, no server-side computation.

```sh
python3 -m http.server 8080 --bind 0.0.0.0
# On the same device: http://localhost:8080/
```

Opening the file directly (`file://`) works too; only hosted conveniences such as the service worker need http(s).

## Publish

GitHub Pages serves this repository from `main`, repository root: **https://tekideki.github.io/Unit-Converter/**. The hub at [freeHTML.dev](https://freehtml.dev/) keeps the short address `freehtml.dev/convert/` as a 302 redirect to this deployment.

`sw.js` caches the shell (`./` and `./index.html`) under the **`atlas-v1`** cache with network-first navigation and an offline fallback. Increase the cache version when changing `index.html`.

### Verify the deployment

```sh
# online: the page, the service worker and the sitemap are served
curl -sI https://tekideki.github.io/Unit-Converter/ | head -1
curl -sI https://tekideki.github.io/Unit-Converter/sw.js | head -1
curl -s  https://tekideki.github.io/Unit-Converter/sitemap.xml

# the hub keeps the short address as a 302 redirect to this deployment
curl -sI https://freehtml.dev/convert | grep -i location
```

Offline: after one visit the service worker serves the shell from the `atlas-v1` cache, so the app opens without a network. The suite in "Tests" switches the browser context offline and checks exactly that, and the downloaded HTML works straight from `file://`, with no service worker at all.

## Tests

```sh
npm ci
npx playwright install --with-deps chromium
# With the local server from "Run locally" running in another terminal:
npm test
```

Optional environment: `ATLAS_BASE` changes the server address, `ATLAS_CHROMIUM_PATH` picks an existing Chromium executable.

The suite checks 787 conversion round trips, reference values, number parsing, all translations in four languages, saved conversions, clipboard, share links, the portable downloaded HTML without a network, the offline shell, four screen widths (320, 375, 768 and 1440 px) and WCAG A/AA axe audits on both themes and the dialog. Automated audits do not replace manual testing with assistive technologies. GitHub Actions (`.github/workflows/unit-atlas.yml`) runs the same suite on relevant pushes and pull requests.

## Project home

The card, the tools list, the shortcuts table and the documentation for this app live in [TekiDeki/TekiDeki](https://github.com/TekiDeki/TekiDeki); the application file itself now lives here. That repository no longer ships a copy of the app: `freehtml.dev/convert/` is only a redirect to this deployment.

Four languages are kept on both sides - English, Română, Srpski (lat.) and Српски (ћир.) - and the wording uses "-", never the long dash.

## Repository metadata

- **Description:** Private single-file unit converter: 11 international categories plus Romanian and Serbian land measures, 4 languages, shareable links, offline HTML. Nothing is uploaded.
- **Homepage / live:** **[https://tekideki.github.io/Unit-Converter/](https://tekideki.github.io/Unit-Converter/)**
- **Topics:** `unit-converter`, `single-file`, `vanilla-javascript`, `zero-dependencies`, `offline`, `privacy`, `github-pages`, `multilingual`

## License

Licensed under the [Apache License 2.0](LICENSE).
