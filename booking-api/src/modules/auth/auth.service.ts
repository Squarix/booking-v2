import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CryptographerService } from './cryptographer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptographerService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });

    if (user) {
      const passMatch = await this.cryptoService.checkPassword(
        user.password,
        pass,
      );

      if (user && passMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  public async signUp(user: CreateUserDto) {
    return this.userService.create(user);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
