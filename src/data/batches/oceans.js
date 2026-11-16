// Species batch: oceans. Format: see src/data/batches/README.md
export default [
  {
    id: "blue-whale", name: "Blue Whale", wikiTitle: "Blue_whale", scientificName: "Balaenoptera musculus",
    classPlain: "Mammal", classFull: "Mammalia (Cetacea)",
    taxon: ["Mammalia", "Cetacea", "Balaenopteridae", "Balaenoptera"],
    aliases: [], groups: ["whale"],
    diet: "Carnivore — Almost nothing but krill, strained from huge gulps of water",
    biome: "Open ocean, from polar feeding grounds to warm breeding waters",
    size: "24 – 30 m long; 100 – 150 tonnes",
    lastClue: "The largest animal that has ever lived, a slate-blue giant whose heart is the size of a small car.",
    population: {
      value: 10000, low: 5000, high: 15000, display: "5,000 – 15,000 adults", year: 2018, basis: "mature individuals",
      confidence: "estimated",
      note: "Whaling cut numbers by roughly 90 percent; Antarctic blue whales are far scarcer than other populations.",
      source: { label: "Wikipedia: Blue whale (IUCN 2018 assessment)", url: "https://en.wikipedia.org/wiki/Blue_whale" }
    },
    status: "Endangered", region: "Oceans",
    regionsText: "Every ocean, feeding in cold productive waters and migrating to warmer seas",
    fact: "A blue whale's call can travel hundreds of kilometres underwater, and one animal can eat several tonnes of tiny shrimp in a single day during the feeding season.",
    ranges: [
      [[10, -95], [22, -112], [34, -125], [48, -135], [58, -150], [55, -170], [50, -180], [40, -180], [30, -150], [15, -120]],
      [[50, 180], [55, 160], [45, 145], [35, 140], [30, 150], [40, 170]],
      [[40, -70], [50, -65], [52, -55], [60, -45], [66, -25], [70, -10], [62, -10], [55, -20], [45, -45]],
      [[5, 70], [20, 60], [20, 70], [8, 82], [0, 80]],
      [[-3, -82], [-15, -80], [-45, -78], [-45, -73], [-20, -70]],
      [[34, -34], [34, -22], [42, -22], [42, -34]],
      [[-33, 114], [-36, 118], [-39, 140], [-40, 148], [-45, 148], [-42, 125], [-40, 115]],
      [[-40, -180], [-65, -180], [-65, -90], [-40, -90]],
      [[-40, -90], [-65, -90], [-65, 0], [-40, 0]],
      [[-40, 0], [-65, 0], [-65, 90], [-40, 90]],
      [[-40, 90], [-65, 90], [-65, 180], [-40, 180]]
    ]
  },
  {
    id: "orca", name: "Orca", wikiTitle: "Orca", scientificName: "Orcinus orca",
    classPlain: "Mammal", classFull: "Mammalia (Cetacea)",
    taxon: ["Mammalia", "Cetacea", "Delphinidae", "Orcinus"],
    aliases: ["killer whale", "orcinus orca"], groups: ["whale", "dolphin"],
    diet: "Carnivore — Fish, seals, sea lions and even other whales, depending on the family group",
    biome: "Cool coastal and open seas, most common in polar and temperate waters",
    size: "5 – 8 m long; 3 – 6 tonnes",
    lastClue: "A black-and-white hunter that is really the biggest member of the dolphin family.",
    population: {
      value: 50000, low: 40000, high: 80000, display: "at least 50,000", year: 2006, basis: "all individuals",
      confidence: "estimated",
      note: "IUCN lists the species as Data Deficient because several ecotypes may be separate species; Least Concern is the closest category.",
      source: { label: "Wikipedia: Orca (2006 estimate)", url: "https://en.wikipedia.org/wiki/Orca" }
    },
    status: "Least Concern", region: "Oceans",
    regionsText: "Found in every ocean, most abundant in cold coastal waters such as Norway, Iceland, the north Pacific and Antarctica",
    fact: "Different families hunt in different ways and even speak their own dialects, passing hunting techniques from mothers to calves across generations.",
    ranges: [
      [[33, -120], [50, -130], [60, -148], [62, -165], [65, -170], [65, -180], [50, -180], [45, -135], [33, -125]],
      [[65, 180], [60, 165], [55, 155], [50, 150], [45, 142], [42, 145], [50, 180]],
      [[42, 135], [52, 140], [58, 150], [60, 160], [55, 165], [45, 150], [40, 140]],
      [[40, -72], [47, -60], [60, -50], [66, -30], [72, -15], [80, 0], [75, 20], [70, 30], [65, 10], [58, 8], [52, -5], [45, -5], [48, -30], [40, -60]],
      [[-35, -180], [-70, -180], [-70, -90], [-35, -90]],
      [[-35, -90], [-70, -90], [-70, 0], [-35, 0]],
      [[-35, 0], [-70, 0], [-70, 90], [-35, 90]],
      [[-35, 90], [-70, 90], [-70, 180], [-35, 180]]
    ]
  },
  {
    id: "sea-otter", name: "Sea Otter", wikiTitle: "Sea_otter", scientificName: "Enhydra lutris",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Mustelidae", "Enhydra"],
    aliases: [], groups: ["otter"],
    diet: "Carnivore — Sea urchins, crabs, clams and abalone, cracked open with a rock",
    biome: "Cold rocky coasts and kelp forests close to shore",
    size: "1 – 1.5 m long; 14 – 45 kg",
    lastClue: "The smallest marine mammal and the thickest fur on Earth; it floats on its back and holds paws with friends while it sleeps.",
    population: {
      value: 107000, low: 85000, high: 130000, display: "about 107,000", year: 2007, basis: "all individuals",
      confidence: "estimated",
      note: "Estimates date from 2004–2007; later counts in the Aleutians and Okhotsk Sea show steep declines.",
      source: { label: "Wikipedia: Sea otter", url: "https://en.wikipedia.org/wiki/Sea_otter" }
    },
    status: "Endangered", region: "Oceans",
    regionsText: "Coastal north Pacific: central California, Washington, British Columbia, Alaska, the Aleutians, Kamchatka and the Kuril Islands",
    fact: "With no blubber, these animals keep warm with fur holding up to a million hairs per square inch, so they must eat roughly a quarter of their body weight every day.",
    ranges: [
      [[34.4, -120.9], [35.3, -121.5], [36.4, -122.1], [37.2, -122.6], [37.1, -122.2], [36.5, -121.85], [35.3, -120.8], [34.4, -120.4]],
      [[48.4, -124.6], [48.0, -125], [50.5, -129.5], [54, -134], [58, -137], [60, -146], [59, -152], [57, -155], [55, -160], [55, -163], [55, -162], [57, -153], [59.5, -149], [60, -144], [58, -136], [55, -131], [51, -127.5]],
      [[56, -160], [56, -170], [53.5, -176], [52, -180], [51, -180], [51.5, -174], [53, -168], [54.5, -162]],
      [[52.5, 180], [53, 173], [52, 172], [51, 175], [51, 180]],
      [[55.5, 165.5], [55.5, 167], [54.5, 167], [54.5, 165.5]],
      [[50.8, 156.8], [53, 160], [57, 163.6], [57, 164.5], [52.5, 161.5], [50.8, 157.5]],
      [[51, 156.5], [45, 148], [43.5, 146], [43.5, 145], [46, 148.5], [51, 155.5]]
    ]
  },
  {
    id: "polar-bear", name: "Polar Bear", wikiTitle: "Polar_bear", scientificName: "Ursus maritimus",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Ursidae", "Ursus"],
    aliases: [], groups: ["bear"],
    diet: "Carnivore — Mostly ringed and bearded seals caught from the ice",
    biome: "Arctic sea ice, coasts and tundra fringes",
    size: "2 – 2.5 m long; 300 – 600 kg for males",
    lastClue: "A huge white bear that is the largest land carnivore, living on drifting Arctic ice.",
    population: {
      value: 26500, low: 22000, high: 31000, display: "22,000 – 31,000", year: 2015, basis: "all individuals",
      confidence: "estimated",
      note: "Some of the 19 subpopulations are poorly surveyed.",
      source: { label: "Wikipedia: Polar bear (IUCN 2015 assessment)", url: "https://en.wikipedia.org/wiki/Polar_bear" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "Arctic sea ice and coasts of Canada, Alaska, Greenland, Svalbard and Russia",
    fact: "Its fur looks white but each hair is a clear hollow tube, and the skin underneath is black to soak up warmth. A single bear may roam thousands of kilometres across shifting ice in a year.",
    ranges: [
      [[60, -180], [64, -170], [68, -166], [71, -156], [70, -142], [69, -135], [85, -135], [85, -180]],
      [[51.3, -80], [53, -78.8], [55, -76.8], [58, -78], [61, -78], [62.5, -82], [64, -87], [62, -92.5], [58.8, -94.3], [57, -92], [55.5, -87], [54.5, -82]],
      [[69, -135], [68.5, -125], [68, -112], [68, -100], [70, -92], [73, -86], [74, -80], [76, -78], [78, -72], [80, -70], [85, -60], [85, -135]],
      [[53, -57], [60, -60], [64, -62], [69, -60], [74, -62], [78, -67], [74, -82], [70, -75], [66, -68], [62, -68], [58, -62]],
      [[60, -44], [65, -40], [70, -23], [76, -17], [82, -10], [85, -30], [85, -60], [80, -65], [76, -70], [70, -55], [66, -53], [62, -49]],
      [[74, 15], [78, 8], [85, 0], [85, 60], [78, 60], [72, 55], [70, 45], [72, 30], [74, 20]],
      [[72, 60], [77, 80], [77, 105], [78, 110], [75, 115], [72, 130], [71, 150], [70, 170], [70, 180], [85, 180], [85, 80], [78, 65]]
    ]
  },
  {
    id: "emperor-penguin", name: "Emperor Penguin", wikiTitle: "Emperor_penguin", scientificName: "Aptenodytes forsteri",
    classPlain: "Bird", classFull: "Aves (Sphenisciformes)",
    taxon: ["Aves", "Sphenisciformes", "Spheniscidae", "Aptenodytes"],
    aliases: [], groups: ["penguin"],
    diet: "Carnivore — Fish, krill and squid, caught on dives that can pass 500 m",
    biome: "Antarctic sea ice and the frozen coast",
    size: "1.1 – 1.3 m tall; 22 – 45 kg",
    lastClue: "The tallest of all flightless seabirds; the males huddle through the polar winter incubating a single egg on their feet.",
    population: {
      value: 595000, low: 476000, high: 714000, display: "about 595,000 adults", year: 2009, basis: "adult birds",
      confidence: "estimated",
      note: "Satellite surveys since then found extra colonies, raising totals by roughly 5 – 10 percent.",
      source: { label: "Wikipedia: Emperor penguin (2009 census, later satellite surveys)", url: "https://en.wikipedia.org/wiki/Emperor_penguin" }
    },
    status: "Near Threatened", region: "Oceans",
    regionsText: "Sea ice and coasts all around Antarctica, with around 66 known breeding colonies",
    fact: "Huddling together in tight rotating crowds lets these birds survive winter temperatures below minus 40 degrees Celsius without eating for months.",
    ranges: [
      [[-64, -180], [-78, -180], [-78, -90], [-64, -90]],
      [[-64, -90], [-78, -90], [-78, 0], [-64, 0]],
      [[-64, 0], [-78, 0], [-78, 90], [-64, 90]],
      [[-64, 90], [-78, 90], [-78, 180], [-64, 180]]
    ]
  },
  {
    id: "walrus", name: "Walrus", wikiTitle: "Walrus", scientificName: "Odobenus rosmarus",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Odobenidae", "Odobenus"],
    aliases: [], groups: [],
    diet: "Carnivore — Clams and other shellfish dug up from the shallow sea floor",
    biome: "Arctic pack ice edges and shallow coastal shelves",
    size: "2.5 – 3.5 m long; 800 – 1,700 kg",
    lastClue: "A huge whiskered Arctic mammal with two long ivory tusks that hauls out in huge crowds.",
    population: {
      value: 112500, low: 90000, high: 135000, display: "about 112,500 adults", year: 2018, basis: "mature individuals",
      confidence: "estimated",
      note: "Pacific and Atlantic populations are counted separately, with high uncertainty in the Pacific.",
      source: { label: "Wikipedia: Walrus (2018 assessment)", url: "https://en.wikipedia.org/wiki/Walrus" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "Shallow Arctic seas of the Bering and Chukchi seas, northern Canada, Greenland, Svalbard and the Russian Arctic",
    fact: "Its tusks are used to haul the heavy body onto ice, to defend against predators, and to establish rank; a bull's tusk can reach about a metre in length.",
    ranges: [
      [[60, 178], [62, 175], [64.5, 172], [66, 170], [69, 172], [71, 180], [62, 180]],
      [[71, -180], [72, -158], [67, -164], [64, -166], [60, -161], [58, -159], [57, -163], [58, -170], [60, -176], [62, -180]],
      [[62, -82], [66, -84], [69, -84], [73, -82], [77, -78], [79, -72], [76, -62], [70, -62], [65, -62], [62, -66], [62, -75]],
      [[64, -54], [68, -55], [72, -56], [76, -62], [78, -66], [74, -62], [68, -52]],
      [[68, -33], [72, -22], [76, -17], [80, -14], [79, -20], [76, -24], [71, -28]],
      [[76, 10], [80, 10], [81, 20], [81, 50], [80, 63], [76, 60], [76, 25]],
      [[73, 105], [76, 110], [76, 120], [73, 125], [71, 115]]
    ]
  },
  {
    id: "leatherback-sea-turtle", name: "Leatherback Sea Turtle", wikiTitle: "Leatherback_sea_turtle", scientificName: "Dermochelys coriacea",
    classPlain: "Reptile", classFull: "Reptilia (Testudines)",
    taxon: ["Reptilia", "Testudines", "Dermochelyidae", "Dermochelys"],
    aliases: ["leatherback turtle", "leatherback", "luth"], groups: ["sea turtle", "turtle"],
    diet: "Carnivore — Almost entirely soft jellyfish and other gelatinous drifters",
    biome: "Open ocean; comes ashore only to nest on tropical beaches",
    size: "1.5 – 2.2 m long; 250 – 700 kg",
    lastClue: "The biggest living sea turtle has no hard shell, only a ridged, rubbery back, and dives deeper than almost any reptile.",
    population: {
      value: 34500, low: 26000, high: 43000, display: "26,000 – 43,000 nesting females per year", year: 2013, basis: "nesting females each year",
      confidence: "estimated",
      note: "Down from about 115,000 nesting females in 1980; Pacific populations have collapsed.",
      source: { label: "Wikipedia: Leatherback sea turtle (IUCN 2013 assessment)", url: "https://en.wikipedia.org/wiki/Leatherback_sea_turtle" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "Tropical nesting beaches and cooler feeding seas in the Atlantic, Pacific and Indian oceans",
    fact: "Unlike other sea turtles it can keep its body warm in near-freezing water, and it migrates across entire oceans to reach jellyfish blooms.",
    ranges: [
      [[-2, -48], [5, -52], [10, -62], [10, -85], [18, -88], [25, -97], [30, -90], [27, -80], [35, -75], [44, -66], [47, -60], [44, -55], [38, -50], [20, -40], [10, -30], [0, -30]],
      [[3, -5], [-5, 5], [-8, 12], [-2, 8], [2, 8], [5, 3]],
      [[48, -12], [56, -10], [60, -5], [58, -3], [51, -4]],
      [[-24, 35], [-28, 34], [-34, 27], [-35, 20], [-30, 17], [-28, 32]],
      [[5, 92], [12, 91.5], [14, 94], [8, 97]],
      [[5, 80], [9, 80], [9, 82], [6, 82]],
      [[-9, 130], [0, 128], [2, 135], [-2, 142], [-5, 150], [-8, 156], [-10, 150], [-8, 140]],
      [[24, -115], [20, -112], [10, -100], [0, -92], [-15, -85], [-30, -80], [-30, -71], [-18, -70], [-6, -80], [5, -80], [10, -86], [16, -96], [23, -108]],
      [[32, -122], [38, -126], [44, -128], [44, -124], [38, -123], [34, -120]],
      [[-37, 152], [-30, 155], [-28, 152.5], [-33, 150], [-37, 150]]
    ]
  },
  {
    id: "whale-shark", name: "Whale Shark", wikiTitle: "Whale_shark", scientificName: "Rhincodon typus",
    classPlain: "Fish", classFull: "Chondrichthyes (Orectolobiformes)",
    taxon: ["Chondrichthyes", "Orectolobiformes", "Rhincodontidae", "Rhincodon"],
    aliases: [], groups: ["shark"],
    diet: "Carnivore — Plankton, fish eggs and small fish filtered through its wide mouth",
    biome: "Warm tropical and subtropical seas, near the surface",
    size: "9 – 12 m long; 10 – 20 tonnes",
    lastClue: "The biggest fish in the sea is a spotted, gentle filter feeder with a checkerboard pattern on its back.",
    population: {
      value: 160000, low: 100000, high: 300000, display: "roughly 100,000 – 300,000", year: 2016, basis: "all individuals",
      confidence: "rough",
      note: "No census exists; a published guess is 130,000 – 200,000, widened here to reflect real uncertainty.",
      source: { label: "Wikipedia: Whale shark (IUCN 2016 assessment)", url: "https://en.wikipedia.org/wiki/Whale_shark" }
    },
    status: "Endangered", region: "Oceans",
    regionsText: "Tropical and warm temperate seas worldwide, roughly 30° north to 35° south",
    fact: "Each animal's spot pattern is as unique as a fingerprint, which researchers use to track individuals that gather seasonally where plankton blooms.",
    ranges: [
      [[31, -97], [31, -76], [25, -60], [10, -40], [0, -28], [-8, -30], [-23, -40], [-10, -37], [-3, -40], [4, -51], [10, -62], [10, -76], [12, -83], [9, -83], [15, -88], [18, -88], [19, -92], [22, -98]],
      [[28, -20], [15, -24], [0, -15], [-8, -14], [-8, 10], [0, 8], [4, -5], [5, -10], [12, -17], [22, -17]],
      [[15, 42], [12, 50], [2, 48], [-10, 41], [-27, 33], [-30, 32], [-30, 40], [-22, 55], [-10, 60], [8, 60], [14, 52]],
      [[27, 50], [25, 57], [22, 64], [16, 73], [8, 76], [8, 81], [14, 81], [10, 92], [5, 96], [-5, 100], [-10, 110], [-9, 105], [-5, 70], [-5, 60], [8, 60], [18, 60]],
      [[-15, 120], [-21, 114], [-26, 113], [-26, 108], [-20, 105], [-12, 112]],
      [[30, 122], [30, 140], [10, 140], [-10, 150], [-20, 153], [-20, 125], [-5, 115], [10, 110], [20, 118]],
      [[28, -180], [28, -150], [15, -120], [5, -100], [-5, -100], [-20, -140], [-25, -180]],
      [[30, 160], [30, 180], [-25, 180], [-20, 160], [0, 160]],
      [[28, -110], [20, -105], [8, -85], [0, -80], [-6, -81], [0, -92], [10, -100], [24, -115]]
    ]
  },
  {
    id: "great-white-shark", name: "Great White Shark", wikiTitle: "Great_white_shark", scientificName: "Carcharodon carcharias",
    classPlain: "Fish", classFull: "Chondrichthyes (Lamniformes)",
    taxon: ["Chondrichthyes", "Lamniformes", "Lamnidae", "Carcharodon"],
    aliases: ["white shark", "great white", "white pointer"], groups: ["shark"],
    diet: "Carnivore — Seals, sea lions, large fish and the carcasses of whales",
    biome: "Cool temperate coastal waters and nearby open sea",
    size: "4 – 6 m long; 680 – 1,800 kg",
    lastClue: "A torpedo-shaped, serrated-toothed predator famous for breaching out of the water to ambush seals.",
    population: {
      value: 10000, low: 3000, high: 30000, display: "unknown, perhaps several thousand adults", year: 2023, basis: "all individuals",
      confidence: "rough",
      note: "No global count exists. Regional genetic studies suggest about 750 adults off eastern Australia and about 1,500 in the western stock, so this is an order-of-magnitude guess.",
      source: { label: "Australian shark assessment report (FRDC, 2023): Carcharodon carcharias", url: "https://fish.gov.au/docs/SharkReport/2023_FRDC_Carcharodon_carcharias_final.pdf" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "Coastal temperate seas: California and Baja, the north-west Atlantic, South Africa, southern Australia and New Zealand, the Mediterranean and Japan",
    fact: "It can detect a single drop of blood in huge volumes of water and keeps its core warmer than the sea around it, which helps it hunt in cold currents.",
    ranges: [
      [[23, -110], [24, -114], [29, -119.5], [34, -121.5], [38.5, -125], [44, -126.5], [49, -128.5], [50, -127], [45, -124], [40, -124], [37, -122], [33, -118], [28, -114.5], [25, -111]],
      [[26, -80], [30, -79], [35, -74], [41, -68], [43, -66], [43, -70], [41, -71], [36, -76], [31, -81], [26, -80.2]],
      [[-22, 13], [-30, 16], [-35, 18], [-36, 21], [-35, 27], [-31, 32], [-28, 33], [-27, 32.6], [-30, 30], [-34, 25.5], [-34.5, 20], [-31, 17], [-24, 14]],
      [[-24, 113], [-30, 113.5], [-35, 115], [-36, 124], [-36.5, 132], [-38, 138], [-39, 146], [-37.5, 150.3], [-33, 152.5], [-28, 154], [-24.5, 153.3], [-28, 152.5], [-33, 151.5], [-37.5, 149.5], [-38.5, 146], [-37, 140], [-35.5, 136], [-33.5, 128], [-34, 121], [-34, 115.5], [-30, 115], [-24, 113.6]],
      [[-37, 150.5], [-33, 152.5], [-29, 154], [-29, 150.5], [-33, 150], [-37, 149.5]],
      [[-40, 144.5], [-43.5, 145.5], [-43.7, 148], [-40.5, 148.3]],
      [[-34, 172], [-37, 178], [-41.5, 176], [-46, 171], [-47, 167.5], [-43, 168], [-40.5, 172], [-37, 173.5]],
      [[35, 11], [37, 15], [41, 18], [45, 13], [43, 10], [40, 9], [37, 8], [36, 5]],
      [[32, 130], [34, 136], [36, 141], [39, 142.5], [39, 141], [35, 139], [34, 134], [32, 129]]
    ]
  },
  {
    id: "giant-oceanic-manta-ray", name: "Giant Oceanic Manta Ray", wikiTitle: "Giant_oceanic_manta_ray", scientificName: "Mobula birostris",
    classPlain: "Fish", classFull: "Chondrichthyes (Myliobatiformes)",
    taxon: ["Chondrichthyes", "Myliobatiformes", "Mobulidae", "Mobula"],
    aliases: ["oceanic manta ray", "giant manta ray", "giant manta"], groups: ["manta ray", "manta"],
    diet: "Carnivore — Zooplankton filtered from the water through feathery gill plates",
    biome: "Warm open ocean and coastal reefs where plankton gathers",
    size: "Wingspan 4 – 7 m; up to 2 tonnes",
    lastClue: "A graceful winged fish with two horn-like head fins that glides in the open ocean and visits cleaning stations on reefs.",
    population: {
      value: 20000, low: 5000, high: 50000, display: "unknown, perhaps tens of thousands", year: 2018, basis: "all individuals",
      confidence: "rough",
      note: "No global count exists; the cited page gives no figure, so this is an order-of-magnitude guess from scattered local surveys.",
      source: { label: "Wikipedia: Giant oceanic manta ray (IUCN Endangered)", url: "https://en.wikipedia.org/wiki/Giant_oceanic_manta_ray" }
    },
    status: "Endangered", region: "Oceans",
    regionsText: "Tropical and subtropical waters of the Atlantic, Pacific and Indian oceans",
    fact: "It has one of the largest brains of any fish and sometimes leaps clear of the water. Females give birth to just one pup every few years, so it recovers slowly from fishing.",
    ranges: [
      [[24, -115], [20, -106], [8, -84], [0, -82], [-5, -82], [-5, -92], [0, -92], [10, -100], [18, -114]],
      [[18, -160], [22, -160], [22, -154.5], [18.5, -154.5]],
      [[35, 135], [25, 125], [10, 120], [0, 118], [-10, 120], [-18, 122], [-24, 113], [-24, 153], [-10, 150], [0, 145], [10, 140], [20, 142], [30, 138]],
      [[8, 72], [0, 72], [-2, 76], [8, 80]],
      [[-14, 41], [-26, 36.5], [-27, 32.8], [-24, 35], [-14, 40]],
      [[30, -88], [30, -80], [25, -79], [20, -85], [19, -88], [21, -88], [24, -92]],
      [[-3, -40], [-23, -40], [-23, -38], [-3, -36]],
      [[-34, 173], [-37, 178], [-37, 175], [-35, 173]]
    ]
  },
  {
    id: "beluga-whale", name: "Beluga Whale", wikiTitle: "Beluga_whale", scientificName: "Delphinapterus leucas",
    classPlain: "Mammal", classFull: "Mammalia (Cetacea)",
    taxon: ["Mammalia", "Cetacea", "Monodontidae", "Delphinapterus"],
    aliases: ["beluga", "white whale", "sea canary"], groups: ["whale"],
    diet: "Carnivore — Salmon, cod, shrimp, squid and octopus",
    biome: "Arctic and subarctic seas, river mouths and ice-edge estuaries",
    size: "3.5 – 5.5 m long; 1 – 1.5 tonnes",
    lastClue: "A small, pure-white Arctic cetacean with a bulging forehead, often called the canary of the sea for its chirps.",
    population: {
      value: 200000, low: 160000, high: 240000, display: "about 200,000", year: 2021, basis: "all individuals",
      confidence: "estimated",
      note: "Several subpopulations, such as Cook Inlet, are in serious decline even though the species overall is not at risk.",
      source: { label: "Wikipedia: Beluga whale", url: "https://en.wikipedia.org/wiki/Beluga_whale" }
    },
    status: "Least Concern", region: "Oceans",
    regionsText: "Arctic and subarctic waters of Alaska, Canada, Greenland, Svalbard and Russia, including the St. Lawrence estuary",
    fact: "Unlike most whales it can bend its neck, and its flexible face helps it make expressions. It is born grey and slowly whitens over several years.",
    ranges: [
      [[57, -160], [60, -165], [65, -168], [71, -158], [71, -135], [69, -128], [68, -135], [70, -148], [67, -160], [61, -161]],
      [[51.3, -80], [53, -78.8], [55, -76.8], [58, -78], [61, -78], [62.5, -82], [64, -87], [62, -92.5], [58.8, -94.3], [57, -92], [55.5, -87], [54.5, -82]],
      [[69, -128], [70, -115], [72, -95], [72, -80], [70, -70], [66, -62], [62, -65], [64, -75], [68, -85], [68, -100], [68, -115], [68, -128]],
      [[47, -70], [49, -68], [49, -66], [48, -66], [47, -69]],
      [[64, -54], [70, -54], [72, -56], [70, -60]],
      [[76, 10], [79, 12], [80, 25], [78, 28], [76, 20]],
      [[66, 35], [68, 40], [70, 55], [73, 70], [74, 85], [75, 100], [76, 115], [74, 130], [72, 140], [71, 160], [71, 172], [69, 172], [69, 150], [71, 130], [73, 110], [72, 90], [70, 75], [68, 60], [66, 45]],
      [[53, 137], [55, 135], [59, 142], [60, 155], [58, 158], [54, 155], [52, 143]],
      [[71, 180], [70, 170], [67, 170], [65, 175], [64, 178], [68, 180]]
    ]
  },
  {
    id: "hawaiian-monk-seal", name: "Hawaiian Monk Seal", wikiTitle: "Hawaiian_monk_seal", scientificName: "Neomonachus schauinslandi",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Phocidae", "Neomonachus"],
    aliases: [], groups: ["monk seal", "seal"],
    diet: "Carnivore — Reef fish, eels, octopus and lobster",
    biome: "Tropical coral reefs and sandy beaches on remote islands",
    size: "2.1 – 2.4 m long; 170 – 240 kg",
    lastClue: "One of the rarest of its family, found only around a Pacific island chain famed for volcanoes and surf.",
    population: {
      value: 1605, low: 1512, high: 1743, display: "about 1,600", year: 2022, basis: "all individuals",
      confidence: "estimated",
      note: "NOAA estimate for 2022, with a 95 percent range of about 1,512 – 1,743. IUCN downgraded it to Vulnerable in 2024 after recovery.",
      source: { label: "NOAA Fisheries: Hawaiian monk seal population", url: "https://www.fisheries.noaa.gov/feature-story/hawaiian-monk-seal-population-rounds-out-decade-growth" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "The Hawaiian Islands, from the remote north-western atolls to the main islands",
    fact: "It is the only seal native to Hawaii and, like its Mediterranean relatives, spends long periods resting alone on beaches rather than in big colonies.",
    ranges: [
      [[18.8, -155.2], [19.2, -156.1], [21.3, -158.4], [22.0, -160.6], [22.4, -160], [23, -164], [24.5, -168], [25.5, -172], [26.5, -177], [27.5, -178.8], [29, -178.4], [28.5, -177], [27, -174], [26, -170], [24.5, -165.5], [23.2, -161.5], [22.4, -159], [21.6, -157.5], [20.6, -155.8]],
      [[18.8, -156], [19.2, -154.8], [20.3, -155.7], [21, -156.5], [22.3, -159.3], [22, -160.4], [21.2, -158.3], [20, -156.5]]
    ]
  },
  {
    id: "wandering-albatross", name: "Wandering Albatross", wikiTitle: "Snowy_albatross", scientificName: "Diomedea exulans",
    classPlain: "Bird", classFull: "Aves (Procellariiformes)",
    taxon: ["Aves", "Procellariiformes", "Diomedeidae", "Diomedea"],
    aliases: ["snowy albatross", "white-winged albatross", "goonie"], groups: ["albatross"],
    diet: "Carnivore — Squid, fish and scavenged scraps from the sea surface",
    biome: "Windswept open Southern Ocean and remote sub-Antarctic islands",
    size: "Wingspan 2.5 – 3.5 m; 6 – 12 kg",
    lastClue: "It holds the record for the longest wingspan of any living bird and can glide around the world on the westerly winds.",
    population: {
      value: 20100, low: 16000, high: 58000, display: "roughly 16,000 – 58,000 adults", year: 2018, basis: "mature individuals",
      confidence: "estimated",
      note: "Figures differ by how the species is defined; BirdLife quotes about 20,100 adults after a taxonomic split, older global figures near 58,000.",
      source: { label: "BirdLife DataZone: Snowy (Wandering) albatross", url: "https://datazone.birdlife.org/species/factsheet/snowy-albatross-diomedea-exulans" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "The Southern Ocean, breeding on sub-Antarctic islands such as South Georgia, Crozet, Kerguelen, Prince Edward and Macquarie",
    fact: "Pairs mate for life and chicks take most of a year to fledge, so breeding happens only every other year. Birds spend years at sea without touching land.",
    ranges: [
      [[-28, -180], [-62, -180], [-62, -90], [-28, -90]],
      [[-28, -90], [-62, -90], [-62, 0], [-28, 0]],
      [[-28, 0], [-62, 0], [-62, 90], [-28, 90]],
      [[-28, 90], [-62, 90], [-62, 180], [-28, 180]]
    ]
  },
  {
    id: "giant-pacific-octopus", name: "Giant Pacific Octopus", wikiTitle: "Giant_Pacific_octopus", scientificName: "Enteroctopus dofleini",
    classPlain: "Invertebrate", classFull: "Cephalopoda (Octopoda)",
    taxon: ["Cephalopoda", "Octopoda", "Enteroctopodidae", "Enteroctopus"],
    aliases: ["north pacific giant octopus", "pacific giant octopus"], groups: ["octopus"],
    diet: "Carnivore — Crabs, clams, shrimp, fish and even small sharks and birds",
    biome: "Cold rocky coasts and kelp-lined sea floor, down to deep shelves",
    size: "Arm span 3 – 5 m; 15 – 50 kg",
    lastClue: "The world's largest octopus has eight arms, three hearts and blue blood, and lives in cold North Pacific dens.",
    population: {
      value: 1000000, low: 100000, high: 10000000, display: "unknown, likely millions", year: 2018, basis: "all individuals",
      confidence: "rough",
      note: "No population estimate exists; stocks are tracked only through fishery catches. This is an order-of-magnitude placeholder.",
      source: { label: "Wikipedia: Giant Pacific octopus (IUCN 2018: Least Concern)", url: "https://en.wikipedia.org/wiki/Giant_Pacific_octopus" }
    },
    status: "Least Concern", region: "Oceans",
    regionsText: "Cool coastal waters of the North Pacific, from Japan and Korea round to Alaska and down to California",
    fact: "It can squeeze through any gap larger than its hard beak and can change colour and texture in an instant. Mothers guard their eggs for months and die soon after they hatch.",
    ranges: [
      [[33, -119.5], [35, -122], [38, -124.5], [41, -125], [46, -125], [49, -128], [53, -133], [56, -137], [59, -143], [59.5, -148], [57, -154], [55, -160], [54.5, -166], [52.5, -172], [51, -179], [51, -180], [51.5, -180], [52, -174], [54, -166], [55, -160], [57, -157], [59.5, -152], [60.5, -147], [59.5, -141], [57, -136], [54, -130], [50, -127], [46.5, -124], [42, -124.3], [38, -123], [35, -120.8], [34, -118.5]],
      [[52, 180], [52.5, 175], [53, 172], [52, 171], [51, 175], [51, 180]],
      [[61, 164], [58, 164], [55, 162], [51, 157], [46, 151], [42, 146], [40, 142], [35, 141], [34, 135], [34, 129], [37, 127], [39, 128], [42, 131], [45, 136], [48, 142], [53, 142], [57, 138], [60, 148], [59, 157]]
    ]
  },
  {
    id: "west-indian-manatee", name: "West Indian Manatee", wikiTitle: "West_Indian_manatee", scientificName: "Trichechus manatus",
    classPlain: "Mammal", classFull: "Mammalia (Sirenia)",
    taxon: ["Mammalia", "Sirenia", "Trichechidae", "Trichechus"],
    aliases: ["american manatee", "florida manatee", "caribbean manatee"], groups: ["manatee"],
    diet: "Herbivore — Seagrass, algae and freshwater plants, up to 10 percent of its body weight a day",
    biome: "Warm shallow coastal waters, estuaries, springs and slow rivers",
    size: "2.7 – 4 m long; 400 – 600 kg",
    lastClue: "A slow, gentle, paddle-tailed grazer of warm Caribbean and Florida waters, related to elephants.",
    population: {
      value: 6000, low: 2500, high: 10000, display: "fewer than about 10,000", year: 2023, basis: "all individuals",
      confidence: "rough",
      note: "No single census covers the whole range. Florida is counted by aerial survey; Antillean populations are patchy and poorly known.",
      source: { label: "World Land Trust: West Indian manatee (IUCN figures)", url: "https://www.worldlandtrust.org/species/mammals/west-indian-manatee/" }
    },
    status: "Vulnerable", region: "Oceans",
    regionsText: "Coastal waters and rivers from Florida and the Gulf of Mexico round the Caribbean to north-east Brazil",
    fact: "Manatees gather at warm springs and power-plant outflows in cold snaps because they cannot survive long in water below about 20 degrees Celsius. They have very little fat to keep warm.",
    ranges: [
      [[30.8, -81.3], [28.5, -80.4], [26, -80.0], [25.2, -80.4], [25.1, -81.3], [26.6, -82.3], [28.5, -82.9], [30, -83.8], [30.1, -85], [30.2, -87], [30.4, -88.5], [30.9, -88], [30.7, -86], [30.8, -84], [30.5, -83], [30.6, -82], [30.7, -81.5]],
      [[24, -97.2], [20.5, -96.2], [19.2, -95.3], [18.8, -93], [19.5, -91], [21.6, -90.3], [21.7, -87], [19, -86.5], [17, -87.5], [16, -85], [15.7, -83.3], [13, -82.5], [11, -82.5], [9.5, -81.5], [9.5, -79], [10.5, -76], [11.8, -74], [12.5, -71], [11.5, -68.5], [11, -64], [10.8, -61.5], [10, -62.5], [10.2, -65], [10.4, -68], [11, -71.5], [10.3, -74.3], [9, -75.8], [8.5, -77], [9, -79.5], [9.2, -81.5], [10.5, -83.6], [12, -83.7], [15, -83.5], [15.8, -84.5], [16, -88.2], [18.4, -88.3], [20.5, -87.2], [21.2, -88], [21.1, -90.3], [19.8, -90.6], [18.4, -92.5], [18.2, -94.5], [18.8, -95.5], [20, -97], [22, -97.8]],
      [[23.3, -84.5], [23.1, -80], [21.5, -76.5], [20.2, -74.2], [19.9, -75], [20.5, -78], [21.8, -81], [22.3, -84]],
      [[20, -73], [19.9, -69.5], [18.3, -68.3], [18, -71], [18.5, -73.5]],
      [[18.5, -67.2], [18.5, -65.7], [18, -65.6], [17.9, -67.1]],
      [[18.5, -78.3], [18.5, -76.3], [17.8, -76.3], [17.8, -78.2]],
      [[5, -52], [1, -50], [-1, -45], [-3, -40], [-6, -35], [-9, -35], [-10, -37], [-9, -34.5], [-5, -35], [-2, -39], [0, -45], [3, -51]]
    ]
  },
  {
    id: "leafy-seadragon", name: "Leafy Seadragon", wikiTitle: "Leafy_seadragon", scientificName: "Phycodurus eques",
    classPlain: "Fish", classFull: "Actinopterygii (Syngnathiformes)",
    taxon: ["Actinopterygii", "Syngnathiformes", "Syngnathidae", "Phycodurus"],
    aliases: ["glauert's seadragon", "leafy sea dragon"], groups: ["seadragon", "sea dragon"],
    diet: "Carnivore — Tiny shrimp-like crustaceans sucked up through a toothless snout",
    biome: "Cool, shallow rocky reefs and seaweed beds",
    size: "20 – 35 cm long",
    lastClue: "A relative of seahorses whose body is covered in leaf-like fronds, perfectly camouflaged as drifting kelp.",
    population: {
      value: 20000, low: 5000, high: 50000, display: "unknown, perhaps tens of thousands", year: 2017, basis: "all individuals",
      confidence: "rough",
      note: "No population count exists; this is an order-of-magnitude guess. IUCN assessed it as Least Concern in 2017 with data limits.",
      source: { label: "Wikipedia: Leafy seadragon (IUCN 2017: Least Concern)", url: "https://en.wikipedia.org/wiki/Leafy_seadragon" }
    },
    status: "Least Concern", region: "Oceans",
    regionsText: "Coastal waters of southern Australia, from Western Australia round to South Australia and Victoria",
    fact: "Its leafy fronds are for camouflage, not swimming; it moves with tiny, nearly invisible fins. Males carry the fertilised eggs on the underside of their tail for about two months.",
    ranges: [
      [[-32, 115.2], [-35, 115], [-35, 118], [-34, 123.7], [-33.8, 124], [-34.5, 123.5], [-35.2, 119], [-35.2, 116.5], [-32.5, 115.8]],
      [[-33, 135.5], [-34.8, 135.6], [-35.7, 136.8], [-35.7, 138.2], [-34.7, 138.5], [-34.4, 138], [-33.5, 137.4]],
      [[-38, 144.4], [-38.5, 145], [-38.4, 146], [-39, 146.4], [-38.6, 146.5], [-38.2, 145.3], [-37.8, 144.6]],
      [[-41, 148.3], [-43, 148], [-43.4, 147.3], [-42.8, 147.5], [-41.2, 148.2]]
    ]
  }
];
