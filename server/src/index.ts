import app from './app';
import database from './database';

database.initialize().then(() => {
    console.log('Connected to database!');
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on 3630');
});
