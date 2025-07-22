import { User } from './entities/User';

export const seedDefaultUser = async () => {
  const defaultUsername = 'admin@b4you.dev';
  const defaultPassword = '123456';

  const existing = await User.findOne({ where: { username: defaultUsername } });
  if (!existing) {
    await User.create({ username: defaultUsername, password: defaultPassword });
    console.log('Usuário padrão criado');
  }
};
