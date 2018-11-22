const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JurusanSchema = new Schema({
    namaJurusan:{
        type:String,
        required:true,
        unique:true
    },
    deskripsi:{
        type:String,
    },
    rule:[{
        kodeSoal:{
            type:String,
            required:true,
        },
        kodeJawaban:{
            type:String,
            required:true,
        }
    }]

});

module.exports = Jurusan = mongoose.model('Jurusan',JurusanSchema);