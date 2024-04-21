import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    isGlobal: true,
  }), AuthModule, UserModule],
})
export class AppModule {}
