import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}
