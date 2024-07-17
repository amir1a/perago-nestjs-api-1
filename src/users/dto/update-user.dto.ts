import { CreateUserDto } from "./create-users.dto";
import { PartialType } from "@nestjs/mapped-types";
export class UpdateUserDto extends PartialType(CreateUserDto){

    name:string;
    description:string;
    parentId: number;
} 