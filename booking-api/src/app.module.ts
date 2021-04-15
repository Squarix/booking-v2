import { Module } from '@nestjs/common';
import { BullModule } from "@nestjs/bull";
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Connection } from 'typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AnalystModule } from './modules/analyst/analyst.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { CategoryModule } from './modules/category/category.module';
import { CityModule } from './modules/city/city.module';
import { CountryModule } from './modules/country/country.module';
import { EventsModule } from './modules/events/events.module';
import { FilterModule } from './modules/filter/filter.module';
import { ImageModule } from './modules/image/image.module';
import { ImageAiModule } from './modules/image-ai/image-ai.module';
import { RoomModule } from './modules/room/room.module';
import { UsersModule } from './modules/users/users.module';

import { dbConfig } from './ormconfig';

@Module({
  imports: [
    BullModule.forRoot(dbConfig.redis),
    TypeOrmModule.forRoot(dbConfig.application),
    TypeOrmModule.forRoot(dbConfig.analyst),
    AdminModule,
    AnalystModule,
    AuthModule,
    BookingModule,
    CategoryModule,
    CityModule,
    CountryModule,
    EventsModule,
    FilterModule,
    ImageModule,
    ImageAiModule,
    MulterModule.register({
      dest: '../uploads',
    }),
    RoomModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
