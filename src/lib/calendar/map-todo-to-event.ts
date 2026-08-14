import type { TodoCalendarItem } from "@/types/todo-calendar";
import { EventInput } from "@fullcalendar/react";

export function mapTodoToEvent(todo: TodoCalendarItem): EventInput {
  return {
    id: todo.id,
    title: todo.title,
    start: todo.start,
    end: todo.end,

    extendedProps: {
      status: todo.status,
      priority: todo.priority,
      type: todo.type,
      assignee: todo.assignee,
    },
  };
}
