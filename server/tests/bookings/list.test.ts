import supertest from "supertest";

import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import database from "../../src/database";
import Housing from "../../src/entities/Housing";
import Booking from "../../src/entities/Booking";
import User from "../../src/entities/User";
import app from "../../src/app";

describe("List bookings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    const users = database.getRepository(User);
    const housings = database.getRepository(Housing);
    const bookings = database.getRepository(Booking);

    await insertUser();
    await insertAdmin();

    const user = await users.findOneBy({ email: "user" });
    const admin = await users.findOneBy({ email: "admin" });

    expect(user).not.toBeNull();
    expect(admin).not.toBeNull();

    if (user == null || admin == null) {
      return;
    }

    const housing_1 = await housings.save({
      name: "Housing 1",
      images_urls: [],
      area: "Area 1",
      description: "Description 1",
      low_price: 1,
      medium_price: 1,
      high_price: 1,
      surface: 1,
      bathroom_count: 1,
      category: "Category 1",
      type: "Type 1",
      equipments: [],
      ratings: [],
    });

    const housing_2 = await housings.save({
      name: "Housing 2",
      images_urls: [],
      area: "Area 2",
      description: "Description 2",
      low_price: 2,
      medium_price: 2,
      high_price: 2,
      surface: 2,
      bathroom_count: 2,
      category: "Category 2",
      type: "Type 2",
      equipments: [],
      ratings: [],
    });

    await bookings.save({
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 27),
      chef_available: false,
      visit_date: new Date(2024, 2, 12),
      housing: housing_1,
      user: user,
    });

    await bookings.save({
      start: new Date(2024, 3, 10),
      end: new Date(2024, 3, 19),
      chef_available: true,
      visit_date: new Date(2024, 2, 27),
      housing: housing_2,
      user: user,
    });

    await bookings.save({
      start: new Date(2024, 3, 21),
      end: new Date(2024, 3, 28),
      chef_available: true,
      visit_date: new Date(2024, 10, 9),
      housing: housing_2,
      user: admin,
    });
  });

  afterEach(async () => { await database.destroy() });

  test("List bookings success connected as admin", async () => {
    const response = await supertest(app)
      .get("/bookings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test("List bookings success connected as user", async () => {
    const response = await supertest(app)
      .get("/bookings")
      .auth(await authenticate("user", "user"), { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test("List bookings unauthorized not connected", async () => {
    const response = await supertest(app)
      .get("/bookings");

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("List bookings unauthorized invalid token", async () => {
    const response = await supertest(app)
      .get("/bookings")
      .auth("qzjkdhqzfadhqzlhsjv:admin", { type: "bearer" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
