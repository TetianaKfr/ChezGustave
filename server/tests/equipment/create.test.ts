import supertest from "supertest";
import { authentificate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";
import database from "../../src/database";
import Equipment from "../../src/entities/Equipment";

describe('Create equipment', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();
  });

  test("Create equipment success", async () => {
    const response = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({
        name: "equipment 1"
      });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(201);
    expect(response.text).toBe("Created");
    expect(equipments_names).toStrictEqual(["equipment 1"]);
  });

  test("Create equipment unauthorized connected as user", async () => {
    const response = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("user", "user"), { type: "bearer" })
      .send({
        name: "equipment 1"
      });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toStrictEqual([]);
  });

  test("Create equipment unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/equipment")
      .send({
        name: "equipment 1"
      });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toStrictEqual([]);
  });

  test("Create equipment unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/equipment")
      .auth("dqjdhqzdkqzhdqzfhq:admin", { type: "bearer" })
      .send({
        name: "equipment 1"
      });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(equipments_names).toStrictEqual([]);
  });

  test("Create equipment conflict", async () => {
    const response_1 = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({
        name: "equipment 1"
      });


    const response_2 = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({
        name: "equipment 1"
      });

    const response_3 = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({
        name: "equipment 2"
      });

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response_1.status).toBe(201);
    expect(response_1.text).toBe("Created");
    expect(response_2.status).toBe(409);
    expect(response_2.text).toBe("Conflict");
    expect(response_3.status).toBe(201);
    expect(response_3.text).toBe("Created");
    expect(equipments_names).toContain("equipment 1");
    expect(equipments_names).toContain("equipment 2");
    expect(equipments_names.length).toBe(2);
  });

  test("Create equipment missing name", async () => {
    const response = await supertest(app)
      .post("/equipment")
      .auth(await authentificate("admin", "admin"), { type: "bearer" })
      .send({});

    const equipments_names = (await database.getRepository(Equipment).find()).map(equipment => equipment.name);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    expect(equipments_names).toStrictEqual([]);
  });
});
