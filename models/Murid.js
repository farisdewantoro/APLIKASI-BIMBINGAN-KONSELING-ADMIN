const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuridSchema = new Schema({
    nis:{
        type:String,
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
    },


});

module.exports = Murid = mongoose.model('Murid',MuridSchema);