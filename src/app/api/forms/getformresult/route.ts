export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { GetFormResult } from '@/app/api/forms/getformresult/getformresult';

/**
 * Retrieves a form based on the provided form UUID.
 * 
 * @param req - The NextRequest object representing the incoming request. 
 * form_uuid: string - The UUID of the form to retrieve.
 * @returns A JSON response containing the form data if successful, or an error message if unsuccessful.
 * @throws 401 - Unauthorized: The request does not include a valid API key.
 * @throws 500 - Internal Server Error: An error occurred while processing the request.
 * @throws 404 - Not Found: The form with the provided UUID does not exist.
 * @example GET /api/getform?form_uuid=12345678-1234-1234-1234-123456789012
 */
export async function GET(req: NextRequest) {
  if (!(await CheckAPIkey(req))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get('form_uuid');
  if (!uuid) {
    return NextResponse.json({ message: 'UUID is missing' }, { status: 400 });
  }

  try {
    const form = await GetFormResult(uuid);
    if (Object.keys(form as object).length > 0) {
      return NextResponse.json(form);
    } else {
      return NextResponse.json({ message: 'Form not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred while processing the request', error }, { status: 500 });
  }
}