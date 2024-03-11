import supertest from "supertest";
import database from "../../src/database";
import Booking from "../../src/entities/Booking";
import Housing from "../../src/entities/Housing";
import User from "../../src/entities/User";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Remove bookings", () => {
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

    const housing = await housings.save({
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

    await bookings.save({
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 27),
      chef_available: false,
      visit_date: new Date(2024, 2, 12),
      housing: housing,
      user: user,
    });

    await bookings.save({
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 27),
      chef_available: false,
      visit_date: new Date(2024, 2, 12),
      housing: housing,
      user: admin,
    });
  });

  afterEach(async () => { await database.destroy() });

  test("Remove booking success connected as admin removing other's booking", async () => {
    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }
    const booking_id = booking.id;

    const response = await supertest(app)
      .delete("/booking")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({ id: booking_id });

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(await bookings.findOneBy({ id: booking_id })).toBeNull();
  });

  test("Remove booking success connected as user", async () => {
    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }
    const booking_id = booking.id;

    const response = await supertest(app)
      .delete("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ id: booking_id });

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(await bookings.findOneBy({ id: booking_id })).toBeNull();
  });

  test("Remove booking unauthorized connected as user removing other's booking", async () => {
    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOneBy({ user: { email: "admin" } });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }
    const booking_id = booking.id;

    const response = await supertest(app)
      .delete("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({ id: booking_id });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(bookings.findOneBy({ id: booking_id })).not.toBeNull();
  });

  test("Remove booking unauthorized not connected", async () => {
    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }
    const booking_id = booking.id;

    const response = await supertest(app)
      .delete("/booking")
      .send({ id: booking_id });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(bookings.findOneBy({ id: booking_id })).not.toBeNull();
  });

  test("Remove booking unauthorized invalid token", async () => {
    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }
    const booking_id = booking.id;

    const response = await supertest(app)
      .delete("/booking")
      .auth("dhqibgvzuiqhdiohbgzbsf:admin", { type: "bearer" })
      .send({ id: booking_id });

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(bookings.findOneBy({ id: booking_id })).not.toBeNull();
  });
});
