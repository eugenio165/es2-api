import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Posto } from './posto.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class PostoService extends TypeOrmCrudService<Posto> {
    constructor(@InjectRepository(Posto) postoRepository) {
        super(postoRepository);
    }
}
