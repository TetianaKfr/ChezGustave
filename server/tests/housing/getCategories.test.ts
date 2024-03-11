import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Get categories", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    const housings = database.getRepository(Housing);

    await housings.save({
      name: "Housing 1",
      images_urls: ["image_1", "image_2"],
      area: "Area 1",
      description: "Description 1",
      low_price: 1,
      medium_price: 2,
      high_price: 3,
      surface: 4,
      bedroom_count: 3,
      bathroom_count: 5,
      category: "Category 1",
      type: "Type 1",
      chef: "Forfait sur mesure",
      equipments: [],
    });

    await housings.save({
      name: "Housing 2",
      images_urls: ["image_1", "image_2"],
      area: "Area 2",
      description: "Description 1",
      low_price: 1,
      medium_price: 2,
      high_price: 3,
      surface: 4,
      bedroom_count: 3,
      bathroom_count: 5,
      category: "Category 2",
      type: "Type 2",
      chef: "Forfait sur mesure",
      equipments: [],
    });

    await housings.save({
      name: "Housing 3",
      images_urls: ["image_1", "image_2"],
      area: "Area 3",
      description: "Description 1",
      low_price: 1,
      medium_price: 2,
      high_price: 3,
      surface: 4,
      bedroom_count: 3,
      bathroom_count: 5,
      category: "Category 2",
      type: "Type 2",
      chef: "Forfait sur mesure",
      equipments: [],
    });
  });

  test("Get categories success connected as admin", async () => {
    const response = await supertest(app)
      .get("/categories")
      .auth(await authenticate("admin", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Category 1");
    expect(response.body).toContain("Category 2");
    expect(response.body.length).toBe(2);
  });

  test("Get categories success connected as user", async () => {
    const response = await supertest(app)
      .get("/categories")
      .auth(await authenticate("user", "user"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Category 1");
    expect(response.body).toContain("Category 2");
    expect(response.body.length).toBe(2);
  });

  test("Get categories unauthorized not connected", async () => {
    const response = await supertest(app)
      .get("/categories");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Get categories unauthorized invalid token", async () => {
    const response = await supertest(app)
      .get("/categories")
      .auth("dqeuigserhidqioehgeqhdqzdfc:admin", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
