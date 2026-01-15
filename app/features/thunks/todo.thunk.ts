import { Todo, TodoResponse } from "../interfaces/todo.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "../services/todo.service";

export const fetchAllTodos = createAsyncThunk<TodoResponse, void>(
  "todo/fetchAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      return await todoService.fetchAllTodos();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTodo = createAsyncThunk<Todo, Partial<Todo>>(
  "todo/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      return await todoService.addTodo(todo);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk<
  Todo,
  { id: number; updates: Partial<Todo> }
>(
  "todo/updateTodo",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      return await todoService.updateTodo(id, updates);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await todoService.deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleComplete = createAsyncThunk<
  Todo,
  { id: number; completed: boolean }
>(
  "todo/toggleComplete",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      return await todoService.updateTodo(id, { completed });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);