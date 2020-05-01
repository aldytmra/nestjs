import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value', value);
        console.log('metadata', metadata);

        if (!this.isStatusesValid(value)) {
            throw new BadRequestException(`${value}  is an invalid status`);
        }
        return value;
    }

    private isStatusesValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== - 1;
    }
}