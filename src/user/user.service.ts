import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: ObjectID): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} was not found.`);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user)
      throw new NotFoundException(`User with email ${email} was not found.`);
    return user;
  }

  async update(id: ObjectID, user: Partial<User>): Promise<void> {
    const userExists = this.findById(id);
    if (!userExists)
      throw new NotFoundException(`User with id ${id} was not found.`);
    await this.userRepository.update(id, user);
  }

  async delete(id: ObjectID): Promise<void> {
    const user = this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found.`);
    }
    await this.userRepository.delete(id);
  }
}
