"use client";

import { motion, AnimatePresence } from "framer-motion";
import TodoCard from "./TodoCard";
import EmptyState from "../ui/EmptyState";
import { Todo } from "@/app/features/interfaces/todo.interface";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onViewDetails: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  onViewDetails,
}: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="todo-grid">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetails={onViewDetails}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
