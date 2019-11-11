import { Posto } from './../../posto/posto.entity';
import { Combustivel } from './../../combustivel/combustivel.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as wkx from 'wkx';

export default class CreatePostos implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        let localizations = [
            { latitude: -22.332523, longitude: -49.072255 },
            { latitude: -22.328363, longitude: -22.328363 },
            { latitude: -22.326259, longitude: -49.066400 },
            { latitude: -22.332382, longitude: -49.059029 },
            { latitude: -22.323212, longitude: -49.057409 },
            { latitude: -22.329226, longitude: -49.046905 },
            { latitude: -22.340490, longitude: -49.051443 },
            { latitude: -22.342475, longitude: -49.059533 },
            { latitude: -22.343497, longitude: -49.063943 },
            { latitude: -22.337612, longitude: -49.069897 },
            { latitude: -22.333950, longitude: -49.075197 },
            { latitude: -22.334952, longitude: -49.078866 },
            { latitude: -22.326948, longitude: -49.080381 },
            { latitude: -22.319901, longitude: -49.069963 },
            { latitude: -22.338668, longitude: -49.050482 },
            { latitude: -22.3115568, longitude: -48.5902909 },
            { latitude: -22.2897888, longitude: -48.5616391 },
            { latitude: -22.287653, longitude: -48.5541972 },
            { latitude: -22.2758366, longitude: -48.5167529 },
            { latitude: -22.0760335, longitude: -48.7592251 },
        ];

        let i = 0;

        await factory(Posto)().map(async (posto: Posto) => {
            let local = localizations[i++];
            posto.combustiveis = await factory(Combustivel)().seedMany(3);
            posto.geo_ponto = wkx.Geometry.parse(`POINT(${local['longitude']} ${local['latitude']})`).toGeoJSON();
            return posto;
        }).seedMany(20);
    }
}
