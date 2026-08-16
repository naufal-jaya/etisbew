import { client } from "./client";

type QueryParams = Record<string, unknown>;

export async function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {},
  options: { revalidate?: number; tags?: string[] } = {},
  retries: number = 3,
  delay: number = 1000
): Promise<QueryResponse> {
  const { revalidate = 60, tags } = options;
  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate,
        tags,
      },
    });
  } catch (error) {
    if (retries > 0) {
      console.warn(`Sanity fetch failed. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return sanityFetch<QueryResponse>(query, params, options, retries - 1, delay * 2);
    }
    throw error;
  }
}
