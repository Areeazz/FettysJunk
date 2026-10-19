# Fetty's Junk Removal Landing Page

Premium Vite/React landing page for Fetty's Junk Removal. The site is a trust-building page for paid traffic. Quote and booking buttons use the Jobber request form when it is configured, and call the business phone until then.

## Quote and booking link

The quote/booking link is configured in `src/App.jsx` (`jobberFormUrl`).

That value must be a Jobber online request form link. It must never be a client quote link, a client hub link, or any URL that opens one customer's quote.

Leave `jobberFormUrl` empty and keep `isJobberBookingEnabled` set to `false` until the real request-form URL is ready. While booking is disabled, quote and booking buttons call (425) 359-7073.

The site does not store customer lead information. When the request form is enabled, Jobber handles name, phone, email, address, service details, and follow-up.

## Local Development

```bash
npm install
npm run dev
```

The local dev server runs with Vite.

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Vercel Deployment

Use these settings in Vercel:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

The included `vercel.json` sets the build command and output directory for deployment.
