export type Priority = "low" | "medium" | "high";
export type Status = "in_progress" | "completed";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dateTime: string;
  endDateTime: string | null;
  priority: Priority | null;
  status: Status;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  dateTime: string;
  endDateTime: string | null;
  priority: Priority | null;
}

export interface WeekSummary {
  weekStart: string;
  weekEnd: string;
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
}

export interface WeekDetail extends WeekSummary {
  tasks: Task[];
}

export interface SearchResult {
  query: string;
  records: Task[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
