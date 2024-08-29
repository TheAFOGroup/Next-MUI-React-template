export const runtime = 'edge';

/**
 * Checks if the provided API key in the request headers matches the API secret.
 * @param request - The request object containing the headers.
 * @returns A promise that resolves to a boolean indicating whether the API key is valid.
 */
export async function CheckAPIkey(request: Request): Promise<boolean> {
  return request.headers.get("API_SECRET") === process.env.NEXT_PUBLIC_API_SECRET;
}