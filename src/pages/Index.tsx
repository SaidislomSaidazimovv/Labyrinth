import { useEffect, useMemo } from "react";
import NavigationBar from "@/components/NavigationBar";
import MazeRail from "@/components/MazeRail";
import ActBackdrop from "@/components/ActBackdrop";
import HeroSection from "@/components/HeroSection";
import PrologueTimeline from "@/components/PrologueTimeline";
import FilmSection from "@/components/FilmSection";
import MazeMechanics from "@/components/MazeMechanics";
import MazePreview from "@/components/MazePreview";
import FlareProgression from "@/components/FlareProgression";
import LastCityWall from "@/components/LastCityWall";
import GrieversSection from "@/components/GrieversSection";
import CharactersSection from "@/components/CharactersSection";
import WckdSection from "@/components/WckdSection";
import ArtSection from "@/components/ArtSection";
import GameSection from "@/components/GameSection";
import { films } from "@/data/mazeRunnerContent";
import { sections } from "@/lib/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = sections.map((s) => s.id);

const Index = () => {
  const activeId = useActiveSection(SECTION_IDS);

  const act = useMemo(
    () => sections.find((s) => s.id === activeId)?.act ?? "maze",
    [activeId],
  );

  // Hoisting the act onto <html> lets the chrome that lives outside any
  // section — nav, rail, scrollbar — pick up the same accent as the section
  // being read. Sections still override it locally.
  useEffect(() => {
    document.documentElement.dataset.act = act;
  }, [act]);

  const [first, second, third] = films;

  return (
    <>
      <ActBackdrop act={act} />
      <NavigationBar activeId={activeId} />
      <MazeRail activeId={activeId} />

      <HeroSection />

      <main id="content">
        {/* Unnumbered on purpose: the page counts its sections the way the Maze
            counts its own, and this is what came before there was one. */}
        <PrologueTimeline />

        <FilmSection film={first} index="01">
          <MazeMechanics />
          <MazePreview />
        </FilmSection>

        <FilmSection film={second} index="02">
          <FlareProgression />
        </FilmSection>

        <FilmSection film={third} index="03">
          <LastCityWall />
        </FilmSection>

        <GrieversSection />
        <CharactersSection />
        <WckdSection />
        <ArtSection />
        <GameSection />
      </main>

      <footer data-act="maze" className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-2xl text-foreground">
            The Maze <span className="text-accent-c">Runner</span>
          </p>

          <div className="mt-10 grid gap-8 border-t border-border pt-10 text-sm text-muted-foreground md:grid-cols-3">
            <p className="leading-relaxed">
              An unofficial study of the trilogy directed by Wes Ball, adapted from
              the novels of James Dashner. Not affiliated with the rights holders.
            </p>
            <p className="leading-relaxed">
              Where a detail comes from the books rather than the films, the page
              says so. Where a source is uncertain, it says that too.
            </p>
            <p className="font-mono text-xs leading-relaxed">
              2014 — 2018
              <br />
              Three films · Eight sections · One way out
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
