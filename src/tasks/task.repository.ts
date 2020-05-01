
import { Task } from './task.entity'
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetFilteredTask } from './dto/get-filtered-task.dto';

@EntityRepository(Task)
export class taskRepository extends Repository<Task>{
    async createTask(createTask: CreateTaskDto): Promise<Task> {
        const { title, description } = createTask;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async getTasks(getFilteredTasks: GetFilteredTask): Promise<Task[]> {
        const { status, search } = getFilteredTasks;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status: status });
        }
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }


        const tasks = query.getMany();

        return tasks;
    }
}