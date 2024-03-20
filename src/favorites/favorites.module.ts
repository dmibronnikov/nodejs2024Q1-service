import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [StorageModule],
})
export class FavoritesModule {}
