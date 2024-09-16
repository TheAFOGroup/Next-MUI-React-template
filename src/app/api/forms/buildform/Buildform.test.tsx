/**
 * @jest-environment node
 */

import { D1Database } from '@cloudflare/workers-types';
import { getDatabase } from 'jest.setup';

import { BuildForm } from './Buildform';

import { BuildFormType } from '@/app/api/forms/buildform/type';

import { Form, FormField, FieldInfo } from '@/app/api/_lib/DBService/types/forms';

describe('BuildForm', () => {
  let db: D1Database;
  beforeAll(async () => {
    db = getDatabase();
  });

  it('should insert the form and its fields into the database', async () => {
    const data: BuildFormType = {
      "form_name": "Customer Feedback Form",
      "form_owner": "John Doe",
      "form_description": "A form to collect customer feedback",
      "form_fields": [
        {
          "field_name": "Email",
          "field_type": "text",
          "field_info": ["example.com"],
          "field_order": 1
        },
        {
          "field_name": "Subscribe",
          "field_type": "checkbox",
          "field_info": ["yes", "no"],
          "field_order": 2
        },
        {
          "field_name": "Rating",
          "field_type": "radio",
          "field_info": [],
          "field_order": 3
        }
      ]
    }

    const res = await BuildForm(db, data);

    expect(res).toEqual({
      message: "Data received successfully",
      respond: expect.objectContaining({
        UUID: expect.any(String)
      })
    });

    const form = await db.prepare("select * from forms").first<Form>();
    expect(form).toEqual(expect.objectContaining({
      form_name: "Customer Feedback Form",
      form_owner: "John Doe",
      form_description: "A form to collect customer feedback",
      form_UUID: expect.any(String),
      form_id: expect.any(Number),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));

    const formResult = await form;
    const formFields = await db.prepare("select * from form_fields where form_id = ?").bind(formResult?.form_id).all<FormField>();
    expect(formFields.results).toHaveLength(3);
    expect(formFields.results).toEqual([
      {
        form_field_id: expect.any(Number),
        form_id: expect.any(Number),
        field_name: "Email",
        field_type: "text",
        field_order: 1,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
      {
        form_field_id: expect.any(Number),
        form_id: expect.any(Number),
        field_name: "Subscribe",
        field_type: "checkbox",
        field_order: 2,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
      {
        form_field_id: expect.any(Number),
        form_id: expect.any(Number),
        field_name: "Rating",
        field_type: "radio",
        field_order: 3,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
    ]);


    const fieldInfo1 = await db.prepare(`SELECT fi.*
        FROM field_info fi
        JOIN form_fields ff ON fi.form_field_id = ff.form_field_id
        WHERE ff.field_order = ?;`).bind(1).all<FieldInfo>();
    expect(fieldInfo1.results).toHaveLength(1);
    expect(fieldInfo1.results[0]).toEqual(expect.objectContaining({
      field_info_id: expect.any(Number),
      form_field_id: expect.any(Number),
      field_info_item: "example.com"
    }));

    const fieldInfo2 = await db.prepare(`SELECT fi.*
      FROM field_info fi
      JOIN form_fields ff ON fi.form_field_id = ff.form_field_id
      WHERE ff.field_order = ?;`).bind(2).all<FieldInfo>();
    expect(fieldInfo2.results).toHaveLength(2);
    expect(fieldInfo2.results).toEqual([
      {
        field_info_id: expect.any(Number),
        form_field_id: expect.any(Number),
        field_info_item: "yes"
      },
      {
        field_info_id: expect.any(Number),
        form_field_id: expect.any(Number),
        field_info_item: "no"
      },

    ]);

    const fieldInfo3 = await db.prepare(`SELECT fi.*
      FROM field_info fi
      JOIN form_fields ff ON fi.form_field_id = ff.form_field_id
      WHERE ff.field_order = ?;`).bind(3).all<FieldInfo>();
    expect(fieldInfo3.results).toHaveLength(0);


  });
});