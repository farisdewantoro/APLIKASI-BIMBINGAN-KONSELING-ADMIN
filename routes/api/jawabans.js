const express = require('express');
const router = express.Router();
const isEmpty = require('../../validations/is-empty');
// Model

const Jawaban = require('../../models/Jawaban');
const Jurusan = require('../../models/Jurusan');
const Pertanyaan = require('../../models/Pertanyaan');



router.get('/get/all',(req,res)=>{
    Jawaban.find({}).sort({ create_at: 'desc' })
        .populate('murid')
        .then(jawaban=>{
            res.json(jawaban);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
})

router.get('/get/:id',(req,res)=>{
    Jawaban.findOne({murid:req.params.id}).sort({ create_at: 'desc' })
        .then(jawaban=>{
            res.status(200).json(jawaban);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
})


router.delete('/reset/:id',(req,res)=>{
    Jawaban.findOneAndDelete({murid:req.params.id})
        .then(jawaban=>{
            res.status(200).json(jawaban);
        })
        .catch(err=>{
            res.status(500).json(err)
        });
})


module.exports = router;