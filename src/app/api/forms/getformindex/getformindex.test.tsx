/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { GetFormIndex } from './getformindex';

describe('GetFormIndex', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
  });

  it('should retrieve the forms from the database based on the owner', async () => {
    const user = "admin@example.com";

    // Insert a test form into the database
    await db.prepare(`
      INSERT INTO forms (form_UUID, form_name, form_description, form_owner, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      "123e4567-e89b-12d3-a456-426614174000",
      "Test Form",
      "This is a test form.",
      user,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    const res = await GetFormIndex(db, user);

    expect(res).toEqual([{
      form_UUID: "123e4567-e89b-12d3-a456-426614174000",
      form_name: "Test Form",
      form_description: "This is a test form.",
      form_owner: user,
      form_id: expect.any(Number),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }])
  });
});