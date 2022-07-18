const mongoose = require('mongoose');
const Schema = mongoose.Schema


const beritaSchema  = new Schema({
    judul:{type: String, required:true},
    desc: {type: String, required: true},
    konten: {type: String, required: true},
    gambar: String,
    cloudinary_id: String 
})

beritaSchema.index({'$**': 'text'})
const beritaModels = mongoose.model('berita', beritaSchema);

module.exports = beritaModels