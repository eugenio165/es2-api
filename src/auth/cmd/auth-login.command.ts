import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginCmd {

  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
