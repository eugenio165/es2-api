
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combustivel } from './combustivel.entity';
import { CombustivelService } from './combustivel.service';
import { CombustivelController } from './combustivel.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Combustivel])],
    providers: [CombustivelService],
    controllers: [CombustivelController],
    exports: [CombustivelService],
})
export class CombustivelModule {
}
