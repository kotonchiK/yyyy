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

@Controller()
export class Appcontroller {
  @Get()
  async findOne() {
    return 'hello';
  }
}
