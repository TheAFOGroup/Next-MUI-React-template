/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import dayjs from 'dayjs';
import { getDatabase } from 'jest.setup';

import { GetEvent } from './GetEvent';

describe('GetEvent', () => {
  let db: D1Database;

  beforeAll(async () => {
    db = await getDatabase();

    // Insert dummy data for forms
    const statements = [
      `
        INSERT INTO forms (form_UUID, form_name, form_owner, form_description)
        VALUES
          ('uuid-1', 'Test Form', 'Owner 1', 'This is a test form'),
          ('uuid-2', 'Another Test Form', 'Owner 2', 'This is another test form');
      `,
      `
        INSERT INTO form_fields (form_id, field_name, field_type, field_order)
        VALUES
          (1, 'Name', 'text', 1),
          (1, 'Field 2', 'checkbox', 2),
          (2, 'Age', 'number', 1),
          (2, 'Gender', 'radio', 2);
      `,
      `
        INSERT INTO field_info (form_field_id, field_info_item)
        VALUES
          (1, 'gmail.com');
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
        INSERT INTO events (event_url, event_name, event_description, event_date, event_time, event_location, event_owner, created_at, updated_at)
        VALUES ('uuid-1234', 'Sample Event', 'This is a sample event', '2024-09-30T13:14:26.000Z', '2024-09-30T13:14:26.000Z', 'Sample Location', 'owner-1234', '2024-08-15T13:07:59.578Z', '2024-08-15T13:07:59.578Z');
      `,
      `
        INSERT INTO events_speaker (events_speaker_name, events_speaker_title, events_speaker_bio, events_speaker_image_url, events_speaker_type, events_speaker_enabled, events_speaker_owner, created_at, updated_at)
        VALUES ('Speaker 1', 'Title 1', 'Bio 1', 'http://example.com/image1.jpg', 1, true, 'owner-1234', '2024-08-15T13:07:59.578Z', '2024-08-15T13:07:59.578Z');
      `,
      `
        INSERT INTO events_event_speaker (event_id, events_speaker_id)
        VALUES (1, 1);
      `,
      `
        INSERT INTO events_agenda (events_agenda_event_id, events_agenda_title, events_agenda_description, events_agenda_start_time, events_agenda_end_time, events_agenda_enabled, events_agenda_created_at, events_agenda_updated_at)
        VALUES (1, 'Agenda 1', 'Description 1', '2024-09-30 14:14:26', '2024-09-30 14:14:26', true, '2024-08-15T13:07:59.578Z', '2024-08-15T13:07:59.578Z');
      `,
      `
        INSERT INTO events_iframes (event_id, title, url, enabled, created_at, updated_at)
        VALUES (1, 'Iframe 1', 'http://example.com/iframe1', true, '2024-08-15T13:07:59.578Z', '2024-08-15T13:07:59.578Z');
      `,
      `
        INSERT INTO events_html (event_id, html_content, enabled, created_at, updated_at)
        VALUES (1, '<p>Sample HTML content</p>', true, '2024-08-15T13:07:59.578Z', '2024-08-15T13:07:59.578Z');
      `,
      `
        INSERT INTO events_forms (event_id, form_id)
        VALUES (1, 1);
      `,
      `
        INSERT INTO events_layouts (event_id, template, css)
        VALUES (1, "default", "default.css");
      `

    ];

    const batchStatements = statements.map(statement => db.prepare(statement));

    await db.batch(batchStatements);
  });

  const expectedStatement = {
    "event_id": 1,
    "created_at": expect.anything(),
    "updated_at": expect.anything(),
    "event_name": "Sample Event",
    "event_description": "This is a sample event",
    "event_date": dayjs("2024-09-30T13:14:26.000Z"),
    "event_time": dayjs("2024-09-30T13:14:26.000Z"),
    "event_location": "Sample Location",
    "event_owner": "owner-1234",
    "event_template": "default",
    "event_css": "default.css",
    "eventSpeaker": [
      {
        "events_speaker_id": 1,
        "events_speaker_name": "Speaker 1",
        "events_speaker_title": "Title 1",
        "events_speaker_bio": "Bio 1",
        "events_speaker_image_url": "http://example.com/image1.jpg",
        "events_speaker_type": 1,
        "events_speaker_enabled": 1,
        "events_speaker_owner": "owner-1234",
        "created_at": expect.anything(),
        "updated_at": expect.anything()
      }
    ],
    "eventAgenda": [
      {
        "events_agenda_title": "Agenda 1",
        "events_agenda_description": "Description 1",
        "events_agenda_start_time": dayjs("2024-09-30T13:14:26.000Z"),
        "events_agenda_end_time": dayjs("2024-09-30T13:14:26.000Z")
      }
    ],
    "event_HTMLContent": [
      "<p>Sample HTML content</p>"
    ],
    //"event_template": "Template 1",
    "eventForm": {
      "form_id": 1,
      "form_name": "Test Form",
      "form_description": "This is a test form",
      "form_fields": [
        {
          "field_name": "Name",
          "field_type": "text",
          "field_order": 1,
          "field_info": ["gmail.com"],
          "form_id": 1,
          "form_field_id": 1
        },
        {
          "field_name": "Field 2",
          "field_type": "checkbox",
          "field_info": [],
          "field_order": 2,
          "form_id": 1,
          "form_field_id": 2
        }
      ]
    }
  }

  it('should retrieve the event by uuid', async () => {
    const event = await GetEvent(db, 'uuid-1234');
    expect(event).toEqual(expectedStatement);
  });

});