import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async create(newCountry: CreateCountryDto): Promise<Country> {
    const country = new Country();
    country.name = newCountry.name;
    country.code = newCountry.code;

    return this.countryRepository.save(country);
  }

  async update(id, params): Promise<Country> {
    await this.countryRepository.update(id, params);
    return this.findOne(id);
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  findOne(params: any): Promise<Country> {
    return this.countryRepository.findOne(params);
  }

  async remove(id: number): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
