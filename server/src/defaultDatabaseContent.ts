import bcrypt from "bcrypt";

import database from "./database";
import Booking from "./entities/Booking";
import Equipment from "./entities/Equipment";
import Housing from "./entities/Housing";
import Rating from "./entities/Rating";
import User from "./entities/User";
import { DeepPartial } from "typeorm";

export default async function insertDefaultDatbaseContent() {
  const entities_names = database.entityMetadatas.map(entity => '"' + entity.tableName + '"').join(", ");
  console.log("TRUNCATE " + entities_names + " CASCADE;");
  await database.query("TRUNCATE " + entities_names + " CASCADE;");

  const users = database.getRepository(User);
  const equipments = database.getRepository(Equipment);
  const housings = database.getRepository(Housing);
  const bookings = database.getRepository(Booking);
  const ratings = database.getRepository(Rating);


  const equipment_list = [
    "Equipements de sports d'hiver",
    "Jacuzzi",
    "Jardin",
    "Parc de jeux",
    "Spa",
    "Centre équestre",
    "Golf",
    "Piscine",
    "Tennis",
    "Bateau à moteur",
    "Bateau à voile",
    "Patinoire",
    "Equipements de plongée.",
    "Piste de Bobsleigh",
  ];

  for (const equipment of equipment_list) {
    await equipments.insert({ name: equipment });
  }

  const housing_list = [
    {
      name: "Nid de Chouette",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/050afba036faed30c9de4690682c265f.jpg"],
      area: "Gap",
      description: "Se lever à l’aurore, aller chercher le soleil qui se lève sur les sommets",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 8,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "La Galibe",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/1mns73s41dqvdwddf57tqre8tlz8k93tm1hkd3t18.jpg"],
      area: "Malestroit",
      description: "Terre de Chouans!",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 300,
      bedroom_count: 10,
      bathroom_count: 5,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jardin", "Parc de jeux", "Piscine", "Spa", "Tennis"],
      category: "Campagne",
      type: "Maison"
    },
    {
      name: "Les Roches",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/0wh455.jpg"],
      area: "Les Sables d’Olonne",
      description: "Bercée par les flots, cette villa vous promet des moments enchanteurs.",
      low_price: 4000,
      medium_price: 6000,
      high_price: 9000,
      surface: 400,
      bedroom_count: 6,
      bathroom_count: 2,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Centre équestre", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Spa"],
      category: "Bord de mer",
      type: "Villa"
    },
    {
      name: "Maison des Rives",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/06l0bb21pxgl07i0zhhhm25oenjh7pvvkb27bjags.jpg"],
      area: "Sarlat",
      description: "Au coeur du périgord noir, pour des vacances gastronomiques et sportives! Idéal pour les familles!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 190,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Tennis"],
      category: "Campagne",
      type: "Maison"
    },
    {
      name: "Les Cimes",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/640x480_554133-lodge_ete_12014.jpg"],
      area: "Chambéry",
      description: "Une vue révee sur les sommets, un spa de luxe caché dans ses murs, des balades équestres en montagne. Un lieu parfait pour se détendre",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 8,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "Les Landes",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/Bazas.png"],
      area: "Bazas",
      description: "Notre chef local excelle dans la préparation du boeuf de Bazas",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 300,
      bedroom_count: 10,
      bathroom_count: 5,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine"],
      category: "Campagne",
      type: "Manoir"
    },
    {
      name: "Snowbeach",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/640x480_megeve-location-chalet-luxe-taxozite-piscine-13422.jpg"],
      area: "Mégève",
      description: "Pour les fans de glisse!!!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 8,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Equipements de sports d'hiver", "Jardin", "Spa", "Tennis"],
      category: "Montagne",
      type: "Villa"
    },
    {
      name: "Yololoiou",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/1605-Batieu-180927-JG-16-EU-RJ.jpg"],
      area: "Alpes suisses",
      description: "Authentique! AU coeur des Alpes suisses,, avec un contact heureux avec le folklore local!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 8,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Patinoire", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "Lavande",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/6086cb70306fd.jpg"],
      area: "Saint Paul de Vence",
      description: "Cézanne y a vécu, pour y peindre l’Estaque",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 190,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jardin", "Parc de jeux", "Piscine", "Spa", "Tennis"],
      category: "Campagne",
      type: "Maison"
    },
    {
      name: "Les vents d’ouest",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/27061_00-2021-11-10-0148.jpg"],
      area: "Carnac",
      description: "Une villa pour vous sentir riches...ou juste pour passer un moment délicieux en famille!",
      low_price: 4000,
      medium_price: 6000,
      high_price: 9000,
      surface: 400,
      bedroom_count: 15,
      bathroom_count: 10,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Equipements de plongée.", "Jacuzzi", "Jardin", "Piscine"],
      category: "Bord de mer",
      type: "Villa"
    },
    {
      name: "La maison dans les bois",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/21240-france-les-tournels.jpg"],
      area: "Luz Saint Sauveur",
      description: "Vous ne vous arrêterez pas ici, vous vous équiperez et partirez à l’assaut des cimes!",
      low_price: 1500,
      medium_price: 2500,
      high_price: 3500,
      surface: 110,
      bedroom_count: 4,
      bathroom_count: 2,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Jacuzzi", "Jardin", "Parc de jeux"],
      category: "Ville",
      type: "Atypique"
    },
    {
      name: "Guarrigue",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/0871_Source_JG_180529_01_EU.jpg"],
      area: "Saint Maximin",
      description: "Monter sur la Sainte Victoire et voir la mer, une fois dans sa vie! Savourer le beurre de truffe lors d’apéritifs trainants!",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 300,
      bedroom_count: 10,
      bathroom_count: 5,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jacuzzi", "Jardin", "Piscine", "Spa", "Tennis"],
      category: "Campagne",
      type: "Villa"
    },
    {
      name: "Le Pic",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/111904-2.jpg"],
      area: "Gavarnie",
      description: "Qui n’a jamais vu le cirque de Gavarnie n’a pas vécu!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 180,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Piste de Bobsleigh", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "L’alpage",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/265473276.jpg"],
      area: "Voiron",
      description: "La douceur des premières pentes, le repos de l’âme!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 7,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Patinoire", "Spa"],
      category: "Montagne",
      type: "Maison"
    },
    {
      name: "Villa Berthe",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/chic-villas-brittany-emeraude-g1.jpg"],
      area: "Granville",
      description: "Son bateau à moteur dernier cri pour de superbes balades sur Chausey et Jersey",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 190,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Tennis"],
      category: "Campagne",
      type: "Maison"
    },
    {
      name: "Villa des Pins",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/lagapa-perros-guirec-crdit-kelly-martos-5-640x360-crop-1579247128.jpg"],
      area: "La Roche sur Yon",
      description: "Cette maison, à deux pas de la plage, a vu passer Jean Rochefort, Lino Ventura, Gérard Depardieu. Tous la conseillent!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 7,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine"],
      category: "Bord de mer",
      type: "Villa"
    },
    {
      name: "Villa les Murets",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/d4.jpg"],
      area: "Rocamadour",
      description: "Rocamadour, terre de miracles!",
      low_price: 4000,
      medium_price: 6000,
      high_price: 9000,
      surface: 400,
      bedroom_count: 12,
      bathroom_count: 8,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine"],
      category: "Campagne",
      type: "Villa"
    },
    {
      name: "Villa Sémaphore",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/istockphoto-1175468826-612x612.jpg"],
      area: "Oléron",
      description: "Le charme de l’authentique, l’appel de la mer",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 180,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Equipements de plongée.", "Jardin", "Parc de jeux", "Spa"],
      category: "Bord de mer",
      type: "Atypique"
    },
    {
      name: "Villa Basque",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/les-maisons-avec-vue-sur-mer-comme-ici-a-groix-sont_4776968_676x338p_(1).jpg"],
      area: "Mimizan",
      description: "Pour la Feria, à deux pas de Bayonne!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 7,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Jardin", "Parc de jeux", "Piscine", "Spa"],
      category: "Bord de mer",
      type: "Maison"
    },
    {
      name: "La Cabane",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/location-gite-haut-de-gamme-scaled.jpg"],
      area: "Cahors",
      description: "Un nid parfait pour renouveler votre amour!",
      low_price: 1500,
      medium_price: 2500,
      high_price: 3500,
      surface: 110,
      bedroom_count: 4,
      bathroom_count: 2,
      chef: "Forfait sur mesure",
      equipments: ["Golf", "Jacuzzi", "Jardin", "Piscine", "Spa", "Tennis"],
      category: "Campagne",
      type: "Atypique"
    },
    {
      name: "Vue sur Mer",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/maison-avec-vue-mer.jpg"],
      area: "Dinard",
      description: "So British!",
      low_price: 1000,
      medium_price: 1500,
      high_price: 2000,
      surface: 75,
      bedroom_count: 3,
      bathroom_count: 2,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Centre équestre", "Equipements de plongée.", "Jacuzzi", "Jardin", "Parc de jeux"],
      category: "Bord de mer",
      type: "Appartement"
    },
    {
      name: "Villa Trappeur",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/location-vacances-chalet-la-bresse-465103-7.jpeg"],
      area: "Annecy",
      description: "Vous sentez-vous prêts pour l’aventure? Programme proposé sur mesure",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 7,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Equipements de sports d'hiver", "Jardin", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "La Malouine",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/meuble-maison-de-maitre-de-perier-85200-fontenay-le-comte-1.jpg"],
      area: "Saint Malo",
      description: "Vous sentez-vous une âme d’armateur? Surcouf y est passé!",
      low_price: 4000,
      medium_price: 6000,
      high_price: 9000,
      surface: 380,
      bedroom_count: 14,
      bathroom_count: 8,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Centre équestre", "Equipements de plongée.", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Spa"],
      category: "Bord de mer",
      type: "Manoir"
    },
    {
      name: "Spa des Alpes",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/salon-chalet-luxe-serre-che.jpg"],
      area: "Briançon",
      description: "Se reposer, se détendre, profiter, aimer!!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 190,
      bedroom_count: 6,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Patinoire", "Piste de Bobsleigh", "Spa"],
      category: "Montagne",
      type: "Chalet"
    },
    {
      name: "Villa des Vignes",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/unnamed_(3).jpg"],
      area: "Blaye",
      description: "Un verre de Saint Estèphe 1998, au coin du feu le soir ou sur la terrasse le midi, pendant que dorent les poissons sur la plancha....",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 210,
      bedroom_count: 8,
      bathroom_count: 3,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Centre équestre", "Equipements de plongée.", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Spa"],
      category: "Bord de mer",
      type: "Villa"
    },
    {
      name: "Villa Margeride",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/unnamed_(2).jpg"],
      area: "Saint Flour",
      description: "Saint Flour, cité des grands vents! A visiter absolument! A deux pas des monts du Cantal et du GR400!",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 300,
      bedroom_count: 16,
      bathroom_count: 8,
      chef: "Forfait sur mesure",
      equipments: ["Bateau à moteur", "Bateau à voile", "Centre équestre", "Equipements de plongée.", "Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Piscine", "Spa"],
      category: "Montagne",
      type: "Villa"
    },
    {
      name: "Buron des Cimes",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/swimming-pool.jpg"],
      area: "Serre-Chevalier",
      description: "Le luxe au coeur des montagnes!",
      low_price: 8000,
      medium_price: 11000,
      high_price: 15000,
      surface: 600,
      bedroom_count: 20,
      bathroom_count: 20,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Equipements de sports d'hiver", "Jacuzzi", "Jardin", "Parc de jeux", "Spa"],
      category: "Montagne",
      type: "Villa"
    },
    {
      name: "Belle époque",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/unnamed_(1).jpg"],
      area: "Fontainebleau",
      description: "Le faste des Rois. Joséphine de Beauharnais y a résidé",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 270,
      bedroom_count: 10,
      bathroom_count: 6,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jardin", "Piscine", "Tennis"],
      category: "Ville",
      type: "Manoir"
    },
    {
      name: "Villa Normande",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/unnamed.jpg"],
      area: "Honfleur",
      description: "Coup de coeur! ma famille y a vécu pendant trois générations, les murs ont une histoire!",
      low_price: 3000,
      medium_price: 5000,
      high_price: 8000,
      surface: 280,
      bedroom_count: 10,
      bathroom_count: 5,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Golf", "Jacuzzi", "Jardin", "Piscine", "Spa", "Tennis"],
      category: "Campagne",
      type: "Villa"
    },
    {
      name: "Villa des Puys",
      images_urls: ["Catalogue%20b1708c8345b34bfdb1cd22a8554d8b6e/1fcak8163jr3xmm42ghm5hgua0vjwdn7y1jxz0lj4.jpg"],
      area: "Chamaliéres",
      description: "Clermont-Ferrand, cité des Volcans. Les puys à deux pas pour des balades enchanteresses! Vous profiterez aussi des thermes de Royat et Chatel Guyon, pour des vacances ressourçantes!",
      low_price: 2000,
      medium_price: 4000,
      high_price: 5000,
      surface: 200,
      bedroom_count: 7,
      bathroom_count: 4,
      chef: "Forfait sur mesure",
      equipments: ["Centre équestre", "Jardin", "Tennis"],
      category: "Ville",
      type: "Manoir"
    },
  ];

  for (let housing of housing_list) {
    housings.insert({
      name: housing.name,
      images_urls: housing.images_urls,
      area: housing.area,
      description: housing.description,
      low_price: housing.low_price,
      medium_price: housing.medium_price,
      high_price: housing.high_price,
      surface: housing.surface,
      bedroom_count: housing.bedroom_count,
      bathroom_count: housing.bathroom_count,
      chef: housing.chef,
      category: housing.category,
      type: housing.type,
      equipments: await Promise.all(housing.equipments.map(async equipment_name => {
        const equipment = await equipments.findOneBy({ name: equipment_name });
        if (equipment == null) {
          throw new Error("Unknown equipment when filling database with default content");
        }
        return equipment;
      })),
    });
  }

  await users.insert({
    first_name: "admin",
    last_name: "admin",
    password_hash: await bcrypt.hash("admin", 12),
    email: "admin",
    phone_number: "0123456789",
    admin: true,
    bookings: []
  });

  await users.insert({
    first_name: "Louis",
    last_name: "Le Cam",
    password_hash: await bcrypt.hash("louis", 12),
    email: "louis.le-cam@institutsolacroup.com",
    phone_number: "0000000001",
    admin: true,
    bookings: []
  });

  await users.insert({
    first_name: "Carl",
    last_name: "Richard",
    password_hash: await bcrypt.hash("carl", 12),
    email: "carl.richard@institutsolacroup.com",
    phone_number: "0000000002",
    admin: false,
    bookings: []
  });

  await users.insert({
    first_name: "Tetiana",
    last_name: "Kosorukova",
    password_hash: await bcrypt.hash("tetiana", 12),
    email: "tetiana.kosorukova@institutsolacroup.com",
    phone_number: "0000000003",
    admin: true,
    bookings: []
  });

  await users.insert({
    first_name: "Olivier",
    last_name: "Evrard",
    password_hash: await bcrypt.hash("olivier", 12),
    email: "olivier.evrard@institutsolacroup.com",
    phone_number: "0000000004",
    admin: true,
    bookings: []
  });

  await users.insert({
    first_name: "Olivier",
    last_name: "Robert Duboille",
    password_hash: await bcrypt.hash("olivier", 12),
    email: "olivier.robert-duboille@institutsolacroup.com",
    phone_number: "0000000005",
    admin: false,
    bookings: []
  });

  await users.insert({
    first_name: "Dorian",
    last_name: "Delpeux",
    password_hash: await bcrypt.hash("dorian", 12),
    email: "dorian.delpeux@institutsolacroup.com",
    phone_number: "0000000006",
    admin: false,
    bookings: []
  });

  const booking_list = [
    {
      start: new Date(2034, 9, 7),
      end: new Date(2034, 9, 12),
      chef_available: true,
      visit_date: new Date(2034, 9, 2),
      housing: "Maison des Rives",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2048, 6, 12),
      end: new Date(2048, 6, 20),
      chef_available: true,
      visit_date: new Date(2048, 6, 3),
      housing: "Villa des Vignes",
      user: "admin",
    },
    {
      start: new Date(2023, 5, 9),
      end: new Date(2023, 5, 13),
      chef_available: false,
      visit_date: new Date(2023, 5, 6),
      housing: "Guarrigue",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2025, 3, 10),
      end: new Date(2025, 3, 14),
      chef_available: false,
      visit_date: new Date(2025, 3, 4),
      housing: "Villa des Vignes",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2035, 7, 12),
      end: new Date(2035, 7, 18),
      chef_available: true,
      visit_date: new Date(2035, 7, 4),
      housing: "La Galibe",
      user: "admin",
    },
    {
      start: new Date(2025, 4, 18),
      end: new Date(2025, 4, 20),
      chef_available: false,
      visit_date: new Date(2025, 4, 8),
      housing: "Villa des Vignes",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2037, 0, 8),
      end: new Date(2037, 0, 11),
      chef_available: true,
      visit_date: new Date(2037, 0, 4),
      housing: "Vue sur Mer",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2044, 2, 13),
      end: new Date(2044, 2, 18),
      chef_available: false,
      visit_date: new Date(2044, 2, 4),
      housing: "La Cabane",
      user: "admin",
    },
    {
      start: new Date(2024, 9, 4),
      end: new Date(2024, 9, 9),
      chef_available: false,
      visit_date: new Date(2024, 9, 1),
      housing: "Nid de Chouette",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2041, 9, 9),
      end: new Date(2041, 9, 14),
      chef_available: true,
      visit_date: new Date(2041, 9, 1),
      housing: "Villa des Vignes",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2041, 7, 12),
      end: new Date(2041, 7, 20),
      chef_available: true,
      visit_date: new Date(2041, 7, 6),
      housing: "La Cabane",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2038, 8, 14),
      end: new Date(2038, 8, 19),
      chef_available: false,
      visit_date: new Date(2038, 8, 8),
      housing: "La maison dans les bois",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2047, 1, 7),
      end: new Date(2047, 1, 15),
      chef_available: false,
      visit_date: new Date(2047, 1, 4),
      housing: "Lavande",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2040, 4, 7),
      end: new Date(2040, 4, 15),
      chef_available: true,
      visit_date: new Date(2040, 4, 3),
      housing: "La Cabane",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2035, 4, 11),
      end: new Date(2035, 4, 15),
      chef_available: true,
      visit_date: new Date(2035, 4, 2),
      housing: "La Cabane",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2044, 11, 17),
      end: new Date(2044, 11, 19),
      chef_available: true,
      visit_date: new Date(2044, 11, 9),
      housing: "Les Cimes",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2025, 1, 15),
      end: new Date(2025, 1, 20),
      chef_available: true,
      visit_date: new Date(2025, 1, 5),
      housing: "Belle époque",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2047, 10, 9),
      end: new Date(2047, 10, 17),
      chef_available: false,
      visit_date: new Date(2047, 10, 1),
      housing: "Nid de Chouette",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2027, 2, 19),
      end: new Date(2027, 2, 21),
      chef_available: false,
      visit_date: new Date(2027, 2, 9),
      housing: "Les Landes",
      user: "admin",
    },
    {
      start: new Date(2042, 11, 3),
      end: new Date(2042, 11, 10),
      chef_available: true,
      visit_date: new Date(2042, 11, 2),
      housing: "Snowbeach",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2040, 5, 10),
      end: new Date(2040, 5, 13),
      chef_available: false,
      visit_date: new Date(2040, 5, 7),
      housing: "Villa des Pins",
      user: "louis.le-cam@institutsolacroup.com",
    },
    {
      start: new Date(2027, 7, 9),
      end: new Date(2027, 7, 15),
      chef_available: true,
      visit_date: new Date(2027, 7, 4),
      housing: "Les Landes",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2043, 6, 5),
      end: new Date(2043, 6, 12),
      chef_available: true,
      visit_date: new Date(2043, 6, 2),
      housing: "Villa Basque",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2047, 11, 5),
      end: new Date(2047, 11, 7),
      chef_available: false,
      visit_date: new Date(2047, 11, 4),
      housing: "Les Cimes",
      user: "louis.le-cam@institutsolacroup.com",
    },
    {
      start: new Date(2026, 7, 8),
      end: new Date(2026, 7, 16),
      chef_available: false,
      visit_date: new Date(2026, 7, 7),
      housing: "Villa des Puys",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2046, 9, 9),
      end: new Date(2046, 9, 15),
      chef_available: false,
      visit_date: new Date(2046, 9, 6),
      housing: "Villa des Vignes",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2028, 9, 8),
      end: new Date(2028, 9, 11),
      chef_available: false,
      visit_date: new Date(2028, 9, 5),
      housing: "Buron des Cimes",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2036, 5, 16),
      end: new Date(2036, 5, 23),
      chef_available: false,
      visit_date: new Date(2036, 5, 7),
      housing: "Villa Normande",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2037, 8, 7),
      end: new Date(2037, 8, 11),
      chef_available: false,
      visit_date: new Date(2037, 8, 6),
      housing: "Villa Margeride",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2045, 8, 14),
      end: new Date(2045, 8, 17),
      chef_available: false,
      visit_date: new Date(2045, 8, 10),
      housing: "Villa Normande",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2032, 3, 9),
      end: new Date(2032, 3, 12),
      chef_available: false,
      visit_date: new Date(2032, 3, 4),
      housing: "Vue sur Mer",
      user: "louis.le-cam@institutsolacroup.com",
    },
    {
      start: new Date(2025, 3, 10),
      end: new Date(2025, 3, 14),
      chef_available: false,
      visit_date: new Date(2025, 3, 2),
      housing: "Villa Berthe",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2026, 4, 10),
      end: new Date(2026, 4, 14),
      chef_available: true,
      visit_date: new Date(2026, 4, 3),
      housing: "La Galibe",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2035, 8, 6),
      end: new Date(2035, 8, 14),
      chef_available: true,
      visit_date: new Date(2035, 8, 4),
      housing: "Les Cimes",
      user: "admin",
    },
    {
      start: new Date(2045, 3, 15),
      end: new Date(2045, 3, 18),
      chef_available: false,
      visit_date: new Date(2045, 3, 6),
      housing: "Villa les Murets",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2044, 1, 11),
      end: new Date(2044, 1, 18),
      chef_available: false,
      visit_date: new Date(2044, 1, 4),
      housing: "Villa Normande",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2044, 7, 14),
      end: new Date(2044, 7, 20),
      chef_available: true,
      visit_date: new Date(2044, 7, 8),
      housing: "Buron des Cimes",
      user: "louis.le-cam@institutsolacroup.com",
    },
    {
      start: new Date(2026, 1, 3),
      end: new Date(2026, 1, 11),
      chef_available: false,
      visit_date: new Date(2026, 1, 2),
      housing: "Les Landes",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2036, 10, 8),
      end: new Date(2036, 10, 13),
      chef_available: true,
      visit_date: new Date(2036, 10, 3),
      housing: "Villa les Murets",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2041, 0, 11),
      end: new Date(2041, 0, 14),
      chef_available: false,
      visit_date: new Date(2041, 0, 9),
      housing: "Villa des Puys",
      user: "admin",
    },
    {
      start: new Date(2039, 5, 15),
      end: new Date(2039, 5, 19),
      chef_available: false,
      visit_date: new Date(2039, 5, 8),
      housing: "Villa Berthe",
      user: "olivier.evrard@institutsolacroup.com",
    },
    {
      start: new Date(2023, 3, 16),
      end: new Date(2023, 3, 19),
      chef_available: false,
      visit_date: new Date(2023, 3, 10),
      housing: "Buron des Cimes",
      user: "carl.richard@institutsolacroup.com",
    },
    {
      start: new Date(2032, 6, 14),
      end: new Date(2032, 6, 22),
      chef_available: false,
      visit_date: new Date(2032, 6, 5),
      housing: "Spa des Alpes",
      user: "admin",
    },
    {
      start: new Date(2023, 0, 18),
      end: new Date(2023, 0, 20),
      chef_available: false,
      visit_date: new Date(2023, 0, 9),
      housing: "Villa des Vignes",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2041, 5, 9),
      end: new Date(2041, 5, 13),
      chef_available: false,
      visit_date: new Date(2041, 5, 4),
      housing: "Buron des Cimes",
      user: "dorian.delpeux@institutsolacroup.com",
    },
    {
      start: new Date(2036, 10, 5),
      end: new Date(2036, 10, 7),
      chef_available: true,
      visit_date: new Date(2036, 10, 4),
      housing: "Yololoiou",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2037, 1, 4),
      end: new Date(2037, 1, 7),
      chef_available: true,
      visit_date: new Date(2037, 1, 3),
      housing: "Les Roches",
      user: "tetiana.kosorukova@institutsolacroup.com",
    },
    {
      start: new Date(2044, 1, 11),
      end: new Date(2044, 1, 15),
      chef_available: false,
      visit_date: new Date(2044, 1, 2),
      housing: "La Malouine",
      user: "olivier.robert-duboille@institutsolacroup.com",
    },
    {
      start: new Date(2028, 3, 9),
      end: new Date(2028, 3, 16),
      chef_available: true,
      visit_date: new Date(2028, 3, 6),
      housing: "Villa des Puys",
      user: "louis.le-cam@institutsolacroup.com",
    },
    {
      start: new Date(2035, 7, 5),
      end: new Date(2035, 7, 7),
      chef_available: true,
      visit_date: new Date(2035, 7, 1),
      housing: "Maison des Rives",
      user: "louis.le-cam@institutsolacroup.com",
    },
  ];

  for (const booking of booking_list) {
    const housing = await housings.findOneBy({ name: booking.housing });
    if (housing == null) {
      throw new Error("Cannot find housing when inserting default database content");
    }

    const user = await users.findOneBy({ email: booking.user });
    if (user == null) {
      throw new Error("Cannot find user when inserting default database content");
    }

    await bookings.save({
      start: booking.start,
      end: booking.end,
      chef_available: booking.chef_available,
      visit_date: booking.visit_date,
      housing,
      user,
    });
  }
}
