# Developer notes

Things about this site that aren't obvious from reading the code, and the
places where changing one number silently breaks something else.

The home page is a pixel-art "title screen" (`src/pages/Home.tsx`) with a
scene behind it (`src/components/HomeScene.tsx`) and a coin minigame layered
over it (`src/components/CoinField.tsx`). Every other page is conventional.

---

## Pixel-art scaling: use whole multiples, never fluid units

Sprites must be drawn at a **whole-number multiple** of their source size. At a
fractional multiple the browser renders some source pixels wider than others
and the art looks mushy — `image-rendering: pixelated` does not save you.

So instead of scaling art fluidly, we step it in whole increments. `index.css`
defines:

| Variable        | Default | Applies to                                  |
| --------------- | ------- | ------------------------------------------- |
| `--s-terrain`   | 3       | 18px wall/dirt tiles, 14px grass tile       |
| `--s-char`      | 4       | 24px walking-character frames               |
| `--s-portrait`  | 3       | 64px portrait                               |
| `--s-ui`        | 3       | 32px UI panels/banners, 16px close button   |

Stepped down at `max-width: 900px` and `max-width: 600px`.

Every sprite size is `calc(<source-px> * var(--s-…))`. **Do not** replace these
with `rem`, `vw`, or `clamp()` — that reintroduces the exact problem they solve.
Three sprites were previously off-grid (dirt at 2.67×, digits at 1.78×, the
portrait on a fluid `clamp`) and were fixed.

Borders, padding and the CSS-drawn signpost parts are ordinary `px` on purpose —
they're chrome, not sprites, and should stay a fixed thickness.

---

## Stacking order on the title screen

`.title-screen` sets `isolation: isolate`, so these values are self-contained:

```
sky (-3) < sun/moon (-2) < wall (-1) < signs (-1, later in DOM)
  < grass = title = portrait = guy (0) < coins (1) < coin HUD (5)
  < About dialog (10)
```

Three of these are load-bearing:

- **Signs below the grass** so their posts tuck into the ground and appear to
  slide up out of it on hover, instead of floating over the dirt.
- **Sun/moon below the scenery** so the setting body disappears behind the wall
  and ground rather than sweeping across them. The sky had to drop to `-3` to
  make room; at `-2` with the sky at `-1`, the sky's gradient covers the sun.
- **Coins above the title and portrait** so they fly in front of the text, but
  below the sign links so the signs stay reliably clickable.

The sun/moon is a real `<button>` despite living at a negative z-index. It stays
clickable because the sky is lower still, the grass sets `pointer-events: none`,
and the risen body sits above the wall's top edge. Moving any of those breaks
the theme toggle in a way that looks like nothing at all is wrong.

---

## Numbers coupled across files

These are duplicated by necessity. Change one, change the other.

| Constant | Lives in | Must match |
| --- | --- | --- |
| `FLOOR_RATIO = 0.78` | `CoinField.tsx` | `.grass-floor { height: 22vh }` — where coins bounce |
| `COIN_HALF_SIZE = 20` | `CoinField.tsx` | `.coin { width/height: 40px }` — sprite vs. physics position |
| `bottom: calc(22vh - 14px)` | `.sign-nav` | `.grass-floor` height, so posts sink into grass |
| risen position `10vh` | `--sky-pivot-y` minus `--sky-radius` | must stay above `.title-block { top: 13vh }` |

**The coin HUD deliberately does not use the responsive scale variables.**
Because `COIN_HALF_SIZE` is hardcoded in JS to match the coin's CSS box, making
those sizes responsive would desync the sprite from its physics position. If you
want responsive coins, read the size from a CSS variable in JS first.

---

## Deliberate omissions

- **The walking character is hidden below 1100px.** Below roughly that width the
  gutter between the viewport edge and the wall is narrower than the sprite, so
  his pace collapses toward zero and he marches on the spot. He's decoration, so
  he's dropped rather than shown broken.
- **`prefers-reduced-motion`** disables the coin field entirely (no spawning, no
  counter) and freezes the sky transition, celestial arc, portrait sway and the
  character's walk. The 180° day/night sweep is exactly the kind of full-screen
  motion that setting exists for.
- **The nav bar is hidden on the home page.** The signposts are the navigation;
  showing both would duplicate it. The theme toggle would have vanished with it,
  which is why the sun/moon became the toggle.

---

## Working with the Kenney tileset

Assets come from [Kenney's Pixel Platformer](https://kenney.nl/assets/pixel-platformer)
(CC0). See `public/img/pixel/CREDITS.txt` for which tile index each file is.

Two traps when pulling new tiles out of that pack:

1. **Tiles ship with a baked-in border**, often 2px, sometimes with transparent
   corner notches. Tiling them straight from the pack produces a visible grid.
   Trim the uniform edge rings first — `grass-top.png` went 18×18 → 14×14 this
   way. Preview a tile repeated 4×3 before committing to it; a texture that
   looks fine alone often reveals seams when repeated.
2. **Some tiles are cap/middle/cap sets, not interchangeable variants.** Tiles
   48/49/50 are left-cap, repeating-middle, right-cap of a plank run (47 is the
   standalone single). Same for 90/91/92, a rope beam. Using the middle tile
   alone gives rows with raw cut ends.

Character sprites are **2-frame pairs** (legs together / legs apart). Combine
both frames into one sheet and drive it with `steps(2)` on `background-position`
— that snaps between frames the way real sprite animation does, where a CSS
transform tween would look wrong. Keeping the animation on `background-position`
also leaves `transform` free for flipping and movement.

---

## The About dialog

About has no page of its own. `/about` is a real route, but it renders `Home`
with `AboutModal` open over the title screen. Keeping it a route rather than
component state buys three things: the URL stays linkable, browser Back closes
the dialog, and the signpost stays an ordinary `<Link>` so open-in-new-tab
still works. `App.tsx` treats `/` and `/about` alike when deciding to hide the
nav bar and footer.

Closing navigates to `/` rather than `history.back()` — someone arriving at
`/about` directly has no previous entry on this site to go back to.

This pattern does **not** generalise to the other three signs. Projects has
detail routes, Resume has real length, and Games has its own content; a dialog
would strangle all three. They need their own answer for looking like they
belong to the title screen.

---

## Working with the UI pack

Dialog chrome comes from [Kenney's UI Pack - Pixel Adventure](https://kenney.nl/assets/ui-pack-pixel-adventure)
(CC0), a different pack from the platformer tiles. Sprites in
`public/img/pixel/ui/`, indices recorded in `public/img/pixel/CREDITS.txt`.

**These are 9-slices, not textures.** A panel is a 32×32 sprite with a 6px
frame; the frame must stay a fixed thickness while the middle grows to fit
content. That is `border-image` with `border-image-slice: 6 fill`, *not*
`background-repeat` — tiling one smears the corner art. Crispness comes from
`border-width` being a whole multiple of the 6px slice, hence `--s-ui`.

`border-image-repeat: stretch` is deliberate. Each edge slice is a uniform band
along its length, so stretching leaves no artifact, whereas `round` rescales by
a fractional amount and softens the pixels — the opposite of what you'd expect
from the names.

Two things specific to this pack:

- **Banner tiles 56/57/58 are a cap/middle/cap set**, like the wall planks. The
  middle repeats cleanly; the tails live only on the caps. Verify any new set
  by rendering `left-mid-mid-mid-right` before wiring it up.
- **The banner art is not vertically centred in its sprite box** — the lower
  third is tail. `.pixel-modal-banner` carries asymmetric padding so text
  centres on the ribbon body rather than the box.

The raw pack is unpacked at `src/assets/kenney_ui-pack-pixel-adventure/`
(~876KB, 519 files). Nothing imports it — Vite only bundles what's referenced,
so it costs repo size but not bundle size. Safe to delete once you're confident
no more tiles are needed.

---

## Inner pages

`PageChrome` (`src/components/PageChrome.tsx`) is the shared frame: the same sky
the title screen uses, a ribbon link back to it, and the sun/moon control.
Projects and Work use it — Games still has the old nav bar, which `App.tsx`
decides via `hasPixelChrome`. Remove that condition once it's converted.

- **`.page-chrome` must keep `isolation: isolate`.** The sky sits at `z-index:
  -3`; without a stacking context that escapes to the root, where negative
  z-index descendants paint *before* in-flow block backgrounds — so `body`'s
  gradient in `index.css` covers the sky and the page looks like the backdrop
  never loaded. `.title-screen` isolates for the same reason.
- **The sky, clouds and grass are shared components** (`SkyBackdrop`,
  `GrassFloor`), used by both the title screen and `PageChrome`, so the whole
  site sits in one continuous world.
- **`PageChrome` takes a `ground` prop**, on by default, that renders the grass
  strip *and* the signpost back to the title screen. Turning it off removes the
  page's only way home — add a back link elsewhere first if you do.
- **Sign art lives in `components/Signpost.css`**, shared by the title screen's
  nav row and the inner-page back link. Only placement belongs to the caller.
  The responsive overrides in `Home.css` are scoped under `.sign-nav` so they
  don't reach the standalone sign.
- **Inner-page layering: `sky (-3) < signpost (-2) < grass (-1) < content`.**
  Both the ground and the sign must stay below the content — a fixed floor at a
  positive z-index buries whatever content lines up with it, which is not
  obvious until a page grows long enough to reach the bottom of the viewport.
  Sign below grass is what keeps the post tucked into the turf. Because content
  paints over the floor, `.has-ground` needs only a little bottom padding for
  breathing room — reserving the floor's full height there makes every short
  page taller than the viewport and gives it a scrollbar with nothing to
  scroll to.
- **The sun/moon is pinned to the corner on inner pages, not swung on the arc.**
  The title screen's celestial wheel has a 54vh radius, which would sweep
  straight through the content. Same sprite in the same corner, so it reads as
  the same object; it just cross-fades in place.
- **`.pixel-btn` lives in `index.css`**, not in a component stylesheet, because
  the dialog, detail pages and archive all use it.

**Panel text colours are hard-coded, not themed.** The panel art is a fixed tan
in both light and dark, so `var(--text)` would go pale on it at night and
vanish. Anything sitting on a panel sets its colour explicitly.

- **`signpost={false}` turns off the planted Home sign** for pages one level
  down, which carry their own back link instead (`RibbonLink`, inside the
  content panel). Only one back control shows at a time, so a detail page
  doesn't offer two different retreats.
- **The Home sign becomes a header ribbon below 1440px.** The sign's right edge
  reaches ~145px while the content column starts at `(100vw - 1100px) / 2`;
  they collide below roughly that width, and because the sign sits at a
  negative z-index it doesn't merely overlap — the content paints over it and
  it vanishes. Both controls are rendered and CSS shows one, so there's no
  resize listener and no flash on load. The signpost defaults to `display:
  none` and the wide query enables it, so a query that never matches leaves the
  ribbon showing rather than nothing.
- **`RibbonLink` has its own `--s-ribbon` scale**, separate from `--s-ui`,
  because it sits inside content rather than heading a page. Whole numbers
  only, same as every other sprite scale here.

Projects is a showcase, not a chronology — `tier` in `data/projects.ts` splits
cards-with-detail-pages from one-line archive entries. A one-sentence project
given a full card makes the real work harder to find.

**Both tiers are fixed-size shelves** (`FEATURED_LIMIT`, `ARCHIVE_LIMIT`, six
each). A new project displaces an existing one rather than joining it —
otherwise the page flattens back into "ten things that all look equally
important", which is the problem tiering solves. The limits log a dev-only
warning rather than slicing the array: silently dropping a project you just
added would be a nasty bug to chase. When the archive genuinely outgrows its
shelf, that's the signal to build the full "everything ever" list as its own
view rather than stretching this page.

---

## There is no resume page

There used to be. `/resume` now redirects to `/work`, and the résumé is a PDF
download — offered on the Work page, on every work detail page, and in the
About dialog.

The reason is that the résumé is **tailored per application**. A transcribed
copy on the site would be a stale, generic version of a document maintained
somewhere else, and the drift is invisible until someone reads both. One file
that gets replaced has no such failure mode.

`/work` is the page that replaced it, and it's organised by **what was built,
not by employer**. A card per company gives one employer an enormous entry and
a two-month internship an equally sized one — the same flattening the projects
page tiers away. So `data/work.ts` has two lists:

- `employment` — the plain facts, rendered as the timeline strip at the top of
  the page. Where, what title, how long, nothing else. Two stints at one
  employer nest as two `roles` on one entry rather than becoming two rows,
  which would read as two unrelated jobs.
- `workItems` — one entry per system built, tagged with its company, tiered and
  shelved exactly like projects (`WORK_FEATURED_LIMIT`, `WORK_ARCHIVE_LIMIT`).

The timeline answers "what's the track record" for someone who wants to leave
in three seconds; the cards are for whoever stays. A dev-only check also warns
if a `workItem.company` doesn't match any `employment.company`, since the
detail page looks up the employer link by that string.

**There is no separate "also shipped" section.** Each timeline row carries a
`<details>` disclosure listing everything built at that employer, via
`workItemsFor()` — featured entries link to their detail page, archive entries
are plain text. Those second-tier items belong *to* a job, so filing them under
it makes the timeline the complete record and leaves the card grid a pure
highlight reel. It also keeps the page from growing a third stacked section.

Native `<details>` rather than a state-driven panel: keyboard operable, and
nothing about it would be improved by JavaScript. The caret is a CSS triangle
because the native marker can't be styled consistently and Press Start 2P has
no glyph for one.

Layout is two columns — timeline plus cards on the left, education and skills
in a sidebar. The sidebar is supporting evidence, so it's the half that drops
below at narrow widths.

**Both columns align by their headings, not by their panels.** Every section on
the page leads with a `.scene-title` (in `index.css`) of identical height, so
the Education panel shares a top edge with the timeline panel opposite it. Move
a heading back inside its panel — which is what the sidebar did at first — and
that column starts higher than the other one.

**The featured shelf is a `CardRail`, not a grid.** A grid grows a row every
few entries and pushes the page taller; the rail shows three at a time and pans
sideways, so the page stays about one screen regardless of how many cards
exist. `--rail-visible` steps 3 → 2 → 1 with width.

It's a real overflow container rather than a transform-driven track, which
means touch swipe, trackpad and shift-scroll all work with no code, and tabbing
to an off-screen card scrolls it into view because browsers do that for focused
elements. The arrows sit on top of that as an affordance — they are not the
only way through, which is why there's no keyboard handling in the component.

Two non-obvious bits in `CardRail.css`: `overflow-y` **cannot** stay `visible`
beside `overflow-x: auto` (it computes to `auto`), so the track carries 6px of
vertical padding to give the cards' hover lift and focus ring somewhere to go
instead of being clipped or spawning a second scrollbar. And the arrow-enabled
check allows 1px of slack, or sub-pixel rounding leaves the right arrow live
forever at the end of the track.

**`--page-width` couples the banner to the content column.** `PageChrome` sets
it to 1100px and `.page-chrome.work-page` widens it to 1400px to make room for
the sidebar, through PageChrome's `className` prop. The banner reads the same
variable, so the page title stays aligned with the content beneath it — set a
width in only one of the two places and they drift apart.

**`getWorkItemBySlug` deliberately matches featured items only.** Archive
entries have no body, so resolving one would render an empty detail page to
anyone who guessed the URL. A 404 is the more truthful answer.

### Work cards have no images, on purpose

Every entry is an internal tool, so there is no screenshot that can be
published — `WorkCard` is text-forward where `ProjectCard` is built around art.

That constraint is worth keeping even if art ever becomes available. Two
shelves of identical-looking cards leave a visitor unsure why the site has both
pages; a gallery and a dossier explain the difference without a word of copy.
The underlying split is that everything on Projects has a public artifact to go
look at, and nothing on Work does.

### The confidentiality line

`data/work.ts` opens with a comment listing what must stay out of these
entries — internal system and database names, secrets handling, auth and
deployment topology, record volumes, named data vendors, and anything blaming a
named internal team. **Read it before adding an entry.** None of this work is
publicly linkable, so that comment is the only thing standing between a private
detail and a public page published under a real name.

The consequence is that work detail pages are *less* technically specific than
project detail pages, which is the opposite of what you'd expect. A mod can
name the exact delegate it hooks; an internal platform can't. The depth has to
come from the problem, the ownership and the decisions instead — which is why
each entry is shaped as problem → what it does → what I owned → stack. Keeping
"what it does" separate from "what I owned" is what lets a three-person-team
project sit honestly next to a solo build.

### Supporting facts live in `data/profile.ts`

Contact, education and skills — the evidence, not the headline.

- **No phone number.** It was in plaintext on the old resume page, which is a
  scraper magnet for no benefit. It stays in the PDF, which is a deliberate
  download by someone who already wants to make contact.
- **Skills are grouped, not a flat list.** Thirty-eight items in one column give
  a language the same weight as a database GUI, so nothing reads as a strength.
  Tools that amount to "I have opened this" are gone, and UE4SS moved out — it's
  real, but it belongs to the modding work on the projects page, not to a
  professional skills block.
- **University only.** A high school GPA next to two years of professional work
  reads as not having enough else to say.

### The résumé download is not a signpost

The title screen's signs point to *places*. A download isn't a place, and a
fifth sign that fires a file save breaks the metaphor the whole screen runs on.
The download lives where someone already looking for it will be standing: the
top of `/work`, the foot of each work detail page, and the About dialog's
contact line.
