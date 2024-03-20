import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [StorageModule],
})
export class TracksModule {}
