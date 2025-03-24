<p align="center">
	<img src="https://raw.githubusercontent.com/CarbonicSoda/gfont-loader/master/media/icon.png" width="130" alt="GFont Loader Icon">
</p>
<h3 align="center">GFont Loader</h3>
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

// either wait for font to load
await loadGFont(...);

// or not (recommended)
loadGFont(...);
```

> The function will return a promise that will, upon load or error, resolve or
> reject with a string message respectively.

The function supports multiple formats:

> All which have good TypeScript typing support.

```ts
// load-fonts.ts

// single family as string (default axis)
loadGFont("Montserrat");

// single family with specific axis
loadGFont({
  family: "Some Font With Axis",
  axis: {
    // ital?: Italic, e.g. 0, 1, "0;1" etc.
    // wdth?: Width, e.g. 75, "69;100", "62.5..80" etc.
    // wght?: Weight, e.g. 300, "100;700", "200..800" etc.
    // [axis]: Any other axis of the font, in the same format
  },
});

// load multiple families
loadGFont([...]); // same format as above (mixable) in array

// only for specific characters
loadGFont(..., opt: {
  text: "Hello World!" // spaces etc. will be encoded automatically i.e. %20
});

// use load strategy other than "swap"
loadGFont(..., opt: {
  strat: "optional"
})
```

### FAQ

**Q**: Why not just use CSS @import etc. directly?  
**A**: This is for package developers that want to load fonts via J/TS, e.g. for
a Shadow DOM injected into someone else's pages etc.  
Also, this package utilizes preload to speed up loading and saves your work,
whilst providing enhanced flexibility and control.

**Q**: Why not just use the official _webfontloader_?  
**A**: Sir, that's from 8 years ago and hella obsolete. It is also way larger
and can hardly be package shaked even if you're only importing from Google
Fonts.  
(13kB vs 0.8kB for the CJS build, npm shows 6+kB for gfont-loader took README,
CJS + ESM builds etc. into account)

#### TLDR

This package provides more flexibility and control over Google Fonts loading,
and is most suitable for package developers.

---

_&emsp;How can such packages not be updated for over 8 years...?_
