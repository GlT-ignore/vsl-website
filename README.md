# VSL Website

This repository contains the static assets for the Vijayasai Photo Frames website.

## Running Tests

The project uses [Jest](https://jestjs.io/) with the jsdom environment to test basic front‑end behavior. After installing dependencies with `npm install`, run:

```bash
npm test
```

This command executes the test suite located in the `tests` directory.

## Optimizing Images

Install dependencies with `npm install`, then run:

```bash
npm run build:images
```

This script converts JPEG and PNG files found in `Assets/Pictures/` into optimized WebP images using [sharp](https://github.com/lovell/sharp). The WebP files are written alongside the originals.
