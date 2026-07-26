# Nolia Website

Official website for the Nolia product family:

- [Nolia Desktop](https://github.com/harrysxu/Nolia), a local-first Markdown knowledge workstation with controlled AI assistance.
- [Nolia Reader](https://github.com/harrysxu/nolia-reader), a local-first browser extension for reading and exporting Markdown webpages.

The production website is Chinese-first and presents Desktop and Reader as one local-first product family.

Product screenshots in `public/assets/` are generated from the Nolia and Nolia Reader visual E2E suites. They show real product UI rather than marketing mockups, including the current workspace, Discover, and AI task-detail surfaces.

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

## Compliance

The production footer displays `京ICP备2026003704号-2` and links to the Ministry of Industry and Information Technology filing system.

## Contact

ailehuoquan@163.com
