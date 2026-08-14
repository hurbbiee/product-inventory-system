"use client";
import { TodoCalendar } from "@/components/calendar/todo-calendar";

export default function Page() {
  return (
    <>
      <div className="p-6">
        <TodoCalendar />
      </div>
    </>
  );
}
