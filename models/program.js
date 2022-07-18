const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const programSchema = new Schema({
    judul: {type: String, required:true},
    desc: {type: String, required: true},
    konten: {type: String, required: true},
    gambar: String,
    cloudinaryId: String
});

programSchema.index({'$**': 'text'});
const programModels = mongoose.model('program', programSchema);

module.exports = programModels