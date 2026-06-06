# 3D Cap 🧢 — interactive viewer

A realistic 3D baseball cap for a website: rotate it with the mouse, with a logo on the front and two images on the sides (applied as decals straight onto the surface). Self-contained static HTML — no build step, no framework, no backend.

🔗 **Live demo:** https://denysosadchyi.github.io/cap3d/

![Preview](preview.png)

---

## Features
- Realistic model (6 panels, seams, stitching, curved visor), **Draco-compressed** → only **~224 KB**
- Mouse rotation (OrbitControls) + smooth idle auto-rotation
- Front logo + 2 side images that **wrap along the curved** surface (THREE.DecalGeometry)
- Image aspect ratio preserved; recolor the cap to any color
- Responsive sizing to its container, studio lighting (IBL)
- Built-in procedural cap as a fallback (when no GLB is present)

## Quick start (local)
Files must be served over **HTTP** (not `file://` — ES modules and the GLB won't load):
```bash
cd cap3d
python3 -m http.server 8000
# open http://localhost:8000/
```

## Embedding in a site

### Option A — iframe (simplest)
Upload the folder to your host and embed:
```html
<iframe src="https://denysosadchyi.github.io/cap3d/"
        title="3D cap" loading="lazy"
        style="width:100%; height:600px; border:0;"></iframe>
```

### Option B — inline
1. Copy the `assets/` folder into your project.
2. Add the importmap to your `<head>`:
```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
}}
</script>
```
3. Add a container and the `<script type="module">…</script>` from `index.html`
   (from `import * as THREE` to the end) into your `<body>`. Adjust `#cap { width/height }` to fit your block.

## Project structure
```
cap3d/
├─ index.html                 # the whole viewer (Three.js, decals, controls)
├─ preview.png                # README preview
└─ assets/
   ├─ cap-real.glb            # the cap model (Draco, ~224 KB)
   ├─ logo.png                # front logo  (replace with yours, transparent PNG)
   ├─ side-left.png           # left image
   ├─ side-right.png          # right image
   ├─ fabric_*.jpg            # fabric textures (only for the procedural fallback)
   └─ README.txt              # short cheat sheet
```

## Configuration
Everything is configured in the `CONFIG` block at the top of the `<script>` in `index.html`:

| Option | What it does |
|---|---|
| `modelUrl` | path to the GLB; `null` = built-in procedural cap |
| `modelColor` | cap color, e.g. `0x141414` (black); `null` = keep original |
| `modelRotationY` | model rotation (radians) so the visor faces front (−Z) |
| `autoRotate` | idle auto-rotation until the user grabs it |
| `logo` / `left` / `right` | the images — fields below |

Per image:
| Field | Meaning |
|---|---|
| `url` | path to the file |
| `dir` | which side: `[0,0,-1]` front, `[-1,0,0]` left, `[1,0,0]` right. Add `+Z` to push it toward the back (e.g. `[-1,0,0.7]`) |
| `height` | position on the cap `0..1` (0 = bottom, 1 = top) |
| `size` | WIDTH on the cap (height is computed automatically from the image aspect ratio) |

## Replacing the images
Drop your files into `assets/` with the same names (`logo.png`, `side-left.png`, `side-right.png`).
Recommended: transparent PNG, square or true aspect ratio, ≤ 1024 px. Refresh the page.

## Replacing the 3D model
1. Put your GLB in `assets/` and set `CONFIG.modelUrl`.
2. If the visor doesn't face front, tune `CONFIG.modelRotationY` (π/2≈1.57, π≈3.14).
3. Compress a heavy model (Node required):
```bash
npx @gltf-transform/cli weld  in.glb  weld.glb
npx @gltf-transform/cli draco weld.glb assets/cap-real.glb   # 2.98 MB → ~230 KB
```
   The Draco decoder is already wired into `index.html` (from the gstatic CDN).

## Tech stack
- [Three.js](https://threejs.org) r160 (ESM via CDN, importmap)
- OrbitControls, GLTFLoader + **DRACOLoader**, **DecalGeometry**, RoomEnvironment (IBL)
- No npm dependencies in production — everything loads from a CDN and is cached

## Performance
- Model ~224 KB (Draco), images ~243 KB, code ~14 KB
- 93k triangles — instant rendering even on low-end devices
- `pixelRatio` capped at 2; rendering via `setAnimationLoop`

## Licenses / attribution
- 3D model: **"Baseball Cap" by jomalon** (Sketchfab), **CC BY 4.0** — attribution required.
- Fabric textures: **ambientCG** (Fabric077), **CC0**.
- Images (logo, patches) — property of Extinction Rebellion Rebellion Club.
- Code: Three.js (MIT).

> For a public site, add to the footer: *"Baseball Cap" by jomalon (Sketchfab), CC BY 4.0*.
