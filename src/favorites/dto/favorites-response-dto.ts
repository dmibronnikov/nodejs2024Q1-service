import { Artist } from 'src/entities/artist';
import { Track } from 'src/entities/track';
import { Album } from 'src/entities/album';

export class FavoritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(artists: Artist[], albums: Album[], tracks: Track[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
