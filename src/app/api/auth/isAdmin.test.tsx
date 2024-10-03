/**
 * @jest-environment node
 */

import { getDatabase } from 'jest.setup';

import { HasAdmin, IsAdmin } from "@/app/api/auth/IsAdmin";

describe('isAdmin', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
    const statements = [
      `
     INSERT INTO users (id, name, email, emailVerified, image, password) 
  VALUES ('user_id_123', 'John Doe', 'john.doe@example.com', NULL, 'http://example.com/johndoe.jpg', '1234'),
  ('user_id_124', 'Jane Doe', 'jane.doe@example.com', NULL, 'http://example.com/janedoe.jpg', '1234');
      `,
      `
       INSERT INTO accounts (id, userId, type, provider, providerAccountId) 
  VALUES ('account_id_123', 'user_id_123', 'oauth', 'google', 'provider_account_id_123'),
  ('account_id_124', 'user_id_124', 'oauth', 'google', 'provider_account_id_124');
      `,
      `
    INSERT INTO authorize (id, admin) VALUES ('user_id_123', true),('user_id_124', false);
      `
    ];


    const batchStatements = statements.map(statement => db.prepare(statement));

    await db.batch(batchStatements);
  })


  it('should return true if user role is admin', async () => {
    const result = await IsAdmin(db, "user_id_123");
    expect(result).toBe(true);
  });

  it('should return false if user role is not admin', async () => {
    const result = await IsAdmin(db, "user_id_124");
    expect(result).toBe(false);
  });

  // Rest of the test cases...
  it('should return true if user has admin role', async () => {
    const result = await HasAdmin(db);
    expect(result).toBe(true);
  });

  it('should return false if user does not have admin role', async () => {
    const statements =
      `
     DELETE FROM authorize WHERE id = 'user_id_123';
      `
    await db.exec(statements);

    const result = await HasAdmin(db);
    expect(result).toBe(false);
  });
});