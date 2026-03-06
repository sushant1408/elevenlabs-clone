import { createSearchParamsCache, parseAsString } from "nuqs/server";

const voicesSearchParams = {
  query: parseAsString.withDefault(""),
};

const voicesSearchParamsCache = createSearchParamsCache(voicesSearchParams);

export { voicesSearchParams, voicesSearchParamsCache };
