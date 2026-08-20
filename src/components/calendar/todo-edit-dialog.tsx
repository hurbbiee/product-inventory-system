"use client";

import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type {
  EditTodoInput,
  TodoCalendarItem,
  TodoPriority,
  TodoStatus,
  TodoType,
} from "@/types/todo-calendar";

interface TodoEditDialogProps {
  todo: TodoCalendarItem | null;
  open: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: EditTodoInput) => void;
}

export function TodoEditDialog({
  todo,
  open,
  onOpenChange,
  onSubmit,
}: TodoEditDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [status, setStatus] = useState<TodoStatus>("TODO");

  const [priority, setPriority] = useState<TodoPriority>("MEDIUM");

  const [type, setType] = useState<TodoType>("TASK");

  useEffect(() => {
    if (!open || !todo) {
      return;
    }

    setTitle(todo.title);
    setDescription(todo.description ?? "");

    setDate(todo.start.slice(0, 10));
    setTime(todo.start.slice(11, 16));

    setStatus(todo.status);
    setPriority(todo.priority);
    setType(todo.type);
  }, [open, todo]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle || !date || !time) {
      return;
    }

    onSubmit({
      title: normalizedTitle,
      description: description.trim(),
      date,
      time,
      status,
      priority,
      type,
    });
  };

  if (!todo) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>แก้ไขงาน</DialogTitle>

            <DialogDescription>แก้ไขรายละเอียดและสถานะของงาน</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="edit-title">ชื่องาน</Label>

              <Input
                id="edit-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">วันที่</Label>

                <Input
                  id="edit-date"
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">เวลา</Label>

                <Input
                  id="edit-time"
                  type="time"
                  value={time}
                  onChange={(event) => {
                    setTime(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>สถานะ</Label>

                <Select
                  value={status}
                  onValueChange={(value) => {
                    setStatus(value as TodoStatus);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="TODO">Todo</SelectItem>

                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>

                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>

                <Select
                  value={priority}
                  onValueChange={(value) => {
                    setPriority(value as TodoPriority);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>

                    <SelectItem value="MEDIUM">Medium</SelectItem>

                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ประเภท</Label>

                <Select
                  value={type}
                  onValueChange={(value) => {
                    setType(value as TodoType);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="TASK">Task</SelectItem>

                    <SelectItem value="MEETING">Meeting</SelectItem>

                    <SelectItem value="DEADLINE">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">รายละเอียด</Label>

              <Textarea
                id="edit-description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              ยกเลิก
            </Button>

            <Button type="submit" disabled={!title.trim() || !date || !time}>
              บันทึก
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
