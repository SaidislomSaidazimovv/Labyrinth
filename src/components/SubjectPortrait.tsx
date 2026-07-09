import { portraitFor } from "@/lib/portraits";

interface SubjectPortraitProps {
  name: string;
  designation: string | null;
}

/**
 * WCKD photographed everyone. Where we have the photograph, it goes here,
 * treated the way the files treat it: desaturated, high contrast, and it only
 * comes back to colour when someone is looking at it.
 *
 * Where we don't, the plate says so. A missing still is a fact about the
 * archive, not a hole in the layout.
 */
const SubjectPortrait = ({ name, designation }: SubjectPortraitProps) => {
  const src = portraitFor(name);

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-background">
      {src ? (
        <img
          src={src}
          alt={`${name}, photographed for the WCKD subject file`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top grayscale contrast-[1.15] brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
        />
      ) : (
        <NoImagePlate name={name} />
      )}

      {/* Registration marks, the way a subject file crops a face. */}
      <span className="bracket-tl absolute left-3 top-3 h-4 w-4" aria-hidden />
      <span className="bracket-br absolute bottom-3 right-3 h-4 w-4" aria-hidden />

      <span className="absolute bottom-3 left-3 font-mono text-[0.5625rem] uppercase tracking-widest text-foreground/60">
        {designation ? `A${designation.replace(/^A/, "")}` : "—"}
      </span>
    </div>
  );
};

const NoImagePlate = ({ name }: { name: string }) => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-surface-raised">
    <span
      className="font-display text-5xl text-foreground/10"
      aria-hidden
    >
      {name.charAt(0)}
    </span>
    <span className="label mt-6 text-[0.5rem] text-muted-foreground/60">
      No image on file
    </span>
  </div>
);

export default SubjectPortrait;
