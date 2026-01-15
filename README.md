# Todo List Application

A modern, responsive Todo List web application built with Next.js, TypeScript, Redux, and Framer Motion. Features complete CRUD operations, search/filter functionality, and a beautiful UI.

![Todo App Preview](file:///Users/pro-3ies/.gemini/antigravity/brain/58f2c653-48d3-455d-8516-eea02c8ed663/loaded_todos_1768480391429.png)

## Features

- ✅ **Full CRUD Operations**: Create, read, update, and delete todos
- 🔍 **Search Functionality**: Real-time search with debouncing
- 🏷️ **Status Filtering**: Filter by active or completed tasks
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ✨ **Smooth Animations**: Framer Motion animations for cards and modals
- 🔔 **Toast Notifications**: User feedback for all actions
- 💾 **Redux Persist**: Todos persist across page refreshes
- ⚡ **Optimistic Updates**: Immediate UI feedback

## Tech Stack

- **Framework**: Next.js 16.1.2
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Styling**: Tailwind CSS + Custom CSS
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Notifications**: React Toastify
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd seed120-todo
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# .env.local
NEXT_PUBLIC_BASE_URL=https://dummyjson.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── components/
│   ├── providers/        # Redux Provider
│   ├── layout/           # Header component
│   ├── ui/               # Reusable UI components
│   ├── todo/             # Todo-specific components
│   └── modals/           # Modal components
├── features/
│   ├── interfaces/       # TypeScript types
│   ├── services/         # API services
│   ├── slices/           # Redux slices
│   └── thunks/           # Async actions
├── store/                # Redux store configuration
├── utils/                # Utility functions
└── globals.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The app uses the [DummyJSON API](https://dummyjson.com/) for demonstration purposes:

- `GET /todos` - Fetch all todos
- `POST /todos/add` - Create new todo
- `PUT /todos/{id}` - Update todo
- `DELETE /todos/{id}` - Delete todo

> **Note**: DummyJSON is a mock API. While CRUD operations work correctly in the UI, changes won't persist on the server. Redux Persist ensures data persists locally during the session.

## Features Demo

### Add Todo
Click the "+ Add New List" button to open a modal with:
- Task Name (required)
- Due Date picker
- Time picker
- Description textarea

### Edit Todo
Click the three-dot menu on any todo card and select "Edit" to update task details.

### Delete Todo
Click the three-dot menu and select "Delete" to remove a todo.

### Toggle Complete
Click the checkbox on any todo to mark it as complete or active.

### Search & Filter
Use the search bar to find todos by title or description. Use the tab filters to view active or completed tasks.

## Design Philosophy

- **Clean & Modern**: Minimalist interface with focus on usability
- **Responsive**: Mobile-first design that scales beautifully
- **Fast & Smooth**: Optimistic updates and smooth animations
- **User-Friendly**: Clear feedback with toast notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project was created for interview demonstration purposes.

## Acknowledgments

- Design inspiration from modern task management apps
- DummyJSON for providing a free mock API
- Next.js team for the amazing framework
