import supertest from "supertest";
import database from "../../src/database";
import Booking from "../../src/entities/Booking";
import Housing from "../../src/entities/Housing";
import User from "../../src/entities/User";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Get booking", () => {
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
      bedroom_count: 1,
      bathroom_count: 1,
      category: "Category 1",
      type: "Type 1",
      chef: "Forfait sur mesure",
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
      bedroom_count: 2,
      bathroom_count: 2,
      category: "Category 2",
      type: "Type 2",
      chef: "Forfait sur mesure",
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
      visit_date: new Date(2024, 3, 9),
      housing: housing_2,
      user: admin,
    });
  });

  afterEach(async () => { await database.destroy() });

  test("Get bookings success as admin", async () => {
    const bookings_ids = (await database.getRepository(Booking).find()).map(booking => booking.id);
    
    const response_1 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ id: bookings_ids[0] });

    const response_2 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ id: bookings_ids[1] });

    const response_3 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ id: bookings_ids[2] });

    expect(response_1.status).toBe(200);
    expect(response_2.status).toBe(200);
    expect(response_3.status).toBe(200);

    expect(new Date(response_1.body.start)).toStrictEqual(new Date(2024, 2, 20));
    expect(new Date(response_1.body.end)).toStrictEqual(new Date(2024, 2, 27));
    expect(response_1.body.chef_available).toBe(false);
    expect(new Date(response_1.body.visit_date)).toStrictEqual(new Date(2024, 2, 12));
    expect(response_1.body.housing_name).toBe("Housing 1");
    expect(response_1.body.user_email).toBe("user");

    expect(new Date(response_2.body.start)).toStrictEqual(new Date(2024, 3, 10));
    expect(new Date(response_2.body.end)).toStrictEqual(new Date(2024, 3, 19));
    expect(response_2.body.chef_available).toBe(true);
    expect(new Date(response_2.body.visit_date)).toStrictEqual(new Date(2024, 2, 27));
    expect(response_2.body.housing_name).toBe("Housing 2");
    expect(response_2.body.user_email).toBe("user");

    expect(new Date(response_3.body.start)).toStrictEqual(new Date(2024, 3, 21));
    expect(new Date(response_3.body.end)).toStrictEqual(new Date(2024, 3, 28));
    expect(response_3.body.chef_available).toBe(true);
    expect(new Date(response_3.body.visit_date)).toStrictEqual(new Date(2024, 3, 9));
    expect(response_3.body.housing_name).toBe("Housing 2");
    expect(response_3.body.user_email).toBe("admin");
  });

  test("Get bookings success as user", async () => {
    const bookings_ids = (await database.getRepository(Booking).find()).map(booking => booking.id);

    const response_1 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ id: bookings_ids[0] });

    const response_2 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ id: bookings_ids[1] });

    const response_3 = await supertest(app)
      .post("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ id: bookings_ids[2] });

    expect(response_1.status).toBe(200);
    expect(response_2.status).toBe(200);
    expect(response_3.status).toBe(200);

    expect(new Date(response_1.body.start)).toStrictEqual(new Date(2024, 2, 20));
    expect(new Date(response_1.body.end)).toStrictEqual(new Date(2024, 2, 27));
    expect(response_1.body.chef_available).toBe(false);
    expect(new Date(response_1.body.visit_date)).toStrictEqual(new Date(2024, 2, 12));
    expect(response_1.body.housing_name).toBe("Housing 1");
    expect(response_1.body.user_email).toBe("user");

    expect(new Date(response_2.body.start)).toStrictEqual(new Date(2024, 3, 10));
    expect(new Date(response_2.body.end)).toStrictEqual(new Date(2024, 3, 19));
    expect(response_2.body.chef_available).toBe(true);
    expect(new Date(response_2.body.visit_date)).toStrictEqual(new Date(2024, 2, 27));
    expect(response_2.body.housing_name).toBe("Housing 2");
    expect(response_2.body.user_email).toBe("user");

    expect(new Date(response_3.body.start)).toStrictEqual(new Date(2024, 3, 21));
    expect(new Date(response_3.body.end)).toStrictEqual(new Date(2024, 3, 28));
    expect(response_3.body.chef_available).toBe(true);
    expect(new Date(response_3.body.visit_date)).toStrictEqual(new Date(2024, 3, 9));
    expect(response_3.body.housing_name).toBe("Housing 2");
    expect(response_3.body.user_email).toBe("admin");
  });

  test("Get bookings unauthorized not connected", async () => {
    const bookings_ids = (await database.getRepository(Booking).find()).map(booking => booking.id);

    const response_1 = await supertest(app)
      .post("/booking")
      .send({ id: bookings_ids[0] });

    const response_2 = await supertest(app)
      .post("/booking")
      .send({ id: bookings_ids[1] });

    const response_3 = await supertest(app)
      .post("/booking")
      .send({ id: bookings_ids[2] });

    expect(response_1.status).toBe(401);
    expect(response_2.status).toBe(401);
    expect(response_3.status).toBe(401);

    expect(response_1.text).toBe("Unauthorized");
    expect(response_2.text).toBe("Unauthorized");
    expect(response_3.text).toBe("Unauthorized");
  });

  test("Get bookings unauthorized invalid token", async () => {
    const bookings_ids = (await database.getRepository(Booking).find()).map(booking => booking.id);

    const response_1 = await supertest(app)
      .post("/booking")
      .auth("jeghuqfhilcbvhoqhfd:admin", { type: "bearer" })
      .send({ id: bookings_ids[0] });

    const response_2 = await supertest(app)
      .post("/booking")
      .auth("jeghuqfhilcbvhoqhfd:admin", { type: "bearer" })
      .send({ id: bookings_ids[1] });

    const response_3 = await supertest(app)
      .post("/booking")
      .auth("jeghuqfhilcbvhoqhfd:admin", { type: "bearer" })
      .send({ id: bookings_ids[2] });

    expect(response_1.status).toBe(401);
    expect(response_2.status).toBe(401);
    expect(response_3.status).toBe(401);

    expect(response_1.text).toBe("Unauthorized");
    expect(response_2.text).toBe("Unauthorized");
    expect(response_3.text).toBe("Unauthorized");
  });
});
