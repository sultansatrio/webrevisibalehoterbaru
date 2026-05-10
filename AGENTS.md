# AGENTS.md

This is a small interview/demo app.

## Rules
- Keep changes simple.
- Do not rewrite the whole app.
- Do not add unnecessary dependencies.
- Preserve existing behavior unless it is clearly broken.
- Prefer small readable code over clever abstractions.
- Improve obvious UX issues.
- After changes, run install/build/test/lint if available.

## Commands
Install: `npm install`
Run app: `npm run dev`
Test: no test script currently exists
Lint: `npm run lint` currently prompts for ESLint setup until config is added
Build: `npm run build`

## Cleanup Plan
1. Fix demo-breaking bugs first: auth/profile null states, login validation, unsafe product filters, and broken price/payment calculations.
2. Clean messy code in touched files only: remove dead commented blocks, unused imports/state, console debugging, and direct DOM manipulation where it affects the main flow.
3. Improve basic UI/UX: add loading/empty/error states, replace disruptive alerts where practical, simplify the landing/product/order flow, and keep labels consistent.
4. Verify the app: run build and lint after adding/configuring lint support; manually check open app, sign in/up, product list, order/cart/payment path, and admin product actions.
