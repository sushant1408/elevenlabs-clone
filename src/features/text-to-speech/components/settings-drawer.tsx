import { SettingsIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SettingsPanelSettings } from "@/features/text-to-speech/components/settings-panel-settings";

interface SettingsDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function SettingsDrawer({ open, onOpenChange, children }: SettingsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children ?? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <SettingsIcon />
          </Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>History</DrawerTitle>
        </DrawerHeader>

        <div className="overflow-y-auto">
          <SettingsPanelSettings />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { SettingsDrawer };
