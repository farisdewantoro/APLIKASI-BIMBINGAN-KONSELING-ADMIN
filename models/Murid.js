const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuridSchema = new Schema({
    nis:{
        type:String,
        unique: true,
        required:true
    },
    nama:{
        type:String,
        required:true
    },
    
    namaAyah:{
        type:String,
    },
    namaIbu:{
        type:String
    },
    noTelepon:{
        type:Number
    },
    hpSiswa:{
        type:Number
    },
    hpAyah:{
        type:Number
    },
    hpIbu:{
        type:Number
    },
    tempatLahir:{
        type:String,
        required:true
    },
    noTanggalLahir:{
        type:Number,
        required:true
    },
    tanggalLahir:{
        type:Date,
        required:true
    },
    jenisKelamin:{
        type:String,
        required:true
    },
    alamat:{
        type:String,   
    },
    foto:{
        type:String
    }

});
const Rapot = require('./Rapot');
MuridSchema.pre('remove', function (next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    Rapot.remove({ murid: this._id }).exec();
    next();
});
module.exports = Murid = mongoose.model('Murid',MuridSchema);