import bcrypt from "bcrypt";

import database from "../../src/database";
import User from "../../src/entities/User";
import { authentificate, initAndClearDatabase } from "../utils";
import supertest from "supertest";
import app from "../../src/app";

describe('List users', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await database.getRepository(User).insert({
      first_name: "admin",
      last_name: "admin",
      password_hash: await bcrypt.hash("admin", 12),
      email: "admin_email",
      phone_number: "admin",
      admin: true,
    });

    await database.getRepository(User).insert({
      first_name: "user",
      last_name: "user",
      password_hash: await bcrypt.hash("user", 12),
      email: "user_email",
      phone_number: "user",
      admin: false,
    });
  });

  test("List users success", async () => {
    const response = await supertest(app)
      .get("/users/")
      .auth(await authentificate("admin_email", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("admin_email");
    expect(response.body).toContain("user_email");
    expect(response.body.length).toBe(2);
  });

  test("List users unauthorized connected as user", async () => {
    const response = await supertest(app)
      .get("/users/")
      .auth(await authentificate("user_email", "user"), { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List users unauthorized not connected", async () => {
    const response = await supertest(app)
      .get("/users/");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List users unauthorized invalid token", async () => {
    const response = await supertest(app)
      .get("/users/")
      .auth("zdhqzkioghzesuiqfigsh:admin_email", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
