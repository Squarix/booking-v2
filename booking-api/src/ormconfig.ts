import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Booking } from './modules/booking/booking.entity';
import { Category } from './modules/category/category.entity';
import { City } from './modules/city/city.entity';
import { Country } from './modules/country/country.entity';
import { Filter } from './modules/filter/filter.entity';
import { Image } from './modules/image/image.entity';
import { Room } from './modules/room/room.entity';
import { User } from './modules/users/user.entity';

import { FocusEvent } from './modules/analyst/entities/focus-event.entity';
import { FocusImageEvent } from './modules/analyst/entities/focus-image-event.entity';
import { ViewDateEvent } from './modules/analyst/entities/view-date-event.entity';
import { ViewEvent } from './modules/analyst/entities/view-event.entity';

const AppEntities = [
  Booking,
  Category,
  City,
  Country,
  Filter,
  Image,
  Room,
  User,
];

const AnalystEntities = [FocusEvent, FocusImageEvent, ViewDateEvent, ViewEvent];

export const ANALYST_DB_NAME = 'analyst_db';

export const dbConfig: {
  application: TypeOrmModuleOptions;
  analyst: TypeOrmModuleOptions;
} = {
  application: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT) || 5432,
    username: 'admin',
    password: 'admin',
    database: 'booking-api',
    entities: AppEntities,
    synchronize: true,
  },
  analyst: {
    name: ANALYST_DB_NAME,
    type: 'postgres',
    host: process.env.DB_ANALYST_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT) || 5432,
    username: 'admin',
    password: 'admin',
    database: 'booking-analyst',
    entities: AnalystEntities,
    synchronize: true,
  },
};
