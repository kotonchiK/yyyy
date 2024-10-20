import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { UserController } from './api/controllers/app.controller';
import { UsersQueryRepository } from './api/query-repository/users.query.repo';
import { UserService } from './application/services/user.service';
import { UsersRepository } from './infrastructure/users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersQueryRepository, UserService, UsersRepository],
})
export class AppModule {}
