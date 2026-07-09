import { useInViewOnce } from "@/hooks/useInView";

/**
 * A real Griever, sculpted and rigged, streamed from Sketchfab.
 *
 * The film's own asset was built by Method Studios and has never been released;
 * it is not obtainable, licensed or otherwise. This is the closest thing that
 * legally exists: a 321,000-face model published under CC Attribution 4.0.
 *
 * Embedding is the licence's intended use, and the licence requires the credit
 * below. Don't remove it.
 *
 * The iframe only mounts once the reader is near it — an embed this heavy has
 * no business loading for someone who never scrolls this far.
 */

const MODEL = {
  uid: "af1324cc254d46819b798b365a57bad8",
  title: "Griever - The Maze Runner (Rigged)",
  author: "Bully Magraptor",
  page: "https://sketchfab.com/3d-models/griever-the-maze-runner-rigged-af1324cc254d46819b798b365a57bad8",
  license: "CC Attribution 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
};

const EMBED_PARAMS = new URLSearchParams({
  autostart: "1",
  preload: "0",
  ui_theme: "dark",
  ui_infos: "0",
  ui_inspector: "0",
  ui_settings: "0",
  ui_annotations: "0",
  ui_help: "0",
  ui_vr: "0",
  ui_ar: "0",
  dnt: "1",
});

const GrieverModel = () => {
  const [frameRef, mounted] = useInViewOnce<HTMLDivElement>("300px");

  return (
    <figure>
      <div
        ref={frameRef}
        className="slab relative h-[340px] overflow-hidden sm:h-[460px] lg:h-[580px]"
      >
        {mounted ? (
          <iframe
            title={MODEL.title}
            src={`https://sketchfab.com/models/${MODEL.uid}/embed?${EMBED_PARAMS}`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <p className="label animate-pulse">Section 7 · nesting</p>
          </div>
        )}
      </div>

      <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Drag to orbit. The film's own Griever was built by Method Studios and has
        never been released, so this is a sculpt by another hand — but a real one,
        rigged, and it has the anatomy: the slug body, the crane legs, the
        scorpion tail.
      </figcaption>

      <p className="mt-4 font-mono text-xs text-muted-foreground">
        <a
          href={MODEL.page}
          target="_blank"
          rel="noreferrer"
          className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-accent-c"
        >
          {MODEL.title}
        </a>{" "}
        by {MODEL.author}, licensed{" "}
        <a
          href={MODEL.licenseUrl}
          target="_blank"
          rel="noreferrer license"
          className="transition-colors hover:text-accent-c"
        >
          {MODEL.license}
        </a>
        . The creature design remains the property of its rights holders.
      </p>
    </figure>
  );
};

export default GrieverModel;
