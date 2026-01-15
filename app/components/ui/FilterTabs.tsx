"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/global.state";
import { setFilter, FilterType } from "@/app/features/slices/todo.slice";

export default function FilterTabs() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todo.filter);
  const todos = useAppSelector((state) => state.todo.todos);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="filter-tabs">
      <button
        className={`filter-tab ${filter === "active" ? "active" : ""}`}
        onClick={() => handleFilterChange("active")}
      >
        Active Task
        {activeCount > 0 && <span className="tab-count">{activeCount}</span>}
      </button>
      <button
        className={`filter-tab ${filter === "completed" ? "active" : ""}`}
        onClick={() => handleFilterChange("completed")}
      >
        Completed
        {completedCount > 0 && (
          <span className="tab-count">{completedCount}</span>
        )}
      </button>
    </div>
  );
}
