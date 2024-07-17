 import { Module } from '@nestjs/common'; 
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { DataSource } from 'typeorm';
 import { User } from './entities/user.entity';
 import { UsersModule } from './users/users.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
       type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: '1035', 
       database: 'orga_structure',
       entities: [User],
       synchronize: true,
     }),
    UsersModule,
  ],
  
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.toString())

 }

}
