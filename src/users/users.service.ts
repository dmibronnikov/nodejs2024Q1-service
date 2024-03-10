import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  get(id: string): User {
    const user = this.users.find((user) => {
      return user.id === id;
    });

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

    this.users.push(user);
    return user;
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto, userId: string): User {
    const user = this.users.find((user) => {
      return user.id === userId;
    });

    if (user === undefined) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();

    return user;
  }

  delete(userId: string) {
    const userIndex = this.users.findIndex((user) => {
      return user.id === userId;
    });

    if (userIndex < 0) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    this.users.splice(userIndex, 1);
  }
}
