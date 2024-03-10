import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/entities/artist';
import { Storage } from 'src/storage/storage';

@Injectable()
export class ArtistsService {
  constructor(private storage: Storage) {}

  getAll(): Artist[] {
    return this.storage.fetchArtists();
  }

  get(id: string): Artist {
    const artist = this.storage.fetchArtist(id);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  create(artistDto: CreateArtistDto): Artist {
    const artist: Artist = new Artist(
      uuid4(),
      artistDto.name,
      artistDto.grammy,
    );

    return this.storage.upsertArtist(artist);
  }

  update(artistDto: CreateArtistDto, artistId: string): Artist {
    const artist = this.storage.fetchArtist(artistId);

    if (artist === undefined) {
      throw new NotFoundException(`Artist with id ${artistId} not found`);
    }

    artist.name = artistDto.name;
    artist.grammy = artistDto.grammy;

    return this.storage.upsertArtist(artist);
  }

  delete(artistId: string) {
    this.storage.deleteArtist(artistId);
  }
}
