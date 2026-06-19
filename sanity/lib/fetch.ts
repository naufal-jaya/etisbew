import { client } from "./client";

type QueryParams = Record<string, unknown>;

export async function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {},
  retries: number = 3,
  delay: number = 1000
): Promise<QueryResponse> {
  try {
    return await client.fetch<QueryResponse>(query, params, {
      cache: "no-store",
    });
  } catch (error) {
    if (retries > 0) {
      console.warn(`Sanity fetch failed. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sanityFetch<QueryResponse>(query, params, retries - 1, delay * 2);
    }
    throw error;
  }
}
