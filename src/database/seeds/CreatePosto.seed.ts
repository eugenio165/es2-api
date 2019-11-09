import { Posto } from './../../posto/posto.entity';
import { Combustivel } from './../../combustivel/combustivel.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreatePostos implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Posto)().map(async (posto: Posto) => {
            posto.combustiveis = await factory(Combustivel)().seedMany(3);
            return posto;
        }).seedMany(10);
    }
}
