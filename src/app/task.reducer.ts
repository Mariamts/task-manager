import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';

export interface AppState {
  tasks: string[];
}

export const initialState: AppState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((_, index) => index !== taskId),
  }))
);
