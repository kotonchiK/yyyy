import { User } from '../../infrastructure/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll(query: any): Promise<User[]> {
    const filters = {};
    if (query.role) filters['role'] = query.role;
    if (query.efficiency) filters['efficiency'] = query.efficiency;
    if (query.full_name) filters['full_name'] = query.full_name;
    if (query.id) filters['id'] = query.id;

    return this.userRepository.find({ where: filters });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;
    return user;
  }
}
