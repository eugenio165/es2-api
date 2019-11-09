import { Combustivel } from './../../combustivel/combustivel.entity';
import { User } from '../../user/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Combustivel, (faker: typeof Faker, settings: { usuarioPadrao: boolean }) => {
    const combustivel = new Combustivel();
    combustivel.nome = faker.commerce.product();
    const firstNumber = faker.random.number(3);
    const secondNumber = faker.random.number(98);
    combustivel.preco = +`${firstNumber}.${secondNumber}`;

    return combustivel;
});
