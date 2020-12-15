import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { FocusEvent } from './entities/focus-event.entity';
import { FocusImageEvent } from './entities/focus-image-event.entity';
import { ViewDateEvent } from './entities/view-date-event.entity';
import { ViewEvent } from './entities/view-event.entity';
import { ANALYST_DB_NAME } from '../../ormconfig';

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
    userId,
  }: {
    roomId: number;
    time?: number;
    query?: string;
    userId?: number;
  }) {
    const event = new FocusEvent();
    event.roomId = roomId;
    event.time = time;
    event.query = query;
    event.userId = userId;

    return this.focusEventRepository.save(event);
  }

  async createFocusImageEvent({
    roomId,
    userId,
    imageId,
  }: {
    roomId: number;
    userId?: number;
    imageId?: number;
  }) {
    const event = new FocusImageEvent();
    event.roomId = roomId;
    event.userId = userId;
    event.imageId = imageId;

    return this.focusImageEventRepository.save(event);
  }

  async createViewDateEvent({
    roomId,
    userId,
  }: {
    roomId: number;
    userId?: number;
  }) {
    const event = new ViewDateEvent();
    event.roomId = roomId;
    event.userId = userId;

    return this.viewDateEventRepository.save(event);
  }

  async createViewEvent({
    roomId,
    query,
    userId,
  }: {
    roomId: number;
    query?: string;
    userId?: number;
  }) {
    const event = new ViewEvent();
    event.roomId = roomId;
    event.userId = userId;
    event.query = query;

    return this.viewEventRepository.save(event);
  }

  async getTopViews(roomIds: number[] = null): Promise<ViewEvent[]> {
    const query = this.viewEventRepository
      .createQueryBuilder('view')
      .select('COUNT("id") as "view_count", "roomId"')
      .groupBy('"roomId"')
      .orderBy('"view_count"', 'DESC');

    if (roomIds) {
      query.where('"roomId" in (:...roomIds)', { roomIds });
    }

    return query.getRawMany();
  }

  async getTopQueries(roomIds: number[] = null): Promise<ViewEvent[]> {
    const query = this.viewEventRepository
      .createQueryBuilder('view')
      .select('COUNT("id") as "view_count", "query"')
      .groupBy('"query"')
      .orderBy('"view_count"', 'DESC');

    if (roomIds) {
      query.where('"roomId" in (:...roomIds)', { roomIds });
    }

    return query.getRawMany();
  }

  async getTopDateViews(roomIds: number[] = null): Promise<ViewDateEvent[]> {
    const query = this.viewDateEventRepository
      .createQueryBuilder('view')
      .select('COUNT("id") as "view_count", "roomId"')
      .groupBy('"roomId"')
      .orderBy('"view_count"', 'DESC');

    if (roomIds) {
      query.where('"roomId" in (:...roomIds)', { roomIds });
    }

    return query.getRawMany();
  }
}
