import database from '../src/database';

import users from "./users/index.test";

describe('Tests', () => {
  beforeAll(async () => {
    await database.initialize();
  });

  users();

  afterAll(async () => {
    await database.destroy();
  });
});
