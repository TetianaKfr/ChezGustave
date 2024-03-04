import supertest from "supertest";

import app from "../../src/app";
import database from "../../src/database";
import Equipment from "../../src/entities/Equipment";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";

describe('Remove equipment', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    await database.getRepository(Equipment).insert({
      name: "Some equipment",
    });
  })

  test("Remove equipment success", async () => {
    const response = await supertest(app)
      .delete("/equipments")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ name: "Some equipment" });

    const equipments = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(equipments).toStrictEqual([]);
  });

  test("Remove equipment inexistant", async () => {
    const response = await supertest(app)
      .delete("/equipments")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ name: "Other equipment" });

    const equipments = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
    expect(equipments).toStrictEqual(["Some equipment"]);
  });

  test("Remove equipment unauthorized connected as user", async () => {
    const response = await supertest(app)
      .delete("/equipments")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ name: "Some equipment" });

    const equipments = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments).toStrictEqual(["Some equipment"]);
  });

  test("Remove equipment unauthorized not connected", async () => {
    const response = await supertest(app)
      .delete("/equipments")
      .send({ name: "Some equipment" });

    const equipments = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments).toStrictEqual(["Some equipment"]);
  });

  test("Remove equipment unauthorized invalid token", async () => {
    const response = await supertest(app)
      .delete("/equipments")
      .auth("adhzjfheuirhdeuhvserui:admin", { type: "bearer" })
      .send({ name: "Some equipment" });

    const equipments = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments).toStrictEqual(["Some equipment"]);
  });
});
