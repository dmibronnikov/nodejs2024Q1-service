import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [StorageModule],
})
export class AlbumsModule {}
