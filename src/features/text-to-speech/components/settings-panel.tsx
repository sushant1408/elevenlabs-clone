import { HistoryIcon, SettingsIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsPanelHistory } from "@/features/text-to-speech/components/settings-panel-history";
import { SettingsPanelSettings } from "@/features/text-to-speech/components/settings-panel-settings";

function SettingsPanel() {
  return (
    <div className="hidden w-105 lg:flex min-h-0 flex-col border-l">
      <Tabs
        defaultValue="settings"
        className="h-full min-h-0 flex flex-col gap-y-0"
      >
        <TabsList
          variant="line"
          className="w-full border-b group-data-[orientation=horizontal]/tabs:h-12"
        >
          <TabsTrigger value="settings">
            <SettingsIcon className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history">
            <HistoryIcon className="size-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="settings"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelSettings />
        </TabsContent>
        <TabsContent
          value="history"
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { SettingsPanel };
