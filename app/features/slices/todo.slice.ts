import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../interfaces/todo.interface";
import {
  fetchAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "../thunks/todo.thunk";

export type FilterType = "all" | "active" | "completed";

export interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filter: FilterType;
  selectedTodo: Todo | null;
  selectedDate: string | null; // null means show all dates
}

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
  total: 0,
  skip: 0,
  limit: 0,
  loading: false,
  error: null,
  searchQuery: "",
  filter: "active",
  selectedTodo: null,
  selectedDate: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
      applyFilters(state);
    },
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
      applyFilters(state);
    },
    // Optimistic updates for better UX
    addTodoOptimistic: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
      applyFilters(state);
    },
    updateTodoOptimistic: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Todo> }>
    ) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload.updates };
        applyFilters(state);
      }
    },
    deleteTodoOptimistic: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      applyFilters(state);
    },
    toggleCompleteOptimistic: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index].completed = action.payload.completed;
        applyFilters(state);
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch All Todos
    builder.addCase(fetchAllTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload.todos;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      applyFilters(state);
    });
    builder.addCase(fetchAllTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Todo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.loading = false;
      // Update with server response (includes id)
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index === -1) {
        state.todos.unshift(action.payload);
      }
      applyFilters(state);
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Todo
    builder.addCase(updateTodo.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        applyFilters(state);
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete Todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      applyFilters(state);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Toggle Complete
    builder.addCase(toggleComplete.pending, (state) => {
      state.error = null;
    });
    builder.addCase(toggleComplete.fulfilled, (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        applyFilters(state);
      }
    });
    builder.addCase(toggleComplete.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

// Helper function to apply search and filter
function applyFilters(state: TodoState) {
  let filtered = [...state.todos];

  // Apply date filter
  if (state.selectedDate) {
    filtered = filtered.filter((todo) => {
      if (!todo.dueDate) return false;
      // Compare just the date part (YYYY-MM-DD)
      // TypeScript now knows selectedDate is not null here
      return todo.dueDate.startsWith(state.selectedDate!);
    });
  }

  // Apply search filter
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (todo) =>
        todo.todo.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query)
    );
  }

  // Apply status filter
  if (state.filter === "active") {
    filtered = filtered.filter((todo) => !todo.completed);
  } else if (state.filter === "completed") {
    filtered = filtered.filter((todo) => todo.completed);
  }

  state.filteredTodos = filtered;
}

export const {
  setSearchQuery,
  setFilter,
  setSelectedTodo,
  setSelectedDate,
  addTodoOptimistic,
  updateTodoOptimistic,
  deleteTodoOptimistic,
  toggleCompleteOptimistic,
} = todoSlice.actions;

export default todoSlice.reducer;
