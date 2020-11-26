import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountryModule } from './modules/country/country.module';
import { CityModule } from './modules/city/city.module';
import { RoomModule } from './modules/room/room.module';
import { ImageModule } from './modules/image/image.module';
import { BookingModule } from './modules/booking/booking.module';
import { CategoryModule } from './modules/category/category.module';
import { FilterModule } from './modules/filter/filter.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    CityModule,
    CountryModule,
    UsersModule,
    RoomModule,
    ImageModule,
    BookingModule,
    CategoryModule,
    FilterModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
