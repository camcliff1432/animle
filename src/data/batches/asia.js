// Species batch: asia. Format: see src/data/batches/README.md
export default [
  {
    id: "giant-panda",
    name: "Giant Panda",
    wikiTitle: "Giant_panda",
    scientificName: "Ailuropoda melanoleuca",
    classPlain: "Mammal",
    classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Ursidae", "Ailuropoda"],
    aliases: ["panda bear", "giant panda bear"],
    groups: ["panda", "bear"],
    diet: "Herbivore — Almost entirely bamboo, eating up to 12 kg of it a day",
    biome: "Cool, misty mountain forest with a dense bamboo understorey",
    size: "1.2 – 1.9 m long; 70 – 125 kg",
    lastClue: "A black-and-white bear from the mountains of central China, a famous symbol of conservation.",
    population: {
      value: 1864, low: 1800, high: 2100, display: "about 1,900",
      year: 2014, basis: "wild individuals older than 1.5 years", confidence: "counted",
      note: "From China's fourth national survey (2011–2014); later reports put the wild total near 1,900.",
      source: { label: "Wikipedia: Giant panda (national survey figures)", url: "https://en.wikipedia.org/wiki/Giant_panda" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Mountain forests of Sichuan, Shaanxi and Gansu in central China",
    fact: "Although it belongs to the meat-eating order, it has a bear's gut and survives on a diet so low in energy that it spends most of the day eating and resting.",
    ranges: [
      [[34.0, 103.5], [33.6, 104.8], [32.6, 104.9], [32.0, 104.0], [32.3, 103.2], [33.2, 102.9]],
      [[31.9, 103.6], [31.5, 103.9], [30.6, 103.2], [30.3, 102.6], [30.8, 102.2], [31.5, 102.6]],
      [[29.6, 102.9], [29.0, 103.1], [28.3, 102.8], [28.2, 102.2], [29.0, 102.0]],
      [[34.0, 107.3], [33.9, 108.4], [33.4, 108.5], [33.2, 107.4], [33.6, 106.8]]
    ]
  },
  {
    id: "tiger",
    name: "Tiger",
    wikiTitle: "Tiger",
    scientificName: "Panthera tigris",
    classPlain: "Mammal",
    classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Felidae", "Panthera"],
    aliases: ["bengal tiger", "siberian tiger", "amur tiger", "sumatran tiger", "royal bengal tiger"],
    groups: ["big cat", "cat"],
    diet: "Carnivore — Ambushes deer, wild pigs and wild cattle, taking prey far heavier than itself",
    biome: "Tropical and temperate forest, mangrove swamp and tall grassland, always near water",
    size: "1.4 – 2.9 m long plus a 0.6 – 1.1 m tail; 75 – 300 kg",
    lastClue: "The largest living cat, with orange fur and bold black stripes unique to each individual.",
    population: {
      value: 4500, low: 3726, high: 5578, display: "about 4,500",
      year: 2022, basis: "all individuals (roughly 3,140 adults)", confidence: "estimated",
      note: "2022 IUCN assessment; better counting methods explain part of the rise from about 3,200 in 2015.",
      source: { label: "Panthera: global tiger population (2022 IUCN assessment)", url: "https://panthera.org/newsroom/global-tiger-population-stable-and-potentially-increasing-despite-extreme-threats" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Scattered forest patches from India and Nepal through Southeast Asia and Sumatra to the Russian Far East",
    fact: "Unlike most cats, it readily swims and will cool off in rivers, and no two individuals carry the same stripe pattern.",
    ranges: [
      [[24.5, 79.0], [23.5, 81.5], [22.0, 81.0], [20.5, 80.5], [19.2, 79.0], [20.5, 77.5], [21.8, 78.0], [22.5, 76.5], [23.5, 77.0]],
      [[15.4, 74.3], [12.0, 75.6], [9.4, 77.0], [10.5, 77.6], [12.5, 77.8], [14.5, 75.2]],
      [[30.0, 78.2], [29.4, 80.5], [28.2, 82.5], [27.5, 84.5], [26.8, 86.5], [27.2, 88.5], [27.5, 86.8], [27.8, 84.8], [28.7, 83.0], [29.4, 80.9], [29.9, 78.8]],
      [[28.0, 89.0], [27.8, 92.5], [27.0, 95.5], [25.0, 94.0], [24.0, 92.0], [25.8, 90.5], [26.5, 88.8]],
      [[22.3, 88.8], [21.8, 89.2], [21.9, 89.9], [22.6, 89.3]],
      [[22.2, 86.0], [21.5, 86.5], [21.0, 85.5], [21.8, 85.2]],
      [[48.0, 134.8], [47.0, 136.5], [44.5, 135.8], [43.0, 134.5], [43.2, 131.5], [44.5, 132.8], [46.5, 133.3]],
      [[44.2, 130.8], [43.5, 131.0], [42.5, 130.3], [43.2, 129.5]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]],
      [[6.3, 101.2], [5.0, 102.5], [3.5, 103.0], [2.5, 103.3], [2.8, 102.0], [4.5, 101.3], [5.8, 100.9]],
      [[17.3, 98.7], [15.5, 99.4], [13.0, 99.3], [12.8, 99.0], [14.8, 98.4]]
    ]
  },
  {
    id: "asian-elephant",
    name: "Asian Elephant",
    wikiTitle: "Asian_elephant",
    scientificName: "Elephas maximus",
    classPlain: "Mammal",
    classFull: "Mammalia (Proboscidea)",
    taxon: ["Mammalia", "Proboscidea", "Elephantidae", "Elephas"],
    aliases: ["indian elephant", "asiatic elephant"],
    groups: ["elephant"],
    diet: "Herbivore — Grasses, bark, roots and crops, up to 150 kg of plants a day",
    biome: "Tropical forest edges, scrub and grassland, from lowlands to hill country",
    size: "5.5 – 6.4 m long; 2,000 – 5,500 kg; shoulder height 2 – 3.5 m",
    lastClue: "Smaller-eared than its African cousin, with a domed head and a long trunk, and often kept as a working animal in South and Southeast Asia.",
    population: {
      value: 50000, low: 48323, high: 51680, display: "about 50,000",
      year: 2019, basis: "all individuals", confidence: "estimated",
      note: "Published estimate range for the species' whole wild population; counts in Myanmar and Indochina are poor.",
      source: { label: "Wikipedia: Asian elephant (population)", url: "https://en.wikipedia.org/wiki/Asian_elephant" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Fragmented forests of India, Sri Lanka, mainland Southeast Asia, Sumatra and northern Borneo",
    fact: "Only the males of most populations grow large tusks, and a good share of males have none at all, while females usually have only small tushes.",
    ranges: [
      [[15.0, 74.5], [12.0, 75.5], [8.3, 77.2], [9.5, 78.0], [11.5, 79.5], [13.0, 78.5], [14.5, 77.0]],
      [[23.5, 85.5], [22.5, 87.0], [21.0, 86.5], [19.8, 84.5], [20.8, 83.0], [22.5, 83.8]],
      [[27.5, 89.0], [27.3, 93.5], [27.5, 96.5], [25.5, 98.0], [23.5, 98.8], [22.2, 100.5], [21.5, 101.5], [21.8, 103.0], [20.5, 104.5], [17.5, 105.8], [15.0, 107.0], [12.5, 107.5], [11.0, 106.5], [11.5, 104.5], [13.0, 103.5], [14.0, 102.5], [12.5, 102.2], [12.0, 101.0], [14.5, 99.5], [16.5, 98.0], [18.5, 95.0], [20.0, 94.0], [22.0, 92.5], [24.0, 91.5], [26.0, 90.0]],
      [[12.0, 99.2], [10.0, 98.9], [8.0, 98.7], [6.5, 100.5], [5.5, 101.5], [4.5, 102.5], [3.0, 103.3], [2.0, 103.2], [2.7, 101.8], [4.0, 101.3], [5.5, 100.9], [7.0, 100.0], [9.0, 99.3], [11.0, 99.3]],
      [[9.5, 80.3], [8.5, 81.0], [7.0, 81.8], [6.2, 81.3], [6.5, 80.5], [8.0, 80.0]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]],
      [[5.0, 117.0], [4.5, 118.0], [4.2, 117.2], [4.6, 116.6]]
    ]
  },
  {
    id: "bornean-orangutan",
    name: "Bornean Orangutan",
    wikiTitle: "Bornean_orangutan",
    scientificName: "Pongo pygmaeus",
    classPlain: "Mammal",
    classFull: "Mammalia (Primates)",
    taxon: ["Mammalia", "Primates", "Hominidae", "Pongo"],
    aliases: ["bornean orang-utan", "orang-utan of borneo"],
    groups: ["orangutan", "orang-utan", "orang utan", "ape", "great ape"],
    diet: "Omnivore — Mostly ripe fruit such as figs and durian, plus leaves, bark and insects",
    biome: "Lowland and peat-swamp rainforest, living almost entirely in the canopy",
    size: "0.8 – 1.4 m tall; 30 – 100 kg; arm span up to 2 m",
    lastClue: "A shaggy, red-haired great ape whose name means \"person of the forest\" and which lives on one large tropical island.",
    population: {
      value: 104700, low: 83760, high: 125640, display: "about 105,000",
      year: 2016, basis: "all individuals", confidence: "estimated",
      note: "Single published figure; the low/high band is an assumed plus or minus 20%.",
      source: { label: "Wikipedia: Bornean orangutan (IUCN-based estimate)", url: "https://en.wikipedia.org/wiki/Bornean_orangutan" }
    },
    status: "Critically Endangered",
    region: "Asia",
    regionsText: "Remaining rainforest of Borneo in Indonesian Kalimantan, Sarawak and Sabah",
    fact: "Females build a fresh sleeping nest of leafy branches almost every night, and mothers raise each infant for six to eight years, the slowest breeding of any land mammal in the region.",
    ranges: [
      [[2.0, 109.8], [1.0, 111.5], [0.5, 113.0], [-0.5, 112.5], [-1.0, 111.0], [-1.5, 110.0], [-0.5, 109.8], [1.0, 109.3]],
      [[0.5, 113.0], [1.0, 115.5], [0.0, 116.5], [-1.5, 116.0], [-2.5, 114.5], [-3.0, 113.2], [-2.0, 112.5]],
      [[5.5, 117.5], [5.4, 118.6], [4.5, 118.5], [4.0, 117.5], [4.6, 116.8]],
      [[1.5, 116.0], [1.2, 117.5], [0.5, 117.8], [0.0, 117.3], [0.5, 116.3]]
    ]
  },
  {
    id: "malayan-tapir",
    name: "Malayan Tapir",
    wikiTitle: "Malayan_tapir",
    scientificName: "Tapirus indicus",
    classPlain: "Mammal",
    classFull: "Mammalia (Perissodactyla)",
    taxon: ["Mammalia", "Perissodactyla", "Tapiridae", "Tapirus"],
    aliases: ["asian tapir", "malay tapir", "asiatic tapir"],
    groups: ["tapir"],
    diet: "Herbivore — Browses leaves, twigs, shoots and fallen fruit with its flexible snout",
    biome: "Dense tropical lowland and hill rainforest, near rivers and swamps",
    size: "1.8 – 2.5 m long; 250 – 320 kg",
    lastClue: "A pig-like animal with a short trunk whose coat is black in front and white behind, as if wearing a saddle.",
    population: {
      value: 1500, low: 800, high: 2500, display: "fewer than 2,500 adults",
      year: 2016, basis: "mature individuals", confidence: "rough",
      note: "No census exists; the published statement is fewer than 2,500 mature individuals, so this is an order-of-magnitude band.",
      source: { label: "Wikipedia: Malayan tapir (IUCN 2016 assessment cited)", url: "https://en.wikipedia.org/wiki/Malayan_tapir" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Rainforests of the Malay Peninsula, southern Myanmar and Thailand, and Sumatra",
    fact: "Its odd two-tone coat breaks up its outline in the dim forest at night, and calves are born striped and spotted like watermelons before turning adult colours.",
    ranges: [
      [[12.0, 99.0], [10.0, 98.8], [8.0, 98.6], [6.5, 100.5], [5.5, 101.5], [4.5, 102.5], [3.0, 103.3], [2.0, 103.2], [2.7, 101.8], [4.0, 101.3], [5.5, 100.9], [7.0, 100.0], [9.0, 99.2], [11.0, 99.2]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]]
    ]
  },
  {
    id: "proboscis-monkey",
    name: "Proboscis Monkey",
    wikiTitle: "Proboscis_monkey",
    scientificName: "Nasalis larvatus",
    classPlain: "Mammal",
    classFull: "Mammalia (Primates)",
    taxon: ["Mammalia", "Primates", "Cercopithecidae", "Nasalis"],
    aliases: ["long-nosed monkey", "bekantan"],
    groups: ["monkey"],
    diet: "Herbivore — Mostly leaves, unripe fruit and seeds, fermented in a large multi-chambered stomach",
    biome: "Mangrove, riverside and peat-swamp forest, often sleeping in trees along riverbanks",
    size: "0.55 – 0.76 m body; 12 – 24 kg, with males about twice the weight of females",
    lastClue: "Males have a huge, drooping nose that amplifies their honking calls, and the species lives only on a single Southeast Asian island.",
    population: {
      value: 15000, low: 5000, high: 50000, display: "roughly 15,000",
      year: 2008, basis: "all individuals", confidence: "rough",
      note: "No recent total count exists; the species fell by more than half in about 40 years to 2008, so this is an order-of-magnitude band.",
      source: { label: "Wikipedia: Proboscis monkey (decline reported by IUCN)", url: "https://en.wikipedia.org/wiki/Proboscis_monkey" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Coastal mangroves and river forests of Borneo (Brunei, Sarawak, Sabah, Kalimantan)",
    fact: "It swims well and has partly webbed feet, and it will plunge from branches into rivers to cross to the other bank.",
    ranges: [
      [[1.7, 110.0], [1.8, 111.5], [2.5, 112.8], [3.5, 113.8], [4.8, 115.2], [5.0, 115.8], [4.5, 115.5], [3.2, 113.8], [2.0, 112.5], [1.3, 111.0], [1.3, 110.2]],
      [[7.0, 116.7], [6.2, 117.8], [5.0, 118.4], [4.0, 118.3], [2.5, 118.0], [1.5, 117.5], [1.5, 116.8], [3.0, 117.3], [4.5, 117.5], [5.5, 117.0]],
      [[-0.3, 109.2], [-1.5, 110.2], [-3.0, 111.7], [-3.8, 114.5], [-3.3, 114.8], [-2.2, 112.3], [-0.9, 110.0]]
    ]
  },
  {
    id: "sun-bear",
    name: "Sun Bear",
    wikiTitle: "Sun_bear",
    scientificName: "Helarctos malayanus",
    classPlain: "Mammal",
    classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Ursidae", "Helarctos"],
    aliases: ["honey bear", "malayan sun bear"],
    groups: ["bear"],
    diet: "Omnivore — Honey, bees, termites, beetle grubs and fruit, reached with a very long tongue",
    biome: "Tropical lowland and hill rainforest, climbing high in the trees",
    size: "1.0 – 1.5 m long; 25 – 65 kg",
    lastClue: "The smallest of its family, with sleek black fur and a pale golden crescent on its chest.",
    population: {
      value: 30000, low: 10000, high: 100000, display: "roughly 30,000",
      year: 2017, basis: "all individuals", confidence: "rough",
      note: "No reliable total exists; the species has declined by about 35% since the 1990s, so this is an order-of-magnitude band.",
      source: { label: "Wikipedia: Sun bear (IUCN Bear Specialist Group decline)", url: "https://en.wikipedia.org/wiki/Sun_bear" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Rainforests of mainland Southeast Asia, Sumatra and Borneo",
    fact: "Its tongue can reach about 25 cm, and it rips open tree hollows to get at bees' nests, using its curved claws to climb.",
    ranges: [
      [[27.0, 92.0], [27.0, 96.0], [25.5, 98.5], [23.0, 99.5], [22.0, 102.0], [21.0, 104.5], [17.5, 106.5], [14.0, 108.5], [11.5, 107.5], [10.5, 105.0], [12.0, 102.5], [11.0, 99.5], [8.0, 98.8], [6.0, 101.5], [3.0, 103.3], [2.0, 102.8], [5.0, 100.5], [8.5, 98.5], [13.0, 98.7], [16.5, 97.5], [19.5, 94.5], [22.0, 92.5], [24.0, 92.0]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]],
      [[6.5, 116.5], [4.5, 118.0], [1.0, 118.0], [-1.5, 116.5], [-3.5, 114.5], [-3.0, 111.5], [-1.5, 109.8], [1.5, 109.8], [4.0, 113.5], [5.0, 115.3]]
    ]
  },
  {
    id: "indian-rhinoceros",
    name: "Indian Rhinoceros",
    wikiTitle: "Indian_rhinoceros",
    scientificName: "Rhinoceros unicornis",
    classPlain: "Mammal",
    classFull: "Mammalia (Perissodactyla)",
    taxon: ["Mammalia", "Perissodactyla", "Rhinocerotidae", "Rhinoceros"],
    aliases: ["greater one-horned rhinoceros", "one-horned rhino", "indian rhino", "greater one-horned rhino", "asian one-horned rhinoceros"],
    groups: ["rhinoceros", "rhino"],
    diet: "Herbivore — Grasses, reeds, aquatic plants, leaves and crops",
    biome: "Wet tall-grass floodplain and riverine forest, often wallowing in pools",
    size: "3.0 – 3.8 m long; 1,800 – 2,700 kg",
    lastClue: "A single-horned giant whose thick grey hide folds into plates like armour, found on river plains below the Himalayas.",
    population: {
      value: 4075, low: 3260, high: 4890, display: "about 4,100",
      year: 2025, basis: "all individuals (3,323 in India, 752 in Nepal)", confidence: "counted",
      note: "Combined national counts; the low/high band is an assumed plus or minus 20%.",
      source: { label: "Wikipedia: Indian rhinoceros (March 2025 counts)", url: "https://en.wikipedia.org/wiki/Indian_rhinoceros" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Grasslands of Assam and West Bengal in India and the southern Terai of Nepal",
    fact: "It was down to only a few hundred animals early in the 20th century, and strict protection in a handful of reserves brought it back.",
    ranges: [
      [[27.0, 92.2], [26.8, 94.0], [26.4, 93.8], [26.2, 91.9], [26.5, 92.0]],
      [[26.8, 90.8], [26.8, 91.3], [26.6, 91.3], [26.6, 90.8]],
      [[27.7, 84.0], [27.7, 84.8], [27.4, 84.8], [27.4, 84.0]],
      [[28.5, 81.2], [28.6, 81.6], [28.3, 81.6], [28.3, 81.2]],
      [[26.9, 89.2], [26.8, 89.5], [26.6, 89.5], [26.6, 89.2]],
      [[28.6, 80.4], [28.6, 80.8], [28.4, 80.8], [28.4, 80.4]]
    ]
  },
  {
    id: "przewalskis-horse",
    name: "Przewalski's Horse",
    wikiTitle: "Przewalski's_horse",
    scientificName: "Equus ferus przewalskii",
    classPlain: "Mammal",
    classFull: "Mammalia (Perissodactyla)",
    taxon: ["Mammalia", "Perissodactyla", "Equidae", "Equus"],
    aliases: ["przewalski horse", "przewalskis horse", "takhi", "mongolian wild horse", "asian wild horse"],
    groups: ["wild horse", "horse"],
    diet: "Herbivore — Tough steppe grasses, with some herbs and shrubs in winter",
    biome: "Cold, dry grassland steppe and semi-desert on the Central Asian plateau",
    size: "2.0 – 2.4 m long; 200 – 300 kg; about 1.3 m at the shoulder",
    lastClue: "Stocky, sandy-coated with an upright dark mane, it vanished from the wild in the 1960s and was reintroduced to Mongolia from zoo stock.",
    population: {
      value: 800, low: 500, high: 1100, display: "roughly 800",
      year: 2018, basis: "free-ranging individuals", confidence: "estimated",
      note: "IUCN reported more than 500 free-ranging in Mongolia alone in 2018; later reports suggest about 1,000 across Mongolia, China and Kazakhstan. Mid-point used.",
      source: { label: "IUCN: Extinction to free-ranging, a successful reintroduction (2018)", url: "https://www.iucn.org/news/commission-ecosystem-management/201803/extinction-free-ranging-successful-reintroduction" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Reintroduced herds on the steppes and deserts of Mongolia and northwest China",
    fact: "Unlike domestic breeds, it has 66 chromosomes rather than 64, and every living animal descends from a dozen or so captives.",
    ranges: [
      [[45.8, 93.5], [45.8, 95.5], [44.8, 95.5], [44.8, 93.5]],
      [[47.9, 105.6], [47.9, 106.2], [47.6, 106.2], [47.6, 105.6]],
      [[46.4, 91.5], [46.4, 92.5], [45.8, 92.5], [45.8, 91.5]],
      [[45.8, 88.5], [45.8, 90.0], [44.8, 90.0], [44.8, 88.5]]
    ]
  },
  {
    id: "wild-bactrian-camel",
    name: "Wild Bactrian Camel",
    wikiTitle: "Wild_Bactrian_camel",
    scientificName: "Camelus ferus",
    classPlain: "Mammal",
    classFull: "Mammalia (Artiodactyla)",
    taxon: ["Mammalia", "Artiodactyla", "Camelidae", "Camelus"],
    aliases: ["wild camel", "wild two-humped camel"],
    groups: ["camel", "bactrian camel"],
    diet: "Herbivore — Thorny desert shrubs, saltbush and reeds, and it can drink brackish water",
    biome: "Barren, stony gobi desert with scarce oases and extreme heat and cold",
    size: "2.2 – 3.5 m long; 450 – 690 kg",
    lastClue: "A two-humped, small-humped desert nomad of Mongolia and China, genetically separate from the domestic two-humped kind.",
    population: {
      value: 950, low: 760, high: 1140, display: "about 950",
      year: 2018, basis: "all individuals", confidence: "estimated",
      note: "Combined estimate for China (about 600–700) and Mongolia (about 300–800 reported); low/high band assumed plus or minus 20%.",
      source: { label: "Wikipedia: Wild Bactrian camel (population estimates)", url: "https://en.wikipedia.org/wiki/Wild_Bactrian_camel" }
    },
    status: "Endangered",
    region: "Asia",
    regionsText: "Remote Gobi and Taklamakan desert edges of northwest China and southwest Mongolia",
    fact: "It once drank so little that it survives on salty water that would sicken domestic camels, and it was identified as a separate species only in 2002.",
    ranges: [
      [[40.8, 89.0], [40.7, 91.5], [39.5, 92.0], [38.6, 90.5], [38.5, 88.0], [39.5, 87.8]],
      [[44.0, 93.0], [44.3, 95.5], [43.2, 96.0], [42.6, 94.5], [43.0, 93.0]],
      [[40.3, 94.0], [40.5, 95.0], [39.9, 95.5], [39.6, 94.5]]
    ]
  },
  {
    id: "japanese-macaque",
    name: "Japanese Macaque",
    wikiTitle: "Japanese_macaque",
    scientificName: "Macaca fuscata",
    classPlain: "Mammal",
    classFull: "Mammalia (Primates)",
    taxon: ["Mammalia", "Primates", "Cercopithecidae", "Macaca"],
    aliases: ["snow monkey"],
    groups: ["macaque", "monkey"],
    diet: "Omnivore — Fruit, seeds, buds, bark, insects and sometimes crops",
    biome: "Temperate and subtropical forest, including mountains that are snow-covered in winter",
    size: "0.5 – 0.95 m long; 8 – 18 kg",
    lastClue: "A pink-faced, grey-coated primate famous for soaking in volcanic hot springs; it lives farther north than any other non-human primate.",
    population: {
      value: 114000, low: 80000, high: 150000, display: "over 100,000",
      year: 1989, basis: "all individuals", confidence: "rough",
      note: "The only widely quoted total (about 114,000) comes from a 1989 study; no newer count exists, so treat it as rough.",
      source: { label: "Wikipedia: Japanese macaque (population and status)", url: "https://en.wikipedia.org/wiki/Japanese_macaque" }
    },
    status: "Least Concern",
    region: "Asia",
    regionsText: "Forests of the Japanese islands of Honshu, Shikoku, Kyushu and Yakushima",
    fact: "Troops on one island became known for washing sweet potatoes in the sea, a habit that spread socially through the group.",
    ranges: [
      [[41.4, 141.2], [40.5, 141.6], [38.5, 141.5], [36.0, 140.8], [35.2, 140.0], [34.8, 139.8], [34.6, 138.8], [34.6, 137.0], [34.2, 135.5], [34.7, 133.5], [34.4, 131.0], [35.5, 133.0], [36.5, 136.5], [37.5, 137.2], [38.5, 139.5], [40.0, 139.9], [41.3, 140.4]],
      [[34.2, 134.2], [33.8, 134.6], [33.3, 134.2], [32.8, 132.8], [33.3, 132.4], [33.9, 133.0]],
      [[33.9, 131.0], [33.6, 131.7], [32.8, 131.9], [31.4, 131.2], [31.3, 130.4], [32.5, 130.4], [33.3, 130.2]],
      [[30.45, 130.4], [30.45, 130.6], [30.25, 130.6], [30.25, 130.4]]
    ]
  },
  {
    id: "binturong",
    name: "Binturong",
    wikiTitle: "Binturong",
    scientificName: "Arctictis binturong",
    classPlain: "Mammal",
    classFull: "Mammalia (Carnivora)",
    taxon: ["Mammalia", "Carnivora", "Viverridae", "Arctictis"],
    aliases: ["bearcat"],
    groups: ["civet"],
    diet: "Omnivore — Ripe fruit, especially figs, plus small animals, eggs and shoots",
    biome: "Dense tropical rainforest canopy, rarely coming to the ground",
    size: "0.6 – 1.0 m body plus a tail of similar length; 9 – 20 kg",
    lastClue: "A shaggy black tree-dweller with a muscular prehensile tail and a scent that smells of buttered popcorn.",
    population: {
      value: 30000, low: 10000, high: 100000, display: "roughly 30,000",
      year: 2016, basis: "all individuals", confidence: "rough",
      note: "No population estimate has been published; this is an order-of-magnitude guess consistent with its Vulnerable listing (2016 assessment).",
      source: { label: "Wikipedia: Binturong (IUCN status; no population figure published)", url: "https://en.wikipedia.org/wiki/Binturong" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Rainforests from northeast India and southern China through mainland Southeast Asia to Sumatra, Borneo and Palawan",
    fact: "Its tail is one of the few among carnivores that can grip like a hand, and the animal can rotate its hind feet backward to descend trunks headfirst.",
    ranges: [
      [[28.0, 88.0], [27.5, 92.5], [28.0, 96.5], [25.5, 98.5], [24.0, 101.5], [22.5, 104.0], [21.5, 106.5], [18.0, 106.5], [14.5, 108.8], [11.0, 108.0], [10.5, 105.2], [12.5, 102.5], [11.5, 99.6], [8.0, 98.7], [6.0, 101.5], [2.0, 103.4], [5.0, 100.4], [9.0, 98.5], [13.0, 98.5], [16.5, 97.5], [19.5, 94.0], [22.0, 92.5], [24.5, 90.5], [26.5, 89.0]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]],
      [[6.5, 116.5], [4.5, 118.0], [1.0, 118.0], [-1.5, 116.5], [-3.5, 114.5], [-3.0, 111.5], [-1.5, 109.8], [1.5, 109.8], [4.0, 113.5], [5.0, 115.3]],
      [[11.3, 119.3], [10.0, 119.0], [8.5, 117.2], [9.3, 117.2], [10.5, 118.6]]
    ]
  },
  {
    id: "king-cobra",
    name: "King Cobra",
    wikiTitle: "King_cobra",
    scientificName: "Ophiophagus hannah",
    classPlain: "Reptile",
    classFull: "Reptilia (Squamata)",
    taxon: ["Reptilia", "Squamata", "Elapidae", "Ophiophagus"],
    aliases: ["hamadryad"],
    groups: ["cobra", "snake"],
    diet: "Carnivore — Eats mostly other snakes, including venomous ones, and sometimes monitor lizards",
    biome: "Dense rainforest, bamboo thickets and mangrove, usually near streams",
    size: "3 – 5.5 m long; 6 – 12 kg",
    lastClue: "The world's longest venomous snake, whose scientific name means \"snake-eater\", and it raises its body and flares a hood.",
    population: {
      value: 60000, low: 20000, high: 200000, display: "roughly 60,000",
      year: 2012, basis: "all individuals", confidence: "rough",
      note: "No population count exists; this is an order-of-magnitude band consistent with its Vulnerable listing (assessed 2012, with a decline from habitat loss and trade).",
      source: { label: "Wikipedia: King cobra (IUCN status; no population figure published)", url: "https://en.wikipedia.org/wiki/King_cobra" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Forests of India, southern China, mainland Southeast Asia, Indonesia and the Philippines",
    fact: "Females are one of very few snakes that build a nest, piling leaves into a mound and guarding the eggs until they are about to hatch.",
    ranges: [
      [[16.0, 74.0], [12.0, 75.0], [8.5, 77.0], [10.5, 77.8], [14.0, 75.5]],
      [[22.0, 85.5], [20.0, 85.0], [18.0, 83.0], [17.0, 82.0], [19.0, 81.5], [21.5, 83.5]],
      [[30.0, 78.0], [28.5, 83.0], [27.5, 89.0], [27.5, 93.5], [28.0, 97.0], [25.5, 98.5], [24.0, 101.0], [23.5, 105.5], [21.5, 108.0], [22.0, 112.0], [23.8, 116.5], [24.5, 118.3], [21.0, 107.0], [19.0, 105.8], [16.0, 108.3], [12.0, 109.2], [10.5, 107.0], [10.0, 105.0], [12.0, 102.8], [11.5, 99.5], [8.0, 98.5], [6.0, 100.5], [3.0, 101.5], [8.0, 98.8], [13.0, 98.5], [16.5, 97.5], [19.5, 94.0], [22.0, 92.5], [24.0, 91.0], [26.0, 89.0]],
      [[5.5, 95.5], [4.0, 97.5], [2.0, 99.5], [0.5, 101.5], [-1.5, 102.5], [-3.5, 104.0], [-5.0, 104.5], [-4.5, 103.4], [-2.5, 101.5], [-0.5, 100.5], [1.5, 98.8], [3.5, 96.5]],
      [[6.5, 116.5], [4.5, 118.0], [1.0, 118.0], [-1.5, 116.5], [-3.5, 114.5], [-3.0, 111.5], [-1.5, 109.8], [1.5, 109.8], [4.0, 113.5], [5.0, 115.3]],
      [[18.5, 121.0], [17.0, 122.0], [14.5, 122.0], [14.0, 121.0], [16.0, 120.3]]
    ]
  },
  {
    id: "indian-peafowl",
    name: "Indian Peafowl",
    wikiTitle: "Indian_peafowl",
    scientificName: "Pavo cristatus",
    classPlain: "Bird",
    classFull: "Aves (Galliformes)",
    taxon: ["Aves", "Galliformes", "Phasianidae", "Pavo"],
    aliases: ["peacock", "indian peacock", "blue peafowl", "common peafowl", "peahen", "peafowl"],
    groups: [],
    diet: "Omnivore — Seeds, grain, insects, small reptiles and fallen fruit",
    biome: "Dry deciduous forest, scrub and farmland edges, roosting high in trees",
    size: "0.9 – 1.2 m long, males up to 2.3 m with a train; 2.7 – 6 kg",
    lastClue: "The national bird of India, and the male fans a shimmering train of eyed tail feathers in display.",
    population: {
      value: 150000, low: 100000, high: 300000, display: "over 100,000",
      year: 2002, basis: "all individuals", confidence: "rough",
      note: "Published only as a conservative figure of more than 100,000 from 2002; exact numbers are unknown.",
      source: { label: "Wikipedia: Indian peafowl (population)", url: "https://en.wikipedia.org/wiki/Indian_peafowl" }
    },
    status: "Least Concern",
    region: "Asia",
    regionsText: "Open forest and farmland across the Indian subcontinent, from Pakistan and Nepal to Sri Lanka",
    fact: "The glittering train isn't actually the tail: it is made of elongated upper-tail coverts, and females seem to favour males with the most eyespots.",
    ranges: [
      [[33.0, 74.0], [32.0, 76.5], [30.5, 79.0], [29.0, 81.5], [27.5, 84.0], [26.8, 88.5], [26.5, 92.0], [26.7, 94.5], [25.0, 93.5], [24.0, 91.5], [22.5, 91.5], [22.0, 89.0], [21.0, 87.0], [19.5, 85.0], [17.5, 82.5], [15.5, 80.2], [13.0, 80.3], [10.0, 79.8], [8.3, 77.5], [9.5, 76.2], [12.5, 74.8], [15.0, 74.0], [19.0, 72.8], [21.5, 72.5], [22.5, 69.5], [24.5, 68.5], [26.0, 68.5], [28.5, 70.0], [30.0, 71.0], [32.0, 72.0]],
      [[9.5, 80.3], [8.0, 81.5], [6.2, 81.5], [6.0, 80.2], [7.5, 79.8], [9.0, 79.9]]
    ]
  },
  {
    id: "red-crowned-crane",
    name: "Red-crowned Crane",
    wikiTitle: "Red-crowned_crane",
    scientificName: "Grus japonensis",
    classPlain: "Bird",
    classFull: "Aves (Gruiformes)",
    taxon: ["Aves", "Gruiformes", "Gruidae", "Grus"],
    aliases: ["japanese crane", "manchurian crane", "tancho"],
    groups: ["crane"],
    diet: "Omnivore — Fish, frogs, aquatic insects, rice and roots from wetlands",
    biome: "Marshes, reed beds and tidal flats, with winter feeding sites in cold, open fields",
    size: "1.4 – 1.6 m tall; wingspan 2.2 – 2.5 m; 7 – 12 kg",
    lastClue: "A tall white bird with black wing edges and a bare patch of red skin on its head, famed in East Asian art as a symbol of luck and long life.",
    population: {
      value: 3800, low: 3400, high: 4200, display: "about 3,800",
      year: 2020, basis: "all individuals (about 2,300 adults); winter counts", confidence: "counted",
      note: "About 1,900 are resident in Hokkaido (Japan) and about 1,950 migrate between the mainland and Korea/China.",
      source: { label: "Wikipedia: Red-crowned crane (2020 winter counts)", url: "https://en.wikipedia.org/wiki/Red-crowned_crane" }
    },
    status: "Vulnerable",
    region: "Asia",
    regionsText: "Wetlands of Hokkaido in Japan, and northeast China and Russia, wintering in Korea and eastern China",
    fact: "Pairs dance by leaping, bowing and tossing grass in the air, and these displays strengthen the bond between mates who stay together for life.",
    ranges: [
      [[43.3, 144.0], [43.2, 145.0], [42.9, 144.8], [42.9, 143.9]],
      [[49.0, 130.5], [48.7, 134.5], [47.0, 134.5], [45.0, 133.0], [44.5, 131.7], [45.5, 131.0], [47.0, 130.5]],
      [[47.5, 123.5], [47.5, 125.0], [46.7, 125.0], [46.7, 123.5]],
      [[38.5, 126.5], [38.5, 128.5], [37.8, 128.5], [37.8, 126.5]],
      [[34.5, 119.8], [34.5, 120.8], [33.0, 120.8], [33.0, 119.8]]
    ]
  },
  {
    id: "chinese-giant-salamander",
    name: "Chinese Giant Salamander",
    wikiTitle: "Chinese_giant_salamander",
    scientificName: "Andrias davidianus",
    classPlain: "Amphibian",
    classFull: "Amphibia (Urodela)",
    taxon: ["Amphibia", "Urodela", "Cryptobranchidae", "Andrias"],
    aliases: ["chinese salamander"],
    groups: ["giant salamander", "salamander"],
    diet: "Carnivore — Fish, crabs, frogs and other prey sucked in by night with a quick gape",
    biome: "Cold, fast, clear mountain streams and rocky caves with plenty of hiding places",
    size: "1 – 1.8 m long; up to 50 kg",
    lastClue: "The largest amphibian on Earth, a wrinkly, flat-headed creature of Chinese rivers with tiny eyes.",
    population: {
      value: 3000, low: 1000, high: 10000, display: "a few thousand",
      year: 2023, basis: "all wild individuals", confidence: "rough",
      note: "Wild numbers are unknown; the page cites under 50,000 and an 80% decline since the 1950s, and farms hold far more animals. This is an order-of-magnitude band.",
      source: { label: "Wikipedia: Chinese giant salamander (IUCN 2023 assessment cited)", url: "https://en.wikipedia.org/wiki/Chinese_giant_salamander" }
    },
    status: "Critically Endangered",
    region: "Asia",
    regionsText: "Mountain streams and caves of central and southern China, mostly in the Yangtze, Yellow and Pearl river basins",
    fact: "It breathes largely through its folded skin, which is why it needs cold, oxygen-rich water, and it can live for several decades.",
    ranges: [
      [[34.3, 107.0], [33.5, 110.5], [31.0, 112.0], [29.0, 113.5], [27.0, 114.0], [25.0, 113.0], [23.5, 111.0], [24.5, 108.0], [26.5, 105.5], [28.5, 104.5], [30.5, 103.5], [32.5, 104.5]]
    ]
  }
];
