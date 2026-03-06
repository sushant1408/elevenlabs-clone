import type { Metadata } from "next";
import type { SearchParams } from "nuqs";

import { VoicesView } from "@/features/voices/views/voices-views";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { voicesSearchParamsCache } from "@/features/voices/lib/params";

export const metadata: Metadata = {
  title: "Voices",
};

export default async function VoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);

  prefetch(trpc.voices.getAll.queryOptions({ query }));

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  );
}
