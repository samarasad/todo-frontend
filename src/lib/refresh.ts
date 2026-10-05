import { mutate } from "swr";

const TASK_KEYS = ["week", "weeks", "search"];

// Revalidate every cached task query after a create, edit, status change or delete
export const refreshTasks = () =>
  mutate((key) => Array.isArray(key) && typeof key[0] === "string" && TASK_KEYS.includes(key[0]));
