import type { EventDisplayInfo } from "@fullcalendar/react";

import type {
  TodoEventMeta,
  TodoPriority,
  TodoStatus,
  TodoType,
} from "@/types/todo-calendar";

interface TodoEventContentProps {
  info: EventDisplayInfo;
}

const typeClassNames: Record<TodoType, string> = {
  TASK: "border-l-blue-500 bg-blue-50 text-blue-950 dark:bg-blue-950/40 dark:text-blue-100",
  MEETING:
    "border-l-violet-500 bg-violet-50 text-violet-950 dark:bg-violet-950/40 dark:text-violet-100",
  DEADLINE:
    "border-l-red-500 bg-red-50 text-red-950 dark:bg-red-950/40 dark:text-red-100",
};

const statusLabels: Record<TodoStatus, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

function isTodoStatus(value: unknown): value is TodoStatus {
  return value === "TODO" || value === "IN_PROGRESS" || value === "DONE";
}

function isTodoPriority(value: unknown): value is TodoPriority {
  return value === "LOW" || value === "MEDIUM" || value === "HIGH";
}

function isTodoType(value: unknown): value is TodoType {
  return value === "TASK" || value === "MEETING" || value === "DEADLINE";
}

function isTodoEventMeta(value: unknown): value is TodoEventMeta {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const meta = value as Record<string, unknown>;

  return (
    isTodoStatus(meta.status) &&
    isTodoPriority(meta.priority) &&
    isTodoType(meta.type)
  );
}

export function TodoEventContent({ info }: TodoEventContentProps) {
  const extendedProps: unknown = info.event.extendedProps;

  if (!isTodoEventMeta(extendedProps)) {
    return (
      <div className="min-w-0 px-1 py-0.5">
        <p className="truncate text-xs font-medium">{info.event.title}</p>
      </div>
    );
  }

  const { status, type } = extendedProps;

  return (
    <div
      className={`
      min-w-0
      w-full
      cursor-pointer
      rounded-md
      border-l-2
      px-2
      py-1.5
      transition-all
      duration-150
      hover:brightness-95
      hover:shadow-sm
      ${typeClassNames[type]}
    `}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {info.timeText && (
          <span className="shrink-0 text-[11px] opacity-70">
            {info.timeText}
          </span>
        )}

        <span className="truncate text-xs font-medium">{info.event.title}</span>
      </div>

      <p className="mt-0.5 truncate text-[10px] opacity-65">
        {statusLabels[status]}
      </p>
    </div>
  );
}
