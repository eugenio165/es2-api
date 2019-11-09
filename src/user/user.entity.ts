import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IUser } from './user.interface';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  SUSPENDED = 'suspended',
  NORMAL = 'normal',
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
      this.facebookId = data.facebookId;
      this.googleId = data.googleId;
    }
  }

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public id: number;

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

  @Column({ default: UserStatus.NORMAL, nullable: true })
  @ApiModelProperty({ enum: UserStatus, default: UserStatus.NORMAL })
  public status: UserStatus;

  @Column({ default: UserRole.USER, enum: UserRole, nullable: true })
  @ApiModelProperty()
  public role: UserRole;

  @CreateDateColumn()
  @ApiModelProperty()
  public createdAt: string;

  @Column({
    unique: true,
    nullable: true,
  })
  facebookId: string;

  @Column({
    unique: true,
    nullable: true,
  })
  googleId: string;
}
