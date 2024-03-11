import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Search housings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

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
        category: "Montagne",
        type: "Villa"
      },
    ];

    for (const housing of housing_list) {
      database.getRepository(Housing).insert({
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
        equipments: [],
      });
    }
  });

  test("Search housings success connected as admin", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        categories: { with: ["Montagne"] },
        types: { with: ["Chalet"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Nid de Chouette");
    expect(response.body).toContain("Les Cimes");
    expect(response.body.length).toBe(2);
  });

  test("Search housings success connected as user", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        categories: { with: ["Montagne"] },
        types: { with: ["Chalet"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Nid de Chouette");
    expect(response.body).toContain("Les Cimes");
    expect(response.body.length).toBe(2);
  });

  test("Search housings success with categories", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        categories: { with: ["Bord de mer", "Campagne"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Les Roches");
    expect(response.body).toContain("La Galibe");
    expect(response.body).toContain("Maison des Rives");
    expect(response.body).toContain("Les Landes");
    expect(response.body.length).toBe(4);
  });

  test("Search housings success without categories", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        categories: { without: ["Bord de mer", "Campagne"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Nid de Chouette");
    expect(response.body).toContain("Les Cimes");
    expect(response.body).toContain("Snowbeach");
    expect(response.body.length).toBe(3);
  });

  test("Search housings success with types", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        types: { with: ["Maison", "Villa"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("La Galibe");
    expect(response.body).toContain("Les Roches");
    expect(response.body).toContain("Maison des Rives");
    expect(response.body).toContain("Snowbeach");
    expect(response.body.length).toBe(4);
  });

  test("Search housings success without types", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        types: { without: ["Maison", "Villa"] },
      });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Nid de Chouette");
    expect(response.body).toContain("Les Cimes");
    expect(response.body).toContain("Les Landes");
    expect(response.body.length).toBe(3);
  });

  test("Search housings unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .send({
        categories: { with: ["Montagne"] },
        types: { with: ["Chalet"] },
      });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Search housings success connected as user", async () => {
    const response = await supertest(app)
      .post("/housings/search")
      .auth("dqfhghqeidhqghqifdhqzifhqz:admin", { type: "bearer" })
      .send({
        categories: { with: ["Montagne"] },
        types: { with: ["Chalet"] },
      });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
