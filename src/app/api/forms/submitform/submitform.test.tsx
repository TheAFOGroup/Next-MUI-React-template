/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { SubmitForm } from './submitform';

import { SubmitFormType } from '@/app/api/forms/submitform/types';

describe('SubmitForm', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
    const statements = [
      `
        INSERT INTO forms (form_id,form_uuid, form_name, form_owner, form_description)
        VALUES
          (1,"uuid-1", 'Test Form', 'Owner 1', 'This is a test form');
      `,
      `
        INSERT INTO form_fields (form_field_id, form_id, field_name, field_type, field_order)
        VALUES
          (1, 1, 'Name', 'text', 1),
          (2, 1, 'Email', 'email', 2);
      `,
    ];

    const batchStatements = statements.map((statement) => db.prepare(statement));

    await db.batch(batchStatements);
  });

  it('should insert a new form response into the database', async () => {
    const myDb = getDatabase();
    const data: SubmitFormType = {
      form_id: 1,
      form_fields: [
        { form_field_id: 1, response: 'John Doe' },
        { form_field_id: 2, response: 'john.doe@example.com' },
      ],
    };

    const res = await SubmitForm(myDb, data);

    expect(res).toBeDefined();
    expect(res.success).toBe(true);
  });

  it('should throw an error if the form is not found in the database', async () => {
    const myDb = getDatabase();
    const data: SubmitFormType = {
      form_id: 2,
      form_fields: [
        { form_field_id: 1, response: 'John Doe' },
        { form_field_id: 2, response: 'john.doe@example.com' },
      ],
    };

    await expect(SubmitForm(myDb, data)).rejects.toThrow('Form not found');
  });
});