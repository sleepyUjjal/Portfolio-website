# Portfolio Implementation Plan

This document outlines the step-by-step process for building the macOS-themed React portfolio. The plan is highly modular. You can stop after any step, switch models, and provide this document to the next model so they know exactly where to resume.

---

## ✅ Step 1: Project Initialization & Global Setup (DONE)
**Goal:** Scaffold the React application and set up the foundation.
- **Tasks:**
  - Initialize a new React project using Vite (`npx create-vite@latest . --template react`).
  - Clean up default boilerplate files (`App.css`, `index.css`).
  - Set up global CSS variables in `index.css` for the macOS theme (colors for dark/light mode, typography, glassmorphism background/blur values, and system font stacks like `-apple-system`, `BlinkMacSystemFont`).
  - Add a premium wallpaper background to the `body` to mimic a desktop environment.

**Checkpoint:** At the end of this step, running `npm run dev` should show a blank, properly styled desktop background with correct global font settings.

---

## Step 2: The Desktop & Hero Component (Reference: `design_idea.png`)
**Goal:** Build the main desktop view with scattered icons and the central Hero text.
- **Tasks:**
  - Create an `App.jsx` layout that acts as the "Desktop".
  - Build a reusable `DesktopIcon` component that accepts an icon type (folder, app, etc.), label, and an `onDoubleClick` handler.
  - Implement the "Hero" section in the center:
    - Large typography for "portfolio" (as seen in `design_idea.png`).
    - Name and short bio text.
  - Place scattered `DesktopIcon` components around the screen representing various categories or the main "Portfolio" folder.

**Checkpoint:** The UI should look like the `design_idea.png` desktop, with a central title and clickable desktop folder icons.

---

## Step 3: The Finder Window Component (Reference: `image.png`)
**Goal:** Create the reusable macOS Finder window modal.
- **Tasks:**
  - Build a `Window` wrapper component. It must include the macOS top bar (traffic light buttons: red, yellow, green) and a title.
  - Implement dragging capabilities for the window (optional but recommended, can use simple state or a library like `react-rnd`).
  - Build the `Finder` component inside the `Window`. Based on `image.png`, it should feature a **column view** (or grid view) layout.
  - Implement the left sidebar (Folders) and the main content area showing nested files.

**Checkpoint:** Double-clicking a desktop folder should open this `Finder` window. You should be able to close it using the red traffic light button.

---

## Step 4: File Modals (Preview & TextEdit)
**Goal:** Create the applications that open when specific files are clicked.
- **Tasks:**
  - **Preview App:** Create a modal for viewing images (specifically the `system_design.png`). It should look like the macOS Preview app.
  - **TextEdit App:** Create a modal for viewing text (specifically the `idea.txt`). It should look like a simple macOS text editor with a white/dark gray text area and monospaced or clean sans-serif font.
  - Ensure both modals can be closed via their respective red traffic light buttons.

**Checkpoint:** You have functional windows for viewing images and text files.

---

## Step 5: Data Parsing & Hydration (From `readmes/`)
**Goal:** Convert the provided README files into a usable JavaScript data structure.
- **Tasks:**
  - Read the 4 provided README files (`basic-trading-cli.md`, `finprocessor.md`, `nuancenode.md`, `nullpass.md`).
  - Extract the core information from each:
    - Project Title
    - GitHub URL (for the `code` folder)
    - Live Demo URL (for the `livedemo` folder)
    - Core concepts/summary (to populate `idea.txt`)
    - System architecture details (to represent `system_design.png`)
  - Create a `src/data/projects.js` file exporting this structured data as an array of objects.

**Checkpoint:** A robust `projects.js` file exists with all extracted data formatted correctly for the UI to consume.

---

## Step 6: Final Integration & Routing
**Goal:** Connect the data to the UI components.
- **Tasks:**
  - Update the `Finder` component to map over the `projects.js` data.
  - Inside the Finder, opening a specific project folder should reveal the 4 specific items: `code`, `livedemo`, `system_design.png`, and `idea.txt`.
  - Wire up the `onDoubleClick` handlers for these items:
    - `code` & `livedemo`: Use `window.open(url, '_blank')`.
    - `system_design.png`: Open the `Preview` modal passing the respective image or placeholder.
    - `idea.txt`: Open the `TextEdit` modal passing the text summary from the data file.
  - Add simple entrance/exit animations for the windows (e.g., scale up from 0.95 and fade in).

**Checkpoint:** The entire portfolio is functional. A user can "boot up", click folders, navigate the finder, open external links, and read project details in the OS-style modals.
