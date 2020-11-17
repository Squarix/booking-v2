import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { CryptographerService } from '../auth/cryptographer.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, CryptographerService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
