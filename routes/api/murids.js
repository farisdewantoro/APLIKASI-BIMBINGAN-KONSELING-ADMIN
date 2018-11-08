const express = require('express');
const router = express.Router();

// Setup validation
const validateMuridInput = require('../../validations/murid');

// Setup model Murid
const Murid = require('../../models/Murid');


// @route menampilkan data seluruh siswa
router.get('/datasiswa/all',(req,res)=>{
    const errors={};
    Murid.find({})
       .then(murids =>{
           if(!murids){
               errors.nomurid = 'TIDAK ADA DAFTAR SISWA';
                return res.status(404).json(errors);
            }
            res.json(murids);
       })
       .catch(err =>res.status(404).json({
           murid:"TIDAK ADA DAFTAR SISWA"
       })) 
})


// @route buat edit/create murid baru
router.post('/datasiswa/create',(req,res)=>{
  
    const {errors,isValid} =validateMuridInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const muridFields = {};
    if (req.body.tempatLahir) muridFields.tempatLahir = req.body.tempatLahir;
    if (req.body.jenisKelamin) muridFields.jenisKelamin = req.body.jenisKelamin;
    if (req.body.nis) muridFields.nis = req.body.nis;
    if (req.body.nama) muridFields.nama = req.body.nama;
    if (req.body.tanggalLahir) muridFields.tanggalLahir = req.body.tanggalLahir;
    if (req.body.namaAyah) muridFields.namaAyah = req.body.namaAyah;
    if (req.body.namaIbu) muridFields.namaIbu = req.body.namaIbu;
    if (req.body.noTelepon) muridFields.noTelepon = req.body.noTelepon;
    if (req.body.hpSiswa) muridFields.hpSiswa = req.body.hpSiswa;
    if (req.body.hpIbu) muridFields.hpIbu = req.body.hpIbu;
    if (req.body.hpAyah) muridFields.hpAyah = req.body.hpAyah;
    if (req.body.alamat) muridFields.alamat = req.body.alamat;

    Murid.findOne({nis:req.body.nis})
        .then((murid) =>{
            if(murid){
                errors.nis = 'NIS ini sudah terdaftar';
                return res.status(400).json(errors);
            }else{
                
                const newMurid = new Murid(muridFields);

                newMurid.save()
                    .then((murid)=>{
                        res.json(murid);
                    })
                    .catch((err)=>{
                        console.log(err);
                    });


            }
        })

});

module.exports = router;