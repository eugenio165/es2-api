import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { generate } from 'generate-password';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async testMatchingPasswords(user: User, newPassword: string) {
    let isPasswordValid: boolean;
    try {
      isPasswordValid = await bcrypt.compare(newPassword, user.password);
    } catch (error) {
      throw new InternalServerErrorException(`An error occured during password comparison: ${error.toString()}`);
    }
    if (isPasswordValid === false) {
      throw new BadRequestException(`Você errou a senha, amigo!`);
    }

    return true;
  }

  public async create(user: CreateUserDto): Promise<User> {
    user.password = await bcrypt.hash('123', 10);
    const isRegistered = await this.userRepository.findOne(user);
    if (isRegistered)
      throw new BadRequestException('Já existe usuário com esse e-mail!');
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findAll(params?): Promise<User[]> {
    return await this.userRepository.find({ where: params });
  }

  public async findOne(params: DeepPartial<User>): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne(params);
    } catch (error) { }
    return user;
  }

  public async update(id: string, payload: User, password?: string): Promise<User> {
    const user = await this.findOne({ id });
    let encryptedPassword: string;
    if (!!password) {
      try {
        await this.testMatchingPasswords(user, payload.password);
      } catch (e) {
        throw e;
      }
      if (!!password && password.length) {
        try {
          encryptedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
          throw new InternalServerErrorException(`An error occured during password hashing: ${error.toString()}`);
        }
      }
    }
    try {
      return await this.userRepository.save(
        !!encryptedPassword ? { ...user, password: encryptedPassword } : { ...payload, password: user.password },
      );
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async delete(params: DeepPartial<User>): Promise<User> {
    const user = await this.findOne(params);
    try {
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ${params.toString()} not found.`);
    }
  }
}
