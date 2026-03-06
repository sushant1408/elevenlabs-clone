import { useQueryState } from "nuqs";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { VoiceCreateDialog } from "@/features/voices/components/voice-create-dialog";
import { voicesSearchParams } from "@/features/voices/lib/params";
import { SearchIcon, SparklesIcon, XIcon } from "lucide-react";

function VoicesToolbar() {
  const [query, setQuery] = useQueryState("query", voicesSearchParams.query);
  const [localQuery, setLocalQuery] = useState(query);

  const debounceSetQuery = useDebouncedCallback(
    (value: string) => setQuery(value),
    300,
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">
          All libraries
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover your voices, or make your own
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <InputGroup className="lg:max-w-sm">
            <InputGroupAddon>
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search voices..."
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                debounceSetQuery(e.target.value);
              }}
            />
            {(query || localQuery) && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => {
                    setLocalQuery("");
                    debounceSetQuery("");
                  }}
                >
                  <XIcon className="size-4" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <div className="ml-auto hidden lg:block">
            <VoiceCreateDialog>
              <Button size="sm">
                <SparklesIcon />
                Custom voice
              </Button>
            </VoiceCreateDialog>
          </div>
          <div className="lg:hidden">
            <VoiceCreateDialog>
              <Button size="sm" className="w-full">
                <SparklesIcon />
              </Button>
            </VoiceCreateDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export { VoicesToolbar };
