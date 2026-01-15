export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
    // Extended fields (frontend only)
    dueDate?: string;
    time?: string;
    description?: string;
}

export interface TodoResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number; 
}
