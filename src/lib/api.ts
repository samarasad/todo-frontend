import type { SearchResult, Status, Task, TaskInput, WeekDetail, WeekSummary } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export class ApiClientError extends Error {
  status: number;
  errors: string[];

  constructor(message: string, status = 0, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (init.body) headers["Content-Type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiClientError("Cannot reach the server. Please try again.");
  }

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    const errors: string[] = body?.errors ?? [];
    throw new ApiClientError(errors[0] ?? body?.message ?? "Something went wrong", res.status, errors);
  }

  return body.data as T;
}

const qs = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") search.set(key, String(value));
  });
  const str = search.toString();
  return str ? `?${str}` : "";
};

export const getWeeks = (tz: string) =>
  request<WeekSummary[]>(`/tasks/weeks${qs({ tz })}`);

export const getWeekTasks = (date: string, tz: string) =>
  request<WeekDetail>(`/tasks/weeks/${date}${qs({ tz })}`);

export const searchTasks = (q: string) =>
  request<SearchResult>(`/tasks/search${qs({ q, limit: 50 })}`);

export const createTask = (input: TaskInput) =>
  request<Task>("/tasks", { method: "POST", body: JSON.stringify(input) });

export const updateTask = (id: string, input: Partial<TaskInput>) =>
  request<Task>(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const setTaskStatus = (id: string, status: Status) =>
  request<Task>(`/tasks/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });

export const deleteTask = (id: string) => request<Task>(`/tasks/${id}`, { method: "DELETE" });
