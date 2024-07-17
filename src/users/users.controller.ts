
import { Body, Controller,ParseIntPipe, Delete, Get, Param, Patch, Post, Query ,ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-users.dto';
import {UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService) {}
    @Post()               // Post/users
     create(@Body(ValidationPipe) createUserDto: CreateUserDto ){
        return this.userService.create(createUserDto); }
        @Get('hierarchy')
        async getUserHierarchy(): Promise<any> {
          return this.userService.getUserHierarchy();
        }

        
    @Get()         // GET /Users or users?role=value
     findAll(){
        return this.userService.findAll();
    }

    @Get(':id')          // Get/users/:id
   
     findOne(@Param('id',ParseIntPipe)id:number){
    return this.userService.findOne(id);
    }
     @Patch(':id')        // PATCH/users/:id
     
      update(@Param('id',ParseIntPipe) id:number,@Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.userService.update(id,updateUserDto);
    }
 
    @Get(':id/children')     // /users/:id/children to get child
    async getChildren(@Param('id',ParseIntPipe) id: number): Promise<User[]> {
      return this.userService.getChildren(id);
    }
     @Delete(':id')       // DELETE/users/:id
    
      delete(@Param('id',ParseIntPipe) id:number){
        return this.userService.delete(id);
        }
}

