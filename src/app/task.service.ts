import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, deleteTask } from './index';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private store: Store) {}

  addTask(task: string): void {
    this.store.dispatch(addTask({ task }));
  }

  deleteTask(taskId: number): void {
    this.store.dispatch(deleteTask({ taskId }));
  }
}
