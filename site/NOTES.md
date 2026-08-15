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

## Known rough edge

`useTheme` (`src/hooks/useTheme.ts`) is a plain hook, not shared state, so every
caller holds its own copy. It's safe today only because its two consumers never
mount together — the NavBar's `ThemeToggle` is hidden on the home page, and the
sun/moon button only exists there. Put the nav back on the home page and they'll
desync, with one control showing the wrong state. Fix with context or an
external store if that day comes.
