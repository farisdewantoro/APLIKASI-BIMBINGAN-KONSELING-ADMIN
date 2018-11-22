const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PertanyaanSchema = new Schema({
    kodeSoal:{
        type:String,
        required:true,
        unique: true,
    },
    soal:{
        type:String,
        required:true,
        unique: true,
    },
    jawaban:[{
        jawab:{
            type:String,
            required:true,
        },
        kodeJawaban:{
            type:String,
            required:true,
            unique: true,
        }

    }]
});

module.exports = Pertanyaan = mongoose.model('Pertanyaan',PertanyaanSchema);
