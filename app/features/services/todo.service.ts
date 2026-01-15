
import { apiService } from "@/app/utils/api/api.service";
import { Todo, TodoResponse } from "../interfaces/todo.interface";
import { requestWithErrorHandling } from "@/app/utils/error/handle.error";

class TodoService {
    
  private static instance: TodoService;

  static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  fetchAllTodos = () => {
    return requestWithErrorHandling(async () => {
      return await apiService.get<TodoResponse>(
        `/todos`,
      );
    });
  };

  addTodo = (todo: Partial<Todo>) => {
    return requestWithErrorHandling(async () => {
      return await apiService.post<Todo>(
        `/todos/add`,
        {
          todo: todo.todo,
          completed: todo.completed || false,
          userId: todo.userId || 1,
        }
      );
    });
  };

  updateTodo = (id: number, updates: Partial<Todo>) => {
    return requestWithErrorHandling(async () => {
      return await apiService.put<Todo>(
        `/todos/${id}`,
        updates
      );
    });
  };

  deleteTodo = (id: number) => {
    return requestWithErrorHandling(async () => {
      return await apiService.delete<Todo>(
        `/todos/${id}`
      );
    });
  };

}

export const todoService = TodoService.getInstance();
