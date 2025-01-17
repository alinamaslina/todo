import { JsonPipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/input'
import { Todo, TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [JsonPipe, NgForOf, MatInput, FormsModule, MatCheckbox],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
    }

    private getTodos(): void {
      this.todoService.getTodos().subscribe(
        data : => this.todos = data);
    }

    updateTodo(todo: Todo): void {
      this.todoService.updateTodo(todo).subscribe(
data : Todo => console.log(data)
      )
    }

    deliteTodo(id: number): void {
      this.todoService.deleteTodo(id).subscribe(
data : Todo => console.log(data)
      )
    }
  }

