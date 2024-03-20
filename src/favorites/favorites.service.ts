import { Injectable } from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response-dto';
import { Storage } from 'src/storage/storage';

@Injectable()
export class FavoritesService {
  constructor(private storage: Storage) {}

  getAll(): FavoritesResponseDto {
    return this.storage.fetchFavorites();
  }

  addAlbum(id: string) {
    this.storage.addAlbumToFavorites(id);
  }

  deleteAlbum(id: string) {
    this.storage.deleteAlbumFromFavorites(id);
  }

  addArtist(id: string) {
    this.storage.addArtistToFavorites(id);
  }

  deleteArtist(id: string) {
    this.storage.deleteArtistFromFavorites(id);
  }

  addTrack(id: string) {
    this.storage.addTrackToFavorites(id);
  }

  deleteTrack(id: string) {
    this.storage.deleteTrackFromFavorites(id);
  }
}
