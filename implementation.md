# Portfolio Implementation Plan

This document outlines the step-by-step process for building the macOS-themed React portfolio. The plan is highly modular. You can stop after any step, switch models, and provide this document to the next model so they know exactly where to resume.

**Reference:** The user's actual macOS desktop screenshot is in `design_idea.png`. The Finder column-view reference is in `image.png`.

---

## ✅ Step 1: Project Initialization & Global Setup (DONE)
**Goal:** Scaffold the React application and set up the foundation.
- **What was done:**
  - Initialized a React project using Vite (`npx create-vite@latest --template react`).
  - Cleaned up default boilerplate files.
  - Set up global CSS variables in `src/index.css` for the macOS dark theme (system colors, glassmorphism, Inter font, Sonoma-style gradient wallpaper).

**Checkpoint:** `npm run dev` shows a dark desktop background with correct fonts.

---

## ✅ Step 2: Desktop Layout, Icons, Widgets & Dock (DONE)
**Goal:** Build the macOS desktop environment matching the user's real desktop.
- **What was built:**
  - `src/components/DesktopIcon/` — Reusable icon component (folder, file-text, file-image types) with SVG icons.
  - `src/components/PhotosWidget/` — macOS Photos widget (just photo display, glassmorphic).
  - `src/components/NotesWidget/` — macOS Notes-style widget showing name, title, bio.
  - `src/App.css` — Layout: widgets LEFT, icons grid RIGHT, menu bar TOP, dock BOTTOM. Staggered entrance animations.
  - `src/App.jsx` — Desktop with: menu bar (Apple/Finder/File/Edit/View/Go/Window/Help + live clock), PhotosWidget + NotesWidget on LEFT, 7 desktop icons on RIGHT (4 project folders + 3 files), dock with Finder/GitHub/LinkedIn/Email/Settings.

**Checkpoint:** Desktop has widgets stacked on the left, project folder icons in a right-aligned grid, and a dock with Settings gear at the bottom.

---

## Step 3: Settings Panel (Dark Mode & Wallpaper)
**Goal:** Build the Settings panel accessible from the Dock gear icon.
- **Tasks:**
  - [ ] Create a `SettingsPanel` component that opens as a macOS-style window or slide-over panel.
  - [ ] **Dark/Light mode toggle:** Implement a CSS theme switcher using CSS variables. Store preference in `localStorage`.
  - [ ] **Wallpaper selector:** Provide 4-5 preset macOS-style gradient wallpapers. Clicking one changes the `body` background. Store choice in `localStorage`.
  - [ ] Close via the red traffic light button.

**Checkpoint:** Clicking the Settings gear in the dock opens a panel. Toggling dark/light mode changes all colors. Selecting a wallpaper changes the desktop background. Preferences persist on reload.

---

## Step 4: The Finder Window (Navigable with Sidebar)
**Goal:** Create a navigable macOS Finder window that opens when double-clicking project folders.
- **Tasks:**
  - [ ] Build a `MacWindow` wrapper component with:
    - Traffic light buttons (red = close, yellow = minimize/no-op, green = no-op) on the **top-left**.
    - Window title in the center of the title bar.
    - Optional action button area on the **top-right** (used for download in resume viewer).
  - [ ] Build a `FinderWindow` component using `MacWindow`:
    - **Left sidebar:** Lists all project folders (NullPass, NuanceNode, FinProcessor, Trading CLI). Clicking one selects it.
    - **Main content area:** Shows the selected project's contents as icons: `code`, `livedemo`, `system_design.png`, `idea.txt`.
  - [ ] Implement open/close animations (scale + fade).
  - [ ] Optional: Make the window draggable.

**Checkpoint:** Double-clicking a project folder on the desktop opens a Finder window. The sidebar lists all projects. Clicking a project shows its 4 internal items.

---

## Step 5: File Viewer Windows (Preview, TextEdit, Resume PDF)
**Goal:** Create the "app" windows that open when specific files are clicked inside Finder or on the desktop.
- **Tasks:**
  - [ ] **Preview Window (system_design.png):** Uses `MacWindow`. Displays the system design image near full-screen. Has traffic lights to close.
  - [ ] **TextEdit Window (idea.txt):** Uses `MacWindow`. Shows the project's idea text in a clean text editor style (dark bg, monospace or sans-serif text).
  - [ ] **Resume PDF Viewer:** Uses `MacWindow`. Displays the resume (as an image or embedded PDF). Has a **download icon/button on the top-right** of the title bar (opposite to the traffic light buttons). Clicking it triggers a file download of the actual resume PDF.
  - [ ] Clicking `code` folder inside Finder → `window.open(githubUrl, '_blank')`.
  - [ ] Clicking `livedemo` folder inside Finder → `window.open(liveDemoUrl, '_blank')`.

**Checkpoint:** All file types can be opened in their respective viewer windows. The resume has a working download button.

---

## Step 6: Data Parsing & Hydration (From `readmes/`)
**Goal:** Convert the provided README files into a usable JavaScript data structure.
- **Tasks:**
  - [ ] Read the 4 README files: `basic-trading-cli.md`, `finprocessor.md`, `nuancenode.md`, `nullpass.md`.
  - [ ] Extract from each: Project Title, GitHub URL, Live Demo URL, Core concepts/summary (for `idea.txt`), System architecture details (for `system_design.png`).
  - [ ] Create `src/data/projects.js` exporting structured data as an array of objects.

**Checkpoint:** A robust `projects.js` file exists with all project data.

---

## Step 7: Final Integration & Polish
**Goal:** Wire everything together and polish.
- **Tasks:**
  - [ ] Connect Finder sidebar and content area to `projects.js` data.
  - [ ] Wire all `onDoubleClick` handlers for desktop icons and Finder items.
  - [ ] Add smooth entrance/exit animations for all windows.
  - [ ] Test all interactions: open folders, navigate Finder, open preview/text/resume, external links, settings panel.
  - [ ] Ensure responsive behavior (graceful fallback on smaller screens).
  - [ ] Final visual polish pass.

**Checkpoint:** The entire portfolio is functional end-to-end. A user can browse the desktop, open the Finder, navigate projects, view files, download the resume, and customize the theme.
