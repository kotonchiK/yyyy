import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/users.repository';
import { CreateUserDto } from '../../api/models/input/create.user.model';
import { UpdateUserDto } from '../../api/models/input/update.user.model';
import { ResponseModel } from '../../api/models/output/result.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseModel> {
    const user = await this.userRepository.create(createUserDto);
    if (!user) throw new BadRequestException('user was not created');

    return {
      success: true,
      result: { id: user.id },
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseModel> {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return {
      success: true,
      result: {
        id: updatedUser.id,
        full_name: updatedUser.full_name,
        role: updatedUser.role,
        efficiency: updatedUser.efficiency,
      },
    };
  }

  async removeUser(id: number): Promise<ResponseModel> {
    const user = await this.userRepository.remove(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      success: true,
      result: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        efficiency: user.efficiency,
      },
    };
  }

  async removeAll(): Promise<ResponseModel> {
    try {
      await this.userRepository.removeAll();
      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
