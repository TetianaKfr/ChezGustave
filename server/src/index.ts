import app from './app';
import database from './database';
import User from './entities/User';
import insertDefaultDatbaseContent from './defaultDatabaseContent';

(async () => {
  await database.initialize();

  console.log('Connected to database');

  if (await database.getRepository(User).count() < 1) {
    await insertDefaultDatbaseContent();
  }

  app.listen(process.env.PORT, () => {
    console.log('Server listening on 3630');
  });
})();
