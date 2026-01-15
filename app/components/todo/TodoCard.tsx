"use client";

import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";
import { Todo } from "@/app/features/interfaces/todo.interface";
import { formatDate, formatTime } from "@/app/utils/date.utils";
import { useState, useRef, useEffect } from "react";

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onViewDetails: (todo: Todo) => void;
}

export default function TodoCard({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  onViewDetails,
}: TodoCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  const handleCheckboxChange = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".todo-checkbox") ||
      target.closest(".menu-button") ||
      target.closest(".todo-menu")
    ) {
      return;
    }
    onViewDetails(todo);
  };

  return (
    <motion.div
      className={`todo-card ${todo.completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
    >
      <div className="todo-card-header">
        <label className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        <h3 className="todo-title">{todo.todo}</h3>
        <div className="menu-container" ref={menuRef}>
          <button
            className="menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            aria-label="Todo options"
          >
            <FiMoreVertical size={18} />
          </button>
          {showMenu && (
            <motion.div
              className="todo-menu z-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className="menu-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(todo);
                  setShowMenu(false);
                }}
              >
                Edit
              </button>
              <button
                className="menu-item delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                  setShowMenu(false);
                }}
              >
                Delete
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {todo.description && (
        <p className="todo-description">
          {todo.description.length > 100
            ? `${todo.description.substring(0, 100)}...`
            : todo.description}
        </p>
      )}

      {(todo.time || todo.dueDate) && (
        <div className="todo-time">
          {todo.time && (
            <span>
              {formatTime(todo.time)}
              {todo.dueDate && " - "}
            </span>
          )}
          {todo.time && todo.dueDate && <span>{formatTime(todo.time)}</span>}
        </div>
      )}
      
    </motion.div>
  );
}
