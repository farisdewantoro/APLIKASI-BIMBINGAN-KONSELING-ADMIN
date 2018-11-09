const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

// UPLOAD IMAGE

// Set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload 
let upload = multer({
    storage: storage,
    limits:{fileSize:1000000}, //file size dalam bit
}).fields([{ name: 'fotoDisplay' }, { name: 'newMurid' }]);



// // Public folder

// app.post('/upload',(req,res)=>{
 
// });


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

router.get('/datasiswa/rapot/:nis',(req,res)=>{
    const nis = req.params.nis;
    const errors = {};
    Murid.findOne({nis:nis})
        .then(murids =>{
            if(!murids){
                errors.nomurid = 'NO INDUK SISWA TIDAK TERDAFTAR';
                return res.status(404).json(errors);
            }
            res.json(murids);
        })
        .catch(err=>res.status(404).json({
            murid:"ERROR"
        }));
});



// @route buat edit/create murid baru
router.post('/datasiswa/create', upload,(req,res)=>{
   
    let request = JSON.parse(req.body.newMurid);
    const muridFields = {};
    if (request.tempatLahir) muridFields.tempatLahir = request.tempatLahir;
    if (request.jenisKelamin) muridFields.jenisKelamin = request.jenisKelamin;
    if (request.nis) muridFields.nis = request.nis;
    if (request.nama) muridFields.nama = request.nama;
    if (request.tanggalLahir) muridFields.tanggalLahir = request.tanggalLahir;
    if (request.namaAyah) muridFields.namaAyah = request.namaAyah;
    if (request.namaIbu) muridFields.namaIbu = request.namaIbu;
    if (request.noTelepon) muridFields.noTelepon = request.noTelepon;
    if (request.hpSiswa) muridFields.hpSiswa = request.hpSiswa;
    if (request.hpIbu) muridFields.hpIbu = request.hpIbu;
    if (request.hpAyah) muridFields.hpAyah = request.hpAyah;
    if (request.alamat) muridFields.alamat = request.alamat;
    Murid.findOne({nis:request.nis})
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



// // @route buat edit/create murid baru
// router.post('/datasiswa/create',(req, res,next) => {
//     upload(req,res,(err)=>{
      
//         let request = JSON.parse(req.body.newMurid);
//         // upload(req.body.data.data, res, (err) => {
//         //     console.log(req.body.data.data);
//         // });
//         const { errors, isValid } = validateMuridInput(request);

//         // Check validation
//         if (!isValid) {
//             return res.status(400).json(errors);
//         }
//         const muridFields = {};
//         if (request.tempatLahir) muridFields.tempatLahir = request.tempatLahir;
//         if (request.jenisKelamin) muridFields.jenisKelamin = request.jenisKelamin;
//         if (request.nis) muridFields.nis = request.nis;
//         if (request.nama) muridFields.nama = request.nama;
//         if (request.tanggalLahir) muridFields.tanggalLahir = request.tanggalLahir;
//         if (request.namaAyah) muridFields.namaAyah = request.namaAyah;
//         if (request.namaIbu) muridFields.namaIbu = request.namaIbu;
//         if (request.noTelepon) muridFields.noTelepon = request.noTelepon;
//         if (request.hpSiswa) muridFields.hpSiswa = request.hpSiswa;
//         if (request.hpIbu) muridFields.hpIbu = request.hpIbu;
//         if (request.hpAyah) muridFields.hpAyah = request.hpAyah;
//         if (request.alamat) muridFields.alamat = request.alamat;

//         Murid.findOne({ nis: request.nis })
//             .then((murid) => {
//                 if (murid) {
//                     errors.nis = 'NIS ini sudah terdaftar';
//                     return res.status(400).json(errors);
//                 } else {

//                     const newMurid = new Murid(muridFields);

//                     newMurid.save()
//                         .then((murid) => {
//                             res.json(murid);
//                         })
//                         .catch((err) => {
//                             console.log(err);
//                         });


//                 }
//             })
//     });
    

// });

module.exports = router;