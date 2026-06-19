import { client } from "./client";

type QueryParams = Record<string, unknown>;

export function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {}
) {
  return client.fetch<QueryResponse>(query, params, {
    cache: "no-store",
  });
}
