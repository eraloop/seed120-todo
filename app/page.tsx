"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/global.state";
import {
  fetchAllTodos,
  addTodo as addTodoThunk,
  updateTodo as updateTodoThunk,
  deleteTodo as deleteTodoThunk,
  toggleComplete as toggleCompleteThunk,
} from "./features/thunks/todo.thunk";
import { setSelectedTodo } from "./features/slices/todo.slice";
import { Todo } from "./features/interfaces/todo.interface";
import Header from "./components/layout/Header";
import SearchBar from "./components/ui/SearchBar";
import FilterTabs from "./components/ui/FilterTabs";
import TodoList from "./components/todo/TodoList";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import AddTodoModal from "./components/modals/AddTodoModal";
import EditTodoModal from "./components/modals/EditTodoModal";
import ViewDetailsModal from "./components/modals/ViewDetailsModal";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useAppDispatch();
  const { filteredTodos, loading, error } = useAppSelector(
    (state) => state.todo
  );
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddTodo = async (todo: Partial<Todo>) => {
    try {
      await dispatch(addTodoThunk(todo)).unwrap();
      toast.success("Todo added successfully!");
    } catch (err) {
      toast.error("Failed to add todo");
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      await dispatch(updateTodoThunk({ id, updates })).unwrap();
      toast.success("Todo updated successfully!");
    } catch (err) {
      toast.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await dispatch(deleteTodoThunk(id)).unwrap();
        toast.success("Todo deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete todo");
      }
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await dispatch(toggleCompleteThunk({ id, completed })).unwrap();
      toast.success(
        completed ? "Todo marked as complete!" : "Todo marked as active!"
      );
    } catch (err) {
      toast.error("Failed to update todo");
    }
  };

  const handleEditClick = (todo: Todo) => {
    dispatch(setSelectedTodo(todo));
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (todo: Todo) => {
    dispatch(setSelectedTodo(todo));
    setIsViewModalOpen(true);
  };

  return (
    <div className="app-container">
      <Header onAddNewClick={() => setIsAddModalOpen(true)} />

      <main className="main-content">
      
        <FilterTabs />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditClick}
            onDelete={handleDeleteTodo}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
      />

      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          dispatch(setSelectedTodo(null));
        }}
        onUpdate={handleUpdateTodo}
        todo={selectedTodo}
      />

      <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          dispatch(setSelectedTodo(null));
        }}
        onEdit={handleEditClick}
        todo={selectedTodo}
      />
    </div>
  );
}
