/**
 * Subject photographs.
 *
 * Drop an image into `src/assets/subjects/` named after the character,
 * lowercased and hyphenated — `thomas.jpg`, `teresa-agnes.jpg`, `ava-paige.png`.
 * It is picked up at build time, hashed, and served from the bundle. No other
 * wiring is needed. Anyone without a file gets the WCKD "no image on file"
 * plate, which is a deliberate design state rather than a broken one.
 */
const files = import.meta.glob("../assets/subjects/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const bySlug = new Map<string, string>();
for (const [filePath, url] of Object.entries(files)) {
  const slug = filePath.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase();
  bySlug.set(slug, url);
}

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const portraitFor = (name: string): string | undefined => bySlug.get(slugify(name));
