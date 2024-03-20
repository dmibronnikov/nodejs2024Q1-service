import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [StorageModule],
})
export class UsersModule {}
