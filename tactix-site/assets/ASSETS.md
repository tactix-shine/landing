# Asset sources

`brand-card.jpeg` is an unmodified copy of the user's supplied Tactix brand card. The HTML displays only the logo region through CSS clipping. Replace it with the original logo SVG for production.

`tiles.svg` is an authored geometric reconstruction of the motif on that card. It contains decorative geometry and carries no business information.

The fonts were retrieved through the Google Fonts CSS endpoint on 8 October 2026. Bodoni Moda Regular and Montserrat Regular, SemiBold and ExtraBold are used as approximations of the reference typography. They are subset to Latin characters and stored as WOFF2. Their respective OFL licence files are included alongside them.

`living-room-*.webp` (and the `og-image.jpg` crop) were generated with the built-in image-generation tool using `tactix-mockups/01-precision-in-white.png` as a visual reference. It is illustrative imagery, not a photograph of an actual Tactix cleaning job. The exact generation prompt was:

> Use case: photorealistic-natural. Produce a clean editorial interior photograph to be the actual hero image asset for the supplied Tactix landing page design. The supplied image is a composition and lighting reference only. Recreate the photographic living room visible on its right side: cream linen sofa with one cobalt blue cushion, rounded pale oak coffee table with a neutral ceramic vase and green leafy stems, a soft cream rug, pale walls, softly lit dining area and tall garden windows behind. Keep the same elegant, airy, freshly cleaned feel and realistic material textures. Landscape composition, approximately 1536 by 1024. Place the sofa, vase and coffee table toward the right two-thirds; the left third should have a quiet naturally bright wall and window area suitable for a soft CSS fade into the website's white background. This image must contain ONLY the room photograph. No logo, no lettering, no words, no navigation, no webpage, no geometric motifs, no watermark, no people. Natural daylight, restrained colour, no artificial sparkle effects, no exaggerated ultra-wide lens. This is illustrative imagery, not documentation of a real cleaning job.

Sources: [Bodoni Moda](https://github.com/google/fonts/tree/main/ofl/bodonimoda), [Montserrat](https://github.com/google/fonts/tree/main/ofl/montserrat).

`jobs/*.webp` are photos the Tactix team took at the end of real jobs in Melbourne. They were resized and re-encoded as WebP, which strips all camera metadata, including any location data. The originals are in `../images/`. Confirm each client has agreed to publication before launch.

`ndis-brochure-cover.webp` is a rendered preview of page one of the existing two-page NDIS brochure PDF. It is retained as a review asset and is not displayed on public pages.

