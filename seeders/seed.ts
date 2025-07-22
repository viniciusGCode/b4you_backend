import { User } from '../src/modules/user/entities/User';
import { Product } from '../src/modules/product/entities/Product';

export const seedDefaultUser = async () => {
  const defaultUsername = 'admin@b4you.dev';
  const defaultPassword = '123456';

  const existingUser = await User.findOne({
    where: { username: defaultUsername },
  });
  if (!existingUser) {
    await User.create({ username: defaultUsername, password: defaultPassword });
    console.log('Usuário padrão criado');
  }

  const products = [
    {
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      price: 10.0,
      amount: 100,
    },
    {
      name: 'Produto 2',
      description: 'Descrição do produto 2',
      price: 20.5,
      amount: 200,
    },
    {
      name: 'Produto 3',
      description: 'Descrição do produto 3',
      price: 15.75,
      amount: 150,
    },
    {
      name: 'Produto 4',
      description: 'Descrição do produto 4',
      price: 30.0,
      amount: 80,
    },
    {
      name: 'Produto 5',
      description: 'Descrição do produto 5',
      price: 50.0,
      amount: 60,
    },
  ];

  for (const prod of products) {
    const existingProduct = await Product.findOne({
      where: { name: prod.name },
    });
    if (!existingProduct) {
      await Product.create(prod);
      console.log(`Produto "${prod.name}" criado`);
    }
  }
};
