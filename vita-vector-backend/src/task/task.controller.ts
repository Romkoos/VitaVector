import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from '../decorators/auth.decorators';
import { CurrentUser } from '../decorators/user.decorator';
import { ColumnDto } from './dto/column.dto';
import { ColumnsOrderDto } from './dto/columns-order.dto';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('user/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // --------------- COLUMNS

  // create columns order
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/columns/order')
  @Auth()
  createColumnsOrder(
    @Body() columnsOrderDto: ColumnsOrderDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.createColumnsOrder(columnsOrderDto, userId);
  }

  // get columns order by user id
  @HttpCode(200)
  @Get('/columns/order')
  @Auth()
  findColumnsOrder(@CurrentUser('id') userId: string) {
    return this.taskService.getColumnsOrder(userId);
  }

  // update columns order by user id
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/columns/order/')
  @Auth()
  updateColumnsOrder(
    @Body() columnsOrderDto: ColumnsOrderDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.updateColumnsOrder(columnsOrderDto, userId);
  }

  // create a column
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/columns')
  @Auth()
  createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.createColumn(createColumnDto, userId);
  }

  // get all columns and order by user id
  @HttpCode(200)
  @Get('/columns')
  @Auth()
  findColumnsAndOrder(@CurrentUser('id') userId: string) {
    return this.taskService.getColumnsAndOrder(userId);
  }

  // update a column by id and user id
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/columns/:id')
  @Auth()
  updateColumn(
    @Body() columnDto: ColumnDto,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.taskService.updateColumn(columnDto, id, userId);
  }

  // delete a column by id
  @HttpCode(200)
  @Delete('/columns/:id')
  @Auth()
  deleteColumn(@Param('id') id: string) {
    return this.taskService.deleteColumn(id);
  }

  // --------------- TASKS

  // create a task
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

  // get all tasks by user id
  @Get()
  @Auth()
  findAll(@CurrentUser('id') userId: string) {
    return this.taskService.findAllByUserId(userId);
  }

  // get one task by id
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  // update a task by id and user id
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

  // delete a task by id
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
