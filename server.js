const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// ROUTER
const admins = require('./routes/api/admins');
const murids = require('./routes/api/murids');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

