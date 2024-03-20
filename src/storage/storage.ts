import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from 'src/entities/user';
import { Track } from 'src/entities/track';
import { Artist } from 'src/entities/artist';
import { Album } from 'src/entities/album';
import { NotFoundException } from '@nestjs/common';
import { Favorites } from 'src/entities/favorites';
import { FavoritesResponseDto } from 'src/favorites/dto/favorites-response-dto';

@Injectable()
export class Storage {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private favorites: Favorites = new Favorites([], [], []);

  fetchUsers(): User[] {
    return this.users;
  }

  fetchUser(id: string): User | undefined {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  upsertUser(user: User): User {
    const existingUser = this.users.find((existingUser) => {
      return existingUser.id === user.id;
    });

    if (existingUser === undefined) {
      this.users.push(user);
      return user;
    } else {
      existingUser.login = user.login;
      existingUser.createdAt = user.createdAt;
      existingUser.password = user.password;
      existingUser.updatedAt = user.updatedAt;
      existingUser.version = user.version;

      return existingUser;
    }
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => {
      return user.id === id;
    });

    if (userIndex < 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  fetchTracks(): Track[] {
    return this.tracks;
  }

  fetchTrack(id: string): Track | undefined {
    return this.tracks.find((track) => {
      return track.id === id;
    });
  }

  upsertTrack(track: Track): Track {
    const existingTrack = this.tracks.find((existingTrack) => {
      return existingTrack.id === track.id;
    });

    if (existingTrack === undefined) {
      this.tracks.push(track);
      return track;
    } else {
      existingTrack.albumId = track.albumId;
      existingTrack.artistId = track.artistId;
      existingTrack.duration = track.duration;
      existingTrack.name = track.name;
      return existingTrack;
    }
  }

  deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => {
      return track.id === id;
    });

    if (trackIndex < 0) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracks.splice(trackIndex, 1);

    try {
      this.deleteTrackFromFavorites(id);
    } catch {}
  }

  fetchArtists(): Artist[] {
    return this.artists;
  }

  fetchArtist(id: string): Artist | undefined {
    return this.artists.find((artist) => {
      return artist.id === id;
    });
  }

  upsertArtist(artist: Artist): Artist {
    const existingArtist = this.artists.find((existingArtist) => {
      return existingArtist.id === artist.id;
    });

    if (existingArtist === undefined) {
      this.artists.push(artist);
      return artist;
    } else {
      existingArtist.grammy = artist.grammy;
      existingArtist.name = artist.name;
      return existingArtist;
    }
  }

  deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => {
      return artist.id === id;
    });

    if (artistIndex < 0) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1);

    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    try {
      this.deleteArtistFromFavorites(id);
    } catch {}
  }

  fetchAlbums(): Album[] {
    return this.albums;
  }

  fetchAlbum(id: string): Album | undefined {
    return this.albums.find((album) => {
      return album.id === id;
    });
  }

  upsertAlbum(album: Album): Album {
    const existingAlbum = this.albums.find((existingAlbum) => {
      return existingAlbum.id === album.id;
    });

    if (existingAlbum === undefined) {
      this.albums.push(album);
      return album;
    } else {
      existingAlbum.artistId = album.artistId;
      existingAlbum.name = album.name;
      existingAlbum.year = album.year;
      return existingAlbum;
    }
  }

  deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => {
      return album.id === id;
    });

    if (albumIndex < 0) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albums.splice(albumIndex, 1);

    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    try {
      this.deleteAlbumFromFavorites(id);
    } catch {}
  }

  fetchFavorites(): FavoritesResponseDto {
    const favoriteArtists = this.artists.filter((artist) => {
      return this.favorites.artists.includes(artist.id);
    });

    const favoriteAlbums = this.albums.filter((album) => {
      return this.favorites.albums.includes(album.id);
    });

    const favoriteTracks = this.tracks.filter((track) => {
      return this.favorites.tracks.includes(track.id);
    });

    return new FavoritesResponseDto(
      favoriteArtists,
      favoriteAlbums,
      favoriteTracks,
    );
  }

  addTrackToFavorites(id: string) {
    const track = this.tracks.find((track) => {
      return track.id == id;
    });

    if (track === undefined) {
      throw new UnprocessableEntityException(`Track with ${id} doesn't exist`);
    }

    this.favorites.tracks.push(track.id);
  }

  deleteTrackFromFavorites(id: string) {
    const favoriteTrackIndex = this.favorites.tracks.findIndex((trackId) => {
      return trackId === id;
    });

    if (favoriteTrackIndex < 0) {
      throw new NotFoundException(`Track with ${id} is not found`);
    }

    this.favorites.tracks.splice(favoriteTrackIndex, 1);
  }

  addAlbumToFavorites(id: string) {
    const album = this.albums.find((album) => {
      return album.id == id;
    });

    if (album === undefined) {
      throw new UnprocessableEntityException(`Album with ${id} doesn't exist`);
    }

    this.favorites.albums.push(album.id);
  }

  deleteAlbumFromFavorites(id: string) {
    const favoriteAlbumIndex = this.favorites.albums.findIndex((albumId) => {
      return albumId === id;
    });

    if (favoriteAlbumIndex < 0) {
      throw new NotFoundException(`Album with ${id} is not found`);
    }

    this.favorites.albums.splice(favoriteAlbumIndex, 1);
  }

  addArtistToFavorites(id: string) {
    const artist = this.artists.find((artist) => {
      return artist.id == id;
    });

    if (artist === undefined) {
      throw new UnprocessableEntityException(`Artist with ${id} doesn't exist`);
    }

    this.favorites.artists.push(artist.id);
  }

  deleteArtistFromFavorites(id: string) {
    const favoriteArtistIndex = this.favorites.artists.findIndex((artistId) => {
      return artistId === id;
    });

    if (favoriteArtistIndex < 0) {
      throw new NotFoundException(`Artist with ${id} is not found`);
    }

    this.favorites.artists.splice(favoriteArtistIndex, 1);
  }
}
