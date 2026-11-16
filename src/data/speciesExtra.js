// Extra facts per species, kept apart from the long records in species.js.
//   taxon     - class / order / family / genus, used to judge how close a wrong guess is
//   size      - round 1 clue unlocked by the third miss
//   lastClue  - round 1 clue unlocked by the fourth miss; narrows it down without naming it
//   band      - [low, high] published population range; any guess inside it scores full marks
// The zoo is laid out by these regions, in this order. Every species has exactly one:
// where most of its wild range lies. Sea animals go under Oceans.
export const ZOO_REGIONS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Oceans"];
export const REGION_OF = {
  "snow-leopard": "Asia", "axolotl": "North America", "komodo-dragon": "Asia", "okapi": "Africa",
  "red-panda": "Asia", "kakapo": "Oceania", "saiga-antelope": "Asia", "shoebill": "Africa",
  "narwhal": "Oceans", "fossa": "Africa", "maned-wolf": "South America", "quokka": "Oceania",
  "aye-aye": "Africa", "vaquita": "Oceans", "platypus": "Oceania", "galapagos-marine-iguana": "South America",
  "pangolin": "Asia", "capybara": "South America", "iberian-lynx": "Europe", "harpy-eagle": "South America",
  "tasmanian-devil": "Oceania", "secretarybird": "Africa", "dugong": "Oceans", "gharial": "Asia"
};

export const EXTRA = {
  "snow-leopard": { taxon: ["Mammalia", "Carnivora", "Felidae", "Panthera"], size: "About 1 m long plus a 1 m tail; 25 – 55 kg", lastClue: "A big cat that cannot roar, hunting above the treeline in Central Asia.", band: [4000, 6500] },
  "axolotl": { taxon: ["Amphibia", "Urodela", "Ambystomatidae", "Ambystoma"], size: "15 – 30 cm long; about 100 – 200 g", lastClue: "A salamander that never grows up, native to a single lake system in Mexico.", band: [50, 1000] },
  "komodo-dragon": { taxon: ["Reptilia", "Squamata", "Varanidae", "Varanus"], size: "2 – 3 m long; around 70 – 90 kg", lastClue: "The largest living lizard, found on a handful of Indonesian islands.", band: [2500, 3500] },
  "okapi": { taxon: ["Mammalia", "Artiodactyla", "Giraffidae", "Okapia"], size: "About 1.5 m at the shoulder; 200 – 350 kg", lastClue: "The giraffe's only living relative, with zebra-striped legs, hidden in the Congo rainforest.", band: [10000, 35000] },
  "red-panda": { taxon: ["Mammalia", "Carnivora", "Ailuridae", "Ailurus"], size: "50 – 65 cm long plus a bushy tail; 3 – 6 kg", lastClue: "A bamboo-eating tree dweller of the Himalayas that is not a bear and not a raccoon.", band: [8000, 12000] },
  "kakapo": { taxon: ["Aves", "Psittaciformes", "Strigopidae", "Strigops"], size: "About 60 cm long; 1.5 – 4 kg, the heaviest of its kind", lastClue: "A flightless, nocturnal parrot from New Zealand.", band: [230, 260] },
  "saiga-antelope": { taxon: ["Mammalia", "Artiodactyla", "Bovidae", "Saiga"], size: "60 – 80 cm at the shoulder; 25 – 70 kg", lastClue: "A steppe antelope with a swollen, drooping nose that filters dust.", band: [1500000, 2900000] },
  "shoebill": { taxon: ["Aves", "Pelecaniformes", "Balaenicipitidae", "Balaeniceps"], size: "1.1 – 1.4 m tall; wingspan up to 2.6 m", lastClue: "A tall grey swamp bird of East Africa with a huge clog-shaped bill.", band: [5000, 8000] },
  "narwhal": { taxon: ["Mammalia", "Cetacea", "Monodontidae", "Monodon"], size: "4 – 5.5 m long without the tusk; 800 – 1,600 kg", lastClue: "An Arctic whale whose males carry a single spiral tusk.", band: [123000, 170000] },
  "fossa": { taxon: ["Mammalia", "Carnivora", "Eupleridae", "Cryptoprocta"], size: "70 – 80 cm long plus an equally long tail; 5.5 – 8.6 kg", lastClue: "Madagascar's largest predator: cat-like, but closer to the mongooses.", band: [2600, 8600] },
  "maned-wolf": { taxon: ["Mammalia", "Carnivora", "Canidae", "Chrysocyon"], size: "About 90 cm at the shoulder; 20 – 30 kg", lastClue: "South America's tallest wild dog, like a red fox on stilts.", band: [17000, 23600] },
  "quokka": { taxon: ["Mammalia", "Diprotodontia", "Macropodidae", "Setonix"], size: "40 – 54 cm long; 2.5 – 5 kg", lastClue: "A cat-sized wallaby from Western Australia, famous for looking as if it smiles.", band: [7500, 17000] },
  "aye-aye": { taxon: ["Mammalia", "Primates", "Daubentoniidae", "Daubentonia"], size: "About 40 cm long plus a longer bushy tail; around 2.5 kg", lastClue: "A nocturnal lemur that taps on wood and hooks out grubs with one long thin finger.", band: [1000, 10000] },
  "vaquita": { taxon: ["Mammalia", "Cetacea", "Phocoenidae", "Phocoena"], size: "About 1.4 m long; up to 55 kg", lastClue: "The world's smallest and rarest porpoise, found only in Mexico's Gulf of California.", band: [6, 13] },
  "platypus": { taxon: ["Mammalia", "Monotremata", "Ornithorhynchidae", "Ornithorhynchus"], size: "40 – 60 cm long; 0.7 – 2.4 kg", lastClue: "An egg-laying Australian mammal with a duck-like bill.", band: [30000, 300000] },
  "galapagos-marine-iguana": { taxon: ["Reptilia", "Squamata", "Iguanidae", "Amblyrhynchus"], size: "0.6 – 1.4 m long including the tail; 1 – 12 kg", lastClue: "The only lizard that feeds in the sea, found on one Pacific archipelago.", band: [200000, 300000] },
  "pangolin": { taxon: ["Mammalia", "Pholidota", "Manidae", "Manis"], size: "40 – 65 cm long plus a long tail; 4 – 10 kg", lastClue: "A scaly anteater of Southeast Asia that rolls into a ball.", band: [10000, 100000] },
  "capybara": { taxon: ["Mammalia", "Rodentia", "Caviidae", "Hydrochoerus"], size: "1 – 1.3 m long; 35 – 66 kg", lastClue: "The world's largest rodent, rarely far from water in South America.", band: [1000000, 10000000] },
  "iberian-lynx": { taxon: ["Mammalia", "Carnivora", "Felidae", "Lynx"], size: "80 – 110 cm long; 9 – 13 kg", lastClue: "A spotted, tuft-eared cat of Spain and Portugal that lives almost entirely on rabbits.", band: [1900, 2400] },
  "harpy-eagle": { taxon: ["Aves", "Accipitriformes", "Accipitridae", "Harpia"], size: "About 1 m long; wingspan around 2 m; up to 9 kg", lastClue: "A crested rainforest eagle of the Americas with talons the size of bear claws.", band: [100000, 250000] },
  "tasmanian-devil": { taxon: ["Mammalia", "Dasyuromorphia", "Dasyuridae", "Sarcophilus"], size: "About 65 cm long; 6 – 12 kg", lastClue: "The largest living meat-eating marsupial, confined to one Australian island.", band: [10000, 25000] },
  "secretarybird": { taxon: ["Aves", "Accipitriformes", "Sagittariidae", "Sagittarius"], size: "About 1.3 m tall; wingspan around 2 m", lastClue: "A long-legged African bird of prey that stamps snakes to death on foot.", band: [6700, 67000] },
  "dugong": { taxon: ["Mammalia", "Sirenia", "Dugongidae", "Dugong"], size: "2.4 – 3 m long; 250 – 420 kg", lastClue: "A seagrass-grazing marine mammal with a whale-like fluked tail, cousin of the manatees.", band: [50000, 150000] },
  "gharial": { taxon: ["Reptilia", "Crocodilia", "Gavialidae", "Gavialis"], size: "3 – 6 m long; up to about 250 kg", lastClue: "A fish-eating crocodilian of Indian rivers with a very long, thin snout.", band: [650, 900] }
};

// Corrections from the November 2026 source check.
export const POPULATION_FIXES = {
  "okapi": { display: "roughly 10,000 – 35,000", note: "No reliable census exists. The Red List calls the usual figures a guesstimate.",
    source: { label: "Mongabay: counting okapi in the wild (2024)", url: "https://news.mongabay.com/2024/09/we-know-how-many-okapi-live-in-zoos-in-the-wild-its-complicated/" } },
  "aye-aye": { display: "somewhere between 1,000 and 10,000", note: "An order-of-magnitude figure from the IUCN; no census exists for this nocturnal, solitary animal.",
    source: { label: "EDGE of Existence: Aye-aye", url: "https://www.edgeofexistence.org/mammals/species_info.php?id=16" } },
  "platypus": { display: "30,000 – 300,000", confidence: "estimated", note: "Hard to count: it is shy, nocturnal and lives in burrows, so the published range is wide.",
    source: { label: "Australian Platypus Conservancy (IUCN 2016 figures)", url: "https://platypus.asn.au/population-size-and-density/" } },
  "harpy-eagle": { display: "100,000 – 250,000 adults", confidence: "estimated", note: "Worked out from forest area and nest spacing, not from a count.",
    source: { label: "BirdLife International: Harpy Eagle", url: "https://datazone.birdlife.org/species/factsheet/harpy-eagle-harpia-harpyja" } },
  "maned-wolf": { note: "About 23,600 including pups and juveniles. More than 90% live in Brazil.",
    source: { label: "IUCN Canid Specialist Group: Maned wolf", url: "https://www.canids.org/species/view/PREKGA855611" } },
  "pangolin": { display: "unknown — no count exists", note: "Nobody has a regional or global count. The Red List estimates an 80% decline over 21 years from poaching.",
    source: { label: "World Land Trust: Sunda pangolin", url: "https://www.worldlandtrust.org/species/sunda-pangolin/" } },
  "capybara": { display: "unknown — likely millions", note: "Locally common and widespread across South America, so nobody has made an overall count.",
    source: { label: "San Diego Zoo fact sheet: Capybara population", url: "https://ielc.libguides.com/sdzg/factsheets/capybaras/population" } },
  "quokka": { display: "about 7,500 – 17,000" }
};

/**
 * Set to true once species are being signed off by a second person: only
 * entries listed in REVIEWED are then scheduled as dailies. See README.
 */
export const REQUIRE_REVIEW = false;
/** id -> { by, date } for species a second person has checked (photo, clues, population, range). */
export const REVIEWED = {};
