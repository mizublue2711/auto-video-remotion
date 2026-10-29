### GOOGLE JULES AGENT PROTOCOL & RULES
**Repository:** auto-video-remotion (Centralized Video Render Engine)
This file defines non-negotiable architectural rules, directory constraints, motion parameters, and security standards for Google Jules when working on this repository.

--------------------------------------------------------------------------------

#### 1. STRICT DIRECTORY LAYOUT & BOUNDARIES
Every file MUST be placed in its strictly designated directory. NEVER break these rules:
*   **src/schemas/** : Contains ONLY Zod Schemas (Data Contracts).
*   **src/scenes/** : Contains ONLY Master Scene Components (.tsx).
    *   ONLY components in `src/scenes/` can be imported directly into `src/Root.tsx`.
*   **src/components/** : Contains ONLY reusable Sub-components/UI Blocks (e.g., SwissGridBackground.tsx, KineticTypography.tsx).
    *   NEVER register components in `src/components/` directly inside `src/Root.tsx`.
*   **site-configs/** : Contains ONLY .json inputProps files.
*   **scripts/** : Contains ALL CLI execution scripts (e.g., validate-configs.ts).

--------------------------------------------------------------------------------

#### 2. MASTER SCENE & ROOT.TSX REGISTRATION RULES
When creating or updating a video template/scene:
1.  **Verify Schema:** Define/update its Zod Schema in `src/schemas/MySceneSchema.ts`.
2.  **Create Scene:** Create/update the Master Scene component at `src/scenes/MyScene.tsx`.
3.  **Register in `src/Root.tsx`:**
    *   Import `MyScene` strictly from `./scenes/MyScene` (NOT `./components/`).
    *   Import JSON configs strictly from `../site-configs/my-config.json`.
    *   Cast component type if needed: `component={MyScene as React.FC<any>}` to avoid TS2322 errors.
    *   Attach `schema={MySceneSchema}` and `defaultProps={MySceneSchema.parse(myConfig)}`.

--------------------------------------------------------------------------------

#### 3. INTERACTIVE GUI CONTROLS STANDARD (ZOD SCHEMA PROPS)
To allow visual tuning directly in Remotion Studio without editing code:
1.  **DO NOT hardcode static motion numbers** (camera scale, rotation angles, spring tension, dispersion) as internal constants inside Scene files.
2.  **Define Range Metadata in Schema (`src/schemas/`):**
    Expose all tunable motion parameters using `z.number().min().max().step().default()`.
    *   *Example:* `cameraZoomMax: z.number().min(1.0).max(3.0).step(0.05).default(1.65)`
    *   *Example:* `rotationXMax: z.number().min(-180).max(180).step(1).default(8)`
    *   *Example:* `dispersionAmount: z.number().min(0.0).max(1.0).step(0.01).default(0.12)`
3.  **Read Props Dynamically:** Ensure the main Scene component reads these parameters directly from `props` so dragging sliders in Remotion Studio sidebar updates the preview in real-time.

--------------------------------------------------------------------------------

#### 4. MOTION GRAPHICS & AUDIO STABILITY ENGINE
1.  **DECOUPLE AUDIO FREQUENCY FROM 3D MESH TRANSFORMS:**
    *   Do NOT pass audio amplitude/frequency variables (`audioEnergy`, `smoothPulse`) directly into 3D mesh scale, rotation, or position equations.
    *   Audio reactivity should be visual (background glow, HUD flickering, waveform displays) or kept as background track via `<Audio src={staticFile(audioUrl)} />`.
2.  **SMOOTH MATHEMATICAL EASING:**
    *   Use smooth, continuous mathematical curves (e.g., `Easing.bezier(0.42, 0, 0.58, 1)`, `Easing.out(Easing.cubic)`) across explicit frame ranges `[startFrame, endFrame]`.
3.  **CLAMPED DISPERSION & BOUNDS:**
    *   Always cap dispersion (`dispersionAmount <= 0.12`) so 3D elements (`RubikCube3D`, `BentoGrid3D`, `MacCodeEditor`, `DualEngineCard`) stay centered, readable, and never fly off-screen.

--------------------------------------------------------------------------------

#### 5. SYNTAX INTEGRITY & INTERPOLATION BOUNDS
*   All `interpolate()` function calls MUST contain valid and complete arrays:
    *   `interpolate(frame, [startFrame, endFrame], [startValue, endValue], { options })`
*   NEVER generate malformed or duplicate commas (e.g., NO `frame,,`).

--------------------------------------------------------------------------------

#### 6. STRICT SECURITY & GIT HYGIENE
*   **NEVER** add, modify, or commit any credentials, environment files, or keys (`.env`, `gcp-key.json`).
*   **Ensure** output files/directories (`out/`, `out.mp4`, `.DS_Store`) are NEVER tracked by Git.
*   **Always pull/rebase onto latest `main`** before creating a new feature branch.

--------------------------------------------------------------------------------

#### 7. FAIL-FAST VALIDATION REQUIREMENTS
Before submitting any Pull Request:
1.  **Validate Configs:** Run `npm run validate:configs` and ensure all JSON files pass schema validation.
2.  **TypeScript Check:** Run `npx tsc --noEmit` and ensure **ZERO (0) errors**.
3.  **Open PR:** Submit PR against branch `main` with a clear summary of changes.
