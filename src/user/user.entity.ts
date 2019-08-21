import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IUser } from './user.interface';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User implements IUser {
  constructor(data?: IUser) {
    if (!!data) {
      this.id = data.id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiModelPropertyOptional()
  public id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public firstname: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public lastname: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  public email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  @ApiModelProperty()
  public password: string;

  @Column({ default: UserRole.USER, enum: UserRole, nullable: true })
  @ApiModelProperty({ enum: UserRole, default: UserRole.USER })
  public role: UserRole;
}
