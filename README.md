# Fetty's Junk Removal Landing Page

Premium Vite/React landing page for Fetty's Junk Removal. The site is designed as a trust-building page for paid traffic and redirects quote requests directly to Jobber.

## Lead Capture

All quote and booking CTAs redirect to the secure Jobber request form:

```txt
https://l.jbbr.io/eOcGjij
```

The site does not store customer lead information. Jobber handles name, phone, email, address, service details, and follow-up.

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
