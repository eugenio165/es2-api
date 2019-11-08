import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Combustivel } from './combustivel.entity';
import { CombustivelService } from './combustivel.service';

@Crud({
    model: {
        type: Combustivel,
    },
})
@Controller('combustivel')
export class CombustivelController implements CrudController<Combustivel> {
    constructor(public service: CombustivelService) { }
}
