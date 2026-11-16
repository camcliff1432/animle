// The species database.
//
// population.confidence:
//   "counted"   - from a census or direct count
//   "estimated" - a published estimate, usually a range
//   "rough"     - no reliable count exists; shown to the player as a rough figure
// population.value is the single number the round is scored against.
//
// ranges are hand-drawn approximations of the native range as [lat, lng] rings.
// They follow the real shape of each range but are not survey-grade data.

import { EXTRA, POPULATION_FIXES, REQUIRE_REVIEW, REVIEWED, REGION_OF, ZOO_REGIONS } from "./speciesExtra.js";

import batchAfrica from "./batches/africa.js";
import batchAsia from "./batches/asia.js";
import batchEurope from "./batches/europe.js";
import batchNorthAmerica from "./batches/north-america.js";
import batchSouthAmerica from "./batches/south-america.js";
import batchOceania from "./batches/oceania.js";
import batchOceans from "./batches/oceans.js";

export { ZOO_REGIONS };

const wiki = (title) => `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
const iucn = (name) => `https://www.iucnredlist.org/search?query=${encodeURIComponent(name)}&searchType=species`;

const STATUS = {
  "Critically Endangered": "bg-red-100 text-red-900 border border-red-300",
  "Endangered": "bg-orange-100 text-orange-900 border border-orange-300",
  "Vulnerable": "bg-amber-100 text-amber-900 border border-amber-300",
  "Near Threatened": "bg-yellow-100 text-yellow-900 border border-yellow-300",
  "Least Concern": "bg-emerald-100 text-emerald-900 border border-emerald-300"
};

const RAW = [
  {
    id: "snow-leopard", name: "Snow Leopard", wikiTitle: "Snow_leopard", scientificName: "Panthera uncia",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    aliases: ["ounce", "irbis"], groups: [],
    diet: "Carnivore — Wild mountain sheep, ibex, marmots, and pikas",
    biome: "High-altitude alpine & subalpine rocky mountain slopes",
    population: { value: 5000, display: "about 4,000 – 6,500", year: 2017, basis: "all individuals", confidence: "estimated",
      note: "The Red List puts it at fewer than 10,000 adults.", source: { label: "Wikipedia: Snow leopard (IUCN 2017)", url: wiki("Snow_leopard") } },
    status: "Vulnerable",
    regionsText: "Central & South Asian mountain ranges (Himalayas, Tibetan Plateau, Altai, Tian Shan)",
    fact: "Known as the 'Ghost of the Mountains,' this big cat has a thick tail nearly as long as its body that it wraps around its face like a scarf against sub-zero winds.",
    ranges: [[[35, 69], [38.5, 70.5], [41, 71], [43, 76], [45, 80.5], [49, 86], [51.5, 89], [52.5, 97], [50.5, 100.5], [47, 97], [44.5, 101.5], [43, 104.5], [42, 101], [39.5, 98.5], [38, 102], [34, 103.5], [30, 102], [27.8, 98], [27.3, 92], [27.5, 88], [28.5, 84], [30, 80], [32.5, 76.5], [34, 73]]]
  },
  {
    id: "axolotl", name: "Axolotl", wikiTitle: "Axolotl", scientificName: "Ambystoma mexicanum",
    classPlain: "Amphibian", classFull: "Amphibia (Urodela)",
    aliases: ["mexican walking fish", "mexican axolotl"], groups: ["salamander"],
    diet: "Carnivore — Aquatic insects, small fish, worms, and crustaceans",
    biome: "High-altitude freshwater lake & canal systems",
    population: { value: 300, display: "50 – 1,000 adults", year: 2019, basis: "adults", confidence: "estimated",
      source: { label: "Wikipedia: Axolotl (IUCN 2019)", url: wiki("Axolotl") } },
    status: "Critically Endangered",
    regionsText: "The canals of Lake Xochimilco in southern Mexico City, Mexico",
    fact: "Unlike most amphibians, this salamander exhibits neoteny—retaining its feathery external gills and aquatic lifestyle into adulthood—and can regenerate entire limbs, spinal cord, and heart tissue.",
    ranges: [[[19.2, -99.16], [19.33, -99.16], [19.33, -98.98], [19.2, -98.98]]]
  },
  {
    id: "komodo-dragon", name: "Komodo Dragon", wikiTitle: "Komodo_dragon", scientificName: "Varanus komodoensis",
    classPlain: "Reptile", classFull: "Reptilia (Squamata)",
    aliases: ["komodo", "komodo monitor"], groups: ["monitor lizard", "monitor"],
    diet: "Carnivore — Deer, wild boar, water buffalo, and carrion",
    biome: "Tropical dry savanna & monsoon forest islands",
    population: { value: 3000, display: "about 3,000", year: 2015, basis: "all individuals", confidence: "counted",
      source: { label: "Wikipedia: Komodo dragon (2015 count)", url: wiki("Komodo_dragon") } },
    status: "Endangered",
    regionsText: "Lesser Sunda Islands of Indonesia (Komodo, Rinca, Flores, and Gili Motang)",
    fact: "The world's largest living lizard can grow up to 3 meters (10 ft) long and uses serrated teeth paired with venom glands that prevent blood clotting.",
    ranges: [[[-8.4, 119.35], [-8.3, 119.9], [-8.15, 120.6], [-8.2, 121.6], [-8.3, 122.9], [-8.75, 122.9], [-8.85, 121.5], [-8.85, 119.9], [-8.8, 119.35]]]
  },
  {
    id: "okapi", name: "Okapi", wikiTitle: "Okapi", scientificName: "Okapia johnstoni",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    aliases: ["forest giraffe", "zebra giraffe"], groups: [],
    diet: "Herbivore — Tree leaves, buds, shoots, ferns, and forest fruits",
    biome: "Dense tropical lowland rainforest",
    population: { value: 15000, display: "roughly 10,000 – 30,000", year: 2013, basis: "all individuals", confidence: "rough",
      note: "No reliable census exists; the forest is hard to survey.", source: { label: "IUCN Red List", url: iucn("Okapia johnstoni") } },
    status: "Endangered",
    regionsText: "Ituri Rainforest & northeastern Democratic Republic of the Congo",
    fact: "Despite its zebra-striped hindquarters, this elusive forest ungulate is the only living relative of the giraffe and remained unknown to Western science until 1901.",
    ranges: [[[3.8, 24.5], [4, 27.5], [3.2, 29.6], [1.5, 30], [-0.5, 29.3], [-1.8, 28.2], [-2.2, 26], [-1, 24], [0.8, 23], [2.5, 23.3]]]
  },
  {
    id: "red-panda", name: "Red Panda", wikiTitle: "Red_panda", scientificName: "Ailurus fulgens",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    aliases: ["lesser panda", "firefox", "red cat-bear", "himalayan red panda"], groups: [],
    diet: "Herbivore (specialized) — Primarily bamboo leaves and shoots, plus berries",
    biome: "Temperate montane forests with dense bamboo understory",
    population: { value: 10000, display: "about 10,000", year: 2015, basis: "all individuals", confidence: "estimated",
      source: { label: "Wikipedia: Red panda (IUCN 2015)", url: wiki("Red_panda") } },
    status: "Endangered",
    regionsText: "Eastern Himalayas & southwestern China (Nepal, Bhutan, Northeast India, Myanmar, Sichuan, Yunnan)",
    fact: "Named 'panda' nearly 50 years before the giant panda, this arboreal mammal has an enlarged wrist bone that acts like a false thumb for gripping bamboo stalks.",
    ranges: [[[29.8, 81.3], [28.6, 84], [27.9, 87], [27.9, 90], [28.3, 93.5], [29.2, 96], [29.5, 98.5], [31, 101.5], [33, 103.5], [32.5, 104.8], [29.5, 103.5], [27.5, 102.5], [25.8, 99.5], [25.5, 97.3], [27, 95.5], [26.9, 92], [26.7, 88.5], [27.1, 85.5], [28.3, 82.5], [29.1, 81]]]
  },
  {
    id: "kakapo", name: "Kākāpō", wikiTitle: "Kākāpō", scientificName: "Strigops habroptilus",
    classPlain: "Bird", classFull: "Aves (Psittaciformes)",
    aliases: ["kakapo", "owl parrot", "strigops habroptila"], groups: ["parrot"],
    diet: "Herbivore — Native podocarp tree fruit, seeds, leaves, and roots",
    biome: "Temperate coastal & moss-covered island forests",
    population: { value: 243, display: "243 birds", year: 2024, basis: "all individuals", confidence: "counted",
      note: "Every bird is known by name and tracked.", source: { label: "Wikipedia: Kākāpō (Sept 2024 count)", url: wiki("Kākāpō") } },
    status: "Critically Endangered",
    regionsText: "Predator-free sanctuary islands off New Zealand (Whenua Hou / Codfish Island, Anchor Island, Hauturu / Little Barrier)",
    fact: "The world's only flightless parrot is also the heaviest parrot species and one of the longest-living birds, capable of reaching 90 years of age.",
    ranges: [
      [[-46.85, 167.55], [-46.7, 167.55], [-46.7, 167.72], [-46.85, 167.72]],
      [[-46.1, 166.45], [-45.7, 166.45], [-45.7, 166.62], [-46.1, 166.62]],
      [[-36.25, 175.02], [-36.15, 175.02], [-36.15, 175.15], [-36.25, 175.15]]
    ]
  },
  {
    id: "saiga-antelope", name: "Saiga Antelope", wikiTitle: "Saiga_antelope", scientificName: "Saiga tatarica",
    classPlain: "Mammal", classFull: "Mammalia (Artiodactyla)",
    aliases: ["saiga", "saiga tatarica"], groups: ["antelope"],
    diet: "Herbivore — Steppe grasses, lichens, and salt-tolerant shrubs",
    biome: "Semi-arid grasslands & open dry steppes",
    population: { value: 1900000, display: "about 1.9 million", year: 2023, basis: "all individuals", confidence: "estimated",
      note: "Roughly 950,000 are adults. Numbers have kept rising since.", source: { label: "Wikipedia: Saiga antelope (IUCN 2023)", url: wiki("Saiga_antelope") } },
    status: "Near Threatened",
    regionsText: "Kazakhstan, Kalmykia (Russia), Uzbekistan, and western Mongolia",
    fact: "Its distinctive oversized, flexible proboscis filters out choking summer dust during migrations and warms freezing air before it reaches the lungs in winter.",
    ranges: [
      [[45.2, 44.8], [47.3, 44.8], [47.5, 47.3], [45.3, 47.5]],
      [[49, 46.8], [51, 50], [50.8, 56], [51.5, 64], [51, 70], [48.5, 73], [45.5, 70.5], [44.5, 65], [43.3, 60], [43, 55.5], [45.5, 53.5], [47.5, 51.5], [47.3, 48.5]],
      [[45.2, 91.5], [48.3, 91.2], [48.5, 94.5], [46, 95.8], [45, 94]]
    ]
  },
  {
    id: "shoebill", name: "Shoebill", wikiTitle: "Shoebill", scientificName: "Balaeniceps rex",
    classPlain: "Bird", classFull: "Aves (Pelecaniformes)",
    aliases: ["shoebill stork", "whalehead", "whale-headed stork", "shoe-billed stork"], groups: ["stork"],
    diet: "Carnivore — Lungfish, tilapia, catfish, frogs, and young reptiles",
    biome: "Vast freshwater papyrus swamps & floodplains",
    population: { value: 6500, display: "5,000 – 8,000", year: 2018, basis: "all individuals", confidence: "estimated",
      source: { label: "Wikipedia: Shoebill (IUCN 2018)", url: wiki("Shoebill") } },
    status: "Vulnerable",
    regionsText: "East-Central Africa (South Sudan's Sudd wetlands, Uganda, western Tanzania, Zambia's Bangweulu swamps)",
    fact: "Standing up to 1.5 meters tall, this prehistoric-looking wading bird can remain completely motionless for hours before lunging with its massive clog-shaped bill.",
    ranges: [
      [[6, 29.5], [9.3, 29.3], [9.8, 31.5], [7.5, 32.3], [5.5, 31.5]],
      [[3.5, 30.5], [3.2, 33], [0.5, 34], [-1.5, 32], [-4, 32], [-6, 31.5], [-6, 30], [-3, 29], [0.5, 29.5]],
      [[-10, 28.5], [-10.2, 30.8], [-12.3, 30.8], [-12.3, 28.8]]
    ]
  },
  {
    id: "narwhal", name: "Narwhal", wikiTitle: "Narwhal", scientificName: "Monodon monoceros",
    classPlain: "Mammal", classFull: "Mammalia (Cetacea)",
    aliases: ["narwhale", "unicorn of the sea", "sea unicorn"], groups: ["whale"],
    diet: "Carnivore — Deep-water halibut, cod, squid, and shrimp",
    biome: "Polar coastal waters, fjords, and pack-ice leads",
    population: { value: 170000, display: "about 170,000", year: 2017, basis: "all individuals", confidence: "estimated",
      note: "About 123,000 of them are adults.", source: { label: "Wikipedia: Narwhal (IUCN 2017)", url: wiki("Narwhal") } },
    status: "Least Concern",
    regionsText: "Arctic waters of Canada, Greenland, Norway (Svalbard), and Russia",
    fact: "The male's spiral 'tusk' is actually an elongated upper-left canine tooth up to 3 meters long packed with 10 million nerve endings that sense water salinity and temperature.",
    ranges: [
      [[62.5, -92], [66, -95], [72, -100], [76, -98], [80, -90], [82, -65], [80.5, -62], [78, -66], [75.5, -58], [72, -55.5], [68, -53.5], [64, -52.5], [61, -58], [61, -70], [63, -80]],
      [[66, -36], [70, -22], [75, -18], [80, -14], [83, -20], [84, 10], [83, 60], [80, 70], [78, 55], [77.5, 25], [75, 10], [72, -8], [68, -22], [65, -32]]
    ]
  },
  {
    id: "fossa", name: "Fossa", wikiTitle: "Fossa_(animal)", scientificName: "Cryptoprocta ferox",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    aliases: ["fosa", "foosa"], groups: [],
    diet: "Carnivore — Arboreal primates, tenrecs, birds, and reptiles",
    biome: "Tropical rainforests & dry deciduous woodlands",
    population: { value: 4700, display: "2,600 – 8,600", year: 2016, basis: "all individuals", confidence: "estimated",
      source: { label: "Wikipedia: Fossa (2016 estimate)", url: wiki("Fossa_(animal)") } },
    status: "Vulnerable",
    regionsText: "Endemic to the island of Madagascar",
    fact: "Although it looks like a cross between a cougar and a dog, this apex predator is actually most closely related to mongooses and possesses flexible ankles for climbing headfirst down trees.",
    ranges: [[[-12, 49.2], [-13.5, 50], [-15.5, 50.5], [-17.5, 49.6], [-20.5, 48.6], [-23.5, 47.7], [-25.3, 46.8], [-25.6, 45.2], [-25, 44], [-23, 43.4], [-21, 43.6], [-19, 44.3], [-17, 44], [-16, 45.3], [-15.2, 47], [-13.5, 48]]]
  },
  {
    id: "maned-wolf", name: "Maned Wolf", wikiTitle: "Maned_wolf", scientificName: "Chrysocyon brachyurus",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    aliases: ["aguara guazu", "lobo guara"], groups: ["wolf"],
    diet: "Omnivore — Wild lobeira fruit, rodents, birds, and insects",
    biome: "Tall tropical grasslands, savannas, and scrublands",
    population: { value: 17000, display: "about 17,000 adults", year: 2015, basis: "adults", confidence: "estimated",
      note: "More than 90% live in Brazil.", source: { label: "IUCN Red List (2015)", url: iucn("Chrysocyon brachyurus") } },
    status: "Near Threatened",
    regionsText: "Central & southeastern Brazil, Paraguay, northern Argentina, Bolivia, and southeastern Peru",
    fact: "The tallest of all wild canids looks like a red fox on stilts—an adaptation for seeing over tall savanna grasses—and relies on fruit for nearly half its diet.",
    ranges: [[[-5.5, -45], [-8, -41], [-12, -41.5], [-16, -42], [-20, -43.5], [-23, -46], [-25.5, -49.5], [-29, -51.5], [-31.5, -54], [-32, -58.5], [-30, -61], [-26, -61.5], [-22, -62.5], [-18, -63], [-14, -66], [-12.5, -69], [-11.5, -67], [-11, -61], [-9.5, -56], [-8, -50], [-5.5, -47]]]
  },
  {
    id: "quokka", name: "Quokka", wikiTitle: "Quokka", scientificName: "Setonix brachyurus",
    classPlain: "Mammal", classFull: "Mammalia (Diprotodontia)",
    aliases: ["short-tailed scrub wallaby"], groups: ["wallaby"],
    diet: "Herbivore — Native grasses, shrubs, leaves, and bark",
    biome: "Coastal scrublands, peppermint woodlands, and heath",
    population: { value: 15000, display: "about 13,000 – 17,000", year: 2007, basis: "all individuals", confidence: "estimated",
      note: "Most live on Rottnest Island; about 4,000 are on the mainland.", source: { label: "Wikipedia: Quokka (island and mainland estimates)", url: wiki("Quokka") } },
    status: "Vulnerable",
    regionsText: "Rottnest Island, Bald Island, and pockets of southwestern Western Australia",
    fact: "Dubbed the 'world's happiest animal' due to its facial structure, this cat-sized marsupial stores fat in its tail for survival during dry summers.",
    ranges: [
      [[-32.03, 115.44], [-31.98, 115.44], [-31.98, 115.56], [-32.03, 115.56]],
      [[-32, 116], [-32.2, 116.4], [-33.5, 116.5], [-34.3, 117], [-34.7, 118.2], [-35, 118.6], [-35.15, 117.8], [-35.1, 116.6], [-34.4, 115.6], [-33.6, 115.6], [-32.8, 115.85]]
    ]
  },
  {
    id: "aye-aye", name: "Aye-aye", wikiTitle: "Aye-aye", scientificName: "Daubentonia madagascariensis",
    classPlain: "Mammal", classFull: "Mammalia (Primates)",
    aliases: [], groups: ["lemur"],
    diet: "Omnivore — Wood-boring beetle larvae, fungi, nectar, and seeds",
    biome: "Coastal tropical rainforests & deciduous forests",
    population: { value: 3000, display: "perhaps 1,000 – 10,000", year: 2018, basis: "all individuals", confidence: "rough",
      note: "No census exists; the species is nocturnal, solitary and thinly spread.", source: { label: "IUCN Red List", url: iucn("Daubentonia madagascariensis") } },
    status: "Endangered",
    regionsText: "Eastern, northern and northwestern forests of Madagascar",
    fact: "The world's largest nocturnal primate taps on tree trunks up to 8 times per second with a skeletal middle finger, listening for hollow grub tunnels beneath the bark.",
    ranges: [
      [[-12.2, 49], [-13.5, 50.1], [-15.5, 50.5], [-17.5, 49.6], [-20.5, 48.6], [-23.5, 47.7], [-25, 47], [-24.8, 46.3], [-22, 46.8], [-19, 47.6], [-17, 48.3], [-15.5, 48.6], [-15.2, 47.2], [-16.2, 46], [-16, 45.2], [-14.5, 47.2], [-13.3, 48.2]],
      [[-19.5, 44.3], [-17.2, 44], [-17, 45], [-19.5, 45.2]]
    ]
  },
  {
    id: "vaquita", name: "Vaquita", wikiTitle: "Vaquita", scientificName: "Phocoena sinus",
    classPlain: "Mammal", classFull: "Mammalia (Cetacea)",
    aliases: ["vaquita porpoise", "gulf of california harbor porpoise", "cochito"], groups: ["porpoise"],
    diet: "Carnivore — Small bottom-dwelling fish, squid, and crustaceans",
    biome: "Shallow, murky coastal marine waters",
    population: { value: 10, display: "about 10 or fewer", year: 2022, basis: "all individuals", confidence: "estimated",
      source: { label: "Wikipedia: Vaquita (2022 estimate)", url: wiki("Vaquita") } },
    status: "Critically Endangered",
    regionsText: "Northernmost Gulf of California (Sea of Cortez), Mexico",
    fact: "The world's smallest and rarest marine mammal lives exclusively in a 4,000 sq km shallow coastal zone and is recognizable by the dark rings around its eyes and lips.",
    ranges: [[[30.7, -114.75], [31.2, -114.85], [31.55, -114.6], [31.35, -114.2], [30.85, -114.3]]]
  },
  {
    id: "platypus", name: "Platypus", wikiTitle: "Platypus", scientificName: "Ornithorhynchus anatinus",
    classPlain: "Mammal", classFull: "Mammalia (Monotremata)",
    aliases: ["duck-billed platypus", "duckbill", "duckbilled platypus"], groups: [],
    diet: "Carnivore — Freshwater shrimp, crayfish, insect larvae, and worms",
    biome: "Freshwater rivers, creeks, and lakes with earth banks",
    population: { value: 100000, display: "roughly 30,000 – 300,000", year: 2016, basis: "adults", confidence: "rough",
      note: "Hard to count: it is shy, nocturnal and lives in burrows.", source: { label: "IUCN Red List (2016)", url: iucn("Ornithorhynchus anatinus") } },
    status: "Near Threatened",
    regionsText: "Eastern Australia (Queensland, New South Wales, Victoria) and Tasmania",
    fact: "One of only five egg-laying mammals (monotremes), it hunts underwater with eyes and ears closed, using electroreceptors in its bill to detect muscle impulses of prey.",
    ranges: [
      [[-15.3, 145], [-17, 146.1], [-19.5, 147.5], [-21.5, 149.5], [-25, 153.2], [-28.5, 153.7], [-32.5, 152.7], [-35.5, 150.8], [-37.6, 150], [-39.1, 146.4], [-38.6, 143], [-38, 141.3], [-36.5, 141.5], [-36, 144.5], [-35, 147], [-32.5, 148.5], [-29.5, 150.5], [-26, 150.5], [-23, 147.5], [-20, 145.5], [-17, 144.5]],
      [[-40.6, 144.6], [-40.7, 148.4], [-42, 148.4], [-43.6, 147.2], [-43.5, 146], [-42.2, 145.2], [-41, 144.6]]
    ]
  },
  {
    id: "galapagos-marine-iguana", name: "Marine Iguana", wikiTitle: "Marine_iguana", scientificName: "Amblyrhynchus cristatus",
    classPlain: "Reptile", classFull: "Reptilia (Squamata)",
    aliases: ["galapagos marine iguana", "sea iguana", "saltwater iguana"], groups: ["iguana"],
    diet: "Herbivore — Red and green marine algae grazed underwater",
    biome: "Volcanic rocky coastlines & intertidal marine zones",
    population: { value: 250000, display: "200,000 – 300,000", year: 2020, basis: "all individuals", confidence: "estimated",
      note: "The figure carries considerable uncertainty.", source: { label: "Wikipedia: Marine iguana", url: wiki("Marine_iguana") } },
    status: "Vulnerable",
    regionsText: "Galápagos Islands archipelago, Ecuador",
    fact: "The only lizard on Earth that forages in the ocean can dive up to 30 meters deep and sneezes out excess salt crystals from specialized nasal glands.",
    ranges: [
      [[0.2, -91.75], [0.75, -90.8], [0.45, -89.85], [-0.6, -89.2], [-1.45, -89.55], [-1.45, -90.55], [-1.1, -91.55], [-0.45, -91.75]],
      [[1.3, -92.1], [1.75, -92.1], [1.75, -91.75], [1.3, -91.75]]
    ]
  },
  {
    id: "pangolin", name: "Sunda Pangolin", wikiTitle: "Sunda_pangolin", scientificName: "Manis javanica",
    classPlain: "Mammal", classFull: "Mammalia (Pholidota)",
    aliases: ["malayan pangolin", "javan pangolin"], groups: ["pangolin", "scaly anteater"],
    diet: "Insectivore — Exclusively ants and termites",
    biome: "Primary and secondary tropical forests & plantations",
    population: { value: 25000, display: "unknown — possibly tens of thousands", year: 2019, basis: "all individuals", confidence: "rough",
      note: "No population count exists. Heavy poaching means numbers are falling fast.", source: { label: "IUCN Red List (2019)", url: iucn("Manis javanica") } },
    status: "Critically Endangered",
    regionsText: "Southeast Asia (Myanmar, Thailand, Laos, Cambodia, Vietnam, Malaysia, and the islands of Sumatra, Java and Borneo)",
    fact: "Covered in overlapping keratin scales, this nocturnal mammal has no teeth and uses a sticky tongue that can be longer than its body to lap up tens of thousands of ants each night.",
    ranges: [
      [[22.5, 97], [22.5, 101.5], [21.5, 104.5], [19.5, 106], [16, 108.5], [12, 109.5], [9.5, 106.5], [8.5, 104.8], [11, 102.8], [13.3, 100.8], [9, 99.5], [5.5, 103.2], [1.3, 104.3], [1.3, 103.3], [3.5, 100.7], [7.5, 98.2], [11, 98.3], [15.5, 97.5], [17, 96], [19.5, 94.5]],
      [[5.6, 95.2], [3.5, 98.9], [0, 103.8], [-3, 106.2], [-6, 105.9], [-5.5, 104.2], [-2, 100.8], [1.5, 98.5], [4.5, 95.4]],
      [[-6, 105.3], [-6, 108.5], [-6.8, 111.5], [-7.6, 114.5], [-8.8, 114.5], [-8.2, 111], [-7.8, 108], [-6.9, 105.3]],
      [[7, 116.8], [5, 119.2], [1, 119], [-2.5, 116.5], [-4.1, 114.6], [-3, 110.3], [0.5, 109], [2, 109.6], [1.7, 111.2], [4.5, 114], [6, 116]]
    ]
  },
  {
    id: "capybara", name: "Capybara", wikiTitle: "Capybara", scientificName: "Hydrochoerus hydrochaeris",
    classPlain: "Mammal", classFull: "Mammalia (Rodentia)",
    aliases: ["greater capybara", "carpincho", "capivara", "water hog"], groups: [],
    diet: "Herbivore — Aquatic plants, grasses, reeds, and tree bark",
    biome: "Savanna wetlands, marshes, rivers, and flooded forests",
    population: { value: 1500000, display: "unknown — likely well over a million", year: 2016, basis: "all individuals", confidence: "rough",
      note: "Common and widespread, so nobody has counted them.", source: { label: "IUCN Red List (2016)", url: iucn("Hydrochoerus hydrochaeris") } },
    status: "Least Concern",
    regionsText: "South America east of the Andes (Brazil, Venezuela, Colombia, Argentina, Peru)",
    fact: "The largest living rodent on Earth can weigh up to 66 kg (146 lb), has webbed feet, and can hold its breath underwater for up to five minutes to evade predators.",
    ranges: [[[10.5, -72], [10.5, -64], [8.5, -60], [5.5, -52.5], [1.5, -50], [-1, -46], [-3, -41], [-8, -36], [-13, -38.5], [-18, -39.5], [-23, -42], [-25.5, -48.3], [-30, -50.5], [-34.5, -54], [-36.5, -57], [-38, -58.5], [-37, -61], [-33, -62], [-29, -63], [-24, -63.5], [-19, -64], [-15, -67], [-12, -70], [-8, -74.5], [-3, -77], [1, -76.5], [4, -73.5], [7, -72.5]]]
  },
  {
    id: "iberian-lynx", name: "Iberian Lynx", wikiTitle: "Iberian_lynx", scientificName: "Lynx pardinus",
    classPlain: "Mammal", classFull: "Mammalia (Carnivora)",
    aliases: ["spanish lynx", "pardel lynx"], groups: ["lynx"],
    diet: "Carnivore — Primarily European rabbits (80–90% of diet)",
    biome: "Mediterranean woodland and dense maquis scrubland",
    population: { value: 2021, display: "about 2,000", year: 2023, basis: "all individuals", confidence: "counted",
      note: "Up from just 94 in 2002.", source: { label: "Wikipedia: Iberian lynx (2023 census)", url: wiki("Iberian_lynx") } },
    status: "Vulnerable",
    regionsText: "Southern and central Spain and southern Portugal (Iberian Peninsula)",
    fact: "Once the world's most endangered feline with fewer than 100 individuals in 2002, intensive conservation breeding helped its wild population rebound past 2,000.",
    ranges: [[[36.9, -6.6], [37.3, -7.9], [38, -8], [38.9, -7.2], [39.6, -6], [39.8, -4.5], [39.3, -3.3], [38.5, -2.8], [37.9, -3], [37.6, -4.3], [37, -5.8]]]
  },
  {
    id: "harpy-eagle", name: "Harpy Eagle", wikiTitle: "Harpy_eagle", scientificName: "Harpia harpyja",
    classPlain: "Bird", classFull: "Aves (Accipitriformes)",
    aliases: ["american harpy eagle", "royal hawk"], groups: ["eagle"],
    diet: "Carnivore — Sloths, monkeys, opossums, and large tree-dwelling birds",
    biome: "Emergent canopy of lowland tropical rainforests",
    population: { value: 150000, display: "roughly 100,000 – 250,000 adults", year: 2021, basis: "adults", confidence: "rough",
      note: "Derived from forest area, not from a count.", source: { label: "IUCN Red List (2021)", url: iucn("Harpia harpyja") } },
    status: "Vulnerable",
    regionsText: "Southern Mexico through Central America and the Amazon Basin to northern Argentina",
    fact: "Equipped with rear talons as large as a grizzly bear's claws, this apex raptor can snatch 7 kg sloths directly out of high rainforest branches in mid-flight.",
    ranges: [
      [[17.5, -94], [18, -89], [15.8, -84.5], [11, -83.5], [9.5, -79], [9, -77], [11, -73], [10, -66], [9, -61], [6, -55], [4, -51.5], [0, -49.5], [-2.5, -44.5], [-6, -45], [-10, -48], [-14, -51], [-17, -55], [-20.5, -57.5], [-24, -56], [-27.3, -53.8], [-26, -58], [-21, -61], [-17, -63.5], [-14, -68], [-12.5, -71.5], [-8, -75], [-4, -78], [0.5, -78.8], [4, -77.5], [7.5, -77.8], [8.2, -81.5], [10.5, -85], [13.5, -86.5], [15.5, -91.5]],
      [[-13, -39], [-18, -39.5], [-21, -41], [-20, -43], [-15, -41]]
    ]
  },
  {
    id: "tasmanian-devil", name: "Tasmanian Devil", wikiTitle: "Tasmanian_devil", scientificName: "Sarcophilus harrisii",
    classPlain: "Mammal", classFull: "Mammalia (Dasyuromorphia)",
    aliases: ["tassie devil", "tasmanian devils"], groups: [],
    diet: "Carnivore — Wallabies, wombats, birds, fish, and carrion",
    biome: "Coastal scrublands and temperate eucalypt forests",
    population: { value: 15000, display: "10,000 – 25,000", year: 2008, basis: "all individuals", confidence: "estimated",
      note: "Down more than 80% since the 1990s because of a contagious facial cancer.", source: { label: "Wikipedia: Tasmanian devil (2008 estimates)", url: wiki("Tasmanian_devil") } },
    status: "Endangered",
    regionsText: "Island state of Tasmania, Australia",
    fact: "The world's largest surviving carnivorous marsupial possesses one of the strongest bite forces relative to body mass of any mammal, capable of crushing thick bones.",
    ranges: [[[-40.65, 144.65], [-40.75, 148.3], [-41.9, 148.35], [-43.1, 147.95], [-43.6, 146.9], [-43.4, 146], [-42.2, 145.2], [-41, 144.65]]]
  },
  {
    id: "secretarybird", name: "Secretarybird", wikiTitle: "Secretarybird", scientificName: "Sagittarius serpentarius",
    classPlain: "Bird", classFull: "Aves (Accipitriformes)",
    aliases: ["secretary bird"], groups: [],
    diet: "Carnivore — Venomous snakes, lizards, locusts, and small rodents",
    biome: "Open tropical grasslands and thorny savannas",
    population: { value: 21000, display: "6,700 – 67,000", year: 2016, basis: "all individuals", confidence: "estimated",
      note: "Widespread but thinly spread, so the range is wide.", source: { label: "Wikipedia: Secretarybird (2016 estimate)", url: wiki("Secretarybird") } },
    status: "Endangered",
    regionsText: "Sub-Saharan Africa (from Senegal to Somalia and south to South Africa), outside the rainforest",
    fact: "Unlike other birds of prey, this long-legged terrestrial hunter stalks across grasslands on foot and kills cobras and adders with rapid, 20-millisecond stomping kicks.",
    ranges: [[[16, -16.5], [16.5, -5], [15.5, 10], [15, 25], [16, 37], [12, 43], [11, 49.5], [5, 48], [-1, 41.5], [-7, 39], [-15, 40], [-25, 33], [-29, 32], [-34, 26], [-34.6, 20], [-32, 18], [-25, 15], [-17, 12], [-12, 13.8], [-9, 17], [-10, 23], [-7, 28], [-3, 29.5], [2, 30], [5, 27], [6.5, 20], [7, 13], [9, 9], [9, 2], [9.5, -6], [11, -12], [12.5, -16.5]]]
  },
  {
    id: "dugong", name: "Dugong", wikiTitle: "Dugong", scientificName: "Dugong dugon",
    classPlain: "Mammal", classFull: "Mammalia (Sirenia)",
    aliases: ["sea cow", "sea pig"], groups: ["manatee"],
    diet: "Herbivore — Strictly bottom-dwelling marine seagrasses",
    biome: "Warm, shallow coastal bays and mangrove channels",
    population: { value: 100000, display: "roughly 100,000", year: 2015, basis: "all individuals", confidence: "rough",
      note: "No global count exists. Most live in northern Australian waters.", source: { label: "Wikipedia: Dugong (regional estimates)", url: wiki("Dugong") } },
    status: "Vulnerable",
    regionsText: "Indo-West Pacific coastal waters (East Africa, Red Sea, Persian Gulf, India, Southeast Asia, northern Australia)",
    fact: "The only strictly marine herbivorous mammal is closely related to elephants and leaves distinctive feeding trails across underwater seagrass meadows.",
    ranges: [
      [[-25.5, 32.5], [-26, 36], [-18, 42], [-12, 45], [-5, 42], [1, 45.5], [2, 44], [-5, 38.5], [-11, 39.5], [-17, 37], [-21, 35]],
      [[13, 42.5], [20, 37], [27.5, 33.5], [28, 35], [22, 39], [15, 42.5], [12.7, 44]],
      [[24, 50.5], [27, 49.5], [29.5, 48.5], [29.5, 50.5], [26.5, 52], [25.5, 56], [24, 54.5]],
      [[22.2, 68.8], [23, 69], [22.8, 70.5], [22.2, 70.2]],
      [[9.5, 78.5], [10.5, 80], [8, 82], [5.8, 80.5], [7.5, 79.3]],
      [[6.5, 92], [13.7, 92], [13.7, 94], [6.5, 94.5]],
      [[10, 97.5], [13, 100], [10, 104.5], [16, 108.5], [21.5, 108], [19, 111.5], [19, 121], [26.8, 127.5], [26, 129], [13, 125.5], [5, 127], [-1, 131.5], [-8.5, 131], [-10.5, 123], [-9, 115], [-8.2, 105.5], [-6, 104.5], [-1, 99], [5, 96.5]],
      [[-26, 113], [-21, 114.5], [-19, 121], [-14, 126.5], [-11, 130.5], [-10.8, 136.5], [-9, 141], [-3, 133], [-1, 131.8], [-1.5, 138], [-3, 144], [-5, 147], [-3.5, 152.5], [-8, 158], [-10.5, 162], [-15.5, 167.5], [-20, 164.5], [-23, 167.8], [-23, 165.5], [-12, 153], [-11, 147.5], [-14.5, 145.5], [-19, 148.5], [-23, 152], [-27.6, 153.8], [-27.6, 152.9], [-23, 150.2], [-19.5, 146.5], [-17, 140.5], [-15.5, 135.8], [-12.6, 133], [-15, 129], [-17.5, 122.5], [-20.8, 117.5], [-22.5, 114], [-26, 114]],
      // Shark Bay to the Pilbara coast, Western Australia (added after the GBIF sighting check).
      [[-27, 112.5], [-21, 113], [-19.5, 117.5], [-21.5, 118], [-23, 115], [-27, 115]]
    ]
  },
  {
    id: "gharial", name: "Gharial", wikiTitle: "Gharial", scientificName: "Gavialis gangeticus",
    classPlain: "Reptile", classFull: "Reptilia (Crocodilia)",
    aliases: ["gavial", "fish-eating crocodile", "indian gharial"], groups: ["crocodile", "crocodilian"],
    diet: "Piscivore — Almost exclusively freshwater fish",
    biome: "Deep, fast-flowing clear rivers with sandy banks",
    population: { value: 800, display: "up to about 900", year: 2019, basis: "all individuals", confidence: "estimated",
      note: "Around 650 of them are adults.", source: { label: "Wikipedia: Gharial (IUCN 2019)", url: wiki("Gharial") } },
    status: "Critically Endangered",
    regionsText: "Northern Indian subcontinent river systems (Chambal, Girwa, Gandak, and Rapti rivers)",
    fact: "Named after the bulbous 'ghara' pot-shaped growth on the tip of mature males' snouts, its ultra-narrow jaw lined with about 110 interlocking teeth reduces water drag when snapping at fish.",
    ranges: [
      [[25.6, 76.3], [26, 76.2], [26.9, 78.6], [26.6, 79.3], [26.3, 79.2], [26.2, 77.5]],
      [[28.5, 80.9], [28.1, 81.6], [27.7, 84.1], [27.6, 84.7], [26.6, 84.7], [25.7, 85.3], [25.6, 84.9], [27.1, 83.6], [27.9, 81.2]],
      [[24.4, 81.2], [24.7, 81.3], [24.7, 82.2], [24.4, 82.2]],
      [[29.4, 78.6], [29.7, 78.7], [29.6, 79.1], [29.4, 79]],
      [[20.4, 84.6], [20.7, 84.6], [20.7, 85.1], [20.4, 85.1]]
    ]
  }
];

const CORE = RAW.map(a => {
  const extra = EXTRA[a.id];
  const [cls, order, family, genus] = extra.taxon;
  const population = { ...a.population, ...(POPULATION_FIXES[a.id] || {}), low: extra.band[0], high: extra.band[1] };
  return {
    ...a, population, statusColor: STATUS[a.status],
    taxon: { cls, order, family, genus }, size: extra.size, lastClue: extra.lastClue, region: REGION_OF[a.id],
    reviewed: REVIEWED[a.id] || null
  };
});

// Later species live in src/data/batches/, one file per zoo region, with every field in one place.
const BATCHES = [batchAfrica, batchAsia, batchEurope, batchNorthAmerica, batchSouthAmerica, batchOceania, batchOceans].flat().map(a => {
  const [cls, order, family, genus] = a.taxon;
  return { ...a, statusColor: STATUS[a.status], taxon: { cls, order, family, genus }, reviewed: REVIEWED[a.id] || null };
});

const ALL = [...CORE, ...BATCHES];

/** The species scheduled as dailies. */
export const WILDLIFE_DB = REQUIRE_REVIEW ? ALL.filter(a => a.reviewed) : ALL;
export const speciesById = (id) => ALL.find(a => a.id === id);
/** Every species, reviewed or not. For tools; the game uses WILDLIFE_DB. */
export const ALL_SPECIES = ALL;
