# Shamin Chokshi — Portfolio (Next.js)

A dynamic, animated portfolio for an AI Engineer / Data Scientist persona.
Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**
(scroll animations), and **react-three-fiber** (a talking 3D avatar).

## Features
- 🗣️ **Talking 3D avatar** — speaks your intro aloud (Web Speech API) with a
  mouth that lip-syncs. Works out of the box with a built-in stylized AI head,
  or plug in your real face (see below).
- 🎞️ **Scroll animations** everywhere — staggered reveals, scroll progress bar,
  animated metric counters, marquee, custom cursor.
- 📑 **Dedicated sections**: About · Experience · Education · Skills · Projects · Contact.

## Node version
This build targets **Next.js 13.5** so it runs on **Node 16.14+** (including 18.14.2). An `.nvmrc` pins 18.14.2 and `package.json` declares `engines.node >= 16.14.0`. If you later upgrade to Node 18.17+, you can move to Next 14 by bumping `next` in package.json.

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```
> The avatar speaks after your first click/tap (browsers block audio until a
> user gesture) — or press the **🔊 Hear intro** button.

## Your talking 3D character (your own rigged .glb)
1. Export your rigged + animated character as **avatar.glb**.
2. Drop it at **public/avatar.glb** (the project already points to `/avatar.glb` via `.env.local`).
3. `npm run dev` — your character loads, plays its idle clip, crossfades to a
   talk/wave clip while speaking, and lip-syncs via morph targets if present.

**Clip naming** (for auto-detection): include `idle` and `talk` (or `wave`/`greet`)
in your animation clip names. If names don't match, the first clip plays.
**Lip-sync**: works if the face mesh has morph targets named `jawOpen` / `mouthOpen`
/ `viseme_aa` / `viseme_O` (ARKit / Ready Player Me style). Optional.
**Framing**: tweak `SCALE` / `POSITION` / `ROTATION` at the top of
`components/RealisticAvatar.js`.

If `avatar.glb` is missing, the site safely falls back to a built-in stylized
developer character — nothing crashes.


## Customize
- **All content** lives in `lib/data.js` (profile, experience, education, skills, projects).
- **Colors / fonts**: `tailwind.config.js` + `app/globals.css`.
- **Résumé**: replace `public/resume.pdf` with your real PDF (keep the filename).
- **Intro speech**: edit `PROFILE.intro` in `lib/data.js`.

## Deploy
Push to GitHub and import into **Vercel** (zero config). Add the
`NEXT_PUBLIC_AVATAR_URL` env var in the Vercel dashboard if using a real avatar.

## Tech
Next.js · React · Tailwind · Framer Motion · three.js · @react-three/fiber · @react-three/drei
