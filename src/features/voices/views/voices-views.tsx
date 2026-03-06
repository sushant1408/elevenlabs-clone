"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { VoicesList } from "@/features/voices/components/voices-list";
import { voicesSearchParams } from "@/features/voices/lib/params";
import { useTRPC } from "@/trpc/client";
import { VoicesToolbar } from "@/features/voices/components/voices-toolbar";

function VoicesContent() {
  const [query] = useQueryState("query", voicesSearchParams.query);

  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(
    trpc.voices.getAll.queryOptions({ query }),
  );

  return (
    <>
      <VoicesList title="Team Voices" voices={voices.custom} />
      <VoicesList title="Built-in Voices" voices={voices.system} />
    </>
  );
}

function VoicesView() {
  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesToolbar />
      <VoicesContent />
    </div>
  );
}

export { VoicesView };
