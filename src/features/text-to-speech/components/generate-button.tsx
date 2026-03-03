"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function GenerateButton({
  size,
  className,
  disabled,
  isSubmitting,
  onSubmit,
}: {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}) {
  return (
    <Button
      className={className}
      size={size}
      disabled={disabled}
      onClick={onSubmit}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" /> Generating...
        </>
      ) : (
        "Generate speech"
      )}
    </Button>
  );
}

export { GenerateButton };
