"use client";

import { useStore } from "@tanstack/react-form";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { ttsFormOptions } from "@/features/text-to-speech/components/text-to-speech-form";
import { useTTSVoices } from "@/features/text-to-speech/context/tts-voices-context";
import { useTypedAppFormContext } from "@/hooks/use-app-form";

function VoiceSelectorButton() {
  const { allVoices } = useTTSVoices();

  const form = useTypedAppFormContext(ttsFormOptions);

  const voiceId = useStore(form.store, (s) => s.values.voiceId);
  const currentVoice = allVoices.find((v) => v.id === voiceId) ?? allVoices[0];

  const buttonLabel = currentVoice?.name ?? "Select a voice";

  return (
    <DrawerTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 justify-start gap-2 px-2"
      >
        {currentVoice && (
          <VoiceAvatar
            seed={currentVoice.id}
            name={currentVoice.name}
            className="size-6"
          />
        )}
        <span className="truncate flex-1 text-left text-sm font-medium">
          {buttonLabel}
        </span>
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
      </Button>
    </DrawerTrigger>
  );
}

export { VoiceSelectorButton };
