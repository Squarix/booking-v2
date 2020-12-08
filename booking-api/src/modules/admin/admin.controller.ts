import {Body, Controller, Get, Param, Patch, Query, UseGuards} from '@nestjs/common';

import { RoomService } from "../room/room.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ModeratorGuard} from "../auth/moderator.guard";
import {Room, RoomStatus} from "../room/room.entity";

@Controller('admin')
export class AdminController {
  constructor(
    private readonly roomService: RoomService,
  ) {}

  @Get('rooms')
  @UseGuards(JwtAuthGuard, ModeratorGuard)
  getRooms(
    @Query('limit') limit: number,
    @Query('offset') offset: number
  ): Promise<ManyModelDto<Room>> {
    return this.roomService.findAllPending(limit, offset);
  }

  @Patch('rooms/:id')
  @UseGuards(JwtAuthGuard, ModeratorGuard)
  editRoom(@Param('id') id:number, @Body('status') status: RoomStatus): Promise<Room> {
    return this.roomService.changeStatus(id, status);
  }
}
