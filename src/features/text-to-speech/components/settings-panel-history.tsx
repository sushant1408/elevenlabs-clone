import { AudioLinesIcon, AudioWaveformIcon, ClockIcon } from "lucide-react";

function SettingsPanelHistory() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
      <div className="relative w-25 flex items-center justify-center">
        <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-3">
          <AudioLinesIcon className="size-4 text-muted-foreground" />
        </div>

        <div className="relative z-10 rounded-full bg-foreground p-3">
          <AudioWaveformIcon className="size-4 text-background" />
        </div>

        <div className="absolute right-0 rotate-30 rounded-full bg-muted p-3">
          <ClockIcon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <p className="text-lg font-semibold tracking-tight text-foreground">
        No generations yet
      </p>
      <p className="max-w-48 text-center text-sm text-muted-foreground">
        Generate some audio and it will appear here.
      </p>
    </div>
  );
}

export { SettingsPanelHistory };
