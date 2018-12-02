const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JawabanSchema = new Schema({
    murid:{
        type:Schema.Types.ObjectId,
        ref:'Murid'
    },
    hasilJawaban:{
        type:Array,
        default:[]
    },
    jurusan:{
        type:Array,
        default:[]
    }
    
});

module.exports = Jawaban = mongoose.model('Jawaban',JawabanSchema);