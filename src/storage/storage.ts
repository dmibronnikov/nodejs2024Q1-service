import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { Track } from 'src/entities/track';
import { Artist } from 'src/entities/artist';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class Storage {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];

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
    const artistIndex = this.artists.findIndex((track) => {
      return track.id === id;
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
  }
}
