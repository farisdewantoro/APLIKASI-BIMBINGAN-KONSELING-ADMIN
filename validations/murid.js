const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMuridInput(data){
    let errors = {};

    data.nama = !isEmpty(data.nama) ? data.nama : '';
    data.tempatLahir = !isEmpty(data.tempatLahir) ? data.tempatLahir : '';
    data.jenisKelamin = !isEmpty(data.jenisKelamin) ? data.jenisKelamin : '';
    data.nis = !isEmpty(data.nis) ? data.nis : '';
    data.tanggalLahir = !isEmpty(data.tanggalLahir) ? data.tanggalLahir : '';

    if(!Validator.isLength(data.nis,{min:5,max:40})){
        errors.nis = 'NIS berisi antara 5 sampai 40 karakter';
    }
    if(Validator.isEmpty(data.nis)){
        errors.nis = 'NIS wajib diisi'
    }
    if(Validator.isEmpty(data.tempatLahir)){
        errors.tempatLahir = 'Tempat Lahir wajib diisi'
    }
    if (Validator.isEmpty(data.jenisKelamin)) {
        errors.jenisKelamin = 'Jenis Kelamin wajib diisi'
    }
    if (Validator.isEmpty(data.nama)) {
        errors.nama = 'Nama wajib diisi'
    }
    if (Validator.isEmpty(data.tanggalLahir)) {
        errors.tanggalLahir = 'Tanggal lahir wajib diisi'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}