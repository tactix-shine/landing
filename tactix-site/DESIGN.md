# Tactix website design and implementation guide

Approved direction: Precision in white. Prepared 8 October 2026.

> **Update, 9 October 2026.** The site is now five pages: home plus NDIS, house cleaning, end-of-lease cleaning and a job photo gallery. NDIS cleaning is the lead service, and the home page's primary action is **About NDIS cleaning**. Real job photos appear on every page, and an NDIS brochure exports to PDF. Photos are static, all 20 job photos are visible, and public pages need no JavaScript. Quick links, larger reading text and phone tap targets help visitors find key information. `README.md` describes the current structure and checks.

This guide turns the selected visual concept into an initial information website. It explains the page structure, copy, styling, responsive behaviour and room for a later enquiry form. `index.html` and `styles.css` implement the proposed layout. `preview.html` shows that same page in desktop and phone frames. This is a local mockup, not a deployed website.

## What the first version must communicate

A visitor should understand that Tactix provides bespoke cleaning, see the available services and find a way to make contact. The first screen names NDIS cleaning as the main service, with residential and end-of-lease cleaning in the supporting note. Visitors should not need to interpret a slogan or scroll through a company story to understand the business.

The primary homepage action is **Explore our services**. The secondary action is **Contact Tactix**. The header offers **Call Tactix**. These actions fit the initial information website and work without a booking system.

The supplied brand card confirms the Tactix name, the tagline "Where precision meets perfection", residential cleaning, end-of-lease cleaning, NDIS services available upon request, hello@tactixshine.au and 0481 993 560. Later site revisions include Melbourne service coverage, cleaning scope and cleaner screening details. Keep these existing details consistent across the pages and brochure. Prices, operating hours, insurance and NDIS registration are not specified. The supporting prose remains website copy for the owner to review.

## The visual direction

The selected concept depends on four recognisable choices: a white ground, cobalt blue type, the geometric tile pattern, and the contrast between an expressive serif and a heavy geometric sans-serif. Mint appears sparingly in service icons and one supporting section. Preserve this hierarchy when adding content.

Use space and thin rules to organise the page. Service descriptions sit directly on the white page, separated by rules. Avoid turning every paragraph into a rounded card. The rounded buttons and circular mint icon backgrounds already provide enough soft geometry.

The lifestyle photograph communicates a cared-for home. It is illustrative, AI-generated imagery, not evidence of a completed Tactix job. Do not label it as customer work or a before-and-after result.

### Changes from the selected image

| Decision | Reason |
| --- | --- |
| Keep the mixed serif and heavy sans-serif hero | This is the clearest link to the chosen concept. |
| Keep the geometric left border on larger screens | It makes the business recognisable without adding another logo. |
| Name all service categories in the opening copy | The first version needs to explain the business immediately. |
| Replace the main "Get a quote" button with "Explore our services" | The initial priority is understanding the services. Contact remains visible. |
| Use readable sans-serif body copy in longer sections | The serif remains prominent in headings and short introductions. |
| Stack the photo below text on phones | This preserves readability and the content order. |
| Add approach, next steps and contact sections | The selected image showed only the opening portion of the page. |

## Page structure and content

The site uses five pages. Header navigation leads to the service pages and job photos; quick links on the home and NDIS pages jump to key information. Photos remain in the page without pop-ups or sliders.

### Header

**Purpose.** Identify the business and provide direct access to services and contact.

On desktop, the header is approximately 100px tall. Place the logo at the left of the content area, navigation in the remaining middle space, and the blue call button at the right. A thin blue-tinted rule separates the header from the hero. The header scrolls with the page.

Navigation order is NDIS cleaning, Services, Job photos and Contact. Services links to the homepage service overview. The call button links to `tel:+61481993560`. The logo links to the home page and has the accessible name "Tactix home".

On phones, use one compact 72px row containing the logo, a **Call** button and a **Menu** disclosure. The navigation links stay collapsed until Menu is activated. Use native `<details>` and `<summary>` so the control works with touch, keyboard and JavaScript disabled. The expanded panel contains NDIS cleaning, Services, Job photos and Contact, with 48px links. The desktop navigation remains a horizontal row. Beneath the phone header, the 20px pattern strip preserves the brand motif.

### Hero

**Purpose.** Explain what Tactix does while preserving the visual identity of the approved concept.

Use one H1 containing two type treatments:

> NDIS cleaning.
> For your home.

The first phrase uses the serif. The second uses the heavy sans-serif. They remain one semantic heading and wrap naturally without forced line breaks. The eyebrow is **Home cleaning in Melbourne**.

Supporting copy:

> We help NDIS participants keep their homes clean. Tell us which rooms you need help with and the times that suit you.

A smaller note identifies residential and end-of-lease services and the cleaner screening information already supplied for the site.

Actions appear below the copy. **About NDIS cleaning** is a filled blue button linking to `ndis-cleaning/`. **Call 0481 993 560** is an outlined telephone link. Neither action suggests a booking has been made.

After the hero, place a pale-blue **Find what you need** navigation strip. Its four underlined links go to **Our services**, **Getting started**, **NDIS brochure** and **Contact us**. Use four columns on desktop and two on phones, with at least 48px per link. On the NDIS page, use **What we clean**, **Getting started**, **NDIS brochure** and **Contact us**. Place cleaning inclusions before process details on that page.

At desktop size, the hero has a minimum height of 610px. Text leads on the left, and a photograph fills the right portion. An opaque white copy area keeps text contrast independent of the photograph. Keep its busy details away from the headline. The copy must remain readable if the image fails to load.

On phones, use a white text block followed by a full-width photograph. Remove the fade entirely. The photograph is 240px tall below 400px viewport width and 280px tall on larger mobile layouts. Keep the sofa, vase and blue cushion visible through `object-position`. Never turn the entire hero into a screenshot. The heading, description and buttons remain live HTML.

### Services

**Purpose.** Help visitors recognise which service applies to them.

Heading:

> Cleaning services in Melbourne.

Use the following content in this order:

| Service | Proposed copy | Link label |
| --- | --- | --- |
| NDIS cleaning | Help with bathrooms, kitchens, floors and everyday rooms. You or someone supporting you can contact us. | About NDIS cleaning |
| Residential cleaning | Cleaning for houses, apartments and townhouses, with attention to the requested rooms. | About house cleaning |
| End-of-lease cleaning | Cleaning before handing back the keys, quoted for the property and move-out timing. | About end-of-lease cleaning |

Each service links to its own detail page. The service articles retain stable IDs, `ndis`, `residential` and `end-of-lease`.

On desktop, present three equal columns with vertical rules. Each contains a mint icon disc, serif service name, short paragraph and a text link with an arrow. The icon and title share a row when space allows. On medium screens they may wrap within the column.

On phones, stack the services and replace vertical separators with horizontal rules. Keep each paragraph and its link next to its heading. Do not use a carousel. All services should be available by ordinary scrolling.

Do not add inclusions such as carpet steam cleaning, oven cleaning, cleaning products, regular schedules or a bond guarantee until the business confirms them. A future service detail page can list agreed inclusions, exclusions and how to enquire.

### Brand statement

Place a shallow pale-blue band immediately after services. It carries the supplied tagline, "Where precision meets perfection", with a single four-point sparkle. The desktop version includes a short horizontal rule. The mobile version removes the rule and allows the tagline to wrap.

This is a pause between practical service information and the explanation of bespoke care. It is not a second hero and contains no button.

### Our approach

**Purpose.** Explain what "bespoke" means in the context of an enquiry.

Desktop uses two columns. The left contains the heading "Cleaning around your needs." and the supporting line "Tell us what matters to you." The right contains an introduction and three short rows separated by thin rules.

The introduction invites the visitor to explain their home and priorities. The rows cover the rooms they use, their routine and the existing cleaner screening information. This gives the word "bespoke" a practical meaning without inventing a company history, staff profile or quality certification.

On phones, the heading and introduction come first, followed by the rows. Avoid a second large photo here. The initial page has enough imagery, and the content is easier to scan without it.

### Job photo showcase

Use the existing real job photos in `assets/jobs/`. The homepage gallery is a selected introduction to the work, followed by a link to the complete gallery. Keep NDIS as the lead service in the hero and navigation; the photos show the cleaning itself. Do not identify a photographed home as an NDIS participant's home or treat different rooms as one project without confirmed details.

**Desktop:** a section heading sits above the images. Below, a seven-to-five column split gives the bathroom image more space. The kitchen photo begins 100px lower, creating a staggered composition. There are no visible captions or introductory paragraphs. A third, wide living-room photo spans the full width. Leave 44px between columns and 64px between the two feature rows. The gallery ends with a fine rule and **Explore our job photos**.

**Tablet:** reduce the image gaps to 28px and the stagger to 64px. Keep the same image composition without visible captions.

**Phone, 768px and below:** stack the three features in their reading order, remove the stagger and use 4:3 images. Keep 36px between features. Use 20px outer gutters below 400px and 24px above. No horizontal carousel or essential content hidden behind a swipe gesture.

The complete `gallery/` page is arranged into four room-based sections: bathrooms, kitchens, living spaces and end-of-lease. A wrapping row of category links follows the page heading. Each section has a short heading, one large photograph covering two columns and two rows, and two smaller supporting photos. On phones, every photo occupies the full content width, stacked in reading order. All 20 original photos remain visible, including supporting photos, without disclosure controls. Category links let visitors jump to bathrooms, kitchens, bedrooms/living areas and end-of-lease cleaning.

Every job image has a descriptive alt attribute and a `<figcaption class="visually-hidden">`. Captions remain in the HTML and available to screen readers, with no visible subtitles or introduction copy. Use plain `<img>` elements inside `<figure>`; do not wrap photos in links or buttons. Clicking or swiping never opens a viewer. Images need no JavaScript, and ordinary page scrolling remains available. Retain natural image colour; never invent before/after comparisons. If the owner supplies project names, scopes and permission later, use those verified details to write individual project features.

### Brochure download

Place a **Learn more about NDIS cleaning** section immediately after the homepage photo showcase and before the gallery page's contact section. This connects visible work with more information about the primary service.

Use a compact pale-mint strip with the heading **Learn more by downloading our brochure.** and a cobalt **Download NDIS brochure** link labelled **PDF**. No cover image, PDF embed or long explanation appears in the section. The download points to the existing two-page PDF without a form.

On desktop, place the 30px serif heading and button side by side with 28px vertical padding. On phones, stack a 28px heading above a full-width button with 24px vertical padding and a 20px gap. Keep `id="brochure"` so quick links still work. Other service pages retain their existing brochure links.

The downloadable file remains `ndis-cleaning/tactix-ndis-cleaning-brochure.pdf`. The existing cover preview asset is unused on public pages. Some browsers open downloads in their PDF reader; the file remains readable there.

### How to get started

**Purpose.** Explain the next action without building the enquiry form yet.

Use a pale mint background, the heading "How to get started.", and an ordered list:

1. **Choose your service.** NDIS cleaning, residential cleaning or end-of-lease cleaning.
2. **Tell us about your space.** Your suburb, the size of your home and any areas you'd like us to focus on.
3. **Agree the details.** Talk through the scope and timing, then receive a quote for the clean.

The numbers have a purpose here because the content describes a sequence. Desktop places the steps in three columns. Phones use one column, with a narrow number column beside each step. The mockup does not promise immediate availability or a response time.

### Contact

**Purpose.** Give the visitor a clear route to the business.

The heading is "Let's talk about your clean." Use a cobalt background with white text. Desktop has an introductory column on the left and contact methods on the right. Phones stack them.

Display the phone number as **0481 993 560**, linked to `tel:+61481993560`. Display **hello@tactixshine.au**, linked to `mailto:hello@tactixshine.au`. Both methods occupy large clickable rows. A small note suggests sharing the service, suburb, property size and preferred timing.

Keep `id="contact"` stable. A future form can replace the right column without breaking any page navigation. Telephone and email links should remain available alongside that form.

### Footer

Return to a white background. Show the logo, "Bespoke cleaning services", section links and a back-to-top link. Finish with a thin rule and the supplied tagline. The footer becomes a single column on phones.

Add a privacy link when a real privacy page exists, particularly before introducing form submissions or tracking. Avoid placeholder links that do nothing.

## Design tokens

### Colour

These are implementation colours matched by eye to the supplied references. The source brand files should take precedence if they supply official values.

| Token | Value | Use |
| --- | --- | --- |
| `--blue` | `#1D4789` | Headings, buttons, geometric pattern, contact section |
| `--blue-dark` | `#12366D` | Button hover and dark foreground |
| `--mint` | `#A7DECA` | Small accents and focus treatment on blue |
| `--mint-pale` | `#E1F2EC` | Service icon discs and next-steps background |
| `--sky` | `#EDF4FC` | Tagline band and subtle hover fill |
| `--ink` | `#233C60` | Longer body copy |
| `--line` | `#BECDE2` | Structural rules |
| `--white` | `#FFFFFF` | Main page background and reversed type |

Mint is not a body-text colour on white. Pale lines are decorative separators, not the only way to identify an interactive control. Filled buttons use white on blue; outlined buttons use blue on white.

### Typography

The JPEGs do not identify the original font names. The mockup uses **Bodoni Moda Regular** for the high-contrast serif and **Montserrat** at 400, 600 and 800 for body copy, controls and heavy display text. These are implementation substitutes, not a claim about the original artwork. Local font files are included so the mockup does not rely on a live font service.

| Role | Desktop | Phone | Treatment |
| --- | --- | --- | --- |
| Hero serif phrase | Fluid 52 to 76px | 38 to 58px depending on width | Regular, tight line height |
| Hero heavy phrase | 92% of desktop serif size | 102% of mobile serif size | Weight 800, line height 1.06 to 1.07 |
| Section heading | Fluid 38 to 58px | Usually 38px | Serif, line height 1.13 |
| Approach/contact heading | Up to 64px | 44px | Serif |
| Service heading | 28px | 26 to 27px | Serif |
| Hero supporting copy | 18px | 17px | Sans, line height 1.7 |
| Body copy | 16 to 18px | 16 to 17px | Sans, line height 1.7 to 1.8 |
| Captions and secondary notes | 14px | 14px | Sans, line height 1.7 |
| Primary controls | 14px | 14px | Sans, weight 600, minimum 48px height |

Keep reading text at 16px or above and control text at 14px or above. Use the serif for short headings and sans-serif for explanations. Do not reduce type to rescue a layout. Increase available space or change the columns.

Heading tracking stays between `-0.02em` and `-0.04em`. Long passages use the sans-serif. Avoid long all-capital labels and thin serif text at small sizes.

### Spacing and geometry

Use a spacing family of 8, 12, 16, 20, 24, 32, 48, 64, 80 and 96px. Small gaps group related content; large gaps separate sections. The current CSS makes a few optical adjustments to match the chosen composition.

The page has a maximum width of 1680px. The desktop pattern rail is 96px wide and shrinks to 64px at medium widths. Main side gutters are fluid between 32 and 72px. Phone gutters are 24px, reduced to 20px below 400px.

Desktop sections generally have 68 to 104px vertical padding. Phone sections use roughly 38 to 58px. Buttons have pill-shaped corners and minimum heights of 52px, with at least 48px for the header call control. Icon discs are 64px on desktop and 56px on phones. Article containers have no shadow.

The decorative rail fades away after the opening sections. It does not stay fixed while the visitor scrolls. On phones the rail disappears entirely and only the short header strip remains. This keeps the brand motif without reducing reading width.

## Responsive behaviour

Every page uses the same responsive CSS. Desktop and phone are not separate templates.

| Viewport | Layout |
| --- | --- |
| 1200px and wider | Full horizontal header, 96px rail, split hero, three service columns, two-column approach and contact |
| 769 to 1199px | 64px rail, 32px gutters, reduced type, wrapped service icon/title groups where needed |
| 400 to 768px | Compact single-row header with Menu, short pattern strip, text then photo hero, one-column services and supporting sections |
| 320 to 399px | 20px gutters, 38px hero type, stacked full-width hero actions, 240px photograph |

At 390px, the opening text names NDIS cleaning, lists the other service categories and provides the main action before the visitor reaches the lower sections. The entire service section does not have to fit above the fold. Clear initial copy matters more than compressing everything into one screen.

Check at 320, 390, 768, 1024 and 1440px. Also inspect the transitions immediately around 768 and 1200px. Long email addresses must wrap instead of creating horizontal scrolling. Let content determine page height. Avoid fixed-height text containers.

Use the browser's real 200% zoom in production checks. A mobile layout should remain understandable without animation or a hover state. Decorative graphics have no role in communicating service availability.

## Interactions and accessibility

Use semantic `header`, `nav`, `main`, `section`, `article` and `footer` elements. Keep one H1, H2 section headings and H3 service headings. The steps are an ordered list. A keyboard-visible skip link moves focus to `main`, which has `tabindex="-1"`.

Buttons that navigate are links. Phone and email controls use native `tel:` and `mailto:` links. Every visible control in the mockup has a destination. No control reports a successful enquiry or confirmed booking.

Focus uses a visible 3px outline. The contact section uses mint focus outlines against blue. Quick links, text links and footer links are underlined without needing hover. Header links gain underlines on hover and keep a visible keyboard focus outline. Smooth in-page scrolling respects the visitor's reduced-motion preference. The static page works with JavaScript disabled.

The hero photograph has empty alternative text because it is atmospheric and the adjacent copy communicates the offer. Decorative icons and the pattern are hidden from assistive technology. The logo link supplies its own accessible name. All real job photos carry descriptive alternative text.

These choices follow W3C guidance for [descriptive headings and labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html), [reflow at narrow widths](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and [pointer target sizes](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). The design uses 48px key controls, above the 24px minimum target size described there. Automated checks cover widths from 320 to 1440px, keyboard entry, image alternatives, link destinations and reduced motion. This is not a WCAG compliance certification.

Before launch, verify text contrast, visible focus, link names, zoom and keyboard navigation in the chosen production implementation. Automated geometry checks do not replace a screen-reader check.

## Adding enquiries later

Keep the existing contact section and its anchor. On desktop, a form can occupy the current right-hand column; on phones it sits after the introductory paragraph. Keep the phone and email choices below it. Retain the cobalt background with white labels and white inputs, or give the entire form region a white background if the form becomes long.

The initial form should ask only what is needed to respond:

| Field | Required | Behaviour |
| --- | --- | --- |
| Name | Yes | Visible label and `autocomplete="name"` |
| Email | Yes | Email input and `autocomplete="email"` |
| Phone | No | Telephone input and `autocomplete="tel"` |
| Service | Yes | Native select with the three confirmed services and "Not sure yet" |
| Suburb or postcode | Yes | Establish location without requesting a full address immediately |
| Property and cleaning details | No | Short textarea with a helpful example |
| Preferred timing | No | Text input that accepts flexible answers such as "before Friday" |

Start with one form column even on desktop. Use 16px input text, 48px minimum input height, visible labels and 20 to 24px field spacing. Keep the submit button below the last field. A two-column name/email row is optional only if both remain comfortable at the actual container width.

The action should say **Send enquiry**. It should never say **Book now** unless it actually reserves a service. A later service-specific link can preselect a service when it leads to this form.

Define these states before connecting the form:

- Empty form with labels and useful helper text.
- Field error beside the affected input, plus an error summary linked to invalid fields after submit.
- Sending state that prevents duplicate submissions and announces progress.
- Success shown only after the server accepts the enquiry. Explain the next step without inventing a response-time promise.
- Failure that preserves the visitor's entered values and gives retry, phone and email options.

Do not request an NDIS participant number, health details or plan documents in this initial contact form. Arrange any necessary follow-up separately. Connect the form to a real server endpoint or a selected form service, validate server-side, add appropriate spam controls and publish the relevant privacy information before collecting enquiries. The current mockup intentionally contains no input fields, data storage or submission code.

## Assets and implementation

The website needs no build process, framework or JavaScript on its public pages. Photos are plain images with visually hidden captions. Use `python3 -m http.server 4173 --bind 127.0.0.1` from this folder so folder links resolve correctly. Open `preview.html` for desktop and phone controls. The frame widths are 1440px and 390px; a scale transform fits the preview into the available window without changing the page's own viewport width.

| File | Purpose |
| --- | --- |
| `index.html` | Complete responsive information page |
| `styles.css` | Design tokens, typography, sections and breakpoints |
| `preview.html` | Review tool with desktop and phone modes |
| `assets/tiles.svg` | Recreated geometric motif based on the supplied card |
| `assets/brand-card.jpeg` | Supplied artwork, visually cropped with CSS for the logo |
| `assets/living-room-*.webp` | Generated illustrative hero photograph |
| `assets/*.woff2` | Local prototype fonts |
| `assets/ASSETS.md` | Asset sources and exact image-generation prompt |
| `check.cjs` | Browser checks and screenshot capture |
| `previews/` | Captured desktop and phone views |

The logo crop is a prototype shortcut. Replace it with an official transparent SVG before launch. Keep the custom lettering intact; do not retype the wordmark in a substitute font. The tile pattern is a close vector reconstruction, not original master artwork.

Responsive WebP candidates and local WOFF2 fonts are included. Retain explicit image dimensions to avoid layout jumps and keep the font licence notices. Confirm the original brand fonts before paying for or integrating a different family.

The prototype uses no analytics, map embed, cookie banner, scheduling integration or customer database. Add each only when there is a concrete requirement.

## Launch acceptance criteria

The initial version is ready for implementation when the owner approves the proposed copy and provides the final logo artwork. Confirm the published service names, phone number and email. If location coverage matters to prospective customers, add the confirmed service area near the hero description or contact section before launch.

The implemented page should pass these checks:

- Visitors can identify the cleaning services in the first screen.
- Services, approach and contact navigation lead to the correct sections.
- The primary action leads to services and the secondary action leads to contact.
- Phone and email links use the confirmed destinations.
- No horizontal scrolling occurs at the tested viewport widths.
- Text, image assets and fonts load without errors.
- Heading order, keyboard focus and reduced motion work.
- Mobile services remain fully visible through scrolling, with no hidden carousel.
- All imagery is presented honestly and no unsupported business claims have been added.
- The future form has not been mistaken for existing functionality.

Source guidance: [Impeccable](https://github.com/pbakaus/impeccable/blob/main/skill/SKILL.src.md). The chosen Tactix reference and the owner's stated priorities govern the visual design.
