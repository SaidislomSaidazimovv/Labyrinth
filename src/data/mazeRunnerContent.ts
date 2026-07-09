/**
 * Single source of truth for every word on the site.
 *
 * Sourced from the three Wes Ball films and their published production notes.
 * Where a detail comes from Dashner's novels rather than the films, the copy
 * says so — `note` fields carry that caveat rather than blurring the two.
 */

export type Act = "maze" | "scorch" | "city" | "wckd";

/* ------------------------------------------------------------------ films */

export interface FilmBeat {
  label: string;
  text: string;
}

export interface Film {
  id: string;
  act: Act;
  ordinal: string;
  title: string;
  subtitle?: string;
  year: number;
  logline: string;
  setting: string;
  crew: { role: string; name: string }[];
  beats: FilmBeat[];
  ending: string;
}

export const films: Film[] = [
  {
    id: "the-maze",
    act: "maze",
    ordinal: "I",
    title: "The Maze Runner",
    year: 2014,
    logline:
      "Sixty boys wake with no memory inside a walled clearing. Beyond the walls, a labyrinth that rearranges itself every night.",
    setting:
      "The Glade — a grass clearing ringed by concrete walls a hundred feet high, at the dead centre of an eight-section maze.",
    crew: [
      { role: "Director", name: "Wes Ball" },
      { role: "Cinematographer", name: "Enrique Chediak" },
      { role: "Production Designer", name: "Marc Fisichella" },
      { role: "Composer", name: "John Paesano" },
    ],
    beats: [
      {
        label: "The Box",
        text: "Thomas rises through the floor of the Glade in a freight elevator, stripped of everything but his first name. The Gladers call the new arrival a Greenie.",
      },
      {
        label: "The rules",
        text: "Three of them. Do your share. Never harm another Glader. Never go beyond the walls. The doors grind open at dawn and slam shut at dusk, and nobody has survived a night inside.",
      },
      {
        label: "Ben",
        text: "Stung by a Griever, Ben turns on Thomas and is banished into the maze. There is no cure for the sting.",
      },
      {
        label: "The first kill",
        text: "Thomas breaks the third rule to help Minho drag Alby home, is locked in overnight, and crushes a Griever between two closing walls. It is the first one ever killed.",
      },
      {
        label: "Teresa",
        text: "The last arrival is a girl, carrying two syringes and a note: she is the last one, ever. She knows Thomas's name before anyone says it.",
      },
      {
        label: "The Changing",
        text: "Thomas stings himself on purpose and uses the anti-venom to claw back his memory. He and Teresa worked for WCKD. They built this.",
      },
      {
        label: "The breakout",
        text: "The walls stay open. Grievers pour into the Glade. Alby dies. The survivors run Section 7 for the Griever Hole, and Gally — half-mad from his own sting — shoots Chuck.",
      },
    ],
    ending:
      "A recorded Ava Paige explains the solar flares, the Flare virus, the Maze as research. She appears to shoot herself as soldiers breach the room. Then the dead scientists stand up, and Paige declares Trial One a success. Phase Two begins.",
  },
  {
    id: "the-scorch",
    act: "scorch",
    ordinal: "II",
    title: "The Scorch Trials",
    year: 2015,
    logline:
      "Out of the maze and into the wasteland it was built to hide. The survivors learn there was never an outside — only the next trial.",
    setting:
      "The Scorch — a sun-flayed desert of collapsed cities and lightning storms, between a WCKD processing facility and the resistance camped in the mountains.",
    crew: [
      { role: "Director", name: "Wes Ball" },
      { role: "Cinematographer", name: "Gyula Pados" },
      { role: "Production Designer", name: "Daniel T. Dorrance" },
      { role: "Composer", name: "John Paesano" },
    ],
    beats: [
      {
        label: "The sanctuary",
        text: "Mr. Janson runs a facility full of rescued kids, hot meals, clean beds, and a promise of a WCKD-free life. Every night, another group is called to leave for the safe haven.",
      },
      {
        label: "Behind the door",
        text: "Thomas and Aris find the ones who left: hung in pods, drained. Janson works for WCKD. Ava Paige is alive.",
      },
      {
        label: "Cranks",
        text: "In a ruined tower the infected swarm them. Winston is bitten, and takes a pistol into the dark rather than turn.",
      },
      {
        label: "Jorge and Brenda",
        text: "A scavenger and his adopted daughter trade passage for a promise. Brenda is infected in the escape and saved by an enzyme the resistance has learned to brew.",
      },
      {
        label: "The Right Arm",
        text: "Vince leads what's left of the opposition. Mary Cooper, once WCKD's own, explains what Thomas already half-knew: he fed WCKD the maze design before he lost his memory.",
      },
      {
        label: "The signal",
        text: "Teresa has her memory back too, and she believes. She calls WCKD to the camp.",
      },
    ],
    ending:
      "Janson kills Mary. Minho is taken. Thomas detonates the camp's fuel and walks out of the fire with a plan: go to the Last City, take Minho back, and put an end to Ava Paige.",
  },
  {
    id: "the-death-cure",
    act: "city",
    ordinal: "III",
    title: "The Death Cure",
    year: 2018,
    logline:
      "The last functioning city on Earth is a walled tower of glass, and everything Thomas has left is inside it.",
    setting:
      "The Last City — WCKD's fortified metropolis. Chrome and curtain wall within; a shantytown of the sick pressed against the outside of the wall.",
    crew: [
      { role: "Director", name: "Wes Ball" },
      { role: "Cinematographer", name: "Gyula Pados" },
      { role: "Production Designer", name: "Daniel Dorrance" },
      { role: "Composer", name: "John Paesano" },
    ],
    beats: [
      {
        label: "The train",
        text: "The Right Arm peels a car off a moving WCKD train to free the Immunes inside. Minho isn't among them.",
      },
      {
        label: "Gally",
        text: "The boy who shot Chuck is alive in the city's underclass, and he is the way in. He takes them to Lawrence, who rules what the wall keeps out.",
      },
      {
        label: "Newt",
        text: "He has been hiding the veins climbing his arm. He is infected, and the Flare does not slow down.",
      },
      {
        label: "The blood",
        text: "Inside WCKD, Teresa finds it: the cure is not in the enzyme. It is in Thomas.",
      },
      {
        label: "The wall",
        text: "Lawrence walks a truckload of explosive into the city wall himself. Cranks come through the breach.",
      },
    ],
    ending:
      "Newt dies on Thomas's knife, asking for it. Janson is torn apart by the infected. Teresa falls with the WCKD tower after pushing Thomas clear. The rest reach a Safe Haven island, and Thomas keeps a note he cannot read without stopping.",
  },
];

/* ---------------------------------------------------------------- grievers */

export const grievers = {
  summary:
    "Not a monster in the maze so much as the maze's immune system. Grievers hunt the corridors after the doors close, and they nest in Section 7.",
  designer: "Ken Barthelmey",
  origin:
    "Ball first asked for a pure machine. Barthelmey argued for a biomechanical hybrid, closer to the fleshy thing in Dashner's novel, and Ball took the drawing on sight.",
  anatomy: [
    { part: "Body", detail: "Bulbous and low to the ground — drawn from slugs and coconut crabs." },
    { part: "Head", detail: "Caterpillar, bulldog and piranha, studded with sensors." },
    { part: "Tail", detail: "A mechanical scorpion tail. Ball asked for it; the whole body had to drop to carry it." },
    { part: "Legs", detail: "Eight of them, telescoping like crane booms. Organic body, machine limbs." },
    { part: "Skin", detail: "Translucent, with light beneath it — sensor dots that flow in one direction, always." },
  ],
  behavior: [
    "Nocturnal. The corridors belong to them the moment the doors close.",
    "They nest through the Griever Hole in Section 7 and return there before dawn.",
    "They are fast, and they do not lose a scent.",
    "They can be crushed. Thomas proved it once, with a closing wall.",
  ],
  sting: {
    title: "The sting and the Changing",
    text: "The tail carries venom. Untreated it kills. Treated, it does something worse and more useful to WCKD: it drags fragments of the life before the maze back through the skull. Ben came out of it swinging. Thomas came out of it knowing who built the walls.",
    note: "The Changing is elaborated at length in the novels. Film one compresses it into the sting and Teresa's two syringes.",
  },
  vfx: [
    "Weta-supervised creature pipeline; a full internal skeleton, muscle and soft-tissue rig.",
    "A bespoke finite-element solver deformed the flesh in time with the animation speed, so muscle flexed and jiggled at pace.",
    "Twelve Griever variations were built at Method Studios.",
  ],
};

/* -------------------------------------------------------------- the maze */

export const maze = {
  summary:
    "A square clearing, four doors, and a circular labyrinth around it in eight numbered sections. The doors open at dawn and close at dusk. The inner walls move every night.",
  facts: [
    { label: "Doors", value: "4", detail: "One centred in each Glade wall, north, south, east and west." },
    { label: "Sections", value: "8", detail: "Two reachable from each door, which is why Runners go out in pairs." },
    { label: "Cycle", value: "30 days", detail: "The pattern of nightly shifts repeats monthly." },
    { label: "Curfew", value: "Dusk", detail: "Nobody had survived a night inside. Then Thomas did." },
  ],
  /** The novel and the film do not agree, and the difference is the whole shape of it. */
  shape: {
    title: "Square in the book, a circle on screen",
    text: "Dashner built the Maze as a square: boxes arranged around a square Glade. Ball rebuilt it as a circle, because his idea for it was a clock counting down. What the aerial shot shows is a circular footprint of concentric bands — corridors packed tight against the Glade, thinning as they go out, and the outermost band divided into the eight sections the Runners charted.",
  },
  runners: {
    title: "The Runners",
    text: "The fastest Gladers. They leave at first light in pairs — one door, two sections — chart what they can, and are back before it closes. Miss the door and the maze keeps you. Minho is Keeper of the Runners; Thomas is made one after his first night.",
  },
  codeWords: {
    title: "FLOAT · CATCH · BLEED · DEATH · STIFF · PUSH",
    text: "Lay the eight section maps from a single day on top of one another and the shifting walls spell a letter. A month of letters gives six words, and the six words open the way out.",
    note: "This is the novel's solution. The first film replaces it with a device recovered from a dead Griever and Minho's discovery that the sections open in sequence.",
  },
  /** What the Glade holds, corner by corner. Drawn from the novel's description. */
  glade: [
    { name: "The Homestead", where: "North-west", detail: "Two storeys of salvage. Beds, stores, and the med-jacks." },
    { name: "The Gardens", where: "North-east", detail: "Crops and the water pump. Everything the Gladers eat." },
    { name: "The Deadheads", where: "South-west", detail: "Woods, and the graveyard inside them." },
    { name: "The Blood House", where: "South-east", detail: "Livestock, and the slaughter." },
    { name: "The Box", where: "Centre", detail: "A freight lift. A new boy every thirty days, supplies with him." },
    { name: "The Map Room", where: "Centre", detail: "A concrete bunker. Eight boxes of maps, one per section, a month deep." },
  ],
  build: [
    { label: "Practical walls", value: "16 ft", detail: "Modular slabs, built low so the lighting rig could sit above them." },
    { label: "Final height", value: "~100 ft", detail: "Extended in VFX from randomised wall pieces so the repeat never reads. The novel says 400." },
    { label: "The doors", value: "20 ft", detail: "Twenty deep, twenty tall, and 7,000 lbs. Fully mechanical — they really opened on cue." },
    { label: "Corridors", value: "~20 ft", detail: "Tight against the Glade, widening outward. Ball's rule: organic near home, machine at the edges." },
    { label: "Ivy", value: "Procedural", detail: "Grown in Houdini per surface — leaves turn toward the sun, follow the cracks, and move in the wind." },
    { label: "Wall movement", value: "On a grid", detail: "Ball's own analogy: Plinko. Slabs grind along grid lines, shedding a century of soil." },
  ],
  /** The honest caveat. There is no blueprint to copy. */
  blueprint: {
    title: "Nobody ever published a map",
    text: "Not Dashner, not the studio, not Method Studios. Wes Ball drew the maze himself and had it built as a twig model for the Map Room set, but no top-down plan was ever released. Every reconstruction — including the one above — is assembled from prose, production stills and the aerial shot.",
  },
};

/* ------------------------------------------------------------- characters */

export interface Character {
  name: string;
  actor: string;
  /** WCKD subject designation. Only A1 and A2 are stated on screen — the rest stay redacted rather than invented. */
  designation: string | null;
  faction: "Glader" | "WCKD" | "Right Arm" | "The Scorch" | "The Last City";
  role: string;
  arc: string;
  fate: string;
  status: "survives" | "dies" | "lost";
}

export const characters: Character[] = [
  {
    name: "Thomas",
    actor: "Dylan O'Brien",
    designation: "A2",
    faction: "Glader",
    role: "The Greenie",
    arc: "Arrives last and breaks every rule in a week. Helped design the maze before WCKD took his memory, and spends three films paying it off.",
    fate: "Reaches the Safe Haven. The cure was in his blood the whole time.",
    status: "survives",
  },
  {
    name: "Teresa Agnes",
    actor: "Kaya Scodelario",
    designation: "A1",
    faction: "WCKD",
    role: "The last arrival",
    arc: "Thomas's partner at WCKD before the Glade, and the only one who never stops believing the arithmetic: a few hundred subjects against a species.",
    fate: "Pushes Thomas clear and falls with the WCKD tower.",
    status: "dies",
  },
  {
    name: "Newt",
    actor: "Thomas Brodie-Sangster",
    designation: null,
    faction: "Glader",
    role: "Second in command",
    arc: "The Glade's conscience. Puts Thomas up for Runner, and holds the group together long after there's no reason to.",
    fate: "Infected in the Last City. Dies asking Thomas to do it.",
    status: "dies",
  },
  {
    name: "Minho",
    actor: "Ki Hong Lee",
    designation: null,
    faction: "Glader",
    role: "Keeper of the Runners",
    arc: "Maps the maze for three years and never once suggests it can't be done. Taken by WCKD, held for a year, and comes out still running.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Alby",
    actor: "Aml Ameen",
    designation: null,
    faction: "Glader",
    role: "First leader",
    arc: "The first boy in the Box, and the one who wrote the three rules. Stung, and never fully comes back.",
    fate: "Killed in the Griever attack on the Glade.",
    status: "dies",
  },
  {
    name: "Gally",
    actor: "Will Poulter",
    designation: null,
    faction: "Glader",
    role: "Keeper of the Builders",
    arc: "Right about the danger and wrong about everything else. Stung, he shoots Chuck; years later he opens the Last City for Thomas.",
    fate: "Reaches the Safe Haven. Nobody quite forgives him.",
    status: "survives",
  },
  {
    name: "Chuck",
    actor: "Blake Cooper",
    designation: null,
    faction: "Glader",
    role: "The youngest",
    arc: "Carves a wooden figure for the parents he cannot remember, and asks Thomas to deliver it if he doesn't make it.",
    fate: "Shot by Gally during the escape.",
    status: "dies",
  },
  {
    name: "Frypan",
    actor: "Dexter Darden",
    designation: null,
    faction: "Glader",
    role: "Cook",
    arc: "Fed sixty boys on nothing, then walked the Scorch and stormed a city. The only Glader to see all three trials through unscathed.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Winston",
    actor: "Alexander Flores",
    designation: null,
    faction: "Glader",
    role: "Keeper of the Slicers",
    arc: "Bitten crossing the Scorch. Understands what he is turning into before anyone else does.",
    fate: "Takes a pistol and sends the others on.",
    status: "dies",
  },
  {
    name: "Ben",
    actor: "Chris Sheffield",
    designation: null,
    faction: "Glader",
    role: "Runner",
    arc: "The first sting the audience sees, and the reason the third rule exists.",
    fate: "Banished into the maze at nightfall.",
    status: "lost",
  },
  {
    name: "Brenda",
    actor: "Rosa Salazar",
    designation: null,
    faction: "The Scorch",
    role: "Scavenger",
    arc: "Grew up in the ruins with Jorge. Infected, cured, and never once asks to be thanked for either.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Jorge",
    actor: "Giancarlo Esposito",
    designation: null,
    faction: "The Scorch",
    role: "Fixer",
    arc: "Sells the Gladers passage, then keeps flying for them long after the deal is paid.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Aris Jones",
    actor: "Jacob Lofland",
    designation: null,
    faction: "Glader",
    role: "Subject from the other maze",
    arc: "The only boy in a Glade of girls. Finds the pod room, and the truth behind Janson's sanctuary.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Sonya",
    actor: "Katherine McNamara",
    designation: null,
    faction: "Right Arm",
    role: "Runner, Group B",
    arc: "Comes out of the second maze and straight into the resistance.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Harriet",
    actor: "Nathalie Emmanuel",
    designation: null,
    faction: "Right Arm",
    role: "Leader, Group B",
    arc: "Led the girls' Glade, then fought a war for the people WCKD was draining.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Vince",
    actor: "Barry Pepper",
    designation: null,
    faction: "Right Arm",
    role: "Commander",
    arc: "Has buried enough Immunes to stop pretending the fight is winnable, and keeps fighting.",
    fate: "Reaches the Safe Haven.",
    status: "survives",
  },
  {
    name: "Mary Cooper",
    actor: "Lili Taylor",
    designation: null,
    faction: "Right Arm",
    role: "Defector, WCKD research",
    arc: "Walked out of WCKD with the enzyme that slows the Flare, and gave it away.",
    fate: "Shot by Janson at the mountain camp.",
    status: "dies",
  },
  {
    name: "Ava Paige",
    actor: "Patricia Clarkson",
    designation: null,
    faction: "WCKD",
    role: "Chancellor",
    arc: "Built the maze, staged her own death, and never argues that what she did was kind — only that it was necessary.",
    fate: "Shot by Janson as the city falls.",
    status: "dies",
  },
  {
    name: "Janson",
    actor: "Aidan Gillen",
    designation: null,
    faction: "WCKD",
    role: "Assistant Director",
    arc: "Minho named him the Rat Man. He wants the cure the way a dying man wants it — for himself.",
    fate: "Taken apart by Cranks in the breach.",
    status: "dies",
  },
  {
    name: "Lawrence",
    actor: "Walton Goggins",
    designation: null,
    faction: "The Last City",
    role: "Leader of the excluded",
    arc: "The Flare took his face. The wall took everything else. He has been waiting a long time for a reason.",
    fate: "Drives the explosives into the wall himself.",
    status: "dies",
  },
];

/* -------------------------------------------------------------- wckd files */

export interface WckdFile {
  code: string;
  label: string;
  classification: string;
  /** Rendered behind a redaction bar until the reader chooses to reveal it. */
  redacted: string;
}

export const wckd = {
  name: "WCKD",
  expansion: "World Catastrophe Killzone Department",
  motto: "WICKED is good.",
  mission:
    "Solar flares scorched the surface. What came after was worse: a pathogen that eats the brain from the inside. A fraction of the young proved immune. WCKD exists to find out why, and it does not much care what the finding costs.",
  killzone:
    "The Killzone is the brain. Everything WCKD builds — the maze, the Scorch, the pods — exists to make an immune brain light up under observation.",
  trials: [
    { code: "TRIAL 1", name: "The Maze", purpose: "Isolate the subject. Remove memory. Introduce a lethal variable and record the response." },
    { code: "TRIAL 2", name: "The Scorch", purpose: "Remove the walls. Introduce the infected. Record which subjects still function." },
    { code: "PHASE 3", name: "The Last City", purpose: "Stop recording. Start harvesting." },
  ],
  files: [
    {
      code: "A2",
      label: "Subject designation",
      classification: "CONFIDENTIAL",
      redacted: "THOMAS — co-architect of the Maze prior to memory wipe. Serum resistance total.",
    },
    {
      code: "A1",
      label: "Subject designation",
      classification: "CONFIDENTIAL",
      redacted: "TERESA AGNES — retains partial recall. Cooperative. Reinstate at Phase Three.",
    },
    {
      code: "TRIAL 1",
      label: "Result",
      classification: "CHANCELLOR EYES ONLY",
      redacted: "Success. Subject A2 solved the Maze in 3 years, 27 days. Variables performed as modelled. Proceed to Phase Two.",
    },
    {
      code: "MEMO",
      label: "Extraction protocol",
      classification: "RESTRICTED",
      redacted: "Immune subjects are to be drained, not held. Enzyme yield falls sharply after the second cycle.",
    },
  ] as WckdFile[],
  aesthetic: [
    "Clinical white, steel blue, chrome, glass. Straight lines and mirror floors.",
    "Every Immune is a photograph, an ID code, and a column of numbers.",
    "Monitor walls watch the Glade. Somebody was always watching the Glade.",
  ],
};

/* -------------------------------------------------------------------- lore */

export interface LoreTerm {
  term: string;
  definition: string;
  tag: "world" | "maze" | "slang";
}

export const lore: LoreTerm[] = [
  { term: "The Flare", definition: "A pathogen released as population control after the solar flares, and never contained. It destroys the brain, and it takes its time.", tag: "world" },
  { term: "Cranks", definition: "The infected, at the stage where the person is gone and the body keeps moving.", tag: "world" },
  { term: "Immunes", definition: "The few whose brains fight the Flare and win. WCKD calls them subjects. Everyone else calls them Munies.", tag: "world" },
  { term: "The Glade", definition: "The clearing at the centre of the maze. Farmed, walled, and governed by three rules.", tag: "maze" },
  { term: "The Box", definition: "The freight elevator that delivers a new boy every thirty days, and supplies with him.", tag: "maze" },
  { term: "Greenie", definition: "The newest arrival, until the next one comes.", tag: "maze" },
  { term: "Keepers", definition: "Whoever leads a trade — Runners, Builders, Slicers, Track-hoes.", tag: "maze" },
  { term: "The Cliff", definition: "An edge in the maze that appears to open onto nothing. It doesn't.", tag: "maze" },
  { term: "The Deadheads", definition: "The wooded corner of the Glade where they bury their own.", tag: "maze" },
  { term: "The Slammer", definition: "The Glade's jail. A pit with a grate.", tag: "maze" },
  { term: "The Scorch", definition: "Everything outside. Sand, ruins, lightning, and the people the Flare finished with.", tag: "world" },
  { term: "The Right Arm", definition: "What organised resistance to WCKD is left, camped where the drones don't fly.", tag: "world" },
  { term: "Shank", definition: "A guy. Delivery decides whether it's an insult.", tag: "slang" },
  { term: "Shuck", definition: "The Glade's only swear word, and it does all the work.", tag: "slang" },
  { term: "Klunk", definition: "Excrement — named for the sound it makes.", tag: "slang" },
  { term: "Slinthead", definition: "Idiot. Reserved for someone who has actually got it wrong.", tag: "slang" },
  { term: "Slim it", definition: "Calm down. Or shut up. Usually both.", tag: "slang" },
  { term: "Good that", definition: "Agreed.", tag: "slang" },
];

/* --------------------------------------------------------- art & craft */

export interface ActPalette {
  act: Act;
  ordinal: string;
  title: string;
  swatches: { name: string; hex: string }[];
  light: string;
  texture: string;
  camera: string;
}

export const artDirection = {
  thesis: {
    quote:
      "The first film with the maze, was all cement and decay. The second story was the sand and rust of the scorch, and this film, The Death Cure, is a world of glass and steel.",
    attribution: "Wes Ball, director",
  },
  palettes: [
    {
      act: "maze",
      ordinal: "I",
      title: "Cement and decay",
      swatches: [
        { name: "Glade sun", hex: "#C7A76A" },
        { name: "Ivy", hex: "#8FA97A" },
        { name: "Moss", hex: "#5C6B52" },
        { name: "Concrete", hex: "#9AA3A0" },
        { name: "Maze shadow", hex: "#2A2F30" },
      ],
      light:
        "Two films in one. The Glade is golden hour, dappled and pastoral. Step through the door and the light goes flat, overcast, shadowless, cold.",
      texture:
        "Cracked grey slab under a century of ivy. The overgrowth sells the age and hides the fact that the wall repeats.",
      camera:
        "Handheld and close on the run. Low angles rake the walls at golden hour to find the texture and shrink the boys.",
    },
    {
      act: "scorch",
      ordinal: "II",
      title: "Sand and rust",
      swatches: [
        { name: "Blown sky", hex: "#E8D3A9" },
        { name: "Amber", hex: "#E08A2E" },
        { name: "Rust", hex: "#B5482A" },
        { name: "Ochre", hex: "#8C5A2B" },
        { name: "Crank dark", hex: "#231A16" },
      ],
      light:
        "Overexposed daylight against interiors lit by whatever burns. Dust in every shaft. Cranks come out of the black.",
      texture: "Sun-bleached concrete, corroded steel, cracked earth, sepia haze.",
      camera: "Still frantic, but wider. The wasteland is a character and it gets the frame.",
    },
    {
      act: "city",
      ordinal: "III",
      title: "Glass and steel",
      swatches: [
        { name: "Chrome", hex: "#B9C6CE" },
        { name: "Steel blue", hex: "#5C9BC4" },
        { name: "Curtain wall", hex: "#2F4A5C" },
        { name: "Resistance gold", hex: "#C98F3C" },
        { name: "City night", hex: "#131A21" },
      ],
      light:
        "Clinical and even inside WCKD — white fluorescents, gloss floors. Neon and sodium in the streets below.",
      texture: "Curtain wall, brushed steel, gold and grey in the chancellor's office. Lawrence's lair is deliberately the opposite: organic, cluttered, warm.",
      camera:
        "Pados grades it orange against teal. Warmth is the resistance, the desert, the people outside the wall. Cold blue is the machine.",
    },
  ] as ActPalette[],
  sound: {
    title: "John Paesano — all three films",
    text: "Ball asked for Jurassic Park. Paesano came back darker: Goldsmith's Alien, a little Zimmer, and percussion built by beating oil drums with sticks. He recorded ambience on set and pushed it into the score, so the grinding stone and the closing doors are half music already.",
    motifs: [
      "The grind of a wall moving in the dark",
      "The slam of the doors at dusk",
      "The Griever — hydraulics, clicks, and an animal underneath",
    ],
  },
};

/* --------------------------------------------------------------- the game */

export const gameDesign = {
  premise:
    "The films are chases. A game would have to be something else: a survival loop about mapping a space that refuses to be mapped, where the only weapon is knowing where the walls will be tonight.",
  pillars: [
    {
      title: "Map or die",
      text: "You draw the maze yourself. Sketch a corridor and it stays on your map until the walls move and your map lies to you.",
    },
    {
      title: "The door is the clock",
      text: "Every run is bounded by dusk. There is no combat answer to being late — only the distance between you and the Glade.",
    },
    {
      title: "Grievers are weather",
      text: "You do not fight one. You learn its route, its noise, and the corridor geometry that kills it.",
    },
    {
      title: "Memory is a resource",
      text: "The sting returns fragments of the world before the maze. It also brings you back wrong. Spend it carefully.",
    },
  ],
  mechanics: [
    { name: "Runner stamina", text: "Sprint drains it; a Griever never does. Distance is the only currency." },
    { name: "Cartography", text: "Mark walls, dead ends and Griever sign on a hand-drawn map that persists between runs." },
    { name: "The nightly shift", text: "Eight sections reconfigure on a thirty-day cycle. Survive long enough and the cycle becomes readable." },
    { name: "Sound", text: "Footsteps, breath and dropped gear carry. Grievers hunt what they hear before they hunt what they see." },
    { name: "The Glade", text: "Between runs: farm, build, argue, bury. What you build determines how long the walls hold." },
    { name: "The sting", text: "Optional, irreversible, and the only way to see the map from above." },
  ],
  progression: [
    { rank: "Greenie", detail: "You are not allowed past the door." },
    { rank: "Track-hoe", detail: "Work the Glade. Earn a look at the maps." },
    { rank: "Runner", detail: "The door opens for you at dawn." },
    { rank: "Keeper", detail: "You decide who else it opens for." },
  ],
};
