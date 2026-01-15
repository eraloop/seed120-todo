"use client";

import { FiSearch } from "react-icons/fi";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No todos found. Add a new one to get started!",
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <FiSearch size={48} className="empty-icon" />
      <p className="empty-message">{message}</p>
    </div>
  );
}
