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

const Jurusan = require('./Jurusan');
PertanyaanSchema.pre('remove', function (next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Jurusan.find({ rule: { $elemMatch: { kodeSoal: this.kodeSoal } } })
        .then(jurusan=>{
            if (jurusan){
                Jurusan.updateMany({ "rule.kodeSoal": this.kodeSoal }, { $pull: { rule: { kodeSoal: this.kodeSoal } } }, { multi: true }).exec();
            }
           
        })
  
    // Jurusan.update({rule:{kodeSoal:this.kodeSoal}},{ $pullAll: { rule: [{kodeSoal:this.kodeSoal}] } }).exec();
    next();
});
module.exports = Pertanyaan = mongoose.model('Pertanyaan',PertanyaanSchema);
