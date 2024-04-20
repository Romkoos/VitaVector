import { AuthGuard } from '@nestjs/passport';

export class JtwAuthGuard extends AuthGuard('jwt') {}