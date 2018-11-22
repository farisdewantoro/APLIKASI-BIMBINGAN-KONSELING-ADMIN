const express = require('express');
const router = express.Router();
const isEmpty = require('../../validations/is-empty');
// Model

const Jawaban = require('../../models/Jawaban');
const Jurusan = require('../../models/Jurusan');
const Pertanyaan = require('../../models/Pertanyaan');


router.post('/jawaban/konsul',(req,res)=>{
    console.log(req.body);
    if(!isEmpty(req.body)){
      
    let findQuestion = [];
    let jawabanUser = req.body;
    let soalPalingBanyak = {};
    let hasilAkhirFix =[];
    let info={};
    Jurusan.find({$and:req.body})
        .then(jurusan=>{
            if(jurusan.length >0){
                findQuestion.push(jurusan);
                
                jawabanUser.forEach(itemJawaban=>{
                    findQuestion.forEach(f=>{
               
                        f.forEach((itemFindQuestion) => {          
                            itemFindQuestion.rule.forEach((removeItem, index) => {
                                if (removeItem.kodeSoal == itemJawaban.rule.$elemMatch.kodeSoal
                                    && removeItem.kodeJawaban == itemJawaban.rule.$elemMatch.kodeJawaban) {
                                    itemFindQuestion.rule.splice(index, 1);
                                }
                            })

                        })
                    })
                })
               
                findQuestion.forEach(f1=>f1.forEach(f2=>f2.rule.forEach((rule)=>{
                    soalPalingBanyak[rule.kodeSoal] = (soalPalingBanyak[rule.kodeSoal] || 0)+1;
                })));
                
                let cariValue = Object.values(soalPalingBanyak);
                let maxValue = Math.max(...cariValue);
                let keysSoalPalingBanyak = Object.keys(soalPalingBanyak);
                if(keysSoalPalingBanyak.length > 0){
                    keysSoalPalingBanyak.forEach(keys => {
                        if (soalPalingBanyak[keys] !== maxValue) {
                            delete soalPalingBanyak[keys];
                        }
                   

                    });
                }
                
                Pertanyaan.find({kodeSoal:Object.keys(soalPalingBanyak).toString()})
                    .then(pertanyaan=>{
                        if(pertanyaan.length >0){
                            res.json(pertanyaan);
                        }else{
                            Jurusan.find({ $or: jawabanUser}).lean()
                                .then(hasilAkhir=>{
                                    
                                      jawabanUser.forEach(itemJawabanUser => {
                                          hasilAkhir.forEach(hasil=>{
                                       hasil.rule.forEach((itemRule)=>{
                                if (itemJawabanUser.rule.$elemMatch.kodeSoal === itemRule.kodeSoal
                            && itemJawabanUser.rule.$elemMatch.kodeJawaban === itemRule.kodeJawaban) {
                                    // info["maxLength"] = (info["maxLength"] || 0)+1;
                                    hasil["maxLength"] = hasil.rule.length;
                                    hasil["dataMatched"] = (hasil["dataMatched"] || 0)+1;

                                }
                                       })
                                    })
                })
                                    res.json(hasilAkhir.sort((a, b) =>
                                        (b.dataMatched/b.maxLength*100 > a.dataMatched/a.maxLength*100) 
                                        ? 1 : ((a.dataMatched/a.maxLength*100 > b.dataMatched/b.maxLength*100) ? -1 : 0)
                                    ));                  
          
                                });

                            
                        }
                     
                     
                    });
        
            }else{
                Jurusan.find({ $or: jawabanUser }).lean()
                    .then(hasilAkhir => {
                    
                        jawabanUser.forEach(itemJawabanUser => {
                            hasilAkhir.forEach(hasil => {
                                hasil.rule.forEach((itemRule) => {
                                    if (itemJawabanUser.rule.$elemMatch.kodeSoal === itemRule.kodeSoal
                                        && itemJawabanUser.rule.$elemMatch.kodeJawaban === itemRule.kodeJawaban) {
                                        // info["maxLength"] = (info["maxLength"] || 0)+1;
                                        hasil["maxLength"] = hasil.rule.length;
                                        hasil["dataMatched"] = (hasil["dataMatched"] || 0) + 1;
                                   
                                    }
                                })
                            })
                        })

                        if(hasilAkhir.length > 0){
                            res.json(hasilAkhir.sort((a, b) =>
                                (b.dataMatched / b.maxLength * 100 > a.dataMatched / a.maxLength * 100)
                                    ? 1 : ((a.dataMatched / a.maxLength * 100 > b.dataMatched / b.maxLength * 100) ? -1 : 0)
                            )); 
                        }else{
                            let notFind ={message:"NOT FIND",status:"NO"};
                            hasilAkhir.push(notFind);
                            res.json(hasilAkhir);

                        }
                        

                    });
            }
           
            
        });
    }
    // Pertanyaan.find({})
})



router.get('/pertanyaan/lastkode', (req,res) => {
    Pertanyaan.findOne().sort({ _id: 'desc'})
        .then(pertanyaan=>{
            res.json(pertanyaan);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
});

router.get('/pertanyaan',(req,res)=>{
    Pertanyaan.find({},{'_id':0,'jawaban._id':0}).sort({_id:'desc'})
        .then(pertanyaan=>{
            res.json(pertanyaan);
        })
        .catch(err =>{
            res.status(500).json(err);
        });
})

router.post('/pertanyaan/create',(req,res)=>{
    Pertanyaan.findOne({$or:[{kodeSoal:req.body.kodeSoal},{soal:req.body.soal}]})
        .then(pertanyaan=>{
            if(pertanyaan !== null){
                return res.status(404).json('KodeSoal/Soal Sudah ada');
            }else{
               return new Pertanyaan(req.body).save().then(pertanyaan => res.json(pertanyaan));
            }

        })
        .catch(err=>{
            return res.status(500).json(err);
        })
});

router.post('/jurusan/create',(req,res)=>{
  
    Jurusan.findOne({namaJurusan:req.body.namaJurusan})
        .then(jurusan =>{
            if(jurusan !== null){
                return res.status(404).json('Jurusan sudah ada');
            }else{
                return new Jurusan(req.body).save().then(jurusan=>res.json(jurusan));
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        });
});

router.get('/jurusan',(req,res)=>{
    Jurusan.find({}, { '_id': 0,'rule._id':0 }).sort({ _id: 'desc' })
        .then(jurusan=>{
            res.json(jurusan);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
});



module.exports = router;