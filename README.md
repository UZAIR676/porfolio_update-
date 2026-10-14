# Uzair Portfolio — updated source

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
```

The build creates a static website in `out/`. Deploy the project on Vercel with the Next.js preset, or serve `out/` with static hosting.

All redesigned components, 3D scene, project images and resume PDFs are included. Dependencies and generated build folders are excluded.

The contact form retains the original EmailJS settings. Optional environment overrides: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY. Email delivery has not been tested.
# porfolio_update-
