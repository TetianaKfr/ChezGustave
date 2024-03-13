import supertest from "supertest";
import database from "../../src/database";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";
import Housing from "../../src/entities/Housing";

describe("Create housings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();
  });

  afterEach(async () => { await database.destroy(); });

  test("Create housing success connected as admin", async () => {
    const response = await supertest(app)
      .post("/housings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing Name")
      .field("area", "Housing Area")
      .field("description", "Housing Description")
      .field("category", "Housing Category")
      .field("type", "Housing Type")
      .field("images_urls", JSON.stringify(["image_1", "image_2"]))
      .field("low_price", "1000")
      .field("medium_price", "2000")
      .field("high_price", "3000")
      .field("surface", "540")
      .field("bedroom_count", "5")
      .field("bathroom_count", "3")
      .field("chef", "Forfait sur mesure");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing Name"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(201);
    expect(response.text).toBe("Created");
    expect(housing.name).toBe("Housing Name");
    expect(housing.area).toBe("Housing Area");
    expect(housing.description).toBe("Housing Description");
    expect(housing.category).toBe("Housing Category");
    expect(housing.type).toBe("Housing Type");
    expect(housing.images_urls).toContain("image_1");
    expect(housing.images_urls).toContain("image_2");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe(1000);
    expect(housing.medium_price).toBe(2000);
    expect(housing.high_price).toBe(3000);
    expect(housing.surface).toBe(540);
    expect(housing.bedroom_count).toBe(5);
    expect(housing.bathroom_count).toBe(3);
    expect(housing.chef).toBe("Forfait sur mesure");
  });

  test("Create housing unauthorized connected as user", async () => {
    const response = await supertest(app)
      .post("/housings")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing Name")
      .field("area", "Housing Area")
      .field("description", "Housing Description")
      .field("category", "Housing Category")
      .field("type", "Housing Type")
      .field("images_urls", JSON.stringify(["image_1", "image_2"]))
      .field("low_price", "1000")
      .field("medium_price", "2000")
      .field("high_price", "3000")
      .field("surface", "540")
      .field("bedroom_count", "5")
      .field("bathroom_count", "3")
      .field("chef", "Forfait sur mesure");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing Name"
    });

    expect(housing).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create housing unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/housings")
      .type("multipart/form-data")
      .field("name", "Housing Name")
      .field("area", "Housing Area")
      .field("description", "Housing Description")
      .field("category", "Housing Category")
      .field("type", "Housing Type")
      .field("images_urls", JSON.stringify(["image_1", "image_2"]))
      .field("low_price", "1000")
      .field("medium_price", "2000")
      .field("high_price", "3000")
      .field("surface", "540")
      .field("bedroom_count", "5")
      .field("bathroom_count", "3")
      .field("chef", "Forfait sur mesure");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing Name"
    });

    expect(housing).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create housing unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/housings")
      .auth("dqeuhgzdfhvbsufqiozhfusrhf:admin", { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing Name")
      .field("area", "Housing Area")
      .field("description", "Housing Description")
      .field("category", "Housing Category")
      .field("type", "Housing Type")
      .field("images_urls", JSON.stringify(["image_1", "image_2"]))
      .field("low_price", "1000")
      .field("medium_price", "2000")
      .field("high_price", "3000")
      .field("surface", "540")
      .field("bedroom_count", "5")
      .field("bathroom_count", "3")
      .field("chef", "Forfait sur mesure");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing Name"
    });

    expect(housing).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  
  test("Create housing malformed missing fields", async () => {
    const response = await supertest(app)
      .post("/housings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .type("multipart/form-data")
      .field("area", "Housing Area")
      .field("description", "Housing Description")
      .field("type", "Housing Type")
      .field("low_price", "1000")
      .field("medium_price", "2000")
      .field("surface", "540")
      .field("bedroom_count", "5")
      .field("chef", "Forfait sur mesure");


    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing Name"
    });

    expect(housing).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });
});
