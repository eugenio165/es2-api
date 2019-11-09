import { Combustivel } from './../../combustivel/combustivel.entity';
import { Posto } from './../../posto/posto.entity';
import { User } from '../../user/user.entity';
import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Posto, (faker: typeof Faker, settings: { usuarioPadrao: boolean }) => {
    const posto = new Posto();
    posto.nome = faker.company.companyName();
    posto.endereco = faker.address.streetAddress();
    posto.cidade = faker.address.city();
    posto.bairro = faker.address.citySuffix();

    return posto;
});
