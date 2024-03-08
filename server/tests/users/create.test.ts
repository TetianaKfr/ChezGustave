import supertest from "supertest";
import bcrypt from "bcrypt";

import database from "../../src/database";
import User from "../../src/entities/User";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe('Create user', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();
  });

  afterEach(async () => { await database.destroy() });

  test("Create user success", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(response.status).toBe(201);
    expect(user).not.toBeNull();
    if (user == null) {
      return;
    }

    expect(response.text).toBe("Created");
    expect(user.first_name).toBe("First Name");
    expect(user.last_name).toBe("Last Name");
    expect(await bcrypt.compare("@~#`password", user.password_hash)).toBe(true);
    expect(user.email).toBe("mail@example.xyz");
    expect(user.phone_number).toBe("1234");
    expect(user.session_token).toBeNull();
    expect(user.session_token_expiration).toBeNull();
    expect(user.admin).toBe(false);
  });

  test("Create admin success", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: true,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).not.toBeNull();
    if (user == null) {
      return;
    }

    expect(response.status).toBe(201);
    expect(response.text).toBe("Created");
    expect(user.first_name).toBe("First Name");
    expect(user.last_name).toBe("Last Name");
    expect(await bcrypt.compare("@~#`password", user.password_hash)).toBe(true);
    expect(user.email).toBe("mail@example.xyz");
    expect(user.phone_number).toBe("1234");
    expect(user.session_token).toBeNull();
    expect(user.session_token_expiration).toBeNull();
    expect(user.admin).toBe(true);
  });


  test("Create user unauthorized connected as user", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create admin unauthorized connected as user", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: true,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create user unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create admin unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: true,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });


  test("Create user unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth("dqzdqdqzdqzdqzd:admin", { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Create admin unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth("dqzdqdqzdqzdqzd:admin", { type: "bearer" })
      .send({
        first_name: "First Name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: true,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  
  test("Create user missing first name", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });

  test("Create user missing last name", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });

  test("Create user missing email", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First name",
        last_name: "Last Name",
        password: "@~#`password",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });

  test("Create user missing password", async () => {
    const response = await supertest(app)
      .post("/users/")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        phone_number: "1234",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });

  test("Create user missing phone number", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        admin: false,
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });

  test("Create user missing admin", async () => {
    const response = await supertest(app)
      .post("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        first_name: "First name",
        last_name: "Last Name",
        email: "mail@example.xyz",
        password: "@~#`password",
        phone_number: "1234",
      });

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email: "mail@example.xyz" } });

    expect(user).toBeNull();
    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
  });
});
