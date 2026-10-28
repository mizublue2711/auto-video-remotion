# GOOGLE JULES AGENT PROTOCOL & RULES
**Repository:** auto-video-remotion (Centralized Video Render Engine)

This file defines non-negotiable architectural rules, directory constraints, and security standards for Google Jules when working on this repository.

---

## 1. STRICT DIRECTORY LAYOUT & BOUNDARIES
Every file MUST be placed in its strictly designated directory. NEVER break these rules:

* **`src/schemas/`**: Contains ONLY Zod Schemas (Data Contracts). Do NOT edit existing schemas unless explicitly instructed by the user.
* **`src/scenes/`**: Contains ONLY Master Scene Components (`.tsx`). 
  * ONLY components in `src/scenes/` can be imported into `src/Root.tsx`.
* **`src/components/`**: Contains ONLY reusable Sub-components/UI Blocks (e.g., `SwissGridBackground.tsx`, `KineticTypography.tsx`).
  * NEVER register components in `src/components/` inside `src/Root.tsx`.
* **`site-configs/`**: Contains ONLY `.json` inputProps files.
* **`scripts/`**: Contains ALL CLI execution scripts (e.g., `validate-configs.ts`, `render-cloud.js`). 
  * NO loose `.js`/`.ts` scripts allowed in the repository root.

---

## 2. MASTER SCENE & ROOT.TSX REGISTRATION RULES
When creating a new video template/scene, you must follow these exact steps:

1. **Define/verify** its Zod Schema in `src/schemas/MySceneSchema.ts`.
2. **Create** the Master Scene component at `src/scenes/MyScene.tsx`.
3. **Open `src/Root.tsx`** and thực hiện:
   * Import `MyScene` ONLY from `./scenes/MyScene`.
   * Register a new `<Composition />` with `id="MyScene"`, attaching `schema={MySceneSchema}` and sensible `defaultProps`.

---

## 3. STRICT SECURITY & GIT HYGIENE
* **NEVER** add, modify, or commit any credentials, environment files, or keys (`.env`, `gcp-key.json`, `sa-permissions.json`).
* **Ensure** output files/directories (`out/`, `out.mp4`, `.DS_Store`) are NEVER tracked by Git.
* **Maintain** `.gitignore` rules at all times.

---

## 4. FAIL-FAST VALIDATION REQUIREMENTS
Before submitting any Pull Request:

1. **Ensure** all `site-configs/*.json` files pass schema validation by running:
   ```bash
   npm run validate:configs
   ```
2. **Ensure** TypeScript compiles with zero errors.
3. **Open PRs** against branch `main` with a clear summary of changes.
