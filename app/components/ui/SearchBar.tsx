"use client";

import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/app/store/global.state";
import { setSearchQuery } from "@/app/features/slices/todo.slice";
import { useState, useEffect } from "react";
import { debounce } from "@/app/utils/debounce";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.todo.searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounced search to avoid too many state updates
  useEffect(() => {
    const debouncedSearch = debounce((value: string) => {
      dispatch(setSearchQuery(value));
    }, 300);

    debouncedSearch(localSearch);
  }, [localSearch, dispatch]);

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" size={18} />
      <input
        type="text"
        className="search-input"
        placeholder="Search List"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
}
