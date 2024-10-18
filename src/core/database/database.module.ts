import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { User } from '../../infrastructure/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
