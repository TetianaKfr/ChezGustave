import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Get housings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    await database.getRepository(Housing).save({
      name: "Housing 1",
      images_urls: ["image_1", "image_2"],
      area: "Area 1",
      description: "Description 1",
      low_price: 1,
      medium_price: 2,
      high_price: 3,
      surface: 4,
      bathroom_count: 5,
      category: "Category 1",
      type: "Type 1",
      equipments: []
    });
  });

  afterEach(async () => { await database.destroy(); });

  test("Get housing success connected as admin", async () => {
    const response = await supertest(app)
      .post("/housing")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(200);
    expect(response.body.images_urls).toContain("image_1");
    expect(response.body.images_urls).toContain("image_2");
    expect(response.body.images_urls.length).toBe(2);
    expect(response.body.area).toBe("Area 1");
    expect(response.body.description).toBe("Description 1");
    expect(response.body.low_price).toBe("$1.00");
    expect(response.body.medium_price).toBe("$2.00");
    expect(response.body.high_price).toBe("$3.00");
    expect(response.body.surface).toBe(4);
    expect(response.body.bathroom_count).toBe(5);
    expect(response.body.category).toBe("Category 1");
    expect(response.body.type).toBe("Type 1");
  });

  test("Get housing success connected as user", async () => {
    const response = await supertest(app)
      .post("/housing")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(200);
    expect(response.body.images_urls).toContain("image_1");
    expect(response.body.images_urls).toContain("image_2");
    expect(response.body.images_urls.length).toBe(2);
    expect(response.body.area).toBe("Area 1");
    expect(response.body.description).toBe("Description 1");
    expect(response.body.low_price).toBe("$1.00");
    expect(response.body.medium_price).toBe("$2.00");
    expect(response.body.high_price).toBe("$3.00");
    expect(response.body.surface).toBe(4);
    expect(response.body.bathroom_count).toBe(5);
    expect(response.body.category).toBe("Category 1");
    expect(response.body.type).toBe("Type 1");
  });

  test("Get housing unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/housing")
      .send({ name: "Housing 1" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Get housing unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/housing")
      .auth("hqzuigvuihqfuhiafbefiqhfu:admin", { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
