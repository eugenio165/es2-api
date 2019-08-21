import { UserRole, User } from './../../user/user.entity';
import { Factory, Seed } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection): Promise<any> {
        const userFactory = factory(User);
        const adminUserFactory = userFactory({ role: UserRole.ADMIN });
        const em = connection.createEntityManager();
        const password = bcrypt.hashSync('123', 10);

        const superadmin = new User({
            email: 'superadmin@email.com',
            firstname: 'SUPERADMIN',
            lastname: 'PRINCIPAL',
            role: UserRole.SUPERADMIN,
            password,
        });

        const admin = new User({
            email: 'admin@email.com',
            firstname: 'ADMIN',
            lastname: 'PRINCIPAL',
            role: UserRole.ADMIN,
            password,
        });

        await em.save([admin, superadmin]);
        await userFactory().seedMany(5);
        await adminUserFactory.seedMany(5);
    }
}