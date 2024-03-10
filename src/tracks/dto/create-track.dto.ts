import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @Optional()
  artistId: string | null; // refers to Artist

  @Optional()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  duration: number; // integer number
}
