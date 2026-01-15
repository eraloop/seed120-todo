// "use client";

// import { FiPlus, FiCalendar } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "@/app/store/global.state";
// import { setSelectedDate } from "@/app/features/slices/todo.slice";
// import SearchBar from "../ui/SearchBar";

// interface HeaderProps {
//   onAddNewClick: () => void;
// }

// export default function Header({ onAddNewClick }: HeaderProps) {
//   const dispatch = useAppDispatch();
//   const selectedDate = useAppSelector((state) => state.todo.selectedDate);

//   // Get today's date in YYYY-MM-DD format
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   };

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // If empty, show all todos
//     dispatch(setSelectedDate(value || null));
//   };

//   const formatDisplayDate = (dateStr: string | null) => {
//     if (!dateStr) return "All Dates";
    
//     const date = new Date(dateStr + 'T00:00:00');
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     const dateToCheck = new Date(date);
//     dateToCheck.setHours(0, 0, 0, 0);
    
//     if (dateToCheck.getTime() === today.getTime()) {
//       return "Today";
//     } else if (dateToCheck.getTime() === tomorrow.getTime()) {
//       return "Tomorrow";
//     } else {
//       return date.toLocaleDateString('en-US', { 
//         weekday: 'short', 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     }
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <h1 className="header-title">Todo List</h1>
//         <div className="date-selector-wrapper">
//           <FiCalendar className="calendar-icon" size={16} />
//           <input
//             type="date"
//             className="date-picker-input"
//             value={selectedDate || ""}
//             onChange={handleDateChange}
//             max={getTodayDate()}
//           />
//           <span className="date-display">{formatDisplayDate(selectedDate)}</span>
//         </div>
//       </div>

//       <div className="header-right">
//         <div className="controls-bar">
//           <SearchBar />
//         </div>
//         <button className="add-new-button" onClick={onAddNewClick}>
//           <FiPlus size={18} />
//           Add New List
//         </button>
//       </div>
//     </header>
//   );
// }

"use client";

import { FiPlus, FiCalendar } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/app/store/global.state";
import { setSelectedDate } from "@/app/features/slices/todo.slice";
import SearchBar from "../ui/SearchBar";

interface HeaderProps {
  onAddNewClick: () => void;
}

export default function Header({ onAddNewClick }: HeaderProps) {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.todo.selectedDate);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // If empty, show all todos
    dispatch(setSelectedDate(value || null));
  };

  const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr) return "All Dates";
    
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    
    if (dateToCheck.getTime() === today.getTime()) {
      return "Today";
    } else if (dateToCheck.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const clearDate = () => {
    dispatch(setSelectedDate(null));
  };

  return (
    <header className="header" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#fff'
    }}>
      <div className="header-left" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <h1 className="header-title" style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          margin: 0
        }}>Todo List</h1>
        
        <div className="date-selector-wrapper" style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
          minWidth: '160px'
        }}>
          <FiCalendar size={16} style={{ color: '#6b7280', flexShrink: 0 }} />
          <input
            type="date"
            className="date-picker-input"
            value={selectedDate || ""}
            onChange={handleDateChange}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
          />
          <span className="date-display" style={{
            fontSize: '0.875rem',
            color: '#374151',
            userSelect: 'none'
          }}>
            {formatDisplayDate(selectedDate)}
          </span>
          {selectedDate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearDate();
              }}
              style={{
                marginLeft: 'auto',
                padding: '0.125rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '1rem',
                lineHeight: 1
              }}
              title="Clear date filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="header-right" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div className="" style={{ minWidth: '300px' }}>
          <SearchBar />
        </div>
        <button 
          className="add-new-button" 
          onClick={onAddNewClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          <FiPlus size={18} />
          Add New List
        </button>
      </div>
    </header>
  );
}