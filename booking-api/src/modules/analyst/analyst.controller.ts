import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AnalystService } from './analyst.service';
import { CreateBodyDto } from './dto/create-body.dto';
import { EventTypes } from './analyst.constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User, UserTypes } from '../users/user.entity';
import { ModeratorGuard } from '../auth/moderator.guard';
import { RoomService } from '../room/room.service';

@Controller('analyst')
export class AnalystController {
  constructor(
    private readonly analystService: AnalystService,
    private readonly roomService: RoomService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserAnalytics(@Request() req) {
    let roomIds: number[] = null;

    if (req.user.type !== UserTypes.moderator) {
      const rooms = await this.roomService.findUserRoomIds(req.user);
      roomIds = rooms.map((r) => r.id);
    }

    const topViews = await this.analystService.getTopViews(roomIds);
    const topQueries = await this.analystService.getTopQueries(roomIds);
    const topDate = await this.analystService.getTopDateViews(roomIds);

    return { topViews, topQueries, topDate };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':type')
  @HttpCode(201)
  async createEvent(
    @Body() body: CreateBodyDto,
    @Param('type') type: EventTypes,
    @Request() req,
  ) {
    const eventBody = { ...body, userId: req.user.id };
    switch (type) {
      case EventTypes.FocusEvent:
        return this.analystService.createFocusEvent(eventBody);
      case EventTypes.FocusImageEvent:
        return this.analystService.createFocusImageEvent(eventBody);
      case EventTypes.ViewDateEvent:
        return this.analystService.createViewDateEvent(eventBody);
      case EventTypes.ViewEvent:
        return this.analystService.createViewEvent(eventBody);
      default:
        throw new BadRequestException();
    }
  }
}
