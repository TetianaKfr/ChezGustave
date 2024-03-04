import bcrypt from "bcrypt";

import app from './app';
import database from './database';
import User from './entities/User';

database.initialize().then(async () => {
  console.log('Connected to database!');

  // TODO: Remove this, for testing only
  console.warn("TODO: Remove default user in 'server/src/index.ts' for production");
  try {
    await database.getRepository(User).insert({
      first_name: 'Louis',
      last_name: 'Le Cam',
      password_hash: await bcrypt.hash("admin", 12),
      email: 'admin',
      phone_number: '01234567',
      admin: true,
    });
  } catch (_err) { }
});

app.listen(process.env.PORT, () => {
  console.log('Server listening on 3630');
});
