import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Combustivel } from './combustivel.entity';

@Injectable()
export class CombustivelService extends TypeOrmCrudService<Combustivel> {
    constructor(@InjectRepository(Combustivel) combustivelRepository) {
        super(combustivelRepository);
    }
}
