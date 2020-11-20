import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CryptographerService } from '../auth/cryptographer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly cryptoService: CryptographerService,
  ) {}

  async create(newUser: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;

    user.password = await this.cryptoService.hashPassword(newUser.password);

    return this.usersRepository.save(user);
  }

  async update(id, params): Promise<User> {
    await this.usersRepository.update(id, params);
    return this.findOne(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(params: any): Promise<User> {
    return this.usersRepository.findOne(params);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
