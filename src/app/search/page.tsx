"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import AppShell from "@/components/AppShell";
import { BackIcon, SearchIcon } from "@/components/Icons";
import TaskList from "@/components/TaskList";
import TaskSheet from "@/components/TaskSheet";
import { getErrorMessage, searchTasks } from "@/lib/api";
import { toISODate } from "@/lib/dates";
import type { Task } from "@/lib/types";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);

  // Wait for the person to stop typing before hitting the API
  useEffect(() => {
    const timer = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const { data, error, isLoading } = useSWR(query ? ["search", query] : null, () => searchTasks(query));

  return (
    <AppShell>
      <main className="px-5 pb-16 pt-8">
        <Link href="/home" aria-label="Back to home" className="inline-flex text-ink">
          <BackIcon width={24} height={24} />
        </Link>

        <div className="relative mt-5">
          <input
            autoFocus
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a task"
            aria-label="Search tasks"
            className="h-12 w-full rounded-[3px] border border-line bg-white pl-4 pr-11 text-sm text-ink outline-none placeholder:text-xs placeholder:text-muted focus:border-primary [&::-webkit-search-cancel-button]:hidden"
          />
          <SearchIcon width={20} height={20} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink" />
        </div>

        <div className="mt-4">
          {!query ? (
            <p className="py-10 text-center text-xs text-muted">Type a keyword to find tasks by title or description.</p>
          ) : error ? (
            <p className="py-10 text-center text-xs text-pending-ink">{getErrorMessage(error)}</p>
          ) : isLoading && !data ? (
            <div className="space-y-3 pt-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-8 animate-pulse rounded bg-line/60" />
              ))}
            </div>
          ) : (
            <TaskList
              tasks={data?.records ?? []}
              onEdit={setEditing}
              emptyText={`No tasks found for "${query}".`}
            />
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
