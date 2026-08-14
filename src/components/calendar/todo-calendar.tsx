"use client";

import { EventCalendar } from "@/components/event-calendar";
import { mapTodoToEvent } from "@/lib/calendar/map-todo-to-event";
import type { CreateTodoInput, TodoCalendarItem } from "@/types/todo-calendar";
import { TodoEventContent } from "./todo-event-content";
import { useState } from "react";
import { TodoDetailSheet } from "./todo-detail-sheet";
import { TodoCreateDialog } from "./todo-create-dialog";
const initialTodos: TodoCalendarItem[] = [
  {
    id: "1",
    title: "ตรวจนับสต็อกประจำเดือน",
    description: "ตรวจสอบจำนวนสินค้าในคลังและเปรียบเทียบกับข้อมูลในระบบ",
    start: "2026-08-14T09:00:00",
    end: "2026-08-14T10:00:00",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    type: "TASK",
    assignee: {
      id: "1",
      name: "สมชาย",
    },
  },

  {
    id: "2",
    title: "ประชุมทีมคลังสินค้า",
    description: "ประชุมสรุปปัญหาสต็อกและแผนการทำงานประจำสัปดาห์",
    start: "2026-08-15T10:00:00",
    end: "2026-08-15T11:00:00",
    status: "TODO",
    priority: "HIGH",
    type: "MEETING",
    assignee: {
      id: "2",
      name: "John",
    },
  },

  {
    id: "3",
    title: "ส่งรายงานประจำเดือน",
    description: "จัดทำและส่งรายงานสรุป Stock Movement ประจำเดือน",
    start: "2026-08-21T17:00:00",
    status: "TODO",
    priority: "HIGH",
    type: "DEADLINE",
  },
];

export function TodoCalendar() {
  const [selectedTodo, setSelectedTodo] = useState<TodoCalendarItem | null>(
    null,
  );

  const [todos, setTodos] = useState<TodoCalendarItem[]>(initialTodos);

  const [detailOpen, setDetailOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const [createInitialDate, setCreateInitialDate] = useState("");

  const [createInitialTime, setCreateInitialTime] = useState("09:00");

  const calendarEvents = initialTodos.map(mapTodoToEvent);

  const handleCreateTodo = (values: CreateTodoInput) => {
    const newTodo: TodoCalendarItem = {
      id: crypto.randomUUID(),

      title: values.title,

      description: values.description || undefined,

      start: `${values.date}T${values.time}:00`,

      status: "TODO",
      priority: "MEDIUM",
      type: "TASK",
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    setCreateOpen(false);
  };

  return (
    <>
      <EventCalendar
        className="w-full"
        availableViews={["dayGridMonth", "timeGridWeek", "listWeek"]}
        events={todos}
        eventDisplay="block"
        eventColor="transparent"
        eventClass="!border-0 !bg-transparent !shadow-none"
        selectable
        editable
        nowIndicator
        navLinks
        eventContent={(info) => <TodoEventContent info={info} />}
        eventClick={(info) => {
          const todo = initialTodos.find((item) => item.id === info.event.id);

          if (!todo) {
            return;
          }

          setSelectedTodo(todo);
          setDetailOpen(true);
        }}
        dateClick={(info) => {
          const date = info.dateStr.slice(0, 10);

          const hasTime = info.dateStr.includes("T");

          const time = hasTime ? info.dateStr.slice(11, 16) : "09:00";

          setCreateInitialDate(date);
          setCreateInitialTime(time);

          setCreateOpen(true);
        }}
        addButton={{
          text: "เพิ่มงาน",
          hint: "เพิ่มงานใหม่",

          click() {
            setCreateInitialDate(getLocalDateString());

            setCreateInitialTime("09:00");

            setCreateOpen(true);
          },
        }}
      />

      <TodoDetailSheet
        todo={selectedTodo}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <TodoCreateDialog
        open={createOpen}
        initialDate={createInitialDate}
        initialTime={createInitialTime}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateTodo}
      />
    </>
  );
}

function getLocalDateString() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
