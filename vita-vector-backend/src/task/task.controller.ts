import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from '../decorators/auth.decorators';
import { CurrentUser } from '../decorators/user.decorator';

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @Auth()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.update(updateTaskDto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
