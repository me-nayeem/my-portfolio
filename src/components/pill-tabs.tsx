"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

export type PillTab<T extends string> = {
  id: T;
  label: string;
  icon: LucideIcon;
};

type PillTabsProps<T extends string> = {
  tabs: readonly PillTab<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
  label: string;
  idPrefix: string;
};

export function PillTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  label,
  idPrefix,
}: PillTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="border-border bg-surface mx-auto mb-8 flex w-full max-w-md flex-wrap gap-1 rounded-2xl border p-1.5 sm:w-fit sm:max-w-full sm:rounded-full sm:p-1"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`${idPrefix}-panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex grow basis-[40%] items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors duration-200 sm:grow-0 sm:basis-auto sm:rounded-full sm:px-5 sm:py-2 sm:text-sm",
            activeTab === tab.id
              ? "bg-surface-2 text-foreground ring-primary/30 ring-1"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <tab.icon
            className={cn("size-4", activeTab === tab.id && "text-primary")}
            aria-hidden="true"
          />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
