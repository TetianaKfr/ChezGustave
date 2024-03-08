import supertest from "supertest";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Remove housings", () => {
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
      bathroom_count: 1,
      category: "Category 1",
      type: "Type 1",
      equipments: []
    });
  });

  afterEach(async () => { await database.destroy(); });

  test("Remove housing success connected as admin", async () => {
    const response = await supertest(app)
      .delete("/housing")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect((await database.getRepository(Housing).find()).length).toBe(0);
  });

  test("Remove housing unauthorized connected as user", async () => {
    const response = await supertest(app)
      .delete("/housing")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect((await database.getRepository(Housing).find()).length).toBe(1);
  });

  test("Remove housing unauthorized not connected", async () => {
    const response = await supertest(app)
      .delete("/housing")
      .send({ name: "Housing 1" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect((await database.getRepository(Housing).find()).length).toBe(1);
  });

  test("Remove housing unauthorized invalid token", async () => {
    const response = await supertest(app)
      .delete("/housing")
      .auth("dhqzuifhqeuoduivsrbeuid:admin", { type: "bearer" })
      .send({ name: "Housing 1" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect((await database.getRepository(Housing).find()).length).toBe(1);
  });

  test("Remove housing bad request", async () => {
    const response = await supertest(app)
      .delete("/housing")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({});

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    expect((await database.getRepository(Housing).find()).length).toBe(1);
  });
});
