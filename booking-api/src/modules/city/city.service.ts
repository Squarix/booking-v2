import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { Country } from '../country/country.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findOneOrCreate(name: string, countryId: number): Promise<City> {
    const country = await this.countryRepository.findOne(countryId);
    if (!country) return null;

    let city: City = await this.cityRepository.findOne({
      where: { name, countryId },
    });

    if (!city) {
      city = new City();
      city.country = country;
      city.name = name;

      return this.cityRepository.save(city);
    }

    return city;
  }
}
