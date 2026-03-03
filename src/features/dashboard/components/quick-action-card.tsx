import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { QuickAction } from "@/features/dashboard/data/quick-actions";
import { cn } from "@/lib/utils";

function QuickActionCard(action: QuickAction) {
  const { title, description, gradient, href, icon: Icon, iconColor } = action;

  return (
    <div className="flex gap-4 rounded-xl border bg-card p-3 group/quick-action-card">
      <div
        className={cn(
          "relative h-31 w-41 shrink-0 overflow-hidden rounded-xl bg-linear-to-br",
          gradient,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-12 rounded-full bg-white/30 flex items-center justify-center group-hover/quick-action-card:scale-120 transition-[scale] duration-300">
            <Icon className={cn(iconColor)} />
          </div>
        </div>
        <div className="absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20" />
      </div>

      <div className="flex flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <Button variant="outline" size="xs" className="w-fit" asChild>
          <Link href={href}>
            Try now <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export { QuickActionCard };
