"use client";

import type { inferRouterOutputs } from "@trpc/server";
import { createContext, useContext } from "react";

import type { AppRouter } from "@/trpc/routers/_app";

type TTSVoiceItem =
  | inferRouterOutputs<AppRouter>["voices"]["getAll"]["system"][number]
  | inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface TTSVoicesContextValue {
  customVoices: TTSVoiceItem[];
  systemVoices: TTSVoiceItem[];
  allVoices: TTSVoiceItem[];
}

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);

function TTSVoicesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TTSVoicesContextValue;
}) {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  );
}

function useTTSVoices() {
  const context = useContext(TTSVoicesContext);

  if (!context) {
    throw new Error("useTTSVoices must be used within TTSVoicesProvider");
  }

  return context;
}

export { TTSVoicesProvider, useTTSVoices };
