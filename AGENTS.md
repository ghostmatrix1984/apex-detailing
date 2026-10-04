<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# APEX Detailing — repository workflow

Durable instructions for Harness sessions working on this repository.

## Autonomy

- Work autonomously on requested website changes once the task is clear.
- If a test fails, investigate and attempt to fix it yourself rather than immediately asking the user to diagnose it — unless proceeding would require a risky/destructive action or information only the user can provide.

## Design

- Inspect the existing code and design before changing anything, and preserve the established APEX visual language (typography, palette, spacing, motion, imagery) unless the task specifically asks for a redesign.

## Verification

- Run appropriate lint, type and build checks after changes (for example `npm run lint`, the TypeScript check, and `npm run build`).

## Browser QA

- For final browser QA, DO NOT rely on the Next.js development server: Playwright in this environment has an HMR/WebSocket issue that can prevent hydration, which silently breaks client-side behaviour (for example reveal/scroll animations never activate).
- For browser QA, run a clean production build (`npm run build`) and start Next.js production mode on an available port, normally 3001 (`npm run start -- -p 3001`), then use the Playwright browser tools to inspect the rendered site.
- Scroll through the entire page and test the functionality affected by the change, including relevant desktop and mobile layouts and console errors.
- For responsive or layout work, test at minimum at these viewport widths: 320px, 360px, 375px, 390px, 412px, plus tablet and desktop. A single mobile viewport is not sufficient for responsive QA.
- At each relevant width, check for: horizontal page overflow; text or headings extending outside their containers; clipped content; broken wrapping; and buttons or controls extending outside the viewport.
- Browser-test artifacts under `.playwright-mcp/` are disposable and must never be committed.

## Git and deployment

- For normal implementation tasks, create and use a feature branch rather than working directly on `main`.
- Before Git operations, check `git status` and ensure only intended project changes are included.
- After successful tests, commit the intended changes and push the feature branch to GitHub so Vercel can create a Preview deployment.
- Test the resulting Vercel Preview with the browser tools when practical.
- Never merge into `main`, push directly to `main`, or trigger the Production deployment unless the user explicitly approves it.
