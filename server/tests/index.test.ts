/*
import supertest from 'supertest';
import app from '../src/app';
import database from '../src/database';

describe('Tests', () => {

    beforeAll(async () => {
        // INIT
        await database.initialize();
    });

    it('Example should work', async () => {
        const helloWorld = await supertest(app).get('/');
        
        expect(helloWorld.statusCode).toBe(200);
        expect(helloWorld.text).toBe('Hello world');
    });

    afterAll(async () => {
        // CLEANUP
        await database.destroy();
    });

});
*/
