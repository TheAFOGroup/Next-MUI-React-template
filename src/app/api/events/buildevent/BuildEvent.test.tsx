/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import dayjs from 'dayjs';
import { getDatabase } from 'jest.setup';

import { BuildEvent } from './BuildEvent';
import { BuildEventType } from './types';
import { EventLayout } from '@/app/api/_lib/DBService/types/events';


describe('BuildEvent', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
  });

  it('should insert the event and its details into the database', async () => {
    const owner = "admin";

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

    await db.prepare(`
      INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_owner, events_speaker_enabled, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      "Jane Smith",
      "Keynote Speaker",
      "Jane Smith is an expert in AI and machine learning.",
      "http://example.com/janesmith.jpg",
      1,
      owner,
      1,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    const statements = [
      `
        INSERT INTO forms (form_UUID, form_name, form_owner, form_description)
        VALUES
          ('uuid-1', 'Test Form', 'Owner 1', 'This is a test form'),
          ('uuid-2', 'Another Test Form', 'Owner 2', 'This is another test form');
      `,
      `
        INSERT INTO form_fields (form_id, field_name, field_type,field_order)
        VALUES
          (1, 'Name', 'text',1),
          (1, 'Field 2', 'checkbox',2),
          (2, 'Age', 'number',1),
          (2, 'Gender', 'radio',2);
      `,
      `
        INSERT INTO user_responses (form_id)
        VALUES
          (1),
          (2);
      `,
      `
        INSERT INTO response_entries (response_id, form_field_id, response)
        VALUES
          (1, 1, 'John Doe'),
          (1, 2, 'john.doe@example.com'),
          (2, 3, '30'),
          (2, 4, 'Male');
      `,
      `
        INSERT INTO field_info (field_info_id, form_field_id, field_info_item)
        VALUES
          (1, 1, 'gmail.com');
      `
    ];

    const batchStatements = statements.map(statement => db.prepare(statement));

    await db.batch(batchStatements);


    // ...

    const data: BuildEventType = {
      "event_name": "Annual Conference",
      "event_description": "A conference to discuss annual progress",
      "event_date": dayjs(), // Use current date
      "event_time": dayjs(), // Use current time
      "event_location": "Conference Hall A",
      "eventSpeaker": [1, 2],
      "eventAgenda": [
        {
          "events_agenda_title": "Opening Ceremony",
          "events_agenda_description": "Welcome speech and introduction",
          "events_agenda_start_time": dayjs(),
          "events_agenda_end_time": dayjs()
        },
        {
          "events_agenda_title": "Keynote Speech",
          "events_agenda_description": "Keynote speech by the CEO",
          "events_agenda_start_time": dayjs(),
          "events_agenda_end_time": dayjs()
        }
      ],
      "event_HTMLContent": ["<p>Welcome to the Annual Conference</p>"],
      "event_template": "default",
      "event_form_id": 1,
      "event_owner": "Jane Smith",
      "event_css": "css"
    }

    const res: any = await BuildEvent(db, data);

    expect(res).toEqual({
      message: "Data received successfully",
      respond: expect.objectContaining({
        URL: expect.any(String)
      })
    });

    const event = await db.prepare("SELECT * FROM events WHERE event_id = 1").first();
    expect(event).toEqual({
      event_id: 1,
      event_url: expect.any(String),
      event_name: data.event_name,
      event_description: data.event_description,
      event_date: data.event_date?.toString(),
      event_time: data.event_time?.toString(),
      event_location: data.event_location,
      event_owner: data.event_owner,
      created_at: expect.any(String),
      updated_at: expect.any(String)
    });

    // Select from events_event_speaker table
    const eventSpeaker = await db.prepare(`
      SELECT *
      FROM events_event_speaker
    `).all();

    expect(eventSpeaker.results).toEqual(
      [{ "event_id": 1, "events_speaker_id": 1 },
      { "event_id": 1, "events_speaker_id": 2 }]);

    // Select from events_forms table

    const eventForm = await db.prepare(`
      SELECT *
      FROM events_forms
      WHERE event_id = 1
    `).first();
    expect(eventForm).toEqual(expect.objectContaining({
      event_id: 1,
      form_id: 1
    }));

    // Select from events_html_content table
    const eventHTMLContent = await db.prepare(`
      SELECT event_id, html_content
      FROM events_html
      WHERE event_id = 1
    `).first();
    expect(eventHTMLContent).toEqual({
      event_id: 1,
      html_content: data.event_HTMLContent?.[0] ?? ""
    });

    const eventLayout = await db.prepare(`
      SELECT event_id, template, css
      FROM events_layouts
      WHERE event_id = 1
    `).first();
    expect(eventLayout).toEqual({
      event_id: 1,
      template: data.event_template ?? "",
      css: data.event_css ?? ""
    });

    // Select from events_agenda table
    const eventAgenda = await db.prepare(`
      SELECT *
      FROM events_agenda
      WHERE events_agenda_event_id = 1
    `).all();
    expect(eventAgenda.results).toHaveLength(2);
    expect(eventAgenda.results).toEqual(expect.arrayContaining([
      expect.objectContaining({
        events_agenda_event_id: 1,
        events_agenda_title: "Opening Ceremony",
        events_agenda_description: "Welcome speech and introduction",
        events_agenda_start_time: expect.any(String),
        events_agenda_end_time: expect.any(String)
      }),
      expect.objectContaining({
        events_agenda_event_id: 1,
        events_agenda_title: "Keynote Speech",
        events_agenda_description: "Keynote speech by the CEO",
        events_agenda_start_time: expect.any(String),
        events_agenda_end_time: expect.any(String)
      })
    ]));
  });
});