MODEL
=====
cap-real.glb — realistic baseball cap (jomalon, Sketchfab), Draco-compressed (~224 KB, 93k polygons).
Loading it in the browser needs a Draco decoder (already wired into index.html via CDN).

REPLACING THE IMAGES
====================
Drop your 3 files here with the SAME names (replacing the placeholders):
  logo.png        — front logo. Transparent PNG, square, 512-1024 px.
  side-left.png   — left side image (square, 512 px).
  side-right.png  — right side image (square, 512 px).
Refresh the page — done.

FINE-TUNING (index.html, CONFIG block)
======================================
  dir    — side: [0,0,-1] front, [-1,0,0] left, [1,0,0] right (add +Z to push toward the back)
  height — position on the cap 0..1
  size   — width on the cap (height auto from aspect ratio)
  modelRotationY — model rotation (if the visor doesn't face front)
  modelColor     — cap color (e.g. 0x141414 = black)

LICENSE / ATTRIBUTION
=====================
Model "Baseball Cap" by jomalon (Sketchfab), CC BY 4.0 — for a public site
add to the footer: "Baseball Cap" by jomalon (Sketchfab), CC BY 4.0.
