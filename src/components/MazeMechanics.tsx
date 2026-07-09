import { maze } from "@/data/mazeRunnerContent";

const Note = ({ children }: { children: string }) => (
  <p className="mt-4 border-l border-border-strong pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
    {children}
  </p>
);

/** How the maze works — the rules the Runners were solving for. */
const MazeMechanics = () => (
  <div className="mt-20">
    <div className="seam mb-12" />

    <h3 className="text-xl text-foreground">How the maze works</h3>
    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{maze.summary}</p>

    <dl className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
      {maze.facts.map((fact) => (
        <div key={fact.label} className="bg-surface p-6">
          <dt className="label text-[0.5625rem]">{fact.label}</dt>
          <dd className="mt-3 font-display text-2xl text-accent-c">{fact.value}</dd>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {fact.detail}
          </p>
        </div>
      ))}
    </dl>

    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      <div className="slab slab-accent p-8">
        <h4 className="text-base text-foreground">{maze.runners.title}</h4>
        <p className="mt-3 leading-relaxed text-muted-foreground">{maze.runners.text}</p>
      </div>

      <div className="slab slab-accent p-8">
        <h4 className="text-base text-foreground">{maze.shape.title}</h4>
        <p className="mt-3 leading-relaxed text-muted-foreground">{maze.shape.text}</p>
      </div>
    </div>

    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div className="slab p-8">
        <p className="label">The way out</p>
        <p className="mt-4 font-mono text-sm leading-loose text-accent-c">
          {maze.codeWords.title}
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {maze.codeWords.text}
        </p>
        <Note>{maze.codeWords.note}</Note>
      </div>
    </div>

    {/* Inside the walls. The novel quarters the Glade; so does the model above. */}
    <div className="mt-12">
      <p className="label">Inside the Glade</p>
      <dl className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {maze.glade.map((place) => (
          <div key={place.name} className="bg-surface p-6">
            <dt className="text-base text-foreground">{place.name}</dt>
            <dd className="label mt-1 text-[0.5625rem]">{place.where}</dd>
            <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {place.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>

    <div className="mt-12">
      <p className="label">Building it</p>
      <dl className="mt-6 divide-y divide-border border-y border-border">
        {maze.build.map((row) => (
          <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[10rem_7rem_1fr] sm:gap-6">
            <dt className="font-mono text-sm text-muted-foreground">{row.label}</dt>
            <dd className="font-mono text-sm text-accent-c">{row.value}</dd>
            <dd className="leading-relaxed text-muted-foreground">{row.detail}</dd>
          </div>
        ))}
      </dl>
    </div>

    <div className="slab mt-12 border-l-2 border-border-strong p-8">
      <h4 className="text-base text-foreground">{maze.blueprint.title}</h4>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        {maze.blueprint.text}
      </p>
    </div>
  </div>
);

export default MazeMechanics;
