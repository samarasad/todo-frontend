"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import AppShell from "@/components/AppShell";
import { BackIcon } from "@/components/Icons";
import TaskSheet from "@/components/TaskSheet";
import WeekCard from "@/components/WeekCard";
import { getErrorMessage, getWeeks } from "@/lib/api";
import { getTimeZone, startOfWeek, toISODate } from "@/lib/dates";
import type { Task } from "@/lib/types";

export default function WeeksPage() {
  const tz = useMemo(getTimeZone, []);
  const [currentWeek, setCurrentWeek] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);

  useEffect(() => setCurrentWeek(toISODate(startOfWeek(new Date()))), []);

  const { data, error, isLoading, mutate } = useSWR(["weeks", tz], () => getWeeks(tz));

  return (
    <AppShell>
      <main className="px-5 pb-16 pt-8">
        <div className="flex items-center gap-4">
          <Link href="/home" aria-label="Back to home" className="text-ink">
            <BackIcon width={24} height={24} />
          </Link>
          <h1 className="text-base font-semibold">All Weeks</h1>
        </div>

        <div className="mt-6 space-y-3">
          {error ? (
            <div className="py-10 text-center text-xs text-pending-ink">
              {getErrorMessage(error)}{" "}
              <button type="button" onClick={() => mutate()} className="font-medium underline">
                Retry
              </button>
            </div>
          ) : isLoading && !data ? (
            [0, 1, 2].map((i) => <div key={i} className="h-[86px] animate-pulse rounded bg-line/60" />)
          ) : data && data.length > 0 ? (
            data.map((week) => (
              <WeekCard
                key={week.weekStart}
                week={week}
                tz={tz}
                isCurrent={week.weekStart === currentWeek}
                expanded={expanded === week.weekStart}
                onToggle={() => setExpanded(expanded === week.weekStart ? null : week.weekStart)}
                onEdit={setEditing}
              />
            ))
          ) : (
            <p className="py-10 text-center text-xs text-muted">No tasks yet. Add one from the home screen.</p>
          )}
        </div>
      </main>

      {editing && (
        <TaskSheet
          key={editing._id}
          task={editing}
          defaultDate={toISODate(new Date(editing.dateTime))}
          onClose={() => setEditing(null)}
        />
      )}
    </AppShell>
  );
}
