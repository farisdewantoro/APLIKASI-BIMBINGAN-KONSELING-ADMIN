const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Admin model
const Admin = require('../../models/Admin');

// Load input validation
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validations
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (admin) {
                errors.email = 'Email is invalid'
                return res.status(400).json(errors);
            } else {
                const newAdmin = new Admin({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    //10 adalah berapa banyak karakter
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newAdmin.password = hash;
                        newAdmin.save()
                            .then((admin) => {
                                res.json(admin);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                });
            }
        });
});


// @route 			GET api/admin/login
// @description Login admin / Returning jwt token
// @access 			Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // find user by Email
    Admin.findOne({ email })
        .then((admin) => {
            // check for admins
            if (!admin) {
                errors.email = 'admin not found';
                return res.status(400).json(errors);
            }
            // check password
            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (isMatch) {
                        // admin Matched

                        const payload = { id: admin.id, name: admin.name, email: admin.email }; // create jwt payload


                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey, {
                                expiresIn: 3600
                            }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            });
                    } else {
                        errors.password = 'Password incorrect'; return res.status(400).json(errors);
                    }
                });
        });
});
module.exports = router;