import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserEntity } from "./user.entity";
import { InsertUserDto } from "./user.dto";



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // queryRunner를 사용하여 DB Insert
  @Post('test1')
  insertUserWithQR(@Body() body: object) {
    return this.usersService.insertUserWithQR(body);
  }
  
  // Dto 정의해서 DB Insert
  @Post('test2')
  async insertUserWithDto(@Body() insertUserDto: InsertUserDto): Promise<UserEntity> {
    return this.usersService.insertUserWithDto(insertUserDto);
  }
}