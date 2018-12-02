const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginMuridInput(data) {
    let errors = {};

    data.nis = !isEmpty(data.nis) ? data.nis : '';
    data.noTanggalLahir = !isEmpty(data.noTanggalLahir) ? data.noTanggalLahir : '';

    if (Validator.isEmpty(data.nis)) {
        errors.nis = 'NIS Field is required';
    }
    if (Validator.isEmpty(data.noTanggalLahir)) {
        errors.noTanggalLahir = 'No Tanggal Lahir Field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
