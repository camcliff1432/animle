// Every animal a player can guess, with where it sits in the tree of life.
// Round 1 uses this to tell the player how closely a wrong guess is related
// to the answer, and to award partial credit.
//
// Format:  @Class   #Order   Family: Name/Genus, Name/Genus, ...
// A name with no "/Genus" is a general name covering several genera.
// A family of "-" (or an order of "#-") means "not specific enough to say".
const SOURCE = `
@Mammalia
#Carnivora
Felidae: Lion/Panthera, Leopard/Panthera, Cougar/Puma, Puma/Puma, Mountain Lion/Puma, Clouded Leopard/Neofelis, Ocelot/Leopardus, Serval/Leptailurus, Caracal/Caracal, Bobcat/Lynx, Eurasian Lynx/Lynx, Canada Lynx/Lynx, Pallas's Cat/Otocolobus, Sand Cat/Felis, Margay/Leopardus, Jaguarundi/Herpailurus, Fishing Cat/Prionailurus, Leopard Cat/Prionailurus, Black-footed Cat/Felis, African Wildcat/Felis, European Wildcat/Felis, Domestic Cat/Felis
Canidae: Gray Wolf/Canis, Red Wolf/Canis, Coyote/Canis, Dingo/Canis, Domestic Dog/Canis, Golden Jackal/Canis, Black-backed Jackal/Lupulella, Dhole/Cuon, Bush Dog/Speothos, Red Fox/Vulpes, Arctic Fox/Vulpes, Fennec Fox/Vulpes, Kit Fox/Vulpes, Swift Fox/Vulpes, Gray Fox/Urocyon, Bat-eared Fox/Otocyon, Raccoon Dog/Nyctereutes, Crab-eating Fox/Cerdocyon, Culpeo/Lycalopex, Short-eared Dog/Atelocynus, Fox, Jackal
Ursidae: Grizzly Bear/Ursus, Brown Bear/Ursus, American Black Bear/Ursus, Asian Black Bear/Ursus, Sloth Bear/Melursus, Bear
Hyaenidae: Spotted Hyena/Crocuta, Striped Hyena/Hyaena, Brown Hyena/Parahyaena, Aardwolf/Proteles, Hyena
Herpestidae: Banded Mongoose/Mungos, Mongoose
Eupleridae: Malagasy Civet/Fossa, Ring-tailed Vontsira/Galidia, Falanouc/Eupleres
Viverridae: African Civet/Civettictis, Common Genet/Genetta, Civet
Mustelidae: Wolverine/Gulo, Honey Badger/Mellivora, American Badger/Taxidea, River Otter/Lontra, Eurasian Otter/Lutra, Stoat/Mustela, Least Weasel/Mustela, Ferret/Mustela, American Mink/Neogale, Sable/Martes, Fisher/Pekania, Tayra/Eira, Otter, Weasel, Badger
Mephitidae: Striped Skunk/Mephitis, Skunk
Procyonidae: Raccoon/Procyon, Coati/Nasua, Kinkajou/Potos, Olingo/Bassaricyon, Ringtail/Bassariscus
Phocidae: Harbor Seal/Phoca, Leopard Seal/Hydrurga, Elephant Seal/Mirounga, Harp Seal/Pagophilus, Grey Seal/Halichoerus, Weddell Seal/Leptonychotes, Monk Seal, Seal
Otariidae: Sea Lion, Fur Seal, California Sea Lion/Zalophus, Steller Sea Lion/Eumetopias
#Artiodactyla
Giraffidae: Giraffe/Giraffa, Reticulated Giraffe/Giraffa, Masai Giraffe/Giraffa
Hippopotamidae: Pygmy Hippopotamus/Choeropsis
Cervidae: Moose/Alces, Caribou/Rangifer, Reindeer/Rangifer, Elk/Cervus, Red Deer/Cervus, Sika Deer/Cervus, White-tailed Deer/Odocoileus, Mule Deer/Odocoileus, Roe Deer/Capreolus, Fallow Deer/Dama, Muntjac/Muntiacus, Chital/Axis, Sambar/Rusa, Pudu/Pudu, Marsh Deer/Blastocerus, Père David's Deer/Elaphurus, Water Deer/Hydropotes, Deer
Moschidae: Musk Deer/Moschus
Tragulidae: Chevrotain
Bovidae: African Buffalo/Syncerus, Water Buffalo/Bubalus, Anoa/Bubalus, Gaur/Bos, Yak/Bos, Banteng/Bos, Domestic Cattle/Bos, Wildebeest/Connochaetes, Hartebeest/Alcelaphus, Topi/Damaliscus, Impala/Aepyceros, Thomson's Gazelle/Eudorcas, Dorcas Gazelle/Gazella, Goitered Gazelle/Gazella, Mongolian Gazelle/Procapra, Tibetan Antelope/Pantholops, Springbok/Antidorcas, Gerenuk/Litocranius, Dik-dik/Madoqua, Klipspringer/Oreotragus, Oribi/Ourebia, Duiker, Waterbuck/Kobus, Lechwe/Kobus, Greater Kudu/Tragelaphus, Bongo/Tragelaphus, Nyala/Tragelaphus, Sitatunga/Tragelaphus, Bushbuck/Tragelaphus, Eland/Taurotragus, Gemsbok/Oryx, Arabian Oryx/Oryx, Scimitar Oryx/Oryx, Addax/Addax, Sable Antelope/Hippotragus, Roan Antelope/Hippotragus, Blackbuck/Antilope, Nilgai/Boselaphus, Saola/Pseudoryx, Serow/Capricornis, Goral/Naemorhedus, Markhor/Capra, Domestic Goat/Capra, Himalayan Tahr/Hemitragus, Blue Sheep/Pseudois, Bighorn Sheep/Ovis, Dall Sheep/Ovis, Argali/Ovis, Mouflon/Ovis, Domestic Sheep/Ovis, Takin/Budorcas, Gazelle, Bison, Buffalo
Camelidae: Bactrian Camel/Camelus, Dromedary Camel/Camelus, Llama/Lama, Guanaco/Lama, Alpaca/Vicugna, Camel
Suidae: Warthog/Phacochoerus, Wild Boar/Sus, Domestic Pig/Sus, Babirusa/Babyrousa, Red River Hog/Potamochoerus, Giant Forest Hog/Hylochoerus
Tayassuidae: Peccary, Collared Peccary/Dicotyles
#Cetacea
Balaenopteridae: Fin Whale/Balaenoptera, Sei Whale/Balaenoptera, Minke Whale/Balaenoptera, Bryde's Whale/Balaenoptera, Humpback Whale/Megaptera
Physeteridae: Sperm Whale/Physeter
Kogiidae: Pygmy Sperm Whale/Kogia
Eschrichtiidae: Gray Whale/Eschrichtius
Balaenidae: Bowhead Whale/Balaena, Right Whale/Eubalaena
Ziphiidae: Beaked Whale, Cuvier's Beaked Whale/Ziphius
Delphinidae: False Killer Whale/Pseudorca, Pilot Whale/Globicephala, Bottlenose Dolphin/Tursiops, Spinner Dolphin/Stenella, Common Dolphin/Delphinus, Risso's Dolphin/Grampus, Irrawaddy Dolphin/Orcaella, Commerson's Dolphin/Cephalorhynchus, Hector's Dolphin/Cephalorhynchus, Dolphin
Platanistidae: Ganges River Dolphin/Platanista
Lipotidae: Baiji/Lipotes
Phocoenidae: Harbor Porpoise/Phocoena, Finless Porpoise/Neophocaena, Dall's Porpoise/Phocoenoides
#Perissodactyla
Rhinocerotidae: White Rhinoceros/Ceratotherium, Javan Rhinoceros/Rhinoceros, Sumatran Rhinoceros/Dicerorhinus, Rhinoceros
Tapiridae: Mountain Tapir/Tapirus, Tapir/Tapirus
Equidae: Plains Zebra/Equus, Mountain Zebra/Equus, African Wild Ass/Equus, Onager/Equus, Kiang/Equus, Domestic Horse/Equus, Donkey/Equus, Zebra/Equus
#Proboscidea
Elephantidae: African Forest Elephant/Loxodonta, Elephant
#Sirenia
Trichechidae: Amazonian Manatee/Trichechus, African Manatee/Trichechus
Dugongidae: Steller's Sea Cow/Hydrodamalis
#Hyracoidea
Procaviidae: Rock Hyrax/Procavia, Tree Hyrax/Dendrohyrax
#Tubulidentata
#Primates
Hominidae: Western Lowland Gorilla/Gorilla, Gorilla/Gorilla, Chimpanzee/Pan, Orangutan/Pongo, Sumatran Orangutan/Pongo
Hylobatidae: Gibbon, Siamang/Symphalangus, Lar Gibbon/Hylobates
Cercopithecidae: Drill/Mandrillus, Olive Baboon/Papio, Hamadryas Baboon/Papio, Gelada/Theropithecus, Rhesus Macaque/Macaca, Barbary Macaque/Macaca, Golden Snub-nosed Monkey/Rhinopithecus, Colobus Monkey/Colobus, Vervet Monkey/Chlorocebus, Gray Langur/Semnopithecus, Douc Langur/Pygathrix, Patas Monkey/Erythrocebus, De Brazza's Monkey/Cercopithecus, Baboon/Papio, Macaque/Macaca
Atelidae: Howler Monkey/Alouatta, Spider Monkey/Ateles, Woolly Monkey/Lagothrix, Muriqui/Brachyteles
Cebidae: Capuchin Monkey, Squirrel Monkey/Saimiri
Aotidae: Night Monkey/Aotus
Callitrichidae: Emperor Tamarin/Saguinus, Cotton-top Tamarin/Saguinus, Pygmy Marmoset/Cebuella, Common Marmoset/Callithrix
Pitheciidae: Uakari/Cacajao, Saki Monkey/Pithecia, Titi Monkey
Lemuridae: Ruffed Lemur/Varecia, Bamboo Lemur/Hapalemur, Brown Lemur/Eulemur
Indriidae: Indri/Indri, Sifaka/Propithecus
Cheirogaleidae: Mouse Lemur/Microcebus, Dwarf Lemur/Cheirogaleus
Lepilemuridae: Sportive Lemur/Lepilemur
Lorisidae: Slow Loris/Nycticebus, Slender Loris/Loris, Potto/Perodicticus
Tarsiidae: Tarsier
Galagidae: Bushbaby
-: Monkey, Ape
#Diprotodontia
Macropodidae: Eastern Grey Kangaroo/Macropus, Western Grey Kangaroo/Macropus, Tree Kangaroo/Dendrolagus, Rock Wallaby/Petrogale, Swamp Wallaby/Wallabia, Red-necked Wallaby/Notamacropus, Pademelon/Thylogale, Wallaby, Kangaroo
Potoroidae: Potoroo/Potorous, Bettong/Bettongia
Vombatidae: Northern Hairy-nosed Wombat/Lasiorhinus, Wombat
Pseudocheiridae: Greater Glider/Petauroides, Ringtail Possum/Pseudocheirus
Phalangeridae: Brushtail Possum/Trichosurus, Cuscus
#Dasyuromorphia
Dasyuridae: Eastern Quoll/Dasyurus, Spotted-tailed Quoll/Dasyurus, Quoll/Dasyurus, Antechinus/Antechinus, Dunnart/Sminthopsis
Thylacinidae: Thylacine/Thylacinus
#Peramelemorphia
Thylacomyidae: Bilby/Macrotis
Peramelidae: Bandicoot
#Didelphimorphia
Didelphidae: Virginia Opossum/Didelphis, Opossum
#Monotremata
Tachyglossidae: Echidna, Long-beaked Echidna/Zaglossus
#Rodentia
Erethizontidae: North American Porcupine/Erethizon
Hystricidae: Crested Porcupine/Hystrix
Chinchillidae: Chinchilla/Chinchilla, Viscacha/Lagostomus
Dasyproctidae: Agouti/Dasyprocta
Cuniculidae: Paca/Cuniculus
Dinomyidae: Pacarana/Dinomys
Caviidae: Mara/Dolichotis, Guinea Pig/Cavia, Rock Cavy/Kerodon, Lesser Capybara/Hydrochoerus
Octodontidae: Degu/Octodon
Echimyidae: Nutria/Myocastor
Capromyidae: Hutia
Pedetidae: Springhare/Pedetes
Cricetidae: Muskrat/Ondatra, Lemming, Hamster, Vole
Muridae: House Mouse/Mus, Brown Rat/Rattus, Gerbil
Heteromyidae: Kangaroo Rat/Dipodomys
Geomyidae: Pocket Gopher
Gliridae: Dormouse
Sciuridae: Prairie Dog/Cynomys, Marmot/Marmota, Groundhog/Marmota, Gray Squirrel/Sciurus, Giant Squirrel/Ratufa, Chipmunk/Tamias, Flying Squirrel, Squirrel
Heterocephalidae: Naked Mole-rat/Heterocephalus
Dipodidae: Jerboa
-: Porcupine, Mouse, Rat
#Lagomorpha
Leporidae: European Rabbit/Oryctolagus, Snowshoe Hare/Lepus, Arctic Hare/Lepus, European Hare/Lepus, Jackrabbit/Lepus, Cottontail Rabbit/Sylvilagus, Rabbit, Hare
Ochotonidae: Pika/Ochotona
#Eulipotyphla
Erinaceidae: Hedgehog
Talpidae: Mole
Solenodontidae: Solenodon/Solenodon
Soricidae: Shrew
#Afrosoricida
Tenrecidae: Tenrec
#Macroscelidea
Macroscelididae: Elephant Shrew
#Pilosa
Myrmecophagidae: Tamandua/Tamandua
Cyclopedidae: Silky Anteater/Cyclopes
Bradypodidae: Three-toed Sloth/Bradypus
Choloepodidae: Two-toed Sloth/Choloepus
-: Sloth, Anteater
#Cingulata
Dasypodidae: Nine-banded Armadillo/Dasypus
Chlamyphoridae: Pink Fairy Armadillo/Chlamyphorus, Three-banded Armadillo/Tolypeutes
-: Armadillo
#Chiroptera
Pteropodidae: Fruit Bat, Flying Fox/Pteropus
Phyllostomidae: Vampire Bat/Desmodus
-: Bat
#Dermoptera
Cynocephalidae: Colugo
#Pholidota
Manidae: Chinese Pangolin/Manis, Indian Pangolin/Manis, Philippine Pangolin/Manis, Giant Pangolin/Smutsia, Ground Pangolin/Smutsia, Tree Pangolin/Phataginus

@Aves
#Accipitriformes
Accipitridae: Steller's Sea Eagle/Haliaeetus, White-tailed Eagle/Haliaeetus, African Fish Eagle/Icthyophaga, Golden Eagle/Aquila, Wedge-tailed Eagle/Aquila, Philippine Eagle/Pithecophaga, Crested Eagle/Morphnus, Crowned Eagle/Stephanoaetus, Martial Eagle/Polemaetus, Bateleur/Terathopius, Red Kite/Milvus, Red-tailed Hawk/Buteo, Harris's Hawk/Parabuteo, Northern Goshawk/Astur, Griffon Vulture/Gyps, Lammergeier/Gypaetus, Egyptian Vulture/Neophron, Hawk
Pandionidae: Osprey/Pandion
#Falconiformes
Falconidae: Peregrine Falcon/Falco, Gyrfalcon/Falco, Kestrel/Falco, Crested Caracara/Caracara, Falcon/Falco
#Cathartiformes
Cathartidae: King Vulture/Sarcoramphus, Turkey Vulture/Cathartes, Condor
#Strigiformes
Strigidae: Snowy Owl/Bubo, Great Horned Owl/Bubo, Eagle Owl/Bubo, Burrowing Owl/Athene, Great Grey Owl/Strix, Tawny Owl/Strix
Tytonidae: Barn Owl/Tyto
-: Owl
#Sphenisciformes
Spheniscidae: King Penguin/Aptenodytes, Adélie Penguin/Pygoscelis, Gentoo Penguin/Pygoscelis, Chinstrap Penguin/Pygoscelis, Galápagos Penguin/Spheniscus, Little Penguin/Eudyptula, Rockhopper Penguin/Eudyptes, Macaroni Penguin/Eudyptes, Penguin
#Struthioniformes
Struthionidae: Ostrich/Struthio
#Casuariiformes
Casuariidae: Cassowary/Casuarius
#Rheiformes
Rheidae: Rhea/Rhea
#Apterygiformes
Apterygidae: Kiwi/Apteryx
#Procellariiformes
Diomedeidae: Albatross
#Charadriiformes
Alcidae: Puffin/Fratercula
Laridae: Gull, Arctic Tern/Sterna
#Suliformes
Sulidae: Blue-footed Booby/Sula, Gannet/Morus
Fregatidae: Frigatebird/Fregata
Phalacrocoracidae: Cormorant
#Pelecaniformes
Pelecanidae: Pelican/Pelecanus, Brown Pelican/Pelecanus, Dalmatian Pelican/Pelecanus
Ardeidae: Great Blue Heron/Ardea, Grey Heron/Ardea, Great Egret/Ardea, Bittern/Botaurus, Boat-billed Heron/Cochlearius, Heron
Threskiornithidae: Scarlet Ibis/Eudocimus, Sacred Ibis/Threskiornis, Roseate Spoonbill/Platalea
Scopidae: Hamerkop/Scopus
#Phoenicopteriformes
Phoenicopteridae: Flamingo
#Ciconiiformes
Ciconiidae: Marabou Stork/Leptoptilos, Saddle-billed Stork/Ephippiorhynchus, Jabiru/Jabiru
#Gruiformes
Gruidae: Sandhill Crane/Antigone, Crane
Rallidae: Takahē/Porphyrio
#Opisthocomiformes
#Anseriformes
Anatidae: Mute Swan/Cygnus, Black Swan/Cygnus, Mandarin Duck/Aix, Mallard/Anas, Canada Goose/Branta, Swan/Cygnus, Duck, Goose
#Psittaciformes
Strigopidae: Kākā/Nestor
Psittacidae: Scarlet Macaw/Ara, Blue-and-yellow Macaw/Ara, Spix's Macaw/Cyanopsitta, African Grey Parrot/Psittacus, Amazon Parrot/Amazona, Monk Parakeet/Myiopsitta, Macaw
Cacatuidae: Cockatoo, Sulphur-crested Cockatoo/Cacatua, Galah/Eolophus, Cockatiel/Nymphicus
Psittaculidae: Budgerigar/Melopsittacus, Rainbow Lorikeet/Trichoglossus, Eclectus Parrot/Eclectus, Night Parrot/Pezoporus, Lovebird/Agapornis
#Piciformes
Ramphastidae: Toucan
Picidae: Woodpecker
#Bucerotiformes
Bucerotidae: Great Hornbill/Buceros, Hornbill
Bucorvidae: Southern Ground Hornbill/Bucorvus
Upupidae: Hoopoe/Upupa
#Trogoniformes
#Coraciiformes
Alcedinidae: Kingfisher, Kookaburra/Dacelo
Meropidae: Bee-eater
#Apodiformes
Trochilidae: Hummingbird
#Passeriformes
Cotingidae: Guianan Cock-of-the-rock/Rupicola, Three-wattled Bellbird/Procnias, Umbrellabird/Cephalopterus
Paradisaeidae: Bird-of-paradise
Ptilonorhynchidae: Bowerbird
Corvidae: Raven/Corvus, Crow/Corvus, Magpie/Pica, Blue Jay/Cyanocitta
Turdidae: American Robin/Turdus
Passeridae: House Sparrow/Passer
#Galliformes
Phasianidae: Wild Turkey/Meleagris, Greater Sage-Grouse/Centrocercus, Red Junglefowl/Gallus, Pheasant
#Cuculiformes
Cuculidae: Cuckoo
#Eurypygiformes
Rhynochetidae: Kagu/Rhynochetos
#Otidiformes
Otididae: Great Bustard/Otis, Kori Bustard/Ardeotis
#Steatornithiformes
Steatornithidae: Oilbird/Steatornis
#Nyctibiiformes
Nyctibiidae: Potoo/Nyctibius
#Columbiformes
Columbidae: Dodo/Raphus, Pigeon

@Reptilia
#Crocodilia
Crocodylidae: Saltwater Crocodile/Crocodylus, American Crocodile/Crocodylus, Mugger Crocodile/Crocodylus, Cuban Crocodile/Crocodylus, Orinoco Crocodile/Crocodylus, Dwarf Crocodile/Osteolaemus
Alligatoridae: Chinese Alligator/Alligator, Black Caiman/Melanosuchus, Spectacled Caiman/Caiman, Alligator/Alligator
Gavialidae: False Gharial/Tomistoma
#Testudines
Cheloniidae: Green Sea Turtle/Chelonia, Hawksbill Sea Turtle/Eretmochelys, Loggerhead Sea Turtle/Caretta
Testudinidae: Aldabra Giant Tortoise/Aldabrachelys, Desert Tortoise/Gopherus, Tortoise
Chelydridae: Alligator Snapping Turtle/Macrochelys
Emydidae: Box Turtle/Terrapene
-: Turtle, Sea Turtle
#Rhynchocephalia
#Squamata
Iguanidae: Green Iguana/Iguana, Galápagos Land Iguana/Conolophus, Rhinoceros Iguana/Cyclura, Fiji Banded Iguana/Brachylophus, Chuckwalla/Sauromalus, Desert Iguana/Dipsosaurus
Agamidae: Frilled Lizard/Chlamydosaurus, Bearded Dragon/Pogona
Varanidae: Nile Monitor/Varanus, Water Monitor/Varanus, Perentie/Varanus, Lace Monitor/Varanus, Crocodile Monitor/Varanus, Savannah Monitor/Varanus
Chamaeleonidae: Chameleon, Panther Chameleon/Furcifer
Gekkonidae: Tokay Gecko/Gekko, Leaf-tailed Gecko/Uroplatus, Gecko
Scincidae: Blue-tongued Skink/Tiliqua
Dactyloidae: Green Anole/Anolis
Corytophanidae: Basilisk Lizard/Basiliscus
Phrynosomatidae: Horned Lizard/Phrynosoma
Elapidae: Black Mamba/Dendroaspis, Inland Taipan/Oxyuranus, Sea Snake, Cobra
Boidae: Boa Constrictor/Boa
Pythonidae: Reticulated Python/Malayopython, Burmese Python/Python, Python
Viperidae: Rattlesnake/Crotalus, Gaboon Viper/Bitis, Viper
-: Snake, Lizard

@Amphibia
#Anura
Dendrobatidae: Poison Dart Frog
Hylidae: Red-eyed Tree Frog/Agalychnis, Spring Peeper/Pseudacris, Tree Frog
Conrauidae: Goliath Frog/Conraua
Centrolenidae: Glass Frog
Bufonidae: Cane Toad/Rhinella, Common Toad/Bufo
Pipidae: Surinam Toad/Pipa, African Clawed Frog/Xenopus
Microhylidae: Tomato Frog/Dyscophus
Ranidae: American Bullfrog/Lithobates, Common Frog/Rana
Alytidae: Midwife Toad/Alytes
Mantellidae: Golden Mantella/Mantella
-: Frog, Toad
#Urodela
Salamandridae: Great Crested Newt/Triturus, Alpine Newt/Ichthyosaura, Eastern Newt/Notophthalmus, Newt
Cryptobranchidae: Japanese Giant Salamander/Andrias, Hellbender/Cryptobranchus
Proteidae: Mudpuppy/Necturus
Ambystomatidae: Tiger Salamander/Ambystoma, Spotted Salamander/Ambystoma
Sirenidae: Siren/Siren
Amphiumidae: Amphiuma/Amphiuma
#Gymnophiona
Caeciliidae: Caecilian

@Chondrichthyes
#Lamniformes
Lamnidae: Mako Shark/Isurus
Cetorhinidae: Basking Shark/Cetorhinus
#Orectolobiformes
#Carcharhiniformes
Sphyrnidae: Hammerhead Shark/Sphyrna
Galeocerdonidae: Tiger Shark/Galeocerdo
Carcharhinidae: Bull Shark/Carcharhinus
#Squaliformes
Somniosidae: Greenland Shark/Somniosus
#Myliobatiformes
Mobulidae: Manta Ray/Mobula
Dasyatidae: Stingray
#Rhinopristiformes
Pristidae: Sawfish
#-
-: Shark

@Sarcopterygii
#Coelacanthiformes
Latimeriidae: Coelacanth/Latimeria
#Dipnoi
Lepidosirenidae: Lungfish

@Actinopterygii
#Acipenseriformes
Acipenseridae: Sturgeon
#Osteoglossiformes
Arapaimidae: Arapaima/Arapaima
#Gymnotiformes
Gymnotidae: Electric Eel/Electrophorus
#Characiformes
Serrasalmidae: Piranha
#Syngnathiformes
Syngnathidae: Seahorse/Hippocampus
#Tetraodontiformes
Molidae: Ocean Sunfish/Mola
Tetraodontidae: Pufferfish
#Blenniiformes
Pomacentridae: Clownfish/Amphiprion
#Lophiiformes
Lophiidae: Anglerfish
#Salmoniformes
Salmonidae: Atlantic Salmon/Salmo
#Scombriformes
Scombridae: Bluefin Tuna/Thunnus
#Istiophoriformes
Xiphiidae: Swordfish/Xiphias
#Anguilliformes
Muraenidae: Moray Eel

@Cephalopoda
#Octopoda
Octopodidae: Blue-ringed Octopus/Hapalochlaena, Octopus
#Oegopsida
Architeuthidae: Giant Squid/Architeuthis
#Sepiida
Sepiidae: Cuttlefish
#Nautilida
Nautilidae: Nautilus/Nautilus
#-
-: Squid

@Merostomata
#Xiphosura
Limulidae: Horseshoe Crab

@Malacostraca
#Decapoda
Coenobitidae: Coconut Crab/Birgus
Inachidae: Japanese Spider Crab/Macrocheira
Nephropidae: Lobster
-: Crab
#Stomatopoda
Odontodactylidae: Mantis Shrimp

@Insecta
#Lepidoptera
Saturniidae: Atlas Moth/Attacus
-: Butterfly
#Mantodea
Mantidae: Praying Mantis
#Coleoptera
Scarabaeidae: Goliath Beetle/Goliathus
#Hymenoptera
Apidae: Honey Bee/Apis
Formicidae: Ant

@Arachnida
#Araneae
Theraphosidae: Tarantula
-: Spider
#Scorpiones
Scorpionidae: Emperor Scorpion/Pandinus
-: Scorpion
`;

function parse(source) {
  const out = [];
  let cls = "", order = "";
  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("@")) { cls = line.slice(1); order = ""; continue; }
    if (line.startsWith("#")) { order = line.slice(1) === "-" ? "" : line.slice(1); continue; }
    const colon = line.indexOf(":");
    const family = line.slice(0, colon).trim();
    for (const entry of line.slice(colon + 1).split(",")) {
      const [name, genus = ""] = entry.trim().split("/");
      if (name) out.push({ name, taxon: { cls, order, family: family === "-" ? "" : family, genus } });
    }
  }
  return out;
}

/** [{ name, taxon: { cls, order, family, genus } }] */
export const GUESSABLE = parse(SOURCE);
