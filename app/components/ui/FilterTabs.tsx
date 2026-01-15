// "use client";

// import { useAppDispatch, useAppSelector } from "@/app/store/global.state";
// import { setFilter, FilterType } from "@/app/features/slices/todo.slice";

// export default function FilterTabs() {
//   const dispatch = useAppDispatch();
//   const filter = useAppSelector((state) => state.todo.filter);
//   const todos = useAppSelector((state) => state.todo.todos);

//   const activeCount = todos.filter((t) => !t.completed).length;
//   const completedCount = todos.filter((t) => t.completed).length;

//   const handleFilterChange = (newFilter: FilterType) => {
//     dispatch(setFilter(newFilter));
//   };

//   return (
//     <div className="filter-tabs">
//       <button
//         className={`filter-tab ${filter === "active" ? "active" : ""}`}
//         onClick={() => handleFilterChange("active")}
//       >
//         Active Task
//         {activeCount > 0 && <span className="tab-count">{activeCount}</span>}
//       </button>
//       <button
//         className={`filter-tab ${filter === "completed" ? "active" : ""}`}
//         onClick={() => handleFilterChange("completed")}
//       >
//         Completed
//         {completedCount > 0 && (
//           <span className="tab-count">{completedCount}</span>
//         )}
//       </button>
//     </div>
//   );
// }

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
    <div 
      className="filter-tabs"
      style={{
        display: 'inline-flex',
        backgroundColor: '#f3f4f6',
        padding: '0.25rem',
        borderRadius: '0.75rem',
        gap: '0.25rem'
      }}
    >
      <button
        className={`filter-tab ${filter === "active" ? "active" : ""}`}
        onClick={() => handleFilterChange("active")}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          border: 'none',
          borderRadius: '0.625rem',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: filter === "active" ? '#ffffff' : 'transparent',
          color: filter === "active" ? '#1f2937' : '#6b7280',

          transform: filter === "active" ? 'scale(1)' : 'scale(0.98)',
        }}
      >
        Active Task
        {activeCount > 0 && (
          <span 
            className="tab-count"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '1.25rem',
              height: '1.25rem',
              padding: '0 0.375rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              borderRadius: '0.5rem',
              backgroundColor: filter === "active" ? '#1f2937' : '#d1d5db',
              color: '#ffffff',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {activeCount}
          </span>
        )}
      </button>
      
      <button
        className={`filter-tab ${filter === "completed" ? "active" : ""}`}
        onClick={() => handleFilterChange("completed")}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          border: 'none',
          borderRadius: '0.625rem',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: filter === "completed" ? '#ffffff' : 'transparent',
          color: filter === "completed" ? '#1f2937' : '#6b7280',

          transform: filter === "completed" ? 'scale(1)' : 'scale(0.98)',
        }}
      >
        Completed
        {completedCount > 0 && (
          <span 
            className="tab-count"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '1.25rem',
              height: '1.25rem',
              padding: '0 0.375rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              borderRadius: '0.5rem',
              backgroundColor: filter === "completed" ? '#1f2937' : '#d1d5db',
              color: '#ffffff',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {completedCount}
          </span>
        )}
      </button>
    </div>
  );
}