const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RapotSchema = new Schema({
    murid:{
        type:Schema.Types.ObjectId,
        ref:'murids'
    },
    kelas:{
        type:String,
        required:true
    },
    namaKelas: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    tahunPelajaran: {
        type: String,
        required: true
    },

    pelajaran:[{
        mataPelajaran:{
                type:String,
            },
            nilai:{
                type:Number,
                default:0
            },
            predikat:{
                type:String
            }
        }]
  

});

module.exports = Rapot = mongoose.model('Rapot',RapotSchema);