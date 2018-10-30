const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name Field is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password Field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
   

    if (!Validator.isEmail(data.email, { allow_display_name: true, domain_specific_validation: true })) {
        errors.email = 'Please use correct email';

    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
