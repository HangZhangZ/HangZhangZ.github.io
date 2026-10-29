# Hang Zhang - Personal website

Personal academic website for architecture, artificial intelligence and fabrication.

Website: https://hangzhangz.github.io/

## Contents

- Selected research: MaskPLAN, MaskLayout, TextPLAN, FreeLayout and FabPLAN.
- Research Portfolio: the supplied original, 27 pages.
- Teaching Portfolio: the supplied original, 52 pages.
- Teaching and contact sections.
- A research film section, currently marked "Film in preparation".

The two PDFs in `assets/documents/` are preserved byte for byte. Covers and teaching
photographs come from those portfolios. Research figures use the original thesis
figures, at their natural aspect ratios. MaskPLAN uses Figure 1; FreeLayout uses
the main framework (thesis Figure 5.3); FabPLAN uses its overview and prior-work
comparison (thesis Figure 6.1).

The opening background is a web-optimized copy of `ending_videov2.mp4`, referenced
by the Film Studio's final `cc-thanks` page. Its left white gradient follows that
page's mask: 1300/1920 canvas width, fully white through 42% of the mask, fading to
transparent at its right edge. The video is silent, loops, can be paused, respects
reduced-motion preferences, and pauses when offscreen. This backdrop is separate
from the complete doctoral film, whose export and voiceover remain deferred.

## Publishing

This is a buildless static site. GitHub Pages publishes the `main` branch from the
repository root. No package installation or build process is required.

For local preview, serve this directory with a static HTTP server, for example:

```sh
python3 -m http.server 8789 --bind 127.0.0.1
```

## Updating the portfolios

Replace the corresponding files in `assets/documents/`, refresh cover images in
`assets/images/` when needed, and update the page counts and displayed sizes in
`index.html`. Commit and push to `main` to publish.

## Publishing the finalized research film

The film export and voiceover are deliberately deferred until the author finishes
editing and requests preparation. Do not publish an intermediate or older export.

After the finalized export, voiceover, timing and playback have been reviewed:

1. Place a web-compatible MP4 in `assets/media/`, or upload it to appropriate
   video/object hosting when it is too large for the repository.
2. Add caption and poster files as available.
3. Update `content/video.json`: set `src` to the final MP4 URL or relative path,
   set `captions` to a WebVTT file when supplied, and set `status` to `published`.
4. Verify actual video playback, sound, seeking, captions and fullscreen on
   desktop and mobile before publishing.

The page switches from the preparation notice to a native video player only when
a published film URL is configured. Until then, no unavailable play button or
broken media request is presented.

GitHub's browser upload limit is 25 MiB per file; regular Git repositories block
files larger than 100 MiB. Do not use Git LFS as a substitute for Pages media
hosting. Large films should use external streaming or object hosting.

## Contact

Contact details and project descriptions are drawn from the supplied portfolios.
No analytics, third-party fonts, account system or visitor upload form is used.
