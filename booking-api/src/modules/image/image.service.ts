import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Image } from './image.entity';
import { FILE_PATH } from './image.constants';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

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

  async writeImage(buffer: Buffer, filename: string): Promise<string> {
    const uniqueFileName = `${uuid()}~~${filename}`;
    await fs.promises.writeFile(
      path.join(FILE_PATH, uniqueFileName),
      buffer,
      'binary',
    );

    return uniqueFileName;
  }
}
