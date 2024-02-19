import app from '../src/app';
import database from '../src/database';

describe('Tests', () => {

    beforeAll(async () => {
        // INIT
        await database.initialize();
    });



    afterAll(async () => {
        // CLEANUP
        await database.destroy();
    });

});