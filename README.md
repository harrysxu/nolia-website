# Nolia Website

Official website for the Nolia product family:

- [Nolia Desktop](https://github.com/harrysxu/Nolia), a local-first Markdown knowledge workstation with controlled AI assistance.
- [Nolia Lite](https://github.com/harrysxu/NoliaLite), a lightweight, local-first WYSIWYG Markdown editor for individual documents.
- [Nolia Reader](https://github.com/harrysxu/nolia-reader), a local-first browser extension for reading and exporting Markdown webpages.

The production website is Chinese-first. Nolia Desktop remains the primary product; Lite and Reader are presented as complementary products in the same local-first ecosystem.

Product screenshots in `public/assets/` show real product UI rather than marketing mockups. Nolia and Reader assets come from their visual E2E suites; the Lite screenshot comes from the 1.0.0 macOS application rendering its Markdown acceptance document.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deployment

This repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.
After pushing to GitHub, enable Pages for the repository and select GitHub Actions
as the build and deployment source.

## Release Links

Desktop download links point to the Nolia 1.0.1 GitHub Release artifacts for macOS, Windows x64, and Linux arm64. macOS artifacts are signed, notarized, and stapled; the current Windows artifacts are unsigned.

```text
https://github.com/harrysxu/Nolia/releases/tag/v1.0.1
```

Nolia Reader does not currently publish store or GitHub Release artifacts. The website links to its source installation guide instead.

Nolia Lite links point to the public 1.0.0 GitHub Release for signed and notarized Apple Silicon and Intel macOS DMGs:

```text
https://github.com/harrysxu/NoliaLite/releases/tag/v1.0.0
```

## Compliance

The production footer displays `京ICP备2026003704号-2` and links to the Ministry of Industry and Information Technology filing system.

## Contact

ailehuoquan@163.com
