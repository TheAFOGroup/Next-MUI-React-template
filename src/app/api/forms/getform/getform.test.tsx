/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { GetForm } from './getform';

import { Form } from '@/app/api/forms/getform/types';


describe('GetForm', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
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
  });

  it('should retrieve the form and its fields', async () => {
    const form = await GetForm(db, "uuid-1");
    expect(form).toEqual<Form>({
      form_id: 1,
      form_name: 'Test Form',
      form_description: 'This is a test form',
      form_fields: [
        {
          field_name: 'Name',
          field_type: 'text',
          field_order: 1,
          field_info: ["gmail.com"],
          form_id: 1,
          form_field_id: 1,
        },
        {
          field_name: 'Field 2',
          field_type: 'checkbox',
          field_info: [],
          field_order: 2,
          form_id: 1,
          form_field_id: 2,
        },
      ],
    });
  });
});