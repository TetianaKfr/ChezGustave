import { DataSource } from 'typeorm';
import Booking from './entities/Booking';
import Equipment from './entities/Equipment';
import Housing from './entities/Housing';
import Rating from './entities/Rating';
import User from './entities/User';
import Cooptation from './entities/Cooptation';

export default new DataSource({
    type: 'postgres',
    url: process.env['DATABASE_URL'],
    // TODO: Set synchronize to false for production
    synchronize: true,
    logging: true,
    entities: [
        Booking,
        Equipment,
        Housing,
        Rating,
        User,
        Cooptation,
    ]
});
