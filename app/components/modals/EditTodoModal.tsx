"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Todo } from "@/app/features/interfaces/todo.interface";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  todo: Todo | null;
}

export default function EditTodoModal({
  isOpen,  onClose,
  onUpdate,
  todo,
}: EditTodoModalProps) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ taskName?: string }>({});

  // Update form when todo changes
  useEffect(() => {
    if (todo) {
      setTaskName(todo.todo);
      setDueDate(todo.dueDate || "");
      setTime(todo.time || "");
      setDescription(todo.description || "");
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      setErrors({ taskName: "Task name is required" });
      return;
    }

    if (todo) {
      onUpdate(todo.id, {
        todo: taskName,
        dueDate,
        time,
        description,
      });
    }

    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && todo && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <div 
             className="modal-wrapper"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 51,
              padding: '1rem',
              pointerEvents: 'none'
            }}
          >
            <motion.div
              className="modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Edit Task</h2>
                <button
                  className="modal-close"
                  onClick={handleClose}
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
              </div>

              <p className="modal-subtitle">
                Update your task details below
              </p>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-input ${errors.taskName ? "error" : ""}`}
                    placeholder="Task Name*"
                    value={taskName}
                    onChange={(e) => {
                      setTaskName(e.target.value);
                      if (errors.taskName) setErrors({});
                    }}
                  />
                  {errors.taskName && (
                    <span className="form-error">{errors.taskName}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    className="form-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="time"
                    className="form-input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-textarea"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button button-primary">
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
