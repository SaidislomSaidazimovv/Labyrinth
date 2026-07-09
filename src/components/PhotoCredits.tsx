import credits from "@/assets/subjects/credits.json";

interface Credit {
  character: string;
  actor: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

/**
 * Every portrait here is CC BY, CC BY-SA, CC0 or public domain. The first two
 * require the photographer to be named wherever the work appears, so this is
 * not a courtesy — it is the licence, and it belongs next to the photographs.
 */
const PhotoCredits = () => (
  <section className="mt-20 border-t border-border pt-10">
    <h3 className="label">Photographs</h3>

    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      Portraits of the cast, not stills from the films — Wikimedia Commons carries
      the former under free licences and cannot carry the latter. Five of the
      twenty have no free photograph; their cards say so.
    </p>

    <ul className="mt-8 grid gap-x-10 gap-y-3 md:grid-cols-2">
      {(credits as Credit[]).map((credit) => (
        <li
          key={credit.character}
          className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs text-muted-foreground"
        >
          <a
            href={credit.source}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-accent-c"
          >
            {credit.actor}
          </a>
          <span aria-hidden>·</span>
          <span>{credit.author}</span>
          <span aria-hidden>·</span>
          {credit.licenseUrl ? (
            <a
              href={credit.licenseUrl}
              target="_blank"
              rel="noreferrer license"
              className="transition-colors hover:text-accent-c"
            >
              {credit.license}
            </a>
          ) : (
            <span>{credit.license}</span>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default PhotoCredits;
