import { envVars } from "../config/env";
import { IAuthProvider, Iuser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      // eslint-disable-next-line no-console
      console.log("Super admin already exists with this email");
      return;
    }
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BECRYPT_SALT_ROUND),
    );

    const payload: Iuser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      auths: [authProvider],
      isVerified: true,
    };

    const superAdmin = await User.create(payload);
    // eslint-disable-next-line no-console
    console.log("Super admin created successfully\n");
    // eslint-disable-next-line no-console
    console.log(superAdmin);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error seeding super admin:", error);
  }
};
