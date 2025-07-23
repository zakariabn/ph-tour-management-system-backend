/* eslint-disable no-console */
import { env } from '../config/env';
import { User } from '../modules/user/user.model';
import { IAuthProvider, IUser, Role } from '../modules/user/user.types';
import { generateHash } from './hash';

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({ email: env.SUPER_ADMIN_EMAIL });

    if (isSuperAdminExist) {
      console.log('Super Admin Already Exists!');
      return;
    }

    console.log('Creating A Super Admin');

    const hashedPassword = await generateHash(env.SUPER_ADMIN_PASSWORD);

    const authProvider: IAuthProvider = {
      provider: 'credentials',
      providerId: env.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: 'Super admin',
      role: Role.SUPER_ADMIN,
      email: env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log('Super Admin Successfully Created! \n', superAdmin);
  } catch (error) {
    console.log(error);
  }
};
