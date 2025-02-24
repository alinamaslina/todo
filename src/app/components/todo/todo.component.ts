import { JsonPipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { Todo, TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-todo',
  imports: [
    JsonPipe,
    NgForOf,
    MatInput,
    FormsModule,
    MatCheckbox,
    MatList,
    MatListItem,
    MatIcon,
    MatMiniFabButton,
    MatFormField,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos(): void {
    this.todoService
      .getTodos()
      .subscribe((data: Todo[]) => (this.todos = data));
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo: Todo = {
        title: this.newTodo,
        completed: false,
        userId: 1,
      };
      this.todoService.createTodo(todo).subscribe((item) => {
        this.todos.unshift(item);
        this.newTodo = '';
      });
    }
  }

  updateTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService
      .updateTodo(todo)
      .subscribe((data: Todo) => console.log(data));
  }
  deleteTodo(id: number | undefined): void {
    if (id) {
      this.todoService.deleteTodo(id).subscribe((data: any) => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    }
  }
}
