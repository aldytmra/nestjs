import { IsOptional, IsIn, isNotEmpty, IsNotEmpty } from "class-validator";
import { TaskStatus } from '../task-status.enum'

export class GetFilteredTask {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}