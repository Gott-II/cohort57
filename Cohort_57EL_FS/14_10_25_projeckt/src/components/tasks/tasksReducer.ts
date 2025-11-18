import { createSlice } from '@reduxjs/toolkit';
import { uid } from 'uid';
import type { Task } from './types/Task';

const initialState: Task[] = [
  {
    id: uid(),
    title: 'Изучить React',
    description: 'Изучить Redux, React, Typescript',
    isDone: false,
  },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({ ...action.payload, id: uid() });
    },
    changeStatus: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
    deleteTask: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, changeStatus, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
