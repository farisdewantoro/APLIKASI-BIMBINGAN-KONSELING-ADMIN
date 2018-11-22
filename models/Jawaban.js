const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JawabanSchema = new Schema({
    murid:{
        type:Schema.Types.ObjectId,
        refs:'murids'
    },
    hasil:[{
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

module.exports = Jawaban = mongoose.model('Jawaban',JawabanSchema);