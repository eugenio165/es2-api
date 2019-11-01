import { PostoController } from './posto.controller';
import { PostoService } from './posto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Posto } from './posto.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Posto])],
    providers: [PostoService],
    controllers: [PostoController],
    exports: [PostoService],
})
export class PostoModule {
}
