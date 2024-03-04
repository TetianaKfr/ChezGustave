import supertest from "supertest";
import database from "../../src/database";
import Equipment from "../../src/entities/Equipment";
import { authentificate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe('Modify equipment', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    await database.getRepository(Equipment).insert([
      { name: "Equipment 1" },
      { name: "Equipment 2" },
    ]);
  });

  test("Modify equipment success", async () => {
    const response = await supertest(app)
      .put("/equipments")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({ name: "Equipment 1", new_name: "Equipment 3" });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(equipments_names).toContain("Equipment 2");
    expect(equipments_names).toContain("Equipment 3");
    expect(equipments_names.length).toBe(2);
  });

  test("Modify equipment not found", async () => {
    const response = await supertest(app)
      .put("/equipments")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({ name: "Equipment 4", new_name: "Equipment 3" });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
    expect(equipments_names).toContain("Equipment 1");
    expect(equipments_names).toContain("Equipment 2");
    expect(equipments_names.length).toBe(2);
  });

  test("Modify equipment unauthorized connected as user", async () => {
    const response = await supertest(app)
      .put("/equipments")
      .auth(await authentificate("user", "user"), { type: "bearer" })
      .send({ name: "Equipment 1", new_name: "Equipment 3" });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toContain("Equipment 1");
    expect(equipments_names).toContain("Equipment 2");
    expect(equipments_names.length).toBe(2);
  });

  test("Modify equipment unauthorized not connected", async () => {
    const response = await supertest(app)
      .put("/equipments")
      .send({ name: "Equipment 1", new_name: "Equipment 3" });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toContain("Equipment 1");
    expect(equipments_names).toContain("Equipment 2");
    expect(equipments_names.length).toBe(2);
  });

  test("Modify equipment unauthorized invalid token", async () => {
    const response = await supertest(app)
      .put("/equipments")
      .auth("dqzjdhejkghfhquifq:admin", { type: "bearer" })
      .send({ name: "Equipment 1", new_name: "Equipment 3" });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toContain("Equipment 1");
    expect(equipments_names).toContain("Equipment 2");
    expect(equipments_names.length).toBe(2);
  });
});
