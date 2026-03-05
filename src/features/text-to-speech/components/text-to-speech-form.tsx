"use client";

import { formOptions } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

import { useAppForm } from "@/hooks/use-app-form";
import { useTRPC } from "@/trpc/client";

const ttsFormSchema = z.object({
  text: z.string().min(1, { error: "Please enter some text" }),
  voiceId: z.string().min(1, { error: "Please select a voice" }),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

type TTSFormValues = z.infer<typeof ttsFormSchema>;

const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

function TextToSpeechForm({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: TTSFormValues;
}) {
  const router = useRouter();
  const trpc = useTRPC();

  const createMutation = useMutation(trpc.generations.create.mutationOptions());

  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await createMutation.mutateAsync({
          ...value,
          text: value.text.trim(),
        });

        toast.success("Audio generated successfully!");
        router.push(`/text-to-speech/${data.id}`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to generate audio.";

        toast.error(message);
      }
    },
  });

  return <form.AppForm>{children}</form.AppForm>;
}

export {
  defaultTTSValues,
  TextToSpeechForm,
  ttsFormOptions,
  type TTSFormValues,
};
