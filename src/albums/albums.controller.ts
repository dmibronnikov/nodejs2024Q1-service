import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from 'src/entities/album';
import { createAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.albumsService.get(id);
  }

  @Post()
  async createTrack(@Body() createAlbumDto: createAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: createAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.albumsService.delete(id);
  }
}
