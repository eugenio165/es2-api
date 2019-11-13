import { environment } from './../environment/environment.dev';
import { Geography } from 'geojson';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Posto } from './posto.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as fetch from 'node-fetch';
import * as fs from 'fs';
import * as wkx from 'wkx';

const getData = async url => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      return null;
    }
}
    
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
    
        const combustiveis = ['GASOLINA', 'DIESEL', 'ETANOL'];

        let getQueryString = (combustiveis: string[]) => {
            let result = `LOWER(combustiveis.nome) LIKE '${combustiveis.pop().toLowerCase()}'`;
            combustiveis.map(string => result = result.concat(`OR LOWER(combustiveis.nome) LIKE '${string.toLowerCase()}'`));
            return result;
        };

        let ids = postos.map(p => p.id);
        const postoData = await this.postoRepository.createQueryBuilder('postos')
            .leftJoinAndSelect('postos.combustiveis', 'combustiveis')
            .whereInIds(ids)
            .getMany();

        let i = 0;
        const allData = postoData.map(posto => {
            posto.geo_ponto = postos[i].geo_ponto;
            posto['distancia'] = postos[i++].distancia;
            return posto;
        });

        return allData;
    }

    async treatData() {
        const postos = await this.postoRepository.find({
            where: {
                googlePlaceId: null,
            },
        });

        console.log(postos.length);

        const promises = postos.map(async (posto: Posto) => {
            let query = `gas+station,+${posto.endereco},${posto.bairro},${posto.cidade}`.replace(' ', '+');
            const data = await getData(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${environment.GOOGLE_API_KEY}&inputtype=textquery&input=gas+station,${query}&language=pt-BR&fields=name,rating,place_id,geometry`)
            if (!!data && data.status == 'OK') {
                const candidate = data.candidates[0];
                const location = (!!candidate && !!candidate.geometry && !!candidate.geometry.location) ? candidate.geometry.location : null;
                const geo_ponto = (!!location) ? wkx.Geometry.parse(`POINT(${location.lng} ${location.lat})`).toGeoJSON() : null;

                let rating = (Math.round(candidate.rating * 100) / 100).toFixed(2);
            
                try  {
                    await this.postoRepository.update(posto.id, {
                        nome: candidate.name,
                        googleRating: rating,
                        googlePlaceId: candidate.place_id,
                        geo_ponto,
                    });
                } catch (e) {
                    fs.appendFileSync('update_errors.txt', `${posto.id}: ${e.toString()}\n`);
                }

                if (data.candidates.length > 1) {
                    let strings = data.candidates.map(candidate => candidate.name);
                    let finalString = '';
                    strings.map(str => finalString = finalString.concat(` ${str} --`));
                    fs.appendFileSync('multi-candidate.txt', `${posto.id}: ${finalString}\n`);
                }
            } else if (!!data && data.status != 'OK') {
                fs.appendFileSync('failed.txt', `${posto.id}: ${data.status}\n`);
            }
        });
        await Promise.all(promises);
    }
}
