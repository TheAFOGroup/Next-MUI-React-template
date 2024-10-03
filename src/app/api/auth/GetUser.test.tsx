/**
 * @jest-environment node
 */

import { getDatabase } from 'jest.setup';
import { D1Database } from '@cloudflare/workers-types';
import { GetUser, User } from '@/app/api/auth/GetUser';

describe('GetUser', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
    const statements = [
      `INSERT INTO users (id, name, email, emailVerified, image, password) 
       VALUES ('user_id_123', 'John Doe', 'john.doe@example.com', NULL, 'http://example.com/johndoe.jpg', '1234'),
       ('user_id_124', 'Jane Doe', 'jane.doe@example.com', NULL, 'http://example.com/janedoe.jpg', '1234');`,
      `INSERT INTO accounts (id, userId, type, provider, providerAccountId) 
       VALUES ('account_id_123', 'user_id_123', 'oauth', 'google', 'provider_account_id_123'),
       ('account_id_124', 'user_id_124', 'oauth', 'google', 'provider_account_id_124');`,
      `INSERT INTO authorize (id, admin) VALUES ('user_id_123', true), ('user_id_124', false);`
    ];

    const batchStatements = statements.map((statement) => db.prepare(statement));

    await db.batch(batchStatements);
  });

  // Rest of the test cases...

  it('should return user data if user exists', async () => {
    const email = 'john.doe@example.com';
    const expectedUser: User = {
      id: 'user_id_123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: null,
      image: 'http://example.com/johndoe.jpg',
      password: '1234'
    };

    const user = await GetUser(db, email);
    expect(user).toEqual(expectedUser);
  });
});