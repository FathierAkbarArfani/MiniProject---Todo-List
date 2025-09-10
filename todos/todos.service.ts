import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todos[] = [];

  create(createTodoDto: CreateTodoDto) {
  const newTodos = {
      Nomor: this.todos.length + 1,
      ...createTodoDto,
    };
    this.todos.push(newTodos);
    return newTodos;
  } 


  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const data = this.todos.find((item) => item.id === id)
    if (!data) throw new NotFoundException(`Siswa dengan id ${id} tidak ditemukan`);
        return data;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
      const index = this.todos.findIndex((item) => item.id === id);
      if (index < 0) throw new NotFoundException(`Siswa dengan id ${id} tidak ditemukan`);
  
      this.todos[index] = { ...this.todos[index], ...updateTodoDto };
      return this.todos[index];
    }

  remove(id: number) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Siswa dengan id ${id} tidak ditemukan`);

    const deleted = this.todos[index];
    this.todos.splice(index, 1);
    return deleted;
  }
}
