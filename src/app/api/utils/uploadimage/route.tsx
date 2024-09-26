export const runtime = 'edge';
export interface Env {
  DB: D1Database;
}
import { NextRequest, NextResponse } from 'next/server';

import { CheckAPIkey } from '@/app/api/_lib/CheckAPIkey';
import { UploadImageRespond } from '@/app/api/utils/uploadimage/types';
export async function POST(request: NextRequest) {
  if (!(await CheckAPIkey(request))) {
    return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
  }
  try {
    const formData = await request.formData();

    const image = formData.get('file');
    const exif = formData.get('exif');
    if (exif !== null) {
      formData.append('metadata', exif.toString());
      formData.delete('exif');
    }
    if (!image) {
      return NextResponse.json(
        { error: 'No image from form' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
        },
      }
    );
    const body: any = await response.json();

    if (body.success !== true) {
      return NextResponse.json(
        { error: 'Cloudflare error', body: body.errors },
        { status: 400 }
      );
    }

    const data: UploadImageRespond = {
      cloudflareId: body.result.id,
    };
    console.log(body.result)
    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}