import { Body, Controller, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateStatus(@Body() body, @Request() req) {
    return this.bookingService.updateBookingStatus(req.user, body.newStatus);
  }
}
