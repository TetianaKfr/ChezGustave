import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("List housings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    const housings = database.getRepository(Housing);

    await housings.save({
      name: "Housing 1",
      images_urls: [],
      area: "Area 1",
      description: "Description 1",
      low_price: 1,
      medium_price: 1,
      high_price: 1,
      surface: 1,
      bedroom_count: 1,
      bathroom_count: 1,
      chef: "Forfait sur mesure",
      category: "Category 1",
      type: "Type 1",
      equipments: []
    });

    await housings.save({
      name: "Housing 2",
      images_urls: [],
      area: "Area 2",
      description: "Description 2",
      low_price: 2,
      medium_price: 2,
      high_price: 2,
      surface: 2,
      bedroom_count: 2,
      bathroom_count: 2,
      chef: "Non disponible",
      category: "Category 2",
      type: "Type 2",
      equipments: []
    });
  });

  afterEach(async () => { await database.destroy(); });

  test("List housings success connected as admin", async () => {
    const response = await supertest(app)
      .get("/housings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Housing 1");
    expect(response.body).toContain("Housing 2");
    expect(response.body.length).toBe(2);
  });

  test("List housings success connected as user", async () => {
    const response = await supertest(app)
      .get("/housings")
      .auth(await authenticate("user", "user"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Housing 1");
    expect(response.body).toContain("Housing 2");
    expect(response.body.length).toBe(2);
  });

  test("List housings success not connected", async () => {
    const response = await supertest(app)
      .get("/housings");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List housings success invalid token", async () => {
    const response = await supertest(app)
      .get("/housings")
      .auth("dqzhjkhgsehcbvsufhqzuefhs:admin", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
