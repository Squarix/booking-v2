import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {BookingModule} from '../booking/booking.module';
import {CryptographerService} from '../auth/cryptographer.service';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {RoomModule} from "../room/room.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), BookingModule, RoomModule],
  providers: [UsersService, CryptographerService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
}
