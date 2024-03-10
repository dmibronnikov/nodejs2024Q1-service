import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [StorageModule],
})
export class ArtistsModule {}
