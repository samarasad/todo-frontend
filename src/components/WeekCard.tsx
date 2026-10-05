"use client";

import useSWR from "swr";
import { ChevronIcon } from "./Icons";
import TaskList from "./TaskList";
import { getErrorMessage, getWeekTasks } from "@/lib/api";
import { formatShortDate, padCount } from "@/lib/dates";
import type { Task, WeekSummary } from "@/lib/types";

export default function WeekCard({
  week,
  tz,
  isCurrent,
  expanded,
  onToggle,
  onEdit,
}: {
  week: WeekSummary;
  tz: string;
  isCurrent: boolean;
  expanded: boolean;
  onToggle: () => void;
  onEdit: (task: Task) => void;
}) {
  // Same key as the home screen, so edits refresh both
  const { data, error, isLoading } = useSWR(expanded ? ["week", week.weekStart, tz] : null, () =>
    getWeekTasks(week.weekStart, tz)
  );

  return (
    <section className="overflow-hidden rounded-[3px] border border-line bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {formatShortDate(week.weekStart)} - {formatShortDate(week.weekEnd)}
            {isCurrent && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                This week
              </span>
            )}
          </p>
          <div className="mt-2 flex gap-2 text-[11px] font-medium">
            <span className="rounded-[3px] bg-pending-bg px-2 py-1 text-ink">
              Open {padCount(week.openTasks)}
            </span>
            <span className="rounded-[3px] bg-complete-bg px-2 py-1 text-ink">
              Completed {padCount(week.completedTasks)}
            </span>
          </div>
        </div>
        <ChevronIcon
          width={20}
          height={20}
          className={`shrink-0 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="border-t border-line px-4 pb-2">
          {error ? (
            <p className="py-6 text-center text-xs text-pending-ink">{getErrorMessage(error)}</p>
          ) : isLoading && !data ? (
            <div className="space-y-3 py-4">
              {[0, 1].map((i) => (
                <div key={i} className="h-8 animate-pulse rounded bg-line/60" />
              ))}
            </div>
          ) : (
            <TaskList tasks={data?.tasks ?? []} onEdit={onEdit} emptyText="No tasks in this week." />
          )}
        </div>
      )}
    </section>
  );
}
