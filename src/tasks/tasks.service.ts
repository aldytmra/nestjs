import { Injectable, Body, Param, BadRequestException, NotFoundException, Get, ParseIntPipe, Post } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTask } from './dto/get-filtered-task.dto';
import { taskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { create } from 'domain';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(taskRepository)
        private taskRepository: taskRepository,
    ) { }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getFilteredTasks(filterDto: GetFilteredTask): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }
    //     return tasks;
    // }

    async getTasks(getFilteredTasks: GetFilteredTask): Promise<Task[]> {
        return this.taskRepository.getTasks(getFilteredTasks);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return found;
    }

    async createTask(createTask: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTask);
    }

    async deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

    }

    async updateTaskById(id: number, status: TaskStatus, createTaskDto: CreateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id);

        task.title = createTaskDto.title;
        task.description = createTaskDto.description;
        task.status = status;
        await task.save();

        return task;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }

    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;

    // }

    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaskById(id: string, title: string, description: string, status: TaskStatus): void {
    //     const task = this.getTaskById(id)

    //     task.title = title;
    //     task.description = description;
    //     task.status = status;
    // }
}
