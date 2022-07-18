const mongoose = require('mongoose');

async function openDbConnection(uri, options){
    return mongoose.connect(uri, options);
}

module.exports = openDbConnection