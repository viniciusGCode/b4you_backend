import { User } from '../entities/User';

export const createUser = async (data: {
  username: string;
  password: string;
}) => {
  return User.create(data);
};

export const getUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};
