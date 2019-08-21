import { IUser } from './../../user/user.interface';
import { User, UserRole } from './../../user/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import * as bcrypt from 'bcrypt';

const password = bcrypt.hashSync('123', 10);

define(User, (faker: typeof Faker, options: { role?: UserRole }) => {
    faker.locale = 'pt_BR';
    const gender = faker.random.number(1);
    const firstname = faker.name.firstName(gender);
    const lastname = faker.name.lastName(gender);
    const email = faker.internet.email(firstname, lastname);
    const role = !!options ? options.role : UserRole.USER;
    const obj: IUser = {
        email,
        firstname,
        lastname,
        password,
        role,
    };
    const user = new User(obj);
    return user;
});