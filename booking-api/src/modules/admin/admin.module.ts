import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import {AdminController} from "./admin.controller";
import {RoomModule} from "../room/room.module";

@Module({
  imports: [RoomModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
