export class Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(artists: string[], albums: string[], tracks: string[]) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
