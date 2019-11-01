import { ApiModelProperty } from '@nestjs/swagger';

export interface IGoogleLogin {
    googleId?: string;
    nome?: string;
    email?: string;
    fotoPerfil?: string;
}

export class GoogleLoginDTO implements IGoogleLogin {
    @ApiModelProperty()
    googleId: string;

    @ApiModelProperty()
    nome: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    fotoPerfil: string;
}
