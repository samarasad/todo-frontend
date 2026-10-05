"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import AppShell from "@/components/AppShell";
import AddFab from "@/components/AddFab";
import { SearchIcon } from "@/components/Icons";
import StatCards from "@/components/StatCards";
import TaskList from "@/components/TaskList";
import TaskSheet from "@/components/TaskSheet";
import WeekStrip from "@/components/WeekStrip";
import WeeklyProgress from "@/components/WeeklyProgress";
import { getErrorMessage, getWeekTasks } from "@/lib/api";
import { getTimeZone, isSameLocalDay, parseISODate, startOfWeek, toISODate, weekDays } from "@/lib/dates";
import type { Task } from "@/lib/types";

export default function HomePage() {
  // Set after mount so server and browser never disagree about "today"
  const [selected, setSelected] = useState<string | null>(null);
  const [sheet, setSheet] = useState<{ task: Task | null } | null>(null);

  useEffect(() => setSelected(toISODate(new Date())), []);

  const weekStart = selected ? toISODate(startOfWeek(parseISODate(selected))) : null;
  const tz = useMemo(getTimeZone, []);

  const { data, error, isLoading, mutate } = useSWR(weekStart ? ["week", weekStart, tz] : null, () =>
    getWeekTasks(weekStart as string, tz)
  );

  const days = useMemo(() => (selected ? weekDays(parseISODate(selected)) : []), [selected]);
  const todayTasks = useMemo(
    () => (data && selected ? data.tasks.filter((t) => isSameLocalDay(t.dateTime, selected)) : []),
    [data, selected]
  );

  const loading = !selected || (isLoading && !data);

  return (
    <AppShell>
      <main className="px-5 pb-32 pt-8">
        <Link
          href="/search"
          className="flex h-11 items-center justify-between rounded-[3px] border border-line bg-white px-4 text-xs text-muted"
        >
          Search for a task
          <SearchIcon width={20} height={20} className="text-ink" />
        </Link>

        <div className="mt-5">
          {selected ? (
            <WeekStrip days={days} selected={selected} onSelect={setSelected} />
          ) : (
            <div className="h-[72px] animate-pulse rounded bg-line/60" />
          )}
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="h-[92px] animate-pulse rounded bg-line/60" />
          ) : (
            <StatCards completed={data?.completedTasks ?? 0} pending={data?.openTasks ?? 0} />
          )}
        </div>

        <div className="mt-8">
          <WeeklyProgress completed={data?.completedTasks ?? 0} total={data?.totalTasks ?? 0} />
        </div>

        <section className="mt-8" aria-label="Tasks for the selected day">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Tasks Today</h2>
            <Link href="/weeks" className="text-[13px] font-medium text-primary">
              View All
            </Link>
          </div>

          <div className="mt-2">
            {error ? (
              <div className="py-8 text-center text-xs text-pending-ink">
                {getErrorMessage(error)}{" "}
                <button type="button" onClick={() => mutate()} className="font-medium underline">
                  Retry
                </button>
              </div>
            ) : loading ? (
              <div className="space-y-3 pt-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-8 animate-pulse rounded bg-line/60" />
                ))}
              </div>
            ) : (
              <TaskList
                tasks={todayTasks}
                onEdit={(task) => setSheet({ task })}
                emptyText="No tasks for this day. Tap + to add one."
              />
            )}
          </div>
        </section>
      </main>

      <AddFab onClick={() => setSheet({ task: null })} />

      {sheet && selected && (
        <TaskSheet
          key={sheet.task?._id ?? "new"}
          task={sheet.task}
          defaultDate={selected}
          onClose={() => setSheet(null)}
        />
      )}
    </AppShell>
  );
}
