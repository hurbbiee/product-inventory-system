"use client";

import { useState } from "react";
import type { FormEvent } from "react";

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
import { Textarea } from "@/components/ui/textarea";

import type { EditTodoInput } from "@/types/todo-calendar";

interface TodoCreateDialogProps {
  open: boolean;
  initialDate: string;
  initialTime: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: EditTodoInput) => void;
}

interface TodoCreateFormProps {
  initialDate: string;
  initialTime: string;
  onCancel: () => void;
  onSubmit: (values: EditTodoInput) => void;
}

function TodoCreateForm({
  initialDate,
  initialTime,
  onCancel,
  onSubmit,
}: TodoCreateFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

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
    });
  };

  const isInvalid = !title.trim() || !date || !time;

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>เพิ่มงานใหม่</DialogTitle>

        <DialogDescription>เพิ่มงานหรือกิจกรรมลงในปฏิทิน</DialogDescription>
      </DialogHeader>

      <div className="space-y-5 py-6">
        <div className="space-y-2">
          <Label htmlFor="todo-title">ชื่องาน</Label>

          <Input
            id="todo-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="เช่น ตรวจนับสต็อกประจำเดือน"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="todo-date">วันที่</Label>

            <Input
              id="todo-date"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="todo-time">เวลา</Label>

            <Input
              id="todo-time"
              type="time"
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="todo-description">รายละเอียด</Label>

          <Textarea
            id="todo-description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            rows={4}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>

        <Button type="submit" disabled={isInvalid}>
          เพิ่มงาน
        </Button>
      </DialogFooter>
    </form>
  );
}

export function TodoCreateDialog({
  open,
  initialDate,
  initialTime,
  onOpenChange,
  onSubmit,
}: TodoCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {open && (
          <TodoCreateForm
            initialDate={initialDate}
            initialTime={initialTime}
            onCancel={() => {
              onOpenChange(false);
            }}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
