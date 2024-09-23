/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { GetSpeakers } from './getspeakers';
describe('GetSpeakers', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
  });

  it('should retrieve the speakers from the database based on the owner', async () => {
    const owner = "admin@example.com";

    // Insert a test speaker into the database
    await db.prepare(`
      INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner, events_speaker_enabled, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      "John Doe",
      "Keynote Speaker",
      "John Doe is an expert in AI and machine learning.",
      "http://example.com/johndoe.jpg",
      1,
      owner,
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    const res = await GetSpeakers(db, owner);

    expect(res).toEqual([{
      events_speaker_name: "John Doe",
      events_speaker_title: "Keynote Speaker",
      events_speaker_bio: "John Doe is an expert in AI and machine learning.",
      events_speaker_image_url: "http://example.com/johndoe.jpg",
      events_speaker_type: expect.any(Number),
      events_speaker_owner: owner,
      events_speaker_id: expect.any(Number),
      events_speaker_enabled: 1,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }]
    )
  });
});