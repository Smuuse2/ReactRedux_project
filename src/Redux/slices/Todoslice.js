import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'Todos',
  initialState: {
    todos: [],
  },
  reducers: {
    newTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
    updateTodo: (state, action) => {
      const { id, newTodo } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...newTodo };
      }
      
    },
  },
});

export const { newTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice;
