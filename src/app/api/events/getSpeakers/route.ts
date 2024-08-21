export const runtime = 'edge';
import { SearchParamDb } from '@/app/api/_lib/Searchparamdb';

export async function GET(request: Request) {
  return await SearchParamDb(request, "events_speaker")
}