import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/users.repository';
import { CreateUserDto } from '../../api/models/input/create.user.model';
import { UpdateUserDto } from '../../api/models/input/update.user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    if (!user) {
      return {
        success: false,
        error: 'User was not created',
      };
    }
    return {
      success: true,
      result: { id: user.id },
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async removeUser(id: number) {
    return await this.userRepository.remove(id);
  }

  async removeAll() {
    return await this.userRepository.removeAll();
  }
}
