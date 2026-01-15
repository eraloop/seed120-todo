import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/slices/todo.slice";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
