export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(
    id: string,
    name: string,
    duration: number,
    artistId: string | null = null,
    albumId: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
