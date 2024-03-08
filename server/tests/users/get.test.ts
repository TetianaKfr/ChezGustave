import supertest from "supertest";
import database from "../../src/database";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";
import Housing from "../../src/entities/Housing";
import Booking from "../../src/entities/Booking";
import User from "../../src/entities/User";

describe("Get users", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    await insertAdmin();
    await insertUser();

    const users = database.getRepository(User);
    const housings = database.getRepository(Housing);
    const bookings = database.getRepository(Booking);

    const user = await users.findOneBy({ email: "user" });
    const admin = await users.findOneBy({ email: "admin" });

    expect(user).not.toBeNull();
    expect(admin).not.toBeNull();

    if (user == null || admin == null) {
      return;
    }

    const housing = await housings.save({
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

    await bookings.save({
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 27),
      chef_available: false,
      visit_date: new Date(2024, 2, 12),
      housing: housing,
      user: user,
    });

    await bookings.save({
      start: new Date(2024, 3, 10),
      end: new Date(2024, 3, 19),
      chef_available: true,
      visit_date: new Date(2024, 2, 27),
      housing: housing,
      user: user,
    });
  });

  afterEach(async () => { await database.destroy(); });

  test("Get user success connected as admin getting another user", async () => {
    const response = await supertest(app)
      .post("/user")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ email: "user" });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe("user");
    expect(response.body.last_name).toBe("user");
    expect(response.body.phone_number).toBe("user");
    expect(response.body.admin).toBe(false);
    for (const booking of bookings) {
      expect(response.body.bookings).toContain(booking.id);
    }
    expect(response.body.bookings.length).toBe(bookings.length);
  });

  test("Get user success connected as user", async () => {
    const response = await supertest(app)
      .post("/user")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ email: "user" });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe("user");
    expect(response.body.last_name).toBe("user");
    expect(response.body.phone_number).toBe("user");
    expect(response.body.admin).toBe(false);
    for (const booking of bookings) {
      expect(response.body.bookings).toContain(booking.id);
    }
    expect(response.body.bookings.length).toBe(bookings.length);
  });

  test("Get user unauthorized connected as user getting another user", async () => {
    const response = await supertest(app)
      .post("/user")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ email: "admin" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Get user unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/user")
      .send({ email: "admin" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  test("Get user unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/user")
      .auth("dhqzgeiqdhcvubruiqhziodhc:admin", { type: "bearer" })
      .send({ email: "admin" });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });
});
