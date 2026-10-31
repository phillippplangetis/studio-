# Studio Web

A lightweight, browser-based raster image editor. It runs as a static website with no account, backend, or build step. Editing happens locally in the browser; imported files are not uploaded.

## Run locally

Open a terminal in this folder and start any static HTTP server, for example:

```sh
python -m http.server 8080
```

Then open http://localhost:8080. This uses Python’s built-in HTTP server and needs no package installation. Serving over HTTP is recommended because browsers restrict JavaScript modules opened directly from `file://` URLs.

## Host it

Upload this folder to any static web host (GitHub Pages, Cloudflare Pages, Netlify, or a basic web server). Set the publish/output directory to the project root. No build command is required. The PSD/PSB engine is included under `src/vendor`, so the app does not need a CDN at runtime.

## Features

- Independent layers with visibility, opacity, blend modes, editable layer masks, rename, reorder, duplicate, add, and delete
- Brush, eraser, move, line, rectangle, ellipse, text, flood fill, crop, rectangular marquee selection, gradient, blur brush, and eyedropper tools
- Editable text and geometric shape layers, image import as a layer, canvas resizing, rotation, horizontal and vertical flip
- Reversible per-layer brightness, contrast, saturation, grayscale, sepia, invert, and blur adjustments; sharpen and posterize filters
- Open layered PSD/PSB files, import raster layers and pixel masks, and export layered 8-bit RGB PSD or PSB documents
- Save and reopen `.studio` projects with layer pixels, masks, reversible adjustment values, and editable text/shape metadata
- Browser-local autosave with a restore prompt after reopening; autosave is stored in IndexedDB on this device
- Bounded undo/redo history to reduce retained memory on large layered documents
- Flattened PNG export, undo/redo, zoom, keyboard shortcuts, and responsive interface

Keyboard shortcuts: **V** move, **B** brush, **E** eraser, **L** line, **U** rectangle, **T** text, **G** fill, **C** crop, **I** eyedropper, **M** marquee, **D** gradient, **Ctrl/Cmd+Z** undo, **Ctrl/Cmd+Shift+Z** redo, **Ctrl/Cmd+S** save `.studio`, and **Ctrl/Cmd+Shift+S** export PNG. Press **Esc** to clear the marquee selection.

## PSD/PSB compatibility

Open a `.psd` or `.psb` with **Open project / PSD**. The editor retains the document canvas size, layer names/order/visibility/opacity, supported blend modes, raster pixels, and pixel masks. Use the format selector beside **Export PSD** to choose PSD or PSB. Exports contain 8-bit RGB raster layers. The app’s current canvas limit is 6000 × 6000 pixels.

PSD/PSB import is a raster editing workflow. Photoshop text, vectors, smart objects, layer effects, adjustment layers, advanced blend modes, groups, color profiles, and some masks may be simplified or rasterized. The app displays a warning toast for documents containing common unsupported features or non-RGB/8-bit data. Re-exporting from this app is not a lossless round trip and does not preserve every Photoshop-specific feature. For precise authoring and archival round trips, keep the original file. The bundled `ag-psd` engine is MIT-licensed; its license is included at `src/vendor/AG-PSD-LICENSE.txt`.

## Other formats and limits

PNG is the flattened export format. `.studio` is the editor’s editable project format and preserves its own text/shape metadata and reversible adjustment values. Canvas files and many layers use substantial browser memory; large PSB files can exceed browser memory limits even when their pixel dimensions fit the editor.

The editor also lacks smart objects, vector paths, groups, advanced selection tools, color management, plug-ins, and the full adjustment and compositing pipelines of mature editors.
