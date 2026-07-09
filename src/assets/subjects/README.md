# Subject photographs

Fifteen of the twenty cast members have a portrait here. Every one is a
**freely-licensed photograph of the actor** — CC BY, CC BY-SA, CC0 or public
domain — pulled from the lead image of their Wikipedia article via Wikimedia
Commons.

They are not stills from the films. Film stills are copyrighted and cannot be
redistributed; Commons will not host them, and neither will this repo.

## Attribution is not optional

CC BY and CC BY-SA require the photographer to be credited wherever the image
appears. `credits.json` holds author, licence and source URL for each file, and
`src/components/PhotoCredits.tsx` renders that list at the foot of the Subjects
section. **If you add or replace an image, update `credits.json` too.**

## The five without a photo

Blake Cooper (Chuck), Dexton Fleming (Frypan), Alexander Flores (Winston),
Chris Sheffield (Ben) and Jacob Lofland (Aris) have no free photograph on
Wikipedia. Their cards render WCKD's "no image on file" plate instead. That is
a designed state, not a bug — leave it unless you find a properly licensed
photo.

## Adding one

`src/lib/portraits.ts` globs this directory at build time and matches each file
to a character by slugified name. Drop the file in, add the credit, done.

```
thomas.jpg   teresa-agnes.jpg   newt.jpg      minho.jpg     alby.jpg
gally.jpg    brenda.jpg         jorge.jpg     sonya.jpg     harriet.jpg
vince.jpg    mary-cooper.jpg    ava-paige.jpg janson.jpg    lawrence.jpg
```

Extensions `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Portrait crop, roughly
4:5, around 900px wide — the cards never render larger than ~400px, and the
card applies its own grayscale and contrast, so supply the plainest version you
have.
