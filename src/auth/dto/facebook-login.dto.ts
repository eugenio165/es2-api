import { ApiModelProperty } from '@nestjs/swagger';

export interface IFacebookLogin {
    facebookId?: string;
    nome?: string;
    email?: string;
    fotoPerfil?: string;
}

export class FacebookLoginDTO implements IFacebookLogin {
    @ApiModelProperty()
    facebookId: string;

    @ApiModelProperty()
    nome: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    fotoPerfil: string;
}
