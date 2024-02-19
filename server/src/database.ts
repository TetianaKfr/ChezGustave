import { DataSource } from 'typeorm';
import { ExampleEntity } from './entities/ExampleEntity';

export default new DataSource({
    type: 'postgres',
    url: process.env['DATABASE_URL'],
    synchronize: true,
    logging: true,
    entities: [
        ExampleEntity
    ]
});