import supertest from "supertest";

import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";
import database from "../../src/database";
import Equipment from "../../src/entities/Equipment";

describe('List equipements', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertUser();
    await insertAdmin();

    await database.getRepository(Equipment).insert([
      { name: "Equipment 1" },
      { name: "Equipment 2" },
      { name: "Equipment 3" },
    ]);
  });

  test("List equipments success connected as admin", async () => {
    const response = await supertest(app)
      .get("/equipments")
      .auth(await authenticate("admin", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Equipment 1");
    expect(response.body).toContain("Equipment 2");
    expect(response.body).toContain("Equipment 3");
    expect(response.body.length).toBe(3);
  });

  test("List equipments success connected as user", async () => {
    const response = await supertest(app)
      .get("/equipments")
      .auth(await authenticate("user", "user"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("Equipment 1");
    expect(response.body).toContain("Equipment 2");
    expect(response.body).toContain("Equipment 3");
    expect(response.body.length).toBe(3);
  });

  test("List equipments unauthorized not connected", async () => {
    const response = await supertest(app)
      .get("/equipments");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List equipments unauthorized invalid token", async () => {
    const response = await supertest(app)
      .get("/equipments")
      .auth("dqdqzjdzhfjklrhquidqh:admin", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
