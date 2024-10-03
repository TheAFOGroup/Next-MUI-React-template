/**
 * @jest-environment node
 */

import { getDatabase } from "jest.setup";

import { User } from "@/app/api/_lib/DBService/types/next-auth";
import { Signup } from "@/app/api/auth/signup/signup";

describe("Signup", () => {
  let db: D1Database;

  beforeAll(async () => {
    db = getDatabase();
  });

  it("should create a new user", async () => {
    const data = {
      email: "test@example.com",
      password: "testpassword",
      authorize: {
        admin: false,
      },
    };

    const userId = await Signup(db, data);

    // Assert that the user was created
    expect(userId).toBeDefined();

    // Assert that the user exists in the database
    const user = await db.prepare(
      "SELECT * FROM users WHERE id = ?",
    ).bind(userId).first<User>();
    expect(user).toBeDefined();
    expect(user?.email).toBe(data.email);
  });

  // Add more test cases...
});