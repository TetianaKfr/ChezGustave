import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Modify housings", () => {
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
      medium_price: 1,
      high_price: 1,
      surface: 1,
      bathroom_count: 1,
      category: "Category 1",
      type: "Type 1",
      equipments: []
    });
  });

  afterEach(async () => { await database.destroy(); });

  test("Modify housing success connected as admin", async () => {
    const response = await supertest(app)
      .put("/housing")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing 1")
      .field("new_name", "Housing 2")
      .field("area", "Area 2")
      .field("description", "Description 2")
      .field("category", "Category 2")
      .field("type", "Type 2")
      .field("images_urls", JSON.stringify(["image_5", "image_3"]))
      .field("low_price", "5000")
      .field("medium_price", "7000")
      .field("high_price", "8000")
      .field("surface", "1040")
      .field("bathroom_count", "5");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing 2"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(housing.name).toBe("Housing 2");
    expect(housing.area).toBe("Area 2");
    expect(housing.description).toBe("Description 2");
    expect(housing.category).toBe("Category 2");
    expect(housing.type).toBe("Type 2");
    expect(housing.images_urls).toContain("image_5");
    expect(housing.images_urls).toContain("image_3");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe("$5,000.00");
    expect(housing.medium_price).toBe("$7,000.00");
    expect(housing.high_price).toBe("$8,000.00");
    expect(housing.surface).toBe(1040);
    expect(housing.bathroom_count).toBe(5);
  });

  test("Modify housing success partial", async () => {
    const response = await supertest(app)
      .put("/housing")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing 1")
      .field("area", "Area 2")
      .field("description", "Description 2")
      .field("type", "Type 2")
      .field("low_price", "5000")
      .field("medium_price", "7000")
      .field("surface", "1040");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing 1"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(housing.name).toBe("Housing 1");
    expect(housing.area).toBe("Area 2");
    expect(housing.description).toBe("Description 2");
    expect(housing.type).toBe("Type 2");
    expect(housing.images_urls).toContain("image_1");
    expect(housing.images_urls).toContain("image_2");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe("$5,000.00");
    expect(housing.medium_price).toBe("$7,000.00");
    expect(housing.high_price).toBe("$1.00");
    expect(housing.surface).toBe(1040);
  });

  test("Modify housing unauthorized connected as user", async () => {
    const response = await supertest(app)
      .put("/housing")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing 1")
      .field("new_name", "Housing 2")
      .field("area", "Area 2")
      .field("description", "Description 2")
      .field("category", "Category 2")
      .field("type", "Type 2")
      .field("images_urls", JSON.stringify(["image_5", "image_3"]))
      .field("low_price", "5000")
      .field("medium_price", "7000")
      .field("high_price", "8000")
      .field("surface", "1040")
      .field("bathroom_count", "5");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing 1"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(housing.name).toBe("Housing 1");
    expect(housing.area).toBe("Area 1");
    expect(housing.description).toBe("Description 1");
    expect(housing.category).toBe("Category 1");
    expect(housing.type).toBe("Type 1");
    expect(housing.images_urls).toContain("image_1");
    expect(housing.images_urls).toContain("image_2");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe("$1.00");
    expect(housing.medium_price).toBe("$1.00");
    expect(housing.high_price).toBe("$1.00");
    expect(housing.surface).toBe(1);
    expect(housing.bathroom_count).toBe(1);
  });

  test("Modify housing unauthorized not connected", async () => {
    const response = await supertest(app)
      .put("/housing")
      .type("multipart/form-data")
      .field("name", "Housing 1")
      .field("new_name", "Housing 2")
      .field("area", "Area 2")
      .field("description", "Description 2")
      .field("category", "Category 2")
      .field("type", "Type 2")
      .field("images_urls", JSON.stringify(["image_5", "image_3"]))
      .field("low_price", "5000")
      .field("medium_price", "7000")
      .field("high_price", "8000")
      .field("surface", "1040")
      .field("bathroom_count", "5");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing 1"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(housing.name).toBe("Housing 1");
    expect(housing.area).toBe("Area 1");
    expect(housing.description).toBe("Description 1");
    expect(housing.category).toBe("Category 1");
    expect(housing.type).toBe("Type 1");
    expect(housing.images_urls).toContain("image_1");
    expect(housing.images_urls).toContain("image_2");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe("$1.00");
    expect(housing.medium_price).toBe("$1.00");
    expect(housing.high_price).toBe("$1.00");
    expect(housing.surface).toBe(1);
    expect(housing.bathroom_count).toBe(1);
  });

  test("Modify housing unauthorized invalid token", async () => {
    const response = await supertest(app)
      .put("/housing")
      .auth("dquihfqeidcivbrdqhziofhqef:admin", { type: "bearer" })
      .type("multipart/form-data")
      .field("name", "Housing 1")
      .field("new_name", "Housing 2")
      .field("area", "Area 2")
      .field("description", "Description 2")
      .field("category", "Category 2")
      .field("type", "Type 2")
      .field("images_urls", JSON.stringify(["image_5", "image_3"]))
      .field("low_price", "5000")
      .field("medium_price", "7000")
      .field("high_price", "8000")
      .field("surface", "1040")
      .field("bathroom_count", "5");

    const housing = await database.getRepository(Housing).findOneBy({
      name: "Housing 1"
    });

    expect(housing).not.toBeNull();
    if (housing == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(housing.name).toBe("Housing 1");
    expect(housing.area).toBe("Area 1");
    expect(housing.description).toBe("Description 1");
    expect(housing.category).toBe("Category 1");
    expect(housing.type).toBe("Type 1");
    expect(housing.images_urls).toContain("image_1");
    expect(housing.images_urls).toContain("image_2");
    expect(housing.images_urls.length).toBe(2);
    expect(housing.low_price).toBe("$1.00");
    expect(housing.medium_price).toBe("$1.00");
    expect(housing.high_price).toBe("$1.00");
    expect(housing.surface).toBe(1);
    expect(housing.bathroom_count).toBe(1);
  });
});
