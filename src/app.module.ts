import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContryModule } from './contry/contry.module';
import { CountryService } from './modules/country/country.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ContryModule],
  controllers: [AppController],
  providers: [AppService, CountryService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
