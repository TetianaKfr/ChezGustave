import bcrypt from "bcrypt";

import database from "../../src/database";
import User from "../../src/entities/User";
import supertest from "supertest";
import app from "../../src/app";

describe('Authentificate', () => {
  beforeAll(async () => {
    await database.initialize();
  });

  beforeEach(async () => {
    const entities_names = database.entityMetadatas.map(entity => '"' + entity.tableName + '"').join(", ");
    console.log("TRUNCATE " + entities_names + " CASCADE;");
    database.query("TRUNCATE " + entities_names + " CASCADE;");
  });

  test("Authentificate success", async () => {
    const users = database.getRepository(User);
    users.insert({
      first_name: "first name",
      last_name: "last name",
      password_hash: await bcrypt.hash("$£°a+ù%è`²47G\"(@", 12),
      email: "mail@example.xyz",
      phone_number: "0000000000",
      admin: false,
    });

    const response = await supertest(app).post("/authentificate").send({
      email: "mail@example.xyz",
      password: "$£°a+ù%è`²47G\"(@",
    });

    const user = await users.findOne({
      where: { email: "mail@example.xyz" },
    });

    expect(user).not.toBeNull();
    if (user == null) {
      return;
    }

    const {
      session_token,
      session_token_expiration,
    } = user;

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ token: session_token + ":mail@example.xyz" });
    expect(session_token_expiration > new Date()).toBe(true);
  });

  test("Authentificate bad email", async () => {
    const users = database.getRepository(User);
    users.insert({
      first_name: "first name",
      last_name: "last name",
      password_hash: await bcrypt.hash("$£°a+ù%è`²47G\"(@", 12),
      email: "mail@example.xyz",
      phone_number: "0000000000",
      admin: false,
    });

    const response = await supertest(app).post("/authentificate").send({
      email: "wrong_email@example.xyz",
      password: "$£°a+ù%è`²47G\"(@",
    });

    const user = await users.findOne({
      where: { email: "mail@example.xyz" },
    });

    expect(user).not.toBeNull();
    if (user == null) {
      return;
    }

    const {
      session_token,
      session_token_expiration,
    } = user;

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(session_token).toBeNull();
    expect(session_token_expiration).toBeNull();
  });


  test("Authentificate bad password", async () => {
    const users = database.getRepository(User);
    users.insert({
      first_name: "first name",
      last_name: "last name",
      password_hash: await bcrypt.hash("$£°a+ù%è`²47G\"(@", 12),
      email: "mail@example.xyz",
      phone_number: "0000000000",
      admin: false,
    });

    const response = await supertest(app).post("/authentificate").send({
      email: "mail@example.xyz",
      password: "$£°a+ù%èbad_password`²47G\"(@",
    });

    const user = await users.findOne({
      where: { email: "mail@example.xyz" },
    });

    expect(user).not.toBeNull();
    if (user == null) {
      return;
    }

    const {
      session_token,
      session_token_expiration,
    } = user;

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(session_token).toBeNull();
    expect(session_token_expiration).toBeNull();
  });
});
