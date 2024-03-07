import supertest from "supertest";
import database from "../../src/database";
import Booking from "../../src/entities/Booking";
import Housing from "../../src/entities/Housing";
import User from "../../src/entities/User";
import { authenticate, initAndClearDatabase, insertAdmin, insertUser } from "../utils";
import app from "../../src/app";

describe("Modify bookings", () => {
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
      start: new Date(2024, 2, 20),
      end: new Date(2024, 2, 27),
      chef_available: false,
      visit_date: new Date(2024, 2, 12),
      housing: housing,
      user: admin,
    });
  });

  test("Modify booking success connected as admin modifying other's booking", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .auth(await authenticate("admin", "admin"), { type: "bearer" })
      .send({
        id: booking_id,
        start: new Date(2028, 2, 20).toDateString(),
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
        visit_date: new Date(2028, 2, 12).toDateString(),
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(booking.start).toStrictEqual(new Date(2028, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2028, 2, 27));
    expect(booking.chef_available).toBe(true);
    expect(booking.visit_date).toStrictEqual(new Date(2028, 2, 12));
  });

  test("Modify booking success connected as user", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        id: booking_id,
        start: new Date(2028, 2, 20).toDateString(),
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
        visit_date: new Date(2028, 2, 12).toDateString(),
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(booking.start).toStrictEqual(new Date(2028, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2028, 2, 27));
    expect(booking.chef_available).toBe(true);
    expect(booking.visit_date).toStrictEqual(new Date(2028, 2, 12));
  });

  test("Modify booking success partial", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        id: booking_id,
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    expect(booking.start).toStrictEqual(new Date(2024, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2028, 2, 27));
    expect(booking.chef_available).toBe(true);
    expect(booking.visit_date).toStrictEqual(new Date(2024, 2, 12));
  });

  test("Modify booking unauthorized connected as user modifying other's booking", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "admin" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .auth(await authenticate("user", "user"), { type: "bearer" })
      .send({
        id: booking_id,
        start: new Date(2028, 2, 20).toDateString(),
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
        visit_date: new Date(2028, 2, 12).toDateString(),
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(booking.start).toStrictEqual(new Date(2024, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2024, 2, 27));
    expect(booking.chef_available).toBe(false);
    expect(booking.visit_date).toStrictEqual(new Date(2024, 2, 12));
  });

  
  test("Modify booking unauthorized not connected", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .send({
        id: booking_id,
        start: new Date(2028, 2, 20).toDateString(),
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
        visit_date: new Date(2028, 2, 12).toDateString(),
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(booking.start).toStrictEqual(new Date(2024, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2024, 2, 27));
    expect(booking.chef_available).toBe(false);
    expect(booking.visit_date).toStrictEqual(new Date(2024, 2, 12));
  });

  
  test("Modify booking unauthorized connected as user modifying other's booking", async () => {
    const bookings = database.getRepository(Booking);

    const old_booking = await bookings.findOneBy({ user: { email: "user" } });
    expect(old_booking).not.toBeNull();
    if (old_booking == null) {
      return;
    }
    const booking_id = old_booking.id;

    const response = await supertest(app)
      .put("/booking")
      .auth("qehfqehguivbhibfqhdfriohsgwf:admin", { type: "bearer" })
      .send({
        id: booking_id,
        start: new Date(2028, 2, 20).toDateString(),
        end: new Date(2028, 2, 27).toDateString(),
        chef_available: true,
        visit_date: new Date(2028, 2, 12).toDateString(),
      });

    const booking = await bookings.findOneBy({ id: booking_id });
    expect(booking).not.toBeNull();
    if (booking == null) {
      return;
    }

    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
    expect(booking.start).toStrictEqual(new Date(2024, 2, 20));
    expect(booking.end).toStrictEqual(new Date(2024, 2, 27));
    expect(booking.chef_available).toBe(false);
    expect(booking.visit_date).toStrictEqual(new Date(2024, 2, 12));
  });
});
