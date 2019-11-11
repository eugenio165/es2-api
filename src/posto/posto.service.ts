import { Geography } from 'geojson';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Posto } from './posto.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

interface BasicPostoData {
    id: number;
    geo_ponto: Geography;
    distancia: number;
}

@Injectable()
export class PostoService extends TypeOrmCrudService<Posto> {
    constructor(@InjectRepository(Posto) private postoRepository: Repository<Posto>) {
        super(postoRepository);
    }

    async getPostosNear(lat: number, long: number): Promise<Posto[]> {
        let raio = 5000;
        const postos: BasicPostoData[] = await this.postoRepository.createQueryBuilder()
        .select(`id, ST_AsGeoJSON("geo_ponto")::jsonb as geo_ponto,
            ST_DistanceSphere('POINT(${long} ${lat})'::geometry,
            geo_ponto::geometry) as distancia`)
        .where(`ST_DistanceSphere('POINT(${long} ${lat})'::geometry, 
        geo_ponto::geometry) < ${raio}`)
        .orderBy('distancia', 'ASC')
        .getRawMany();

        const postoData = await this.postoRepository.findByIds(
            postos.map(posto => posto.id),
            {
                relations: [
                    'combustiveis',
                ],
            },
        );
        
        let i = 0;
        const allData = postoData.map(posto => {
            posto.geo_ponto = postos[i].geo_ponto;
            posto['distancia'] = postos[i++].distancia;
            return posto;
        });

        return allData;
    }
}
