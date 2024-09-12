/**
 * @jest-environment node
 */

import { TextDecoder, TextEncoder } from 'util';

// Polyfill TextDecoder and TextEncoder
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

import { beforeAll, afterAll } from '@jest/globals';
import { ExecuteSQLFile } from '@/app/api/_lib/DBService/ExecuteSQLFile';
import { Miniflare } from 'miniflare';


// Allow router mocks.
// eslint-disable-next-line no-undef
jest.mock('next/router', () => require('next-router-mock'));

let mf;
let db;

beforeAll(async () => {
  const nullScript = "export default {fetch: () => new Response(null, {status:404})};";
  mf = new Miniflare({
    modules: true,
    script: nullScript,
    d1Databases: { DB: "9df130c4-4a23-4539-9c29-27bdfe9aac4e" },
  });

  db = await mf.getD1Database("DB");

  await ExecuteSQLFile(db, '/home/apple/template/migrations/0002_user_responds.sql');
});

afterAll(async () => {
  // Clean up any resources, such as closing the database connection
  await mf.dispose();
});

export const getDatabase = () => db;