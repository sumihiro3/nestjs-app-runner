import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { UserDto } from './dto/user.dto';
import { User, UserKey } from './schema/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User, UserKey>,
  ) {}

  async create(dto: UserDto): Promise<void> {
    const u: User = {
      id: dto.email,
      name: dto.name,
      password: dto.password,
    };
    try {
      await this.userModel.create(u);
    } catch (error) {
      console.error(`Failed to create user [${dto.email}]`, error);
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.get({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.scan().exec();
  }
}
