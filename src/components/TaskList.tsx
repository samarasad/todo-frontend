// "use client";

// // import { useState } from "react";
// import { useRef, useState } from "react";
// import type { Task } from "@/lib/types";
// import { deleteTask, getErrorMessage, setTaskStatus } from "@/lib/api";
// import { refreshTasks } from "@/lib/refresh";
// import Checkbox from "./Checkbox";
// import { EditIcon, TrashIcon } from "./Icons";

// export default function TaskList({
//   tasks,
//   onEdit,
//   emptyText = "No tasks here yet.",
// }: {
//   tasks: Task[];
//   onEdit: (task: Task) => void;
//   emptyText?: string;
// }) {
//   const [busyId, setBusyId] = useState<string | null>(null);
//   const [error, setError] = useState("");
// const [openId, setOpenId] = useState<string | null>(null);
// const startX = useRef<number | null>(null);
//   const run = async (id: string, action: () => Promise<unknown>) => {
//     setBusyId(id);
//     setError("");
//     try {
//       await action();
//       await refreshTasks();
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setBusyId(null);
//     }
//   };

//   const toggle = (task: Task) =>
//     run(task._id, () => setTaskStatus(task._id, task.status === "completed" ? "in_progress" : "completed"));

//   const remove = (task: Task) => {
//     if (!window.confirm(`Delete "${task.title}"?`)) return;
//     run(task._id, () => deleteTask(task._id));
//   };

//   if (tasks.length === 0) {
//     return <p className="py-8 text-center text-xs text-muted">{emptyText}</p>;
//   }

//   return (
//     <div>
//       <ul>
//         {tasks.map((task) => {
//           const done = task.status === "completed";
//           const busy = busyId === task._id;
//           return (
//             <li
//               key={task._id}
//               className={`relative flex items-center gap-3 py-3.5 after:absolute after:bottom-0 after:left-8 after:right-0 after:h-px after:bg-line ${
//                 busy ? "opacity-60" : ""
//               }`}
//             >
//               <Checkbox
//                 checked={done}
//                 disabled={busy}
//                 onChange={() => toggle(task)}
//                 label={done ? `Mark "${task.title}" as in progress` : `Mark "${task.title}" as completed`}
//               />
//               <button
//                 type="button"
//                 onClick={() => onEdit(task)}
//                 className={`min-w-0 flex-1 truncate text-left text-[15px] font-medium ${
//                   done ? "text-ink/80 line-through" : "text-ink"
//                 }`}
//               >
//                 {task.title}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => remove(task)}
//                 disabled={busy}
//                 aria-label={`Delete ${task.title}`}
//                 className="text-faint transition hover:text-pending-ink"
//               >
//                 <TrashIcon width={22} height={22} />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => onEdit(task)}
//                 aria-label={`Edit ${task.title}`}
//                 className="text-faint transition hover:text-primary"
//               >
//                 <EditIcon width={22} height={22} />
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//       {error && <p className="pt-3 text-xs text-pending-ink">{error}</p>}
//     </div>
//   );
// }


"use client";

import { useRef, useState } from "react";
import type { Task } from "@/lib/types";
import { deleteTask, getErrorMessage, setTaskStatus } from "@/lib/api";
import { refreshTasks } from "@/lib/refresh";
import Checkbox from "./Checkbox";
import { EditIcon, TrashIcon } from "./Icons";

export default function TaskList({
  tasks,
  onEdit,
  emptyText = "No tasks here yet.",
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  emptyText?: string;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const startX = useRef<number | null>(null);

  const run = async (id: string, action: () => Promise<unknown>) => {
    setBusyId(id);
    setError("");
    try {
      await action();
      await refreshTasks();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const toggle = (task: Task) =>
    run(task._id, () => setTaskStatus(task._id, task.status === "completed" ? "in_progress" : "completed"));

  const remove = (task: Task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    run(task._id, () => deleteTask(task._id));
  };

  if (tasks.length === 0) {
    return <p className="py-8 text-center text-xs text-muted">{emptyText}</p>;
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => {
          const done = task.status === "completed";
          const busy = busyId === task._id;
          return (
            <li
              key={task._id}
              className={`relative overflow-hidden after:absolute after:bottom-0 after:left-8 after:right-0 after:h-px after:bg-line ${
                busy ? "opacity-60" : ""
              }`}
            >
              <button
                type="button"
                tabIndex={openId === task._id ? 0 : -1}
                onClick={() => {
                  setOpenId(null);
                  run(task._id, () => deleteTask(task._id));
                }}
                className="absolute inset-y-0 right-0 w-15 bg-pending-ink text-sm font-medium text-white"
              >
                Delete
              </button>

              <div
                style={{ touchAction: "pan-y" }}
                onPointerDown={(e) => (startX.current = e.clientX)}
                onPointerUp={(e) => {
                  if (startX.current === null) return;
                  const dx = e.clientX - startX.current;
                  startX.current = null;
                  if (dx < -40) setOpenId(task._id);
                  else if (dx > 40) setOpenId(null);
                }}
                onPointerCancel={() => (startX.current = null)}
                className={`relative flex select-none items-center gap-3 bg-surface py-3.5 transition-transform duration-200 ${
                  openId === task._id ? "-translate-x-20" : ""
                }`}
              >
                <Checkbox
                  checked={done}
                  disabled={busy}
                  onChange={() => toggle(task)}
                  label={done ? `Mark "${task.title}" as in progress` : `Mark "${task.title}" as completed`}
                />
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className={`min-w-0 flex-1 truncate text-left text-[15px] font-medium ${
                    done ? "text-ink/80 line-through" : "text-ink"
                  }`}
                >
                  {task.title}
                </button>
                <button
                  type="button"
                  onClick={() => remove(task)}
                  disabled={busy}
                  aria-label={`Delete ${task.title}`}
                  className="text-faint transition hover:text-pending-ink"
                >
                  <TrashIcon width={22} height={22} />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  aria-label={`Edit ${task.title}`}
                  className="text-faint transition hover:text-primary"
                >
                  <EditIcon width={22} height={22} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {error && <p className="pt-3 text-xs text-pending-ink">{error}</p>}
    </div>
  );
}