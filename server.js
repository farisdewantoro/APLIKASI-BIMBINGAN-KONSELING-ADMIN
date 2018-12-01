const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
// ROUTER
const admins = require('./routes/api/admins');
const murids = require('./routes/api/murids');
const rapots = require('./routes/api/rapots');
const konsultasi = require('./routes/api/konsultasi');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('./public'));
// DB CONFIG MONGOO DB
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true,})
    .then(() => {
        console.log('MongoDB Connected ');
    })
    .catch((err) => {
        console.log(err);
    });
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();  });
// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);
app.use('/api/admin', admins);
app.use('/api/murids',murids);
app.use('/api/rapots',rapots);
app.use('/api/konsultasi',konsultasi);

// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const port = process.env.PORT || 5050;

app.listen(port, () => {

    console.log(`Server running on port ! ${port}`);
});

