import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ImageAiService } from './image-ai.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image-ai',
    }),
  ],
  providers: [ImageAiService],
  exports: [ImageAiService],
})
export class ImageAiModule {}
