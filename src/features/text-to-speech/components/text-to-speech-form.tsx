"use client";

import { formOptions } from "@tanstack/react-form";
import z from "zod";

import { useAppForm } from "@/hooks/use-app-form";

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
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log({ value });
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
