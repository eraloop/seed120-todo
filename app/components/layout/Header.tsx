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

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Todo List</h1>
        <div className="date-selector-wrapper">
          <FiCalendar className="calendar-icon" size={16} />
          <input
            type="date"
            className="date-picker-input"
            value={selectedDate || ""}
            onChange={handleDateChange}
            max={getTodayDate()}
          />
          <span className="date-display">{formatDisplayDate(selectedDate)}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="controls-bar">
          <SearchBar />
        </div>
        <button className="add-new-button" onClick={onAddNewClick}>
          <FiPlus size={18} />
          Add New List
        </button>
      </div>
    </header>
  );
}
