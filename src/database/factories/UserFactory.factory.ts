import { User } from '../../user/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(User, (faker: typeof Faker, settings: { usuarioPadrao: boolean }) => {
    const user = new User();
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    user.firstname = firstName;
    user.lastname = lastName;
    user.email = email;
    user.password = '123321';

    return user;
});
