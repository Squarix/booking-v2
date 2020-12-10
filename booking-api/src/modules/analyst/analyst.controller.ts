import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';

import { AnalystService } from './analyst.service';
import { CreateBodyDto } from './dto/create-body.dto';
import { EventTypes } from './analyst.constants';

@Controller('analyst')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Post(':type')
  @HttpCode(201)
  async createEvent(
    @Body() body: CreateBodyDto,
    @Param('type') type: EventTypes,
  ) {
    switch (type) {
      case EventTypes.FocusEvent:
        return this.analystService.createFocusEvent(body);
      case EventTypes.FocusImageEvent:
        return this.analystService.createFocusImageEvent(body);
      case EventTypes.ViewDateEvent:
        return this.analystService.createViewDateEvent(body);
      case EventTypes.ViewEvent:
        return this.analystService.createViewEvent(body);
      default:
        throw new BadRequestException();
    }
  }
}
