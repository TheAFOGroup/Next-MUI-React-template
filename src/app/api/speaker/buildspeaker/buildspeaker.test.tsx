/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { BuildSpeaker } from './buildspeaker';
import { BuildEventSpeaker } from '@/app/api/speaker/buildspeaker/types';
import { EventSpeaker } from '@/app/api/_lib/DBService/types/speaker';

describe('BuildSpeaker', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
  });

  it('should insert the speaker into the database', async () => {
    const data: BuildEventSpeaker = {
      events_speaker_name: "John Doe",
      events_speaker_title: "Keynote Speaker",
      events_speaker_bio: "John Doe is an expert in AI and machine learning.",
      events_speaker_image_url: "http://example.com/johndoe.jpg",
      events_speaker_owner: "admin@example.com",
      events_speaker_type: 1,
    };
    const res = await BuildSpeaker(db, data);

    expect(res).toEqual(expect.objectContaining({
      message: "Data received successfully"
    }));

    const speaker = await db.prepare("SELECT * FROM events_speaker WHERE events_speaker_name = ?")
      .bind(data.events_speaker_name)
      .first<EventSpeaker>();

    expect(speaker).toEqual(expect.objectContaining({
      events_speaker_name: "John Doe",
      events_speaker_title: "Keynote Speaker",
      events_speaker_bio: "John Doe is an expert in AI and machine learning.",
      events_speaker_image_url: "http://example.com/johndoe.jpg",
      events_speaker_type: expect.any(Number),
      events_speaker_owner: "admin@example.com",
      events_speaker_id: expect.any(Number),
      events_speaker_enabled: 1,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });
});