import React from "react";
import { cn } from "#/utils/utils";

interface ModelInfoBadgeProps {
  isFree?: boolean;
  className?: string;
}

export function ModelInfoBadge({
  isFree = false,
  className,
}: ModelInfoBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0.5 rounded-full font-medium",
        isFree
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        className,
      )}
    >
      {isFree ? "Free" : "Paid"}
    </span>
  );
}
