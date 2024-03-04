import supertest from "supertest";

import database from "../src/database";
import app from "../src/app";

export async function initAndClearDatabase() {
  if (!database.isInitialized) {
    await database.initialize();
  }

  const entities_names = database.entityMetadatas.map(entity => '"' + entity.tableName + '"').join(", ");
  console.log("TRUNCATE " + entities_names + " CASCADE;");
  await database.query("TRUNCATE " + entities_names + " CASCADE;");
}

export async function authentificate(email: string, password: string): Promise<any> {
  const authentification_response = await supertest(app)
    .post("/authentificate")
    .send({
      email,
      password,
    });

  const token = authentification_response.body.token;
  expect(token).not.toBeNull();
  return token;
}
