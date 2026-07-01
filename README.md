# Neha Singh — Design × Engineering Portfolio

A high-fidelity, interactive digital portfolio showcasing projects across visual branding, full-stack tools, and machine learning pipelines. 

---

## 🚀 Key Features

* **3D Page-Flipping Book Decks**: PDF publications (brand manuals, brochures, and certificates) are automatically extracted page-by-page into image decks and rendered inside an interactive 3D-flipping book layout.
* **Playable Canvas Mini-Game (`NEH-RUN`)**: An integrated retro running game featuring twinkling stars, parallax clouds, scrolling sand dunes, and real-time score keeping.
* **WebGL Dithered Halftones**: An analog dither canvas shader that dynamically processes project thumbnail images into a stylized dithered bitmap.
* **Playful Vault Bootloader**: An interactive prank-button loading overlay that dodges the cursor before allowing entrance.
* **Automated Project Scanning**: A Node script (`scan-projects.cjs`) that recursively scans asset folders at build-time to compile the portfolio index dynamically.

---

## 🛠️ Tech Stack

* **Core**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS
* **Animations**: Canvas 2D, WebGL Shaders, CSS Animations
* **VFX Engine**: custom dither matrix shaders

---

## 💻 Commands

### Install Dependencies
```bash
npm install
```

### Local Development
Runs the automated scan script and boots the local Vite development server:
```bash
npm run dev
```

### Production Build
Generates the project configuration index and compiles all assets:
```bash
npm run build
```

### Deploy to GitHub Pages
Deploys the production bundle to GitHub Pages:
```bash
npm run deploy
```
