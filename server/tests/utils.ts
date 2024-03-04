import supertest from "supertest";
import bcrypt from "bcrypt";

import database from "../src/database";
import app from "../src/app";
import User from "../src/entities/User";

export async function initAndClearDatabase() {
  if (!database.isInitialized) {
    await database.initialize();
  }

  const entities_names = database.entityMetadatas.map(entity => '"' + entity.tableName + '"').join(", ");
  console.log("TRUNCATE " + entities_names + " CASCADE;");
  await database.query("TRUNCATE " + entities_names + " CASCADE;");
}

export async function authenticate(email: string, password: string): Promise<any> {
  const authentification_response = await supertest(app)
    .post("/authenticate")
    .send({
      email,
      password,
    });

  const token = authentification_response.body.token;
  expect(token).not.toBeNull();
  return token;
}

export async function insertAdmin() {
  await database.getRepository(User).insert({
    first_name: "admin",
    last_name: "admin",
    password_hash: await bcrypt.hash("admin", 12),
    email: "admin",
    phone_number: "admin",
    admin: true,
  });
}

export async function insertUser() {
  await database.getRepository(User).insert({
    first_name: "user",
    last_name: "user",
    password_hash: await bcrypt.hash("user", 12),
    email: "user",
    phone_number: "user",
    admin: false,
  });
}
