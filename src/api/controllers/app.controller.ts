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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from '../models/input/create.user.model';
import { UpdateUserDto } from '../models/input/update.user.model';
import { UserService } from '../../application/services/user.service';
import { UsersQueryRepository } from '../query-repository/users.query.repo';
import { validateQueryParameters } from '../../core/query.validator';
import { ResponseModel } from '../models/output/result.model';
import { EndpointEnum, RoutingEnum } from '../../core/routes/routes';

@Controller(RoutingEnum.user)
export class UserController {
  constructor(
    private userService: UserService,
    private userQueryRepo: UsersQueryRepository,
  ) {}

  @Post(EndpointEnum.create)
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseModel> {
    return await this.userService.createUser(createUserDto);
  }

  @Get(EndpointEnum.getById)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
    const user = await this.userQueryRepo.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return {
      success: true,
      result: user,
    };
  }

  @Get(EndpointEnum.getAll)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: any): Promise<ResponseModel> {
    const validationError = validateQueryParameters(query);
    if (validationError) {
      return validationError;
    }

    const usersResult = await this.userQueryRepo.findAll(query);
    return { success: true, result: { users: usersResult } };
  }

  @Patch(EndpointEnum.update)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseModel> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(EndpointEnum.deleteById)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
    return await this.userService.removeUser(id);
  }

  @Delete(EndpointEnum.deleteAll)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll(): Promise<ResponseModel> {
    return await this.userService.removeAll();
  }
}
