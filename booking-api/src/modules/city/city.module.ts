import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityService } from './city.service';
import { City } from './city.entity';
import { CountryModule } from '../country/country.module';
import { Country } from '../country/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country]), CountryModule],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
