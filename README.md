# Vijayasai Photo Frames Website

This repository contains the source for the official **Vijayasai Photo Frames & Laminations** website. The site is a fully static single page built with HTML, Bootstrap and vanilla JavaScript.

## Features
- Smooth scrolling navigation and animated counters.
- Responsive design tested across modern browsers.
- Service worker registration for basic offline support.
- Image optimization workflow using Sharp to create WebP assets.
- Jest test suite covering loader and animation behavior.

## Project Structure
- `index.html` – main landing page
- `css/` – custom styles
- `js/` – interactive scripts
- `Assets/` – images and other static content
- `tests/` – Jest unit tests
- `scripts/convert-images.js` – helper script to generate WebP images

Because the site is static, you can open `index.html` directly in a browser or serve it with any static hosting provider.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the automated tests:
   ```bash
   npm test
   ```
3. Optimize images (optional):
   ```bash
   npm run build:images
   ```
   This command converts JPEG and PNG files in `Assets/Pictures/` to WebP format.

## License
This project is released under the ISC License.
