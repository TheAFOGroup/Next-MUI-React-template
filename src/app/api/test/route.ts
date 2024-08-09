import { NextResponse } from 'next/server';
export const runtime = 'edge';
export const GET = async () => {
  return NextResponse.json({
    data: [
      { label: 'Name', type: 'text' },
      { label: 'Email', type: 'email' },
      { label: 'Organization', type: 'text' },
      { label: 'Surname', type: 'text' },
      { label: 'Field', type: 'text' },
    ],
    method: 'GET'
  });
};