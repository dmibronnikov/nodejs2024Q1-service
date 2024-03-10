import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/entities/track';
import { v4 as uuid4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  get(id: string): Track {
    const track = this.tracks.find((track) => {
      return track.id === id;
    });

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  create(trackDto: CreateTrackDto): Track {
    const track: Track = new Track(
      uuid4(),
      trackDto.name,
      trackDto.duration,
      trackDto.artistId,
      trackDto.albumId,
    );

    this.tracks.push(track);
    return track;
  }

  update(trackDto: CreateTrackDto, trackId: string): Track {
    const track = this.tracks.find((track) => {
      return track.id === trackId;
    });

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    track.albumId = trackDto.albumId;
    track.artistId = trackDto.artistId;
    track.duration = trackDto.duration;
    track.name = trackDto.name;

    return track;
  }

  delete(trackId: string) {
    const trackIndex = this.tracks.findIndex((track) => {
      return track.id === trackId;
    });

    if (trackIndex < 0) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    this.tracks.splice(trackIndex, 1);
  }
}
