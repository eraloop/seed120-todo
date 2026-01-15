"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEdit } from "react-icons/fi";
import { Todo } from "@/app/features/interfaces/todo.interface";
import { formatTime, formatDate } from "@/app/utils/date.utils";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (todo: Todo) => void;
  todo: Todo | null;
}

export default function ViewDetailsModal({
  isOpen,
  onClose,
  onEdit,
  todo,
}: ViewDetailsModalProps) {
  if (!todo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="modal-wrapper">
            <motion.div
              className="modal-container"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="modal-header">
                <h2 className="modal-title">Task Details</h2>
                <div className="modal-header-actions">
                  <button
                    className="icon-button"
                    onClick={() => {
                      onEdit(todo);
                      onClose();
                    }}
                    aria-label="Edit task"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className="modal-content">
                <div className="detail-row">
                  <label className="detail-label">Task Name</label>
                  <p className="detail-value">{todo.todo}</p>
                </div>

                {todo.dueDate && (
                  <div className="detail-row">
                    <label className="detail-label">Due Date</label>
                    <p className="detail-value">{formatDate(todo.dueDate)}</p>
                  </div>
                )}

                {todo.time && (
                  <div className="detail-row">
                    <label className="detail-label">Time</label>
                    <p className="detail-value">{formatTime(todo.time)}</p>
                  </div>
                )}

                <div className="detail-row">
                  <label className="detail-label">Status</label>
                  <p className="detail-value">
                    <span
                      className={`status-badge ${
                        todo.completed ? "completed" : "active"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Active"}
                    </span>
                  </p>
                </div>

                {todo.description && (
                  <div className="detail-row">
                    <label className="detail-label">Description</label>
                    <p className="detail-value description">{todo.description}</p>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button className="button button-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
