"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Priority, Task, TaskInput } from "@/lib/types";
import { createTask, getErrorMessage, updateTask } from "@/lib/api";
import { refreshTasks } from "@/lib/refresh";
import {
  combineDateTime,
  formatLongDate,
  formatTime,
  toISODate,
  toTimeInput,
} from "@/lib/dates";
import { CalendarIcon, ClockIcon, CloseIcon } from "./Icons";

const PRIORITIES: { value: Priority; label: string; active: string }[] = [
  { value: "low", label: "Low", active: "border-emerald-500 bg-emerald-50 text-emerald-700" },
  { value: "medium", label: "Medium", active: "border-amber-500 bg-amber-50 text-amber-700" },
  { value: "high", label: "High", active: "border-pending-ink bg-pending-bg text-pending-ink" },
];

function PickerField({
  type,
  value,
  onChange,
  display,
  label,
  leading,
  trailing,
}: {
  type: "date" | "time";
  value: string;
  onChange: (value: string) => void;
  display: string;
  label: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="relative flex h-12 cursor-pointer items-center gap-3 rounded-[3px] border border-line bg-white px-4 text-sm text-ink focus-within:border-primary">
      {leading}
      <span className="flex-1 truncate">{display}</span>
      {trailing}
      <input
        type={type}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          try {
            e.currentTarget.showPicker();
          } catch {
            // showPicker is not available everywhere, the native control still works
          }
        }}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      />
    </label>
  );
}

export default function TaskSheet({
  task,
  defaultDate,
  onClose,
}: {
  task: Task | null;
  defaultDate: string;
  onClose: () => void;
}) {
  const editing = task !== null;

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [date, setDate] = useState(task ? toISODate(new Date(task.dateTime)) : defaultDate);
  const [start, setStart] = useState(task ? toTimeInput(task.dateTime) : "");
  const [end, setEnd] = useState(task?.endDateTime ? toTimeInput(task.endDateTime) : "");
  const [priority, setPriority] = useState<Priority | null>(task?.priority ?? null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Please enter a task title");
    if (!date) return setError("Please choose a date");
    if (!start) return setError("Please set a start time");
    if (end && end < start) return setError("End time must be after the start time");

    const payload: TaskInput = {
      title: title.trim(),
      description: description.trim(),
      dateTime: combineDateTime(date, start),
      endDateTime: end ? combineDateTime(date, end) : null,
      priority,
    };

    setSaving(true);
    try {
      if (task) await updateTask(task._id, payload);
      else await createTask(payload);
      await refreshTasks();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  const labelClass = "mb-2 block text-xs font-medium text-muted";

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={editing ? "Edit task" : "Add new task"}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default bg-black/40"
      />

      <form
        onSubmit={submit}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white px-5 pb-6 pt-6 shadow-2xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-3xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold">{editing ? "Edit Task" : "Add New Task"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink">
            <CloseIcon width={22} height={22} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="task-title" className={labelClass}>
              Task title
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              placeholder="Doing Homework"
              autoFocus={!editing}
              className="h-12 w-full rounded-[3px] border border-line px-4 text-sm text-ink outline-none placeholder:text-ink/70 focus:border-primary"
            />
          </div>

          <div>
            <span className={labelClass}>Set Time</span>
            <div className="grid grid-cols-2 gap-3">
              <PickerField
                type="time"
                value={start}
                onChange={setStart}
                label="Start time"
                display={start ? formatTime(start) : "Start"}
                leading={<ClockIcon width={18} height={18} />}
              />
              <PickerField
                type="time"
                value={end}
                onChange={setEnd}
                label="End time"
                display={end ? formatTime(end) : "Ends"}
                leading={<ClockIcon width={18} height={18} />}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>Set Date</span>
            <PickerField
              type="date"
              value={date}
              onChange={setDate}
              label="Task date"
              display={date ? formatLongDate(date) : "Select date"}
              trailing={<CalendarIcon width={18} height={18} />}
            />
          </div>

          <div>
            <label htmlFor="task-description" className={labelClass}>
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              placeholder="Add Description"
              className="h-28 w-full resize-none rounded-[3px] border border-line p-4 text-sm text-ink outline-none placeholder:text-ink/70 focus:border-primary"
            />
          </div>

          <div>
            <span className={labelClass}>Priority (optional)</span>
            <div className="grid grid-cols-3 gap-3">
              {PRIORITIES.map((p) => {
                const active = priority === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPriority(active ? null : p.value)}
                    className={`h-10 rounded-[3px] border text-xs font-medium transition ${
                      active ? p.active : "border-line bg-white text-muted hover:border-primary/40"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-xs text-pending-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 h-12 w-full rounded-[3px] bg-primary text-[15px] font-medium text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving..." : editing ? "Save changes" : "Create task"}
        </button>
      </form>
    </div>
  );
}
