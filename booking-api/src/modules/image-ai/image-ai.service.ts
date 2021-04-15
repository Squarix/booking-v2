import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, JobOptions, Queue } from 'bull';

import { Image } from '../image/image.entity';

@Injectable()
export class ImageAiService {
  constructor(
    @InjectQueue('image-ai')
    private imageAiQueue: Queue,
  ) {}

  bulkProcessImages(images: Image[]): Promise<Job[]> {
    const jobs: Array<any> = images.map((image) => {
      return {
        name: image.id,
        data: {
          id: image.id,
          path: image.path,
        },
      };
    });
    return this.imageAiQueue.addBulk(jobs);
  }
}
