/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { GetSpeakers } from './getspeakers';
import { GetSpeakersRespond } from './types';
interface EventSpeakerId {
  events_speaker_id: number
}
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

    const res = await GetSpeakers(db, owner, []);

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
  })

  it('should retrieve the speakers from the database based on speakerIds', async () => {
    const owner = "admin@example.com";

    // Insert test speakers into the database
    const speaker1 = await db.prepare(`
      INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner, events_speaker_enabled, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) returning events_speaker_id
    `).bind(
      "Jane Smith",
      "Guest Speaker",
      "Jane Smith is a renowned data scientist.",
      "http://example.com/janesmith.jpg",
      2,
      owner,
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ).first<EventSpeakerId>();

    const speaker2 = await db.prepare(`
      INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner, events_speaker_enabled, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) returning events_speaker_id
    `).bind(
      "Alice Johnson",
      "Panelist",
      "Alice Johnson is a cybersecurity expert.",
      "http://example.com/alicejohnson.jpg",
      3,
      owner,
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ).first<EventSpeakerId>();

    const ids = [String(speaker1?.events_speaker_id), String(speaker2?.events_speaker_id)];
    console.log(ids)

    const speakers: GetSpeakersRespond[] = await GetSpeakers(db, null, ids) as GetSpeakersRespond[];
    console.log(speakers)
    expect(speakers[0].events_speaker_name).toBe("Jane Smith");
    expect(speakers[1].events_speaker_name).toBe("Alice Johnson");
  });
  ;
});