"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { TodoCalendarItem } from "@/types/todo-calendar";

interface TodoDeleteDialogProps {
  todo: TodoCalendarItem | null;
  open: boolean;

  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function TodoDeleteDialog({
  todo,
  open,
  onOpenChange,
  onConfirm,
}: TodoDeleteDialogProps) {
  if (!todo) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ต้องการลบงานนี้หรือไม่?</AlertDialogTitle>

          <AlertDialogDescription>
            งาน &quot; {todo.title}&quot; จะถูกลบออกจากปฏิทิน
            และไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            ลบงาน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
