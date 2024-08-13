import { NextResponse } from 'next/server';
export const runtime = 'edge';
export const GET = async () => {
  return NextResponse.json([
    { field_name: 'Name', field_type: 'text' },
    { field_name: 'Email', field_type: 'email' },
    { field_name: 'Organization', field_type: 'text' },
    { field_name: 'Surname', field_type: 'text' },
    { field_name: 'Field', field_type: 'text' },
  ]);
};