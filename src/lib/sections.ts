import type { Act } from "@/data/mazeRunnerContent";

/**
 * Eight sections, like the maze. The numbering is not ornament — the reader is
 * walking the same count the Runners mapped.
 *
 * Adding a section here adds it to the nav and to the Runner's map rail. It
 * still needs a matching DOM id on the rendered <section>.
 */
export interface SiteSection {
  id: string;
  label: string;
  act: Act;
}

export const sections: SiteSection[] = [
  { id: "the-maze", label: "The Maze", act: "maze" },
  { id: "the-scorch", label: "The Scorch", act: "scorch" },
  { id: "the-death-cure", label: "The Death Cure", act: "city" },
  { id: "grievers", label: "Grievers", act: "maze" },
  { id: "characters", label: "Characters", act: "wckd" },
  { id: "wckd", label: "WCKD Files", act: "wckd" },
  { id: "the-art", label: "The Art", act: "maze" },
  { id: "the-game", label: "The Game", act: "city" },
];

/** Page tint per act, cross-faded behind everything by ActBackdrop. */
export const actTint: Record<Act, string> = {
  maze: "#0E1211",
  scorch: "#130F0C",
  city: "#0C1014",
  wckd: "#0F1214",
};
