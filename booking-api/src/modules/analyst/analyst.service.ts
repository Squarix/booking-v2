import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { FocusEvent } from './entities/focus-event.entity';
import { FocusImageEvent } from './entities/focus-image-event.entity';
import { ViewDateEvent } from './entities/view-date-event.entity';
import { ViewEvent } from './entities/view-event.entity';
import {ANALYST_DB_NAME} from "../../ormconfig";

@Injectable()
export class AnalystService {
  constructor(
    @InjectRepository(FocusEvent, ANALYST_DB_NAME)
    private readonly focusEventRepository: Repository<FocusEvent>,
    @InjectRepository(FocusImageEvent, ANALYST_DB_NAME)
    private readonly focusImageEventRepository: Repository<FocusImageEvent>,
    @InjectRepository(ViewDateEvent, ANALYST_DB_NAME)
    private readonly viewDateEventRepository: Repository<ViewDateEvent>,
    @InjectRepository(ViewEvent, ANALYST_DB_NAME)
    private readonly viewEventRepository: Repository<ViewEvent>,
  ) {}

  async createFocusEvent({
    roomId,
    time,
    query,
  }: {
    roomId: number;
    time?: number;
    query?: string;
  }) {
    const event = new FocusEvent();
    event.roomId = roomId;
    event.time = time;
    event.query = query;

    return this.focusEventRepository.save(event);
  }

  async createFocusImageEvent({ roomId }: { roomId: number }) {
    const event = new FocusImageEvent();
    event.roomId = roomId;

    return this.focusImageEventRepository.save(event);
  }

  async createViewDateEvent({ roomId }: { roomId: number }) {
    const event = new ViewDateEvent();
    event.roomId = roomId;

    return this.viewDateEventRepository.save(event);
  }

  async createViewEvent({ roomId }: { roomId: number }) {
    const event = new ViewEvent();
    event.roomId = roomId;

    return this.viewEventRepository.save(event);
  }
}
