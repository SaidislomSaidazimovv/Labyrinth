import { motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { artDirection } from "@/data/mazeRunnerContent";

const ArtSection = () => {
  const reduced = useReducedMotion();

  return (
    <Section
      id="the-art"
      act="maze"
      index="07"
      title="The Art of the Trilogy"
      standfirst="Three films, three worlds, and one sentence from the director that explains every frame of them."
    >
      {/* The thesis, given the space a thesis deserves. */}
      <figure className="border-l-2 border-accent-c py-2 pl-8 md:pl-12">
        <blockquote className="max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
          “{artDirection.thesis.quote}”
        </blockquote>
        <figcaption className="label mt-6">{artDirection.thesis.attribution}</figcaption>
      </figure>

      {/* Each panel wears its own act — the tokens re-scope, so the panel is
          literally coloured by the film it describes. */}
      <div className="mt-20 space-y-px bg-border">
        {artDirection.palettes.map((palette, i) => (
          <motion.article
            key={palette.act}
            data-act={palette.act}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-surface p-8 md:p-12"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl text-accent-c">
                    {palette.ordinal}
                  </span>
                  <h3 className="text-xl text-foreground">{palette.title}</h3>
                </div>

                <ul className="mt-8 flex">
                  {palette.swatches.map((swatch) => (
                    <li key={swatch.hex} className="group relative flex-1">
                      <div
                        className="h-24 w-full transition-transform duration-300 group-hover:scale-y-110"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <p className="mt-3 font-mono text-[0.625rem] leading-tight text-muted-foreground">
                        {swatch.name}
                        <br />
                        <span className="text-foreground/50">{swatch.hex}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="space-y-6">
                {[
                  ["Light", palette.light],
                  ["Texture", palette.texture],
                  ["Camera", palette.camera],
                ].map(([label, text]) => (
                  <div key={label} className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:gap-6">
                    <dt className="label text-[0.5625rem]">{label}</dt>
                    <dd className="leading-relaxed text-muted-foreground">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Sound */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div>
          <h3 className="text-xl text-foreground">{artDirection.sound.title}</h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {artDirection.sound.text}
          </p>
        </div>

        <ul className="space-y-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {artDirection.sound.motifs.map((motif) => (
            <li key={motif} className="font-mono text-sm leading-relaxed text-muted-foreground">
              {motif}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ArtSection;
