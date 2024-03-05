import supertest from "supertest";

import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe('List users', () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertUser();
    await insertAdmin();
  });

  test("List users success", async () => {
    const response = await supertest(app)
      .get("/users")
      .auth(await authenticate("admin", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toContain("admin");
    expect(response.body).toContain("user");
    expect(response.body.length).toBe(2);
  });

  test("List users unauthorized connected as user", async () => {
    const response = await supertest(app)
      .get("/users")
      .auth(await authenticate("user", "user"), { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List users unauthorized not connected", async () => {
    const response = await supertest(app)
      .get("/users");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List users unauthorized invalid token", async () => {
    const response = await supertest(app)
      .get("/users")
      .auth("zdhqzkioghzesuiqfigsh:admin", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
