import { Point } from './posto.interface';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PostoService } from './posto.service';
import { Controller, Get, Param, HttpStatus, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Posto } from './posto.entity';

@Crud({
    model: {
        type: Posto,
    },
})
@Controller('posto')
export class PostoController implements CrudController<Posto> {
    constructor(public service: PostoService) { }

    @Get('near')
    @ApiResponse({ status: HttpStatus.OK, type: Posto, isArray: true, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get postos near point' })
    async getPostosNear(@Query() params: Point): Promise<Posto[]> {
        const postos = await this.service.getPostosNear(params.latitude, params.longitude);
        return postos;
    }
}
