import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  UsePipes,
  ValidationPipe, Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { ReturnUserDto } from './dto/return-user.dto';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getMe(@Request() req) {
    const {
      user: { id },
    } = req;
    return this.usersService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Request() req, @Body() body: UpdateUserDto): Promise<User> {
    const {
      user: { id },
    } = req;

    return this.usersService.update(id, plainToClass(UpdateUserDto, body));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/bookings')
  findUserBookings(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ): Promise<Booking[]> {
    return this.bookingService.getUserBookings(req.user, startDate, endDate);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
