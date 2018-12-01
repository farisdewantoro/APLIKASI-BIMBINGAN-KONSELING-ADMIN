const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginMuridInput(data) {
    let errors = {};

    data.nis = !isEmpty(data.nis) ? data.nis : '';
    data.noTanggalLahir = !isEmpty(data.noTanggalLahir) ? data.noTanggalLahir : '';

    if (Validator.isEmpty(data.nis)) {
        errors.nis = 'nis Field is required';
    }
    if (Validator.isEmpty(data.noTanggalLahir)) {
        errors.noTanggalLahir = 'noTanggalLahir Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
