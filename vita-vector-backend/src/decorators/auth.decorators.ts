import { UseGuards } from '@nestjs/common';
import { JtwAuthGuard } from '../guards/jwt.guard';

export const Auth = () => UseGuards(JtwAuthGuard);