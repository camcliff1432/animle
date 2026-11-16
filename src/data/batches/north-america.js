// Species batch: north-america. Format: see src/data/batches/README.md
export default [
  {
    id: "american-bison", name: "American Bison", wikiTitle: "American_bison", scientificName: "Bison bison",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    taxon: ["Mammalia", "Artiodactyla", "Bovidae", "Bison"],
    aliases: ["american buffalo", "plains bison", "wood bison"], groups: ["bison", "buffalo"],
    diet: "Herbivore — Prairie grasses and sedges, grazed in large herds",
    biome: "Open grassland, prairie and boreal meadows",
    size: "2 – 3.8 m long; 400 – 1,000 kg, with a huge shoulder hump",
    lastClue: "The heaviest land animal in North America, a shaggy, humped grazer that once thundered across the Great Plains in the tens of millions.",
    population: {
      value: 31000, low: 20500, high: 31000, display: "about 20,000 – 31,000",
      year: 2019, basis: "wild and conservation-herd animals (not commercial livestock)", confidence: "estimated",
      note: "Counts only wild and conservation herds; roughly 400,000 more are raised in commercial herds. 20,500 is the 2010 conservation-herd count, 31,000 the IUCN figure.",
      source: { label: "Wikipedia: American bison (IUCN and conservation-herd figures)", url: "https://en.wikipedia.org/wiki/American_bison" }
    },
    status: "Near Threatened",
    region: "North America",
    regionsText: "Scattered conservation herds in the Great Plains, Yellowstone, northern Canada, Utah and Alaska",
    fact: "Tens of millions roamed the continent before hunting cut them to a few hundred by 1900. Today's wild herds descend from a handful of survivors.",
    ranges: [
      [[45.1, -111.0], [45.1, -110.0], [44.2, -109.8], [44.1, -110.8], [44.7, -111.1]],
      [[60.0, -114.0], [60.0, -112.0], [58.8, -111.0], [57.8, -112.5], [58.2, -114.5], [59.3, -115.3]],
      [[38.1, -110.9], [38.1, -110.5], [37.8, -110.6], [37.8, -110.9]],
      [[44.0, -103.6], [44.0, -102.0], [43.3, -102.0], [43.3, -103.6]],
      [[59.5, -126.0], [59.5, -124.0], [58.0, -124.0], [58.0, -126.0]],
      [[36.9, -96.6], [36.9, -96.1], [36.5, -96.1], [36.5, -96.6]],
      [[64.2, -146.0], [64.2, -145.0], [63.6, -145.0], [63.6, -146.0]]
    ]
  },
  {
    id: "bald-eagle", name: "Bald Eagle", wikiTitle: "Bald_eagle", scientificName: "Haliaeetus leucocephalus",
    classPlain: "Bird", classFull: "Aves (Accipitriformes)",
    taxon: ["Aves", "Accipitriformes", "Accipitridae", "Haliaeetus"],
    aliases: ["american eagle"], groups: ["eagle"],
    diet: "Carnivore — Mostly fish, plus waterfowl, carrion, and stolen catches",
    biome: "Lakes, rivers and coasts with tall nesting trees",
    size: "70 – 100 cm long; 2 m wingspan; 3 – 6.3 kg",
    lastClue: "A white-headed, yellow-beaked fish-eater that serves as the national bird of the United States.",
    population: {
      value: 316700, low: 253000, high: 380000, display: "about 316,700",
      year: 2019, basis: "all individuals in the lower 48 states",
      confidence: "estimated",
      note: "The US Fish and Wildlife Service figure covers the lower 48 states only; Alaska and Canada add more birds. Range shown is roughly -20%/+20%.",
      source: { label: "US Fish and Wildlife Service: Bald Eagle Population Size 2020 Update", url: "https://www.fws.gov/press-release/2021-03/americas-bald-eagle-population-continues-soar" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Most of Canada and Alaska, all of the contiguous United States, and northern Mexico",
    fact: "Nesting pairs in the lower 48 fell to just 417 in 1963, largely from the pesticide DDT. A ban and legal protection brought them roaring back.",
    ranges: [[[67, -163], [64, -166], [60, -166], [58, -162], [55, -164], [53, -168], [57, -153], [59, -150], [60, -146], [59.5, -141], [56, -135], [54, -130], [49, -125], [46, -124], [42, -124.5], [38, -123], [34.5, -120.5], [32.5, -117.2], [31.5, -114.8], [30, -112], [29, -109], [29, -104], [28, -99.5], [26.2, -97.3], [29, -95], [29.2, -90], [30, -88.5], [29.5, -85], [27, -82.8], [25.2, -81], [25.5, -80.2], [27, -80], [30, -81.3], [32, -80.8], [35, -75.5], [38, -75], [40.5, -74], [41.5, -70], [43.5, -70], [44.5, -67], [47, -64.5], [47.5, -61], [50, -60], [52, -56], [54, -58], [53, -62], [52, -70], [51, -79], [53, -82], [56, -90], [58, -94], [60, -100], [61, -110], [62, -118], [63, -125], [65, -128], [67, -136], [68, -141], [68.5, -150], [68, -158]]]
  },
  {
    id: "pronghorn", name: "Pronghorn", wikiTitle: "Pronghorn", scientificName: "Antilocapra americana",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    taxon: ["Mammalia", "Artiodactyla", "Antilocapridae", "Antilocapra"],
    aliases: ["pronghorn antelope", "american antelope", "prong buck"], groups: ["antelope"],
    diet: "Herbivore — Sagebrush, forbs and grasses",
    biome: "Open grassland, sagebrush steppe and desert flats",
    size: "1.3 – 1.5 m long; 40 – 65 kg",
    lastClue: "Fastest land mammal in the Americas, a tan-and-white runner with forked horns that is not a true antelope.",
    population: {
      value: 700000, low: 500000, high: 1000000, display: "about 500,000 – 1,000,000",
      year: 2016, basis: "all wild individuals", confidence: "estimated",
      note: "Published as a rounded range with no single survey year; year given is that of the IUCN assessment and is approximate.",
      source: { label: "Wikipedia: Pronghorn", url: "https://en.wikipedia.org/wiki/Pronghorn" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Open plains and deserts from southern Canada through the western United States to northern Mexico",
    fact: "It can sustain over 50 km/h for long stretches, a speed thought to be left over from escaping now-extinct predators such as the American cheetah.",
    ranges: [[[52, -111], [52, -106], [50.5, -104], [49, -102], [45.5, -101], [43, -100], [41, -100.5], [38, -100], [35.5, -101], [33, -102.5], [31, -102], [29.5, -103.5], [28.5, -106.5], [30, -108], [31.5, -110.5], [32.3, -113.3], [34, -112.5], [35.8, -114], [37.5, -116], [39.5, -118.5], [41.5, -120.5], [43, -121.5], [44.5, -120.5], [43.5, -116.5], [43.5, -113.5], [45, -113], [47.5, -112.5], [49, -112.5], [50.5, -112.5]]]
  },
  {
    id: "california-condor", name: "California Condor", wikiTitle: "California_condor", scientificName: "Gymnogyps californianus",
    classPlain: "Bird", classFull: "Aves (Cathartiformes)",
    taxon: ["Aves", "Cathartiformes", "Cathartidae", "Gymnogyps"],
    aliases: [], groups: ["condor", "vulture"],
    diet: "Carnivore — Carrion, mostly the carcasses of deer, cattle and sea lions",
    biome: "Rugged canyons, cliffs and open mountain country",
    size: "1.1 – 1.3 m long; up to 3 m wingspan; 7 – 12 kg",
    lastClue: "The largest land bird in North America, a bald-headed scavenger brought back from just 22 birds in the 1980s.",
    population: {
      value: 392, low: 370, high: 410, display: "about 392",
      year: 2025, basis: "free-flying wild birds (a further 215 are in captivity)", confidence: "counted",
      note: "End-of-2025 count from the US Fish and Wildlife Service population status report; 607 birds in total including captive ones.",
      source: { label: "US Fish and Wildlife Service: 2025 California Condor population status", url: "https://www.fws.gov/sites/default/files/documents/2026-02/2025-california-condor-population-status_508-compliant.pdf" }
    },
    status: "Critically Endangered",
    region: "North America",
    regionsText: "Release sites in California, Arizona, Utah, Baja California and the Pacific Northwest",
    fact: "In 1987 the last wild birds were captured so that they could be bred in zoos. Lead from hunters' bullets is still the leading killer of the released birds.",
    ranges: [
      [[37.0, -122.0], [37.0, -120.8], [35.8, -120.8], [35.8, -121.8]],
      [[35.2, -119.8], [35.2, -118.4], [34.3, -118.4], [34.3, -119.8]],
      [[38.0, -113.5], [38.0, -111.0], [36.0, -111.0], [35.8, -113.5]],
      [[31.2, -116.0], [31.2, -115.3], [30.7, -115.3], [30.7, -116.0]],
      [[41.5, -124.2], [41.5, -123.5], [40.8, -123.5], [40.8, -124.2]]
    ]
  },
  {
    id: "black-footed-ferret", name: "Black-footed Ferret", wikiTitle: "Black-footed_ferret", scientificName: "Mustela nigripes",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Mustelidae", "Mustela"],
    aliases: ["american polecat", "black footed ferret"], groups: ["ferret", "polecat"],
    diet: "Carnivore — Almost entirely prairie dogs, which it hunts in their burrows",
    biome: "Shortgrass prairie dog towns on the Great Plains",
    size: "50 – 60 cm long including tail; 0.65 – 1.1 kg",
    lastClue: "A masked, night-hunting weasel relative once thought extinct until a ranch dog dragged one home in Wyoming in 1981.",
    population: {
      value: 300, low: 200, high: 500, display: "about 200 – 500",
      year: 2025, basis: "all wild individuals", confidence: "estimated",
      note: "Numbers swing sharply with plague and drought; Conata Basin alone dropped from about 250 to 70 between 2024 and 2025.",
      source: { label: "Wikipedia: Black-footed ferret", url: "https://en.wikipedia.org/wiki/Black-footed_ferret" }
    },
    status: "Endangered",
    region: "North America",
    regionsText: "Reintroduction sites in the Great Plains and Rockies of the US, plus Mexico and Canada",
    fact: "Every living wild ferret descends from just seven animals. Scientists have even cloned ferrets from frozen cells to add genetic variety.",
    ranges: [
      [[43.9, -102.6], [43.9, -102.0], [43.5, -102.0], [43.5, -102.6]],
      [[42.5, -106.5], [42.5, -106.0], [42.1, -106.0], [42.1, -106.5]],
      [[47.7, -108.5], [47.7, -107.8], [47.3, -107.8], [47.3, -108.5]],
      [[48.7, -108.8], [48.7, -108.0], [48.2, -108.0], [48.2, -108.8]],
      [[35.5, -113.3], [35.5, -112.8], [35.2, -112.8], [35.2, -113.3]],
      [[40.0, -109.0], [40.0, -108.7], [39.8, -108.7], [39.8, -109.0]],
      [[31.0, -108.8], [31.0, -108.2], [30.6, -108.2], [30.6, -108.8]],
      [[49.2, -107.6], [49.2, -106.9], [49.0, -106.9], [49.0, -107.6]]
    ]
  },
  {
    id: "gila-monster", name: "Gila Monster", wikiTitle: "Gila_monster", scientificName: "Heloderma suspectum",
    classPlain: "Reptile", classFull: "Reptilia (Squamata)",
    taxon: ["Reptilia", "Squamata", "Helodermatidae", "Heloderma"],
    aliases: ["gila"], groups: ["beaded lizard"],
    diet: "Carnivore — Bird and reptile eggs, nestling rodents and rabbits",
    biome: "Rocky desert scrub and canyons, mostly sheltering underground",
    size: "30 – 60 cm long; 0.5 – 1.5 kg",
    lastClue: "A slow, pink-and-black beaded lizard of the American Southwest, one of the very few lizards with a venomous bite.",
    population: {
      value: 15000, low: 5000, high: 50000, display: "perhaps 5,000 – 50,000",
      year: 2007, basis: "adults", confidence: "rough",
      note: "No range-wide count exists; accounts only say adults number at least several thousand. This band is an order-of-magnitude guess.",
      source: { label: "Wikipedia: Gila monster (IUCN 2007 status)", url: "https://en.wikipedia.org/wiki/Gila_monster" }
    },
    status: "Near Threatened",
    region: "North America",
    regionsText: "Deserts of Arizona, southwestern Utah, Nevada, New Mexico and the Mexican state of Sonora",
    fact: "It spends roughly 95 percent of its life underground. It stores fat in its tail to survive months between meals.",
    ranges: [[[37.1, -113.6], [37.0, -114.0], [36.3, -114.8], [35.2, -114.6], [34.0, -114.7], [33.2, -114.6], [32.4, -114.8], [31.7, -113.5], [30.5, -112.8], [29.0, -112.2], [27.8, -111.2], [27.0, -109.8], [26.2, -109.2], [25.9, -108.3], [27.5, -108.5], [29, -109.5], [31.3, -109.0], [32.3, -108.4], [33.5, -108.7], [33.2, -110.5], [34, -111.8], [34.5, -113.0], [36.0, -113.2], [37.0, -113.4]]]
  },
  {
    id: "american-alligator", name: "American Alligator", wikiTitle: "American_alligator", scientificName: "Alligator mississippiensis",
    classPlain: "Reptile", classFull: "Reptilia (Crocodilia)",
    taxon: ["Reptilia", "Crocodilia", "Alligatoridae", "Alligator"],
    aliases: ["gator", "common alligator"], groups: ["alligator"],
    diet: "Carnivore — Fish, turtles, snakes, birds and mammals up to deer size",
    biome: "Freshwater swamps, marshes, rivers and lakes",
    size: "3 – 4.5 m long; 200 – 450 kg for large males",
    lastClue: "A broad-snouted, armoured predator of the southeastern US wetlands, famous in the Florida Everglades and Louisiana bayous.",
    population: {
      value: 5000000, low: 4000000, high: 6000000, display: "about 4 – 6 million",
      year: 2020, basis: "all wild individuals", confidence: "rough",
      note: "No national census. Louisiana's wildlife agency cites over 3 million there, and Florida officials roughly 1 to 1.3 million; other states add more. The total is a sum of state estimates.",
      source: { label: "Louisiana Dept of Wildlife and Fisheries: Alligator management", url: "https://www.wlf.louisiana.gov/page/alligator-management" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Wetlands of the southeastern United States, from North Carolina to Texas",
    fact: "Once hunted almost to extinction for leather, it was among the first species protected under the US Endangered Species Act and recovered fully.",
    ranges: [[[35.0, -76.5], [34.0, -77.8], [33.0, -79.2], [31.8, -80.8], [30.3, -81.3], [28.5, -80.6], [26.8, -80.0], [25.2, -80.4], [25.2, -81.2], [26.8, -82.2], [28.5, -82.8], [29.8, -83.5], [30.0, -84.5], [30.1, -85.8], [30.3, -87.5], [30.3, -89.4], [29.1, -89.2], [29.2, -91], [29.5, -92.5], [29.7, -93.8], [29.3, -94.8], [28.3, -96.5], [28.5, -98.3], [30.5, -98.0], [33.5, -96], [34.0, -94.5], [34.8, -92.5], [35.2, -90.5], [33.8, -89], [33.0, -87], [32.5, -85.3], [32.8, -83], [34.0, -81.8], [35.0, -78.5]]]
  },
  {
    id: "north-american-beaver", name: "North American Beaver", wikiTitle: "North_American_beaver", scientificName: "Castor canadensis",
    classPlain: "Mammal", classFull: "Mammalia (Rodentia)",
    taxon: ["Mammalia", "Rodentia", "Castoridae", "Castor"],
    aliases: ["american beaver", "canadian beaver", "beaver"], groups: ["beaver"],
    diet: "Herbivore — Bark, twigs and leaves of aspen, willow and poplar, plus water plants",
    biome: "Streams, ponds and wetlands bordered by woodland",
    size: "80 – 120 cm long including tail; 11 – 32 kg",
    lastClue: "A flat-tailed rodent that fells trees and builds dams and lodges, and is Canada's national emblem animal.",
    population: {
      value: 12000000, low: 10000000, high: 15000000, display: "about 10 – 15 million",
      year: 2016, basis: "all wild individuals", confidence: "estimated",
      note: "Down from perhaps 100 to 200 million before the fur trade. The year is that of the IUCN assessment, approximate.",
      source: { label: "Wikipedia: North American beaver", url: "https://en.wikipedia.org/wiki/North_American_beaver" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Most of Canada and the United States, south to northern Mexico",
    fact: "Its dams create ponds that benefit fish, frogs and birds, which is why it is called an ecosystem engineer. Its front teeth never stop growing.",
    ranges: [[[68, -160], [66, -165], [62, -165], [60, -162], [59, -157], [58, -135], [54, -130], [49, -124], [46, -123.5], [42, -124], [39, -123], [37.5, -122], [34, -117.5], [32, -115], [31.5, -110], [29, -102], [28, -98], [29, -97], [29.5, -94], [30.2, -89.5], [30.3, -87.5], [30, -84.5], [29.5, -82], [30, -81.5], [32, -80.8], [35, -76], [38, -75.3], [41, -72], [43, -70], [45, -67], [46, -64.5], [47.5, -59], [50, -56], [53.5, -57], [55, -61], [57.5, -65], [58.5, -68], [57, -76], [55, -77], [54, -82], [57, -90], [58.8, -94], [60, -98], [62, -106], [64, -115], [66, -125], [68, -135], [69, -141], [69, -150]]]
  },
  {
    id: "monarch-butterfly", name: "Monarch Butterfly", wikiTitle: "Monarch_butterfly", scientificName: "Danaus plexippus",
    classPlain: "Invertebrate", classFull: "Insecta (Lepidoptera)",
    taxon: ["Insecta", "Lepidoptera", "Nymphalidae", "Danaus"],
    aliases: ["monarch", "milkweed butterfly", "common tiger"], groups: ["butterfly"],
    diet: "Herbivore — Caterpillars eat only milkweed; adults sip nectar",
    biome: "Open meadows and fields in summer; high mountain fir forests in winter",
    size: "8.9 – 10.2 cm wingspan; under 1 g",
    lastClue: "An orange-and-black butterfly famous for a multi-generation migration of thousands of kilometres between Canada and central Mexico.",
    population: {
      value: 100000000, low: 40000000, high: 400000000, display: "roughly 40 – 400 million",
      year: 2025, basis: "eastern and western migratory adults in winter (estimated from forest area)", confidence: "rough",
      note: "Insects are not counted directly; numbers are inferred from hectares of occupied Mexican forest (2.93 ha in winter 2025–26) times an uncertain density, plus a small western population. The Red List classes the migratory form as Endangered.",
      source: { label: "Wikipedia: Monarch butterfly (overwintering hectares and counts)", url: "https://en.wikipedia.org/wiki/Monarch_butterfly" }
    },
    status: "Endangered",
    region: "North America",
    regionsText: "Breeds across southern Canada and the United States; the eastern population winters in central Mexico",
    fact: "No single butterfly makes the whole round trip: it takes about four generations. The great-grandchildren somehow find the same fir forests their ancestors left.",
    ranges: [
      [[51, -114], [50, -98], [49.5, -90], [48, -84], [47, -74], [46, -66], [45, -61], [43, -66], [41, -70], [38, -75], [35, -75.5], [31, -81], [27, -80], [25.5, -80.5], [27, -83], [30, -85], [29.5, -90], [28, -96.5], [26, -97.5], [27.5, -100], [29.5, -102], [31, -105], [31.5, -109], [32.5, -114.5], [34, -117.5], [34.5, -120.5], [38, -123], [42, -124], [46, -124], [49, -123], [50, -120]],
      [[19.8, -100.6], [19.8, -100.0], [19.2, -100.0], [19.2, -100.6]]
    ]
  },
  {
    id: "muskox", name: "Muskox", wikiTitle: "Muskox", scientificName: "Ovibos moschatus",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    taxon: ["Mammalia", "Artiodactyla", "Bovidae", "Ovibos"],
    aliases: ["musk ox", "musk-ox", "umingmak"], groups: [],
    diet: "Herbivore — Sedges, willow shoots, grasses and lichens",
    biome: "Arctic tundra and polar semi-desert",
    size: "1.9 – 2.3 m long; 180 – 410 kg",
    lastClue: "A shaggy Ice Age survivor with a skirt of long hair and curved horns that forms a defensive ring against wolves.",
    population: {
      value: 100000, low: 80000, high: 125000, display: "about 80,000 – 125,000",
      year: 2019, basis: "all wild individuals", confidence: "estimated",
      note: "Banks Island alone holds tens of thousands. Alaska, Siberian and Scandinavian herds are reintroduced; the year is approximate.",
      source: { label: "Wikipedia: Muskox", url: "https://en.wikipedia.org/wiki/Muskox" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Arctic Canada and Greenland, with reintroduced herds in Alaska",
    fact: "Its underwool, qiviut, is several times warmer than sheep's wool and is prized by knitters. Alaska's herds were reintroduced in the 1930s after the animal had vanished there.",
    ranges: [
      [[69.7, -132], [69, -125], [68.5, -110], [68, -100], [67, -90], [64.5, -90], [64, -97], [65, -107], [65.5, -115], [67, -123], [68.5, -130]],
      [[74.5, -125], [74.0, -118.5], [72.0, -118.5], [71.0, -121.0], [71.5, -125.5], [73.5, -126.5]],
      [[73.0, -115], [72.7, -107], [70.0, -102], [69.0, -106], [69.5, -115], [71.0, -118]],
      [[83.0, -75], [82.5, -62], [80.5, -65], [79.0, -75], [78.5, -82], [80, -92], [81.5, -90]],
      [[76.5, -114], [76.5, -105], [75.0, -104], [74.5, -110], [75, -116]],
      [[60.5, -167.5], [60.5, -166], [60.0, -166], [60.0, -167.5]],
      [[70.0, -152], [70.0, -142], [68.7, -142], [68.7, -152]],
      [[65.8, -167], [65.8, -164], [64.8, -164], [64.8, -167]],
      [[83.0, -33], [82.0, -22], [79.5, -18.5], [76.5, -18.5], [73.5, -21], [71.0, -25.5], [72.0, -30], [74.0, -27], [76.5, -30], [79, -40], [81, -50], [82, -45]],
      [[67.5, -51.5], [67.5, -50], [66.8, -50], [66.8, -51.5]],
      [[77.5, -71], [77.5, -68], [76.5, -68], [76.5, -71]]
    ]
  },
  {
    id: "mountain-goat", name: "Mountain Goat", wikiTitle: "Mountain_goat", scientificName: "Oreamnos americanus",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    taxon: ["Mammalia", "Artiodactyla", "Bovidae", "Oreamnos"],
    aliases: ["rocky mountain goat"], groups: ["goat"],
    diet: "Herbivore — Grasses, sedges, mosses and alpine shrubs",
    biome: "Steep alpine cliffs and rocky ledges above the treeline",
    size: "1.2 – 1.8 m long; 45 – 140 kg",
    lastClue: "A white, bearded climber of the Rockies and Cascades with black, dagger-like horns and hooves built for sheer rock.",
    population: {
      value: 100000, low: 60000, high: 150000, display: "roughly 60,000 – 150,000",
      year: 2013, basis: "all wild individuals", confidence: "rough",
      note: "No range-wide count. British Columbia is estimated to hold about half of all goats (roughly 41,000 – 66,000 in 2013), and the band doubles that. Some local populations are declining.",
      source: { label: "Wikipedia: Mountain goat", url: "https://en.wikipedia.org/wiki/Mountain_goat" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Mountains of British Columbia, Alberta, Yukon, southeast Alaska and the northwestern United States",
    fact: "Despite the name it is not a true goat, but a distant relative of antelopes. Its split hooves have rubbery pads that grip bare rock at dizzying heights.",
    ranges: [
      [[62, -139], [60, -141], [59, -137], [57, -134], [55, -131], [52, -128], [50, -123.5], [48.8, -122], [47, -121.5], [46, -121.5], [47, -117], [46, -114], [45.5, -113.5], [46.5, -111.5], [48, -112], [49, -113.5], [51, -115.5], [53, -118.5], [55, -121.5], [57, -124.5], [59, -127], [60.5, -131], [61.5, -135]],
      [[62.8, -150], [62.8, -147.5], [61.5, -147.5], [61.5, -150]]
    ]
  },
  {
    id: "greater-roadrunner", name: "Greater Roadrunner", wikiTitle: "Greater_roadrunner", scientificName: "Geococcyx californianus",
    classPlain: "Bird", classFull: "Aves (Cuculiformes)",
    taxon: ["Aves", "Cuculiformes", "Cuculidae", "Geococcyx"],
    aliases: ["roadrunner", "chaparral cock", "california roadrunner"], groups: ["roadrunner", "cuckoo"],
    diet: "Carnivore — Lizards, snakes, insects and small rodents, caught on the run",
    biome: "Dry desert scrub, chaparral and open arid country",
    size: "50 – 62 cm long; 220 – 540 g",
    lastClue: "A long-tailed, streaky ground cuckoo that sprints rather than flies and is a cartoon star in the Southwest.",
    population: {
      value: 1400000, low: 1100000, high: 1700000, display: "about 1.4 million",
      year: 2022, basis: "breeding individuals", confidence: "estimated",
      note: "Partners in Flight global breeding estimate as quoted by All About Birds; the live page could not be re-fetched at the time of writing, so treat as secondary.",
      source: { label: "All About Birds: Greater Roadrunner (Partners in Flight estimate)", url: "https://www.allaboutbirds.org/guide/Greater_Roadrunner/lifehistory" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Deserts and scrub of the southwestern United States and northern and central Mexico",
    fact: "It can run at about 30 km/h and kills rattlesnakes by pinning them and smashing the head. It warms up in the morning sun using a patch of dark skin on its back.",
    ranges: [
      [[37, -121.8], [35, -120.6], [32.8, -117.2], [32.2, -114.8], [31.5, -113.3], [29, -112], [27, -109.8], [25.5, -108.3], [23.5, -105.5], [21, -104.5], [19.5, -102], [19.2, -99.5], [20, -98.5], [22, -98.5], [24, -97.8], [25.5, -97.4], [27.5, -97.4], [28.5, -96.5], [29, -95], [30.5, -93], [32, -93], [34, -94], [35.5, -95.5], [37, -95.5], [38.3, -98], [38.3, -102], [38.5, -104.5], [37, -106.5], [36.5, -108.8], [37.5, -112], [37, -114], [36, -115.3], [35.5, -117], [36, -119]],
      [[32.6, -117.0], [31.0, -116.3], [29.5, -115.0], [28.2, -113.5], [28.3, -112.9], [30.5, -114.8], [32.0, -115.3]]
    ]
  },
  {
    id: "whooping-crane", name: "Whooping Crane", wikiTitle: "Whooping_crane", scientificName: "Grus americana",
    classPlain: "Bird", classFull: "Aves (Gruiformes)",
    taxon: ["Aves", "Gruiformes", "Gruidae", "Grus"],
    aliases: ["whooper"], groups: ["crane"],
    diet: "Omnivore — Blue crabs, clams, wolfberries in winter; insects, frogs and plants in summer",
    biome: "Coastal salt marshes in winter; shallow freshwater wetlands in summer",
    size: "1.5 m tall; 2.3 m wingspan; 5 – 7 kg",
    lastClue: "The tallest bird in North America, an all-white crane with a red crown that was down to about 20 birds in the 1940s.",
    population: {
      value: 700, low: 650, high: 750, display: "about 700",
      year: 2025, basis: "all wild individuals (about 560 in the main migratory flock)", confidence: "counted",
      note: "Includes about 140 in two reintroduced flocks; around 130 more live in captivity.",
      source: { label: "Wikipedia: Whooping crane", url: "https://en.wikipedia.org/wiki/Whooping_crane" }
    },
    status: "Endangered",
    region: "North America",
    regionsText: "Breeds in Wood Buffalo National Park, Canada; winters on the Texas coast; small reintroduced flocks in Wisconsin and Louisiana",
    fact: "The main flock makes a 4,000 km migration between northern Canada and Texas. Conservationists even led a flock behind ultralight aircraft to teach a new route.",
    ranges: [
      [[59.9, -113.8], [59.9, -112.8], [59.0, -112.8], [59.0, -113.8]],
      [[28.5, -97.0], [28.5, -96.7], [28.0, -96.9], [28.1, -97.2]],
      [[29.9, -92.6], [29.9, -92.2], [29.6, -92.2], [29.6, -92.6]],
      [[44.2, -90.2], [44.2, -89.8], [43.9, -89.8], [43.9, -90.2]]
    ]
  },
  {
    id: "resplendent-quetzal", name: "Resplendent Quetzal", wikiTitle: "Resplendent_quetzal", scientificName: "Pharomachrus mocinno",
    classPlain: "Bird", classFull: "Aves (Trogoniformes)",
    taxon: ["Aves", "Trogoniformes", "Trogonidae", "Pharomachrus"],
    aliases: ["quetzal", "quetzal bird"], groups: ["quetzal", "trogon"],
    diet: "Omnivore — Wild avocado-like fruits, plus insects, frogs and lizards",
    biome: "Misty montane cloud forest between about 1,200 and 3,000 m",
    size: "36 – 40 cm long, plus a male tail train up to 65 cm",
    lastClue: "A shimmering emerald bird with a metre-long tail, sacred to the Maya and Aztecs and the national bird of Guatemala.",
    population: {
      value: 35000, low: 20000, high: 49999, display: "about 20,000 – 50,000",
      year: 2023, basis: "individuals", confidence: "estimated",
      note: "IUCN 2023 assessment figure as quoted on Wikipedia; declining.",
      source: { label: "Wikipedia: Resplendent quetzal (IUCN 2023 estimate)", url: "https://en.wikipedia.org/wiki/Resplendent_quetzal" }
    },
    status: "Near Threatened",
    region: "North America",
    regionsText: "Cloud forests from southern Mexico through Central America to western Panama",
    fact: "Males grow their spectacular tail plumes only in the breeding season. Fruit trees in cloud forest depend on it to spread their seeds.",
    ranges: [
      [[17.1, -93.2], [16.9, -92.2], [15.8, -91.3], [15.5, -90.0], [15.2, -88.8], [14.5, -88.0], [13.9, -87.0], [14.3, -86.6], [14.9, -87.5], [15.1, -88.6], [14.7, -90.0], [14.9, -91.4], [15.5, -92.2], [16.2, -93.2]],
      [[10.9, -85.6], [10.2, -84.9], [9.5, -83.5], [9.0, -82.7], [8.8, -82.3], [9.2, -82.4], [9.8, -83.3], [10.4, -84.3], [10.7, -85.2]]
    ]
  },
  {
    id: "bairds-tapir", name: "Baird's Tapir", wikiTitle: "Baird's_tapir", scientificName: "Tapirus bairdii",
    classPlain: "Mammal", classFull: "Mammalia (Perissodactyla)",
    taxon: ["Mammalia", "Perissodactyla", "Tapiridae", "Tapirus"],
    aliases: ["bairds tapir", "central american tapir"], groups: ["tapir"],
    diet: "Herbivore — Leaves, fruit, twigs and aquatic plants",
    biome: "Humid lowland and montane tropical forest near water",
    size: "1.8 – 2.5 m long; 150 – 400 kg",
    lastClue: "The largest land mammal of Central America, a stout, dark forest animal with a short, grasping, flexible snout.",
    population: {
      value: 4000, low: 3000, high: 5000, display: "about 3,000 – 5,000",
      year: 2016, basis: "mature individuals", confidence: "rough",
      note: "Secondary sources quote about 3,000 to under 5,000 adults; no census exists and the year is that of the IUCN assessment.",
      source: { label: "World Tapir Day: Baird's tapir", url: "https://tapirday.org/bairds-tapir.html" }
    },
    status: "Endangered",
    region: "North America",
    regionsText: "Forests from southern Mexico through Central America to northwestern Colombia",
    fact: "It plants forest as it goes, dispersing big seeds in its dung. Calves are born with white stripes and spots like a watermelon.",
    ranges: [[[18.6, -95.1], [18.0, -94.0], [18.4, -92.0], [18.5, -90.5], [19.0, -89.5], [19.5, -88.5], [18.0, -87.8], [17.0, -88.2], [16.0, -88.8], [15.8, -87.5], [15.8, -84.8], [14.8, -83.5], [13.5, -83.5], [12, -83.7], [10.8, -83.6], [9.5, -82.8], [8.5, -82.5], [8.0, -80.5], [8.4, -78.5], [7.5, -77.5], [5.5, -77.5], [8.5, -83.5], [10.0, -85.3], [12, -86], [13.5, -87], [14.5, -88], [15.5, -91], [16.5, -91.5], [17.2, -92.5], [17.5, -94.0], [18.3, -95.0]]]
  },
  {
    id: "star-nosed-mole", name: "Star-nosed Mole", wikiTitle: "Star-nosed_mole", scientificName: "Condylura cristata",
    classPlain: "Mammal", classFull: "Mammalia (Eulipotyphla)",
    taxon: ["Mammalia", "Eulipotyphla", "Talpidae", "Condylura"],
    aliases: ["star nosed mole"], groups: ["mole"],
    diet: "Insectivore — Aquatic insects, worms, small crustaceans and small fish",
    biome: "Wet meadows, marshes and stream banks with soft soil",
    size: "15 – 20 cm long; 40 – 85 g",
    lastClue: "A small, semi-aquatic burrower with a ring of 22 pink fleshy tentacles around its snout that it uses to feel its food.",
    population: {
      value: 3000000, low: 1000000, high: 10000000, display: "perhaps 1 – 10 million",
      year: 2016, basis: "all wild individuals", confidence: "rough",
      note: "No population estimate has been published; this is an order-of-magnitude guess for a widespread, common species. The year is that of the IUCN Least Concern assessment.",
      source: { label: "Wikipedia: Star-nosed mole (IUCN 2016 status)", url: "https://en.wikipedia.org/wiki/Star-nosed_mole" }
    },
    status: "Least Concern",
    region: "North America",
    regionsText: "Wet lowlands of northeastern Canada and the northeastern United States, down the Appalachians to Georgia",
    fact: "Its nose can identify and eat a morsel in about a quarter of a second, among the fastest foragers known. It can also smell underwater by blowing bubbles.",
    ranges: [[[53.5, -57], [51, -59], [49, -64], [47, -61], [45.5, -60.5], [43.5, -65.5], [44.5, -66.7], [43, -70.5], [41.5, -70], [41.2, -72], [39.5, -74], [37.5, -75.8], [35.5, -75.8], [34.5, -77.5], [35.5, -79.5], [34.8, -83], [34.7, -84], [36.5, -82], [38, -80], [39.5, -80], [41.5, -81], [42.8, -80.5], [43.5, -79.5], [46, -81], [46.5, -84.5], [47.5, -90], [48.5, -93.5], [49.3, -95.5], [50.5, -95.5], [51, -91], [52, -86], [51.5, -80], [51, -77], [53, -72], [53.5, -65]]]
  }
];
