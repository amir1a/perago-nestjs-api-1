import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
   const user: User =this.userRepository.create(createUserDto);
    await this.userRepository.insert(user);
    return user;
  }

   addChild(obj, user) {
    for (let key in obj) {
      if (obj[key].id === user.parentId) {
        if (!obj[key].children) obj[key].children = []
        obj[key].children.push(user)
      } else {
        if (obj[key].children) {
          this.addChild(obj[key].children, user)
        }
      }
    }
  }
  async getUserHierarchy(): Promise<any> {
    // Get all users and order them by parentId
    const users = await this.userRepository.find();
    users.sort((a, b) => a.parentId - b.parentId)
    const hierarchy = {};
    users.forEach((user) => {
      if (user.parentId === null) {
        hierarchy[user.id] = user;
      } else {
        this.addChild(hierarchy, user)
      }
    })
    return hierarchy;
  }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    return this.userRepository.update(id,updateUserDto);
  }
  async getChildren(id: number): Promise<User[]> {
    return this.userRepository.find({
      where: {
        parentId: id,
      },
    });
  }
  delete(id: number) {

    return this.userRepository.delete(id);
  }
}
