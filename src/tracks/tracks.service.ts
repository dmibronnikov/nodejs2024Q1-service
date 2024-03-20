import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/entities/track';
import { v4 as uuid4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { Storage } from 'src/storage/storage';

@Injectable()
export class TracksService {
  constructor(private storage: Storage) {}

  getAll(): Track[] {
    return this.storage.fetchTracks();
  }

  get(id: string): Track {
    const track = this.storage.fetchTrack(id);

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

    return this.storage.upsertTrack(track);
  }

  update(trackDto: CreateTrackDto, trackId: string): Track {
    const track = this.storage.fetchTrack(trackId);

    if (track === undefined) {
      throw new NotFoundException(`Track with id ${trackId} not found`);
    }

    track.albumId = trackDto.albumId;
    track.artistId = trackDto.artistId;
    track.duration = trackDto.duration;
    track.name = trackDto.name;

    return this.storage.upsertTrack(track);
  }

  delete(trackId: string) {
    this.storage.deleteTrack(trackId);
  }
}
