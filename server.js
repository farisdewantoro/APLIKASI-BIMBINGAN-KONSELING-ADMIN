const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const multer = require('multer');
// const path = require('path');

// // UPLOAD IMAGE

// // Set Storage engine
// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// // Init upload 
// const upload = multer({
//     storage: storage,
//     limits:{fileSize:1000000}, //file size dalam bit
// }).single('foto');

// // Public folder
// app.use(express.static('./public'));
// app.post('/upload',(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             res.render('index',{
//                 msg:err
//             });
//         }else{
//             console.log(req.file);
//             res.send('test');
//         }
//     });
// });

// ROUTER
const admins = require('./routes/api/admins');
const murids = require('./routes/api/murids');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./public'));
// DB CONFIG MONGOO DB
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected ');
    })
    .catch((err) => {
        console.log(err);
    });
// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);
app.use('/api/admin', admins);
app.use('/api/murids',murids);
const port = process.env.PORT || 5050;

app.listen(port, () => {

    console.log(`Server running on port ! ${port}`);
});

