<h3 align="center">
  <img src="https://raw.githubusercontent.com/CarbonicSoda/gfont-loader/master/media/icon.png" width="130" alt="GFont Loader Icon" /><br />
  GFont Loader
</h3>
<p align="center">How Google Fonts Loading in JS Should Be</p>

---

### Usage

Install this package in your project:

```bash
# via npm
npm add gfont-loader

# or pnpm
pnpm add gfont-loader

# or yarn
yarn add gfont-loader
```

To load fonts, call `loadGFont()`:

```ts
// demo.ts
import { loadGFont } from "gfont-loader";

// single family with default axis
await loadGFont("Montserrat");

// single family with specific axis
await loadGFont({
  family: "Montserrat",
  axis: {
    // ital?: italic, e.g. 0, 1
    // wdth?: width, e.g. 75, "80..100"
    // wght?: weight, e.g. 300, "200..800"

    // [axis]: any other axis available

    // most axis allow <value> | <range>
    // <value>: number | numeric string
    // <range>: `<value>..<value>`
  }
});

// single family with multiple axis
await loadGFont({
  family: "Montserrat",
  axis: [...] // same format as above (number of axis specified must match)
});

// multiple families
await loadGFont([...]); // same format as above (mixable) in array

// only for specific characters
await loadGFont(..., {
  text: "Hello World!" // spaces etc. would be auto encoded i.e. %20
});

// use loading strategy other than "swap"
await loadGFont(..., {
  strat: "optional" // "auto" | "block" | "swap" | "fallback" | "optional"
});
```

### FAQ

**Q**: Why not just use CSS @import etc. directly?

**A**: This is for package developers that want to load fonts via J/TS, not for web developers.

**Q**: Why not just use the (sort of) official _webfontloader_?

**A**: That's from 8 years ago and hella obsolete. It's also way larger and could hardly be
tree-shaked even if you're only importing from Google Fonts.  
(i.e. 13kB vs <1kB for CJS build)

---

_&emsp;How could such packages not be updated for over 8 years...?_
