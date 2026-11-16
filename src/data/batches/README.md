# Species batches

One file per zoo region. Each file default-exports an array of species objects, with every field in one place:

```js
export default [
  {
    id: "giant-panda",                       // lower-case, hyphens, unique across the whole game
    name: "Giant Panda",                     // the answer shown to players
    wikiTitle: "Giant_panda",                // exact English Wikipedia article title (underscores); its lead image becomes the photo
    scientificName: "Ailuropoda melanoleuca",
    classPlain: "Mammal",                    // Mammal | Bird | Reptile | Amphibian | Fish | Invertebrate
    classFull: "Mammalia (Carnivora)",       // "<taxon class> (<order>)"
    taxon: ["Mammalia", "Carnivora", "Ursidae", "Ailuropoda"],   // class, order, family, genus
    aliases: ["panda bear"],                 // other full names that should count as correct
    groups: ["panda"],                       // broader names that get "be more specific" instead of a wrong guess
    diet: "Herbivore — Almost entirely bamboo shoots, leaves and stems",       // clue 1
    biome: "Cool, misty mountain bamboo forest",                                // clue 2
    size: "1.2 – 1.9 m long; 70 – 125 kg",                                      // clue 3
    lastClue: "A black-and-white bear from the mountains of central China.",    // clue 4: near give-away, never the name
    population: {
      value: 1864,                 // the headline figure
      low: 1800, high: 2100,       // any guess inside low..high scores full marks
      display: "about 1,864",      // how it is shown to the player
      year: 2014, basis: "all individuals in the wild",
      confidence: "counted",       // counted | estimated | rough
      note: "Optional one-line caveat.",
      source: { label: "Wikipedia: Giant panda (2014 national survey)", url: "https://en.wikipedia.org/wiki/Giant_panda" }
    },
    status: "Vulnerable",          // IUCN: Critically Endangered | Endangered | Vulnerable | Near Threatened | Least Concern
    region: "Asia",                // Africa | Asia | Europe | North America | South America | Oceania | Oceans
    regionsText: "Mountain forests of Sichuan, Shaanxi and Gansu in central China",
    fact: "One or two sentences, in your own words.",
    ranges: [[[33.9, 107.3], [33.4, 108.4], [32.9, 107.6], [33.5, 106.9]]]   // rings of [lat, lng]; native wild range
  }
];
```

Check a batch with `node scripts/check-batch.mjs src/data/batches/<file>.js` and its ranges with
`node scripts/check-ranges.mjs --batch src/data/batches/<file>.js [id]`.
