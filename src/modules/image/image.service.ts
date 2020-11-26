import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private roomRepository: Repository<Image>,
  ) {}

  async create(path: string): Promise<Image> {
    const image = new Image();
    image.path = path;

    return this.roomRepository.save(image);
  }
}
