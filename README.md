# Hang Zhang - Personal website

Personal academic website for architecture, artificial intelligence and fabrication.

Website: https://hangzhangz.github.io/

## Contents

- Selected research: MaskPLAN, MaskLayout, TextPLAN, FreeLayout and FabPLAN.
- Research Portfolio: the supplied original, 27 pages.
- Teaching Portfolio: the supplied original, 52 pages.
- CV: the supplied `ku_arch_CV_Hang_Zhang_v03.pdf`, opened from the top navigation in a new tab.
- A GenAI approach section: Informative, Interactive and Suggestive. Domain knowledge and constraints inform learning and generation; feedback and iterations belong to Interactive; Suggestive means multiple diverse, feasible and potentially surprising alternatives that follow user guidance.
- Page order after the opening: selected research, portfolios, research film, GenAI approach, and contact.
- The complete doctoral research film with the author's English voiceover.

The portfolio and CV PDFs in `assets/documents/` are preserved byte for byte. Cover previews
come from those portfolios. Research figures use the original thesis
figures, at their natural aspect ratios. MaskPLAN uses Figure 1; FreeLayout uses
its first generation-results figure (thesis Figure 5.1); FabPLAN uses its overview and prior-work
comparison (thesis Figure 6.1).

Each project figure and its View in portfolio link open the project's first
page in the research portfolio. A muted preview fades in after the video can
display a frame on hover. The original figure reserves the preview's dimensions,
and the video fits within that space at its original aspect ratio. The previews
use Film Studio pages 27–28, 41 and 44, 49, 55, and 64 and 69, respectively.
Section 04 includes the silent 7DayHouse clip from page 73.

MaskLayout's introduction foregrounds layout generation for irregular shapes.
The portfolio section offers online-reading links; dedicated PDF download buttons
are omitted at the author's request.

The opening background is a web-optimized copy of `ending_videov2.mp4`, referenced
by the Film Studio's final `cc-thanks` page. Its left white gradient follows that
page's mask: 1300/1920 canvas width, fully white through 42% of the mask, fading to
transparent at its right edge. The video is silent, loops, can be paused, respects
reduced-motion preferences, and pauses when offscreen. This backdrop is separate
from the complete doctoral film shown beneath the two portfolios.

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

## Research film

The film uses the corrected English-voiceover export supplied on
5 November 2026. A separate web copy retains 1920 x 1080 resolution at 30 fps,
with H.264 video and the original AAC voiceover audio copied without re-encoding.
The MP4 places playback metadata at the front for streaming. The original export
is preserved outside this repository.

For later replacements, use the author-approved final export:

1. Place a web-compatible MP4 in `assets/media/`, or upload it to appropriate
   video/object hosting when it is too large for the repository.
2. Add caption and poster files as available.
3. Update `content/video.json`: set `src` to the final MP4 URL or relative path,
   set `captions` to a WebVTT file when supplied, and set `status` to `published`.
4. Keep the static player in `index.html` in sync, and update the metadata and
   script URL versions when changing media.
5. Verify actual video playback, sound, seeking and fullscreen on desktop and
   mobile before publishing; verify captions separately when supplied.

The native video player works without JavaScript; `content/video.json` supplies
current media metadata. It does not autoplay, and dedicated download links are
omitted. Native controls request `nodownload` where browsers support it.

GitHub's browser upload limit is 25 MiB per file; regular Git repositories block
files larger than 100 MiB. Do not use Git LFS as a substitute for Pages media
hosting. Large films should use external streaming or object hosting.

## Visitor analytics

GoatCounter records pageviews through the asynchronous script in `index.html`.
The analytics dashboard is https://hangzhangz.goatcounter.com/; sign in there to
view visitor statistics. Dashboard access is limited to logged-in users. Data
retention is set to `0` (never delete) so longer-term statistics can accumulate.

Use the dashboard's `month`, `half year`, and `year` buttons to review those
periods, or enter a custom date range. Statistics start when tracking is enabled;
earlier visits cannot be recovered. Ad blockers and disabled JavaScript can
prevent visits from being counted.

To use a different GoatCounter account, update the `data-goatcounter` endpoint in
`index.html` and the dashboard address above. The endpoint is a public collection
address; no account password or API key belongs in the website repository.

## Contact

Contact details and project descriptions are drawn from the supplied portfolios.
The site uses GoatCounter for cookie-free visitor analytics. Third-party fonts,
an on-site account system and a visitor upload form are not used.
