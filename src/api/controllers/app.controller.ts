import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../models/input/create.user.model';
import { UpdateUserDto } from '../models/input/update.user.model';
import { UserService } from '../../application/services/user.service';
import { UsersQueryRepository } from '../query-repository/users.query.repo';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userQueryRepo: UsersQueryRepository,
  ) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userQueryRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('get')
  async findAll(@Query() query: any) {
    if (Object.keys(query).length === 0) {
      return {
        success: false,
        result: {
          error: 'No query parameters provided',
        },
      };
    }

    try {
      const users = await this.userQueryRepo.findAll(query);
      return { success: true, result: { users } };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);
      return {
        success: true,
        result: {
          id: user.id,
          full_name: user.full_name,
          role: user.role,
          efficiency: user.efficiency,
        },
      };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.removeUser(id);
      return {
        success: true,
        result: {
          id: user.id,
          full_name: user.full_name,
          role: user.role,
          efficiency: user.efficiency,
        },
      };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }

  @Delete('delete')
  async removeAll() {
    try {
      await this.userService.removeAll();
      return { success: true };
    } catch (error) {
      return { success: false, result: { error: error.message } };
    }
  }
}
