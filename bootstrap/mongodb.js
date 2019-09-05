const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const host = process.env.DB_HOST;
const db   = process.env.DB_DATABASE;

mongoose.connect(`mongodb://${host}/${db}`, {useNewUrlParser: true}).then((db) => {
    console.log('database connected');
}).catch((err) => {
    console.log('database connection fails', err);
});

module.exports = mongoose;
