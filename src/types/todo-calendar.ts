export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";

export type TodoType = "TASK" | "MEETING" | "DEADLINE";

export interface TodoAssignee {
  id: string;
  name: string;
}

export interface TodoEventMeta {
  status: TodoStatus;
  priority: TodoPriority;
  type: TodoType;
  assignee?: TodoAssignee;
}

export interface TodoCalendarItem extends TodoEventMeta {
  id: string;
  title: string;
  description?: string;

  start: string;
  end?: string;
}

export interface CreateTodoInput {
  title: string;
  description: string;
  date: string;
  time: string;
}
