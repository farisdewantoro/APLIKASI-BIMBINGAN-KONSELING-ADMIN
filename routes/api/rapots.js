const express = require('express');
const router = express.Router();


// Model

const Rapot = require('../../models/Rapot');
const Murid = require('../../models/Murid');
router.post('/create',(req,res)=>{
    
    Rapot.findOne({murid:req.body.murid,kelas:req.body.kelas,semester:req.body.semester})
        .then(rapot=>{
          
            if(rapot !== null){
                //Update
                Rapot.findOneAndUpdate({ murid: req.body.murid,kelas: req.body.kelas, semester: req.body.semester },{$set:req.body})
                    .then(rapot => res.json(rapot));
            }else{
                new Rapot(req.body).save().then(rapot => res.json(rapot));
            }
        })
   

});

router.post('/import',(req,res)=>{
    Rapot.findOne({ murid: req.body.murid, kelas: req.body.kelas, semester: req.body.semester })
    .then(rapot=>{
        if (rapot !== null) {
            //Update
            Rapot.findOneAndUpdate({ murid: req.body.murid, kelas: req.body.kelas, semester: req.body.semester }, { $set: req.body })
                .then(rapot =>{
                    Rapot.findOne({ murid: req.body.murid, kelas: req.body.kelas, semester: req.body.semester })
                        .then(r=>{
                            res.json(r);
                        })
                   
                });
        } else {
            new Rapot(req.body).save().then(rapot =>{
                Rapot.findOne({ murid: req.body.murid, kelas: req.body.kelas, semester: req.body.semester })
                    .then(r => {
                        res.json(r);
                    })
            });
        }
    })
})

router.get('/show/:nis/:kelas/:semester',(req,res)=>{

    Murid.findOne({nis:req.params.nis})
        .then(murid=>{
         
            Rapot.findOne({ murid:murid._id, kelas: req.params.kelas, semester: req.params.semester })
                .then(rapot => {
                
                    res.json(rapot);
                });
        })
  
});

module.exports = router;