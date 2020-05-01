import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTask } from './dto/get-filtered-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetFilteredTask): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getFilteredTasks(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }

    // }

    @Get()
    getTasks(@Query(ValidationPipe) getFilteredTask: GetFilteredTask): Promise<Task[]> {
        return this.tasksService.getTasks(getFilteredTask);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTask)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id')
    updateTaskById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus, @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.tasksService.updateTaskById(id, status, createTaskDto);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createtask(@Body() createTaskDto: CreateTaskDto) {
    //     return this.tasksService.createTask(createTaskDto);

    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void {
    //     this.tasksService.deleteTaskById(id);

    // }

    // @Patch('/:id')
    // updateTaskById(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) title: string, description: string, status: TaskStatus
    // ) {
    //     this.tasksService.updateTaskById(id, title, description, status);
    // }
}