
import mongoose from 'mongoose';

class dbConnection {
    constructor() {
        this.db = mongoose.connection;
    }

    connect(dbString) {
        mongoose.connect(dbString);

        this.db.on('error', console.error.bind(console, 'db connection error:'));
        this.db.once('open', function() {
            console.log('mongo connection success!');
        });
    }
}

export let db = new dbConnection;