import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalystController } from './analyst.controller';
import { AnalystService } from './analyst.service';
import { FocusEvent } from './entities/focus-event.entity';
import { FocusImageEvent } from './entities/focus-image-event.entity';
import { ViewDateEvent } from './entities/view-date-event.entity';
import { ViewEvent } from './entities/view-event.entity';
import { ANALYST_DB_NAME } from '../../ormconfig';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [FocusEvent, FocusImageEvent, ViewEvent, ViewDateEvent],
      ANALYST_DB_NAME,
    ),
    RoomModule,
  ],
  controllers: [AnalystController],
  providers: [AnalystService],
  exports: [AnalystService],
})
export class AnalystModule {}
