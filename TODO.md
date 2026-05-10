# Cleanup TODO

## Goal
Make the app clean, stable, and nice enough for an interview/demo.

## Small Plan

### 1. Fix bugs first
- Make auth/profile reads safe after refresh and before localStorage is populated.
- Stop login/signup from submitting when validation fails.
- Fix login error comparisons.
- Guard product filters against missing category/title fields.
- Fix admin product price calculation and required upload checks.

### 2. Clean messy code
- Remove large commented-out old versions from files that are actively touched.
- Remove unused imports, unused state, and noisy console logs.
- Replace direct DOM select manipulation with existing React state where it affects filters.
- Do not reorganize folders or introduce new architecture.

### 3. Improve UI/UX basics
- Add simple loading, empty, and error states for product/order/admin lists.
- Keep the landing page focused on browse products and order form; avoid duplicated nav/footer/content.
- Replace disruptive alerts with inline status messages where simple.
- Make labels and button text consistent enough for a demo.

### 4. Verify demo flows
- Open app.
- Sign up and sign in.
- Browse/search products.
- Submit order/cart/payment path as far as available test credentials allow.
- Admin add/update/delete product.
- Run `npm run build`.
- Run `npm run lint` after ESLint config is added.

## Don’t do
- Big rewrite
- New architecture
- New libraries unless really needed
- Over-engineering
