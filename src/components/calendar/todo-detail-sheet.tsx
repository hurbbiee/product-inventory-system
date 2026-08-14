"use client";

import { CalendarDays, Clock, Flag, User } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type {
  TodoCalendarItem,
  TodoPriority,
  TodoStatus,
} from "@/types/todo-calendar";

interface TodoDetailSheetProps {
  todo: TodoCalendarItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusLabels: Record<TodoStatus, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done",
};

const priorityLabels: Record<TodoPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function TodoDetailSheet({
  todo,
  open,
  onOpenChange,
}: TodoDetailSheetProps) {
  if (!todo) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{todo.title}</SheetTitle>

          <SheetDescription>รายละเอียดงานและกำหนดการ</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="size-4 text-muted-foreground" />

            <span>{todo.start}</span>
          </div>

          {todo.end && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-muted-foreground" />

              <span>ถึง {todo.end}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Flag className="size-4 text-muted-foreground" />

            <span>{priorityLabels[todo.priority]}</span>
          </div>

          {todo.assignee && (
            <div className="flex items-center gap-2 text-sm">
              <User className="size-4 text-muted-foreground" />

              <span>{todo.assignee.name}</span>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">สถานะ</p>

            <p className="text-sm text-muted-foreground">
              {statusLabels[todo.status]}
            </p>
          </div>

          {todo.description && (
            <div className="space-y-2">
              <p className="text-sm font-medium">รายละเอียด</p>

              <p className="text-sm leading-6 text-muted-foreground">
                {todo.description}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
