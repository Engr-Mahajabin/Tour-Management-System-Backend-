import { Iuser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<Iuser>) => {
  const { name, email } = payload;

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const user = await User.create({
    name,
    email,
  });

  return user;
};

export const UserServices = {
  createUser,
};
