"use client";

import { useSuspenseQueries } from "@tanstack/react-query";

import { SettingsPanel } from "@/features/text-to-speech/components/settings-panel";
import { TextInputPanel } from "@/features/text-to-speech/components/text-input-panel";
import {
  TextToSpeechForm,
  type TTSFormValues,
} from "@/features/text-to-speech/components/text-to-speech-form";
import { VoicePreviewMobile } from "@/features/text-to-speech/components/voice-preview-mobile";
import { VoicePreviewPanel } from "@/features/text-to-speech/components/voice-preview-panel";
import { TTSVoicesProvider } from "@/features/text-to-speech/context/tts-voices-context";
import type { Generation } from "@/generated/prisma/client";
import { useTRPC } from "@/trpc/client";

function TextToSpeechDetailView({
  generationId,
}: {
  generationId: Generation["id"];
}) {
  const trpc = useTRPC();
  const [generationsQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });

  const data = generationsQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;

  const allVoices = [...customVoices, ...systemVoices];

  const fallbackVoiceId = allVoices[0]?.id ?? "";
  const resolvedVoiceId =
    data?.voiceId && allVoices.find((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValue: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  // use the de-normalized voiceName snapshot instead of a populated voice relation
  // so the preview always shows the voice name at the time of generation
  // even if the voice was later renamed or deleted
  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValue}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>

          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}

export { TextToSpeechDetailView };
