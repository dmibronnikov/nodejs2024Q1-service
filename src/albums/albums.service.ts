import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { createAlbumDto } from './dto/create-album.dto';
import { Album } from 'src/entities/album';
import { Storage } from 'src/storage/storage';

@Injectable()
export class AlbumsService {
  constructor(private storage: Storage) {}

  getAll(): Album[] {
    return this.storage.fetchAlbums();
  }

  get(id: string): Album {
    const album = this.storage.fetchAlbum(id);

    if (album === undefined) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  create(albumDto: createAlbumDto): Album {
    const album: Album = new Album(
      uuid4(),
      albumDto.name,
      albumDto.year,
      albumDto.artistId,
    );

    return this.storage.upsertAlbum(album);
  }

  update(albumDto: createAlbumDto, albumId: string): Album {
    const album = this.storage.fetchAlbum(albumId);

    if (album === undefined) {
      throw new NotFoundException(`Album with id ${albumId} not found`);
    }

    album.name = albumDto.name;
    album.year = albumDto.year;
    album.artistId = albumDto.artistId;

    return this.storage.upsertAlbum(album);
  }

  delete(albumId: string) {
    this.storage.deleteAlbum(albumId);
  }
}
