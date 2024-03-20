export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(
    id: string,
    name: string,
    year: number,
    artistId: string | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
