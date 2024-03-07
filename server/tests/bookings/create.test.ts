import supertest from "supertest";

import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import database from "../../src/database";
import User from "../../src/entities/User";
import Housing from "../../src/entities/Housing";
import app from "../../src/app";
import Booking from "../../src/entities/Booking";

describe("Create bookings", () => {
  beforeEach(async () => {
    await initAndClearDatabase();

    const users = database.getRepository(User);
    const housings = database.getRepository(Housing);

    await insertUser();
    await insertAdmin();

    const user = await users.findOneBy({ email: "user" });
    const admin = await users.findOneBy({ email: "admin" });

    expect(user).not.toBeNull();
    expect(admin).not.toBeNull();

    if (user == null || admin == null) {
      return;
    }

    await housings.save({
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
  });

  test("Create booking success connected as admin", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        housing_name: "Housing 1",
        start: new Date(2024, 2, 20).toDateString(),
        end: new Date(2024, 2, 27).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const booking = await database.getRepository(Booking).findOne({
      where: { user: { email: "admin" } },
      relations: { housing: true, user: true }
    });

    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(201);
    expect(response.text).toBe("Created");
    expect(booking.housing.name).toBe("Housing 1");
    expect(new Date(booking.start)).toStrictEqual(new Date(2024, 2, 20));
    expect(new Date(booking.end)).toStrictEqual(new Date(2024, 2, 27));
    expect(booking.chef_available).toBe(false);
    expect(new Date(booking.visit_date)).toStrictEqual(new Date(2024, 2, 12));
    expect(booking.user.email).toBe("admin");
  });

  test("Create booking success connected as user", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        housing_name: "Housing 1",
        start: new Date(2024, 2, 20).toDateString(),
        end: new Date(2024, 2, 27).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const booking = await database.getRepository(Booking).findOne({
      where: { user: { email: "user" } },
      relations: { housing: true, user: true }
    });

    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(201);
    expect(response.text).toBe("Created");
    expect(booking.housing.name).toBe("Housing 1");
    expect(new Date(booking.start)).toStrictEqual(new Date(2024, 2, 20));
    expect(new Date(booking.end)).toStrictEqual(new Date(2024, 2, 27));
    expect(booking.chef_available).toBe(false);
    expect(new Date(booking.visit_date)).toStrictEqual(new Date(2024, 2, 12));
    expect(booking.user.email).toBe("user");
  });

  test("Create booking unauthorized not connected", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .send({
        housing_name: "Housing 1",
        start: new Date(2024, 2, 20).toDateString(),
        end: new Date(2024, 2, 27).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(bookings.length).toBe(0);
  });

  test("Create booking unauthorized invalid token", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .auth("dqzjhfguiegqecivhfqzu:admin", { type: "bearer" })
      .send({
        housing_name: "Housing 1",
        start: new Date(2024, 2, 20).toDateString(),
        end: new Date(2024, 2, 27).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(bookings.length).toBe(0);
  });

  test("Create booking bad request missing field", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        housing_name: "Housing 1",
        start: new Date(2024, 2, 20).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request");
    expect(bookings.length).toBe(0);
  });

  test("Create booking not found inexisting housing", async () => {
    const response = await supertest(app)
      .post("/bookings")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        housing_name: "Housing 2",
        start: new Date(2024, 2, 20).toDateString(),
        end: new Date(2024, 2, 27).toDateString(),
        chef_available: false,
        visit_date: new Date(2024, 2, 12).toDateString(),
      });

    const bookings = await database.getRepository(Booking).find();

    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
    expect(bookings.length).toBe(0);
  });
});
