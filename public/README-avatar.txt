Put your rigged + animated character here as:  avatar.glb

That's it — the site already points to /avatar.glb (see .env.local).
If avatar.glb is missing, the site safely falls back to the built-in
stylized developer character, so nothing breaks.

Tips for best results:
- Export as .glb (binary glTF) with animations baked in.
- Name your clips so auto-detection works: include "idle" and "talk"
  (or "wave"/"greet") in the clip names. Otherwise the first clip plays.
- For lip-sync, give the face mesh morph targets named jawOpen / mouthOpen
  / viseme_aa / viseme_O (ARKit/Ready Player Me style). Optional — if absent,
  the talk animation clip still plays.
- Adjust framing in components/RealisticAvatar.js: SCALE, POSITION, ROTATION
  at the top of the file.
