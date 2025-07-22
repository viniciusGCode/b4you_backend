import 'dotenv/config';
import app from './app';
import { sequelize } from '../config/database';

const PORT = process.env.PORT || 3000;

import { seedDefaultUser } from '../seeders/seed';

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await seedDefaultUser();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
})();
