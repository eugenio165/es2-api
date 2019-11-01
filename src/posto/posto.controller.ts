import { PostoService } from './posto.service';
import { Controller } from '@nestjs/common';
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
}
