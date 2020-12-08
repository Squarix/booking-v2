import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'fs';
import * as path from 'path';
import * as gm from 'gm';
import { v4 as uuid } from 'uuid';

import { Image } from './image.entity';
import { FILE_PATH } from './image.constants';

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
    return new Promise<string>((resolve, reject) => {
      const uniqueFileName = `${uuid()}~~${filename}`;

      gm(buffer)
        .resize('1024', '768', '^')
        .gravity('Center')
        .crop('1024', '768')
        .write(path.join(FILE_PATH, uniqueFileName), function (err) {
          if (!err) resolve(uniqueFileName);
          reject(err);
        });
    })
  }
}
