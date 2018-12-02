const express = require('express');
const router = express.Router();
const isEmpty = require('../../validations/is-empty');
// Model

const Jawaban = require('../../models/Jawaban');
const Jurusan = require('../../models/Jurusan');
const Pertanyaan = require('../../models/Pertanyaan');

router.post('/hasil/submit', (req, res) => {
    Jawaban.findOne({murid:req.body.murid})
        .then(jawaban => {
            if (jawaban) {
                Jawaban.replaceOne({murid:req.body.murid},req.body,{new:true})
                    .then(jaw=>{
                        res.json(jaw);
                    })
            }else{
                return new Jawaban(req.body).save().then(jawaban => res.json(jawaban));
            }

        })
})

router.post('/jawaban/konsul',(req,res)=>{

    if(!isEmpty(req.body)){
      
    let findQuestion = [];
    let jawabanUser = req.body;
    let soalPalingBanyak = {};
    let hasilAkhirFix =[];
    let queryFindPertanyaan =[];
    let info={};
    Jurusan.find({$or:req.body})
        .then(jurusan=>{
         
            if(jurusan.length >0){
                findQuestion.push(jurusan);
               
                jawabanUser.forEach(itemJawaban=>{
                    findQuestion.forEach(f=>{
               
                        f.forEach((itemFindQuestion) => {          
                            itemFindQuestion.rule.forEach((removeItem, index) => {
                                if (removeItem.kodeSoal == itemJawaban.rule.$elemMatch.kodeSoal
                                    ) {
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

                    
                    Object.keys(soalPalingBanyak).forEach((soalP) => {
                        queryFindPertanyaan.push({ kodeSoal: soalP });
                    })
                }
                if (queryFindPertanyaan.length > 0){
                    Pertanyaan.find({ $or: queryFindPertanyaan })
                        .then(pertanyaan => {
                            if (pertanyaan.length > 0) {
                                res.json(pertanyaan);
                            } else {

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

                                                hasil["percentase"] = hasil["dataMatched"]/hasil["maxLength"] * 100;
                                            })
                                        })
                                        res.json(hasilAkhir.sort((a, b) =>
                                            (b.dataMatched / b.maxLength * 100 > a.dataMatched / a.maxLength * 100)
                                                ? 1 : ((a.dataMatched / a.maxLength * 100 > b.dataMatched / b.maxLength * 100) ? -1 : 0)
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
                                    hasil["percentase"] = hasil["dataMatched"] / hasil["maxLength"] * 100;
                                })
                            })

                            if (hasilAkhir.length > 0) {
                                res.json(hasilAkhir.sort((a, b) =>
                                    (b.dataMatched / b.maxLength * 100 > a.dataMatched / a.maxLength * 100)
                                        ? 1 : ((a.dataMatched / a.maxLength * 100 > b.dataMatched / b.maxLength * 100) ? -1 : 0)
                                ));
                            } else {
                                let notFind = { message: "NOT FIND", status: "NO" };
                                hasilAkhir.push(notFind);
                                res.json(hasilAkhir);

                            }


                        });
                }
               
        
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
                                hasil["percentase"] = hasil["dataMatched"] / hasil["maxLength"] * 100;
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

router.get('/pertanyaan/edit/:kodeSoal',(req,res)=>{
    Pertanyaan.findOne({kodeSoal:req.params.kodeSoal})
        .then(pertanyaan=>{
            res.json(pertanyaan);
        })
        .catch(err=>{
            res.json(err);
        });
    });

router.delete('/pertanyaan/delete/:kodeSoal',(req,res)=>{
    console.log(req.params.kodeSoal);
    Pertanyaan.findOne({kodeSoal:req.params.kodeSoal})
        .then(pertanyaan=>{
            pertanyaan.remove();
            Pertanyaan.find({})
                .then(p=>{
                    res.status(200).json(p);
                });
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

router.get('/pertanyaan',(req,res)=>{
    Pertanyaan.find({},{'_id':0,'jawaban._id':0}).sort({_id:'desc'})
        .then(pertanyaan=>{
            // Jurusan.find({}).then(jurusan=>{

            // })
            res.json(pertanyaan);
        })
        .catch(err =>{
            res.status(500).json(err);
        });
})

router.post('/pertanyaan/create',(req,res)=>{

    Pertanyaan.findOne({$or:[{kodeSoal:req.body.kodeSoal},{soal:req.body.soal}]})

        .then(pertanyaan=>{
            if(pertanyaan){         
                let newData = [];
                let oldData = [];
                let deleteJurusanRule;
                Jurusan.find({ rule: { $elemMatch: { kodeSoal: req.body.kodeSoal } } }).lean()
                    .then(jurusan => {
                        deleteJurusanRule = jurusan;
                        req.body.jawaban.forEach(dataRequest=>{
                         
                            deleteJurusanRule.forEach((j)=>{
                                j.rule.forEach((r, index, object) => {
                                    if (req.body.kodeSoal === r.kodeSoal){
                                        newData.push(dataRequest.kodeJawaban);
                                       
                                        oldData.push(r.kodeJawaban); 
                                                         
                                    }                                 
                                })  
                            })
                        });
                
                        //@ mencari data 
                        let deleteJawaban = oldData.filter(val=>{ 
                            return newData.indexOf(val) == -1; //kalo -1 tandanya tidak ada 
                        });

                        let filterDataYangSama = [...new Set(deleteJawaban.map(val=>val))];
                       if(filterDataYangSama.length > 0){
                           let queryCariRule = [];
                           filterDataYangSama.forEach(data => {
                               queryCariRule.push({
                                   rule: {
                                       $elemMatch: {
                                           kodeSoal: req.body.kodeSoal,
                                           kodeJawaban: data
                                       }
                                   }
                               });
                           })


                           Jurusan.updateMany({ $or: queryCariRule }, { $pull: { rule: { kodeSoal: req.body.kodeSoal } } }, { multi: true }).
                               exec()
                               .then(jur => {
                                   Pertanyaan.replaceOne({ kodeSoal: req.body.kodeSoal }, req.body, { new: true }).then(p=>{
                                       res.json(p);
                                   })
                                   
                               });
                       }else{
                           Pertanyaan.replaceOne({ kodeSoal: req.body.kodeSoal }, req.body, { new: true })
                            .then(pertanyaan=>{
                                res.json(pertanyaan);
                            })
                          
                       }
                    

                
                    });
              
               
           }else{
               return new Pertanyaan(req.body).save().then(pertanyaan => res.json(pertanyaan));
            }

        })
        .catch(err=>{
            return res.status(500).json(err);
        })
});

router.post('/jurusan/create',(req,res)=>{
    let queries = {namaJurusan:req.body.namaJurusan};
    if (typeof req.body._id !== 'undefined'){
        queries["_id"] = req.body._id;
    }
    Jurusan.findOne(queries)
        .then(jurusan =>{
            if(jurusan !== null && typeof req.body._id === 'undefined'){
                return res.status(404).json('Jurusan sudah ada');
            }
            else if(jurusan !== null && typeof req.body._id !== 'undefined'){
                Jurusan.replaceOne({_id:queries._id},req.body,{new:true})
                    .then(jurusan=>{
                        res.status(200).json(jurusan);
                    })
            }
            else{
                return new Jurusan(req.body).save().then(jurusan=>res.json(jurusan));
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        });
});

router.get('/jurusan/edit/:_id',(req,res)=>{
    Jurusan.findById(req.params._id, { '_id': 0, 'rule._id': 0 })
        .then(jurusan=>{
           return res.json(jurusan);
        })
        .catch(err=>{
            return res.status(500).json(err);
        });
});

router.get('/jurusan',(req,res)=>{
    Jurusan.find({}, { 'rule._id':0 }).sort({ _id: 'desc' })
        .then(jurusan=>{
            res.json(jurusan);
        })
        .catch(err=>{
            res.status(500).json(err);
        });
});

router.delete('/jurusan/delete/:_id',(req,res)=>{
    Jurusan.findByIdAndRemove({_id:req.params._id})
        .then(jurusan=>{
            Jurusan.find({}).sort({_id:'desc'}).then(jur=>{
                res.status(200).json(jur);
            });
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

module.exports = router;