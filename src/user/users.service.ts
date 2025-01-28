import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DataSource, Repository } from "typeorm";
import { InsertUserDto } from "./user.dto";


@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async insertUserWithQR(body: object) {
    const queryRunner = this.dataSource.createQueryRunner();

    const user = queryRunner.manager.create(UserEntity, body);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      
    } finally {
      await queryRunner.release();
    }
  }

  async insertUserWithDto(insertUserDto: InsertUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.first_name = insertUserDto.first_name;
    user.last_name = insertUserDto.last_name;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }
}