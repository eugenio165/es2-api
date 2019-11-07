import { TokenUserPayload } from './token-user-payload.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {
  constructor(data: { expiresIn?: number; accessToken?: string, user?: any }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
    this.user = data.user;
  }

  @ApiModelProperty() expiresIn: number;

  @ApiModelProperty() accessToken: string;

  @ApiModelProperty() user: TokenUserPayload;
}
