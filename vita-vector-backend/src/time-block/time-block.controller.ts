import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { CurrentUser } from '../decorators/user.decorator';
import { Auth } from '../decorators/auth.decorators';
import { UpdateOrderTimeBlockDto } from './dto/update-order-time-block.dto';

@Controller('user/time-blocks')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  create(
    @Body() createTimeBlockDto: CreateTimeBlockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlockService.create(createTimeBlockDto, userId);
  }

  @Get()
  @Auth()
  findAll(@CurrentUser('id') userId: string) {
    return this.timeBlockService.findAll(userId);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.timeBlockService.findOne(id);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  delete(@Param('id') id: string) {
    return this.timeBlockService.delete(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-order')
  @Auth()
  updateOrder(@Body() updateOrderTimeBlockDto: UpdateOrderTimeBlockDto) {
    return this.timeBlockService.updateOrder(updateOrderTimeBlockDto.ids);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateTimeBlockDto: UpdateTimeBlockDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.timeBlockService.update(id, updateTimeBlockDto, userId);
  }
}
