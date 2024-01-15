import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from './task.reducer';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Task Manager</h1>
      <div>
        <input [(ngModel)]="newTask" placeholder="Enter task" />
        <button (click)="addTask()">Add Task</button>
      </div>
      <ul>
        <li *ngFor="let task of tasks$ | async; let i = index">
          {{ task }} <button (click)="deleteTask(i)">Delete</button>
        </li>
      </ul>
    </div>
  `,
})
export class AppComponent {
  newTask = '';
  tasks$: Observable<string[]>;

  private tasksSelector = createFeatureSelector<fromTasks.AppState>('tasks');
  private selectTasks = createSelector(this.tasksSelector, (state) => state.tasks);

  constructor(private taskService: TaskService, private store: Store) {
    this.tasks$ = store.pipe(select(this.selectTasks));
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      this.taskService.addTask(this.newTask);
      this.newTask = '';
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
