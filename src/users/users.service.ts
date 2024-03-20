import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Storage } from 'src/storage/storage';

@Injectable()
export class UsersService {
  constructor(private storage: Storage) {}

  getAll(): User[] {
    return this.storage.fetchUsers();
  }

  get(id: string): User {
    const user = this.storage.fetchUser(id);

    if (user === undefined) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(userDto: CreateUserDto): User {
    const user: User = new User(
      uuid4(),
      userDto.login,
      userDto.password,
      1,
      Date.now(),
      Date.now(),
    );

    return this.storage.upsertUser(user);
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto, userId: string): User {
    const user = this.storage.fetchUser(userId);

    if (user === undefined) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return this.storage.upsertUser(user);
  }

  delete(userId: string) {
    this.storage.deleteUser(userId);
  }
}
