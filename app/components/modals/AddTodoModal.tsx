"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { Todo } from "@/app/features/interfaces/todo.interface";
import { getCurrentDate, getCurrentTime } from "@/app/utils/date.utils";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: Partial<Todo>) => void;
}

export default function AddTodoModal({
  isOpen,
  onClose,
  onAdd,
}: AddTodoModalProps) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ taskName?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!taskName.trim()) {
      setErrors({ taskName: "Task name is required" });
      return;
    }

    onAdd({
      todo: taskName,
      completed: false,
      userId: 1,
      dueDate,
      time,
      description,
    });

    // Reset form
    setTaskName("");
    setDueDate(getCurrentDate());
    setTime(getCurrentTime());
    setDescription("");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setTaskName("");
    setDueDate(getCurrentDate());
    setTime(getCurrentTime());
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-header">
              <h2 className="modal-title">Add New List</h2>
              <button
                className="modal-close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            <p className="modal-subtitle">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s.
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
                  Add New
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
