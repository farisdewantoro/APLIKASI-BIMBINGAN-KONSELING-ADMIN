import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    photoCameraIcon: {
        marginRight: theme.spacing.unit,
    },
});

class DataSiswaCreate extends Component {
    constructor(props){
        super(props);
        this.state={
            tempatLahir:'',
            jenisKelamin:'',
            nis:'',
            nama:'',
            tanggalLahir:'',
            btnImage:true,
            foto:'',
            namaAyah:'',
            namaIbu:'',
            noTelepon:'',
            hpSiswa:'',
            hpIbu:'',
            hpAyah:'',
            alamat:''
        }
    }
    onChange = name=> event => {
       
        this.setState({[name]: event.target.value });
    }

    handlerFoto = name=>e =>{
        console.log(e);
    }


    render() {
        const { classes } = this.props;
        const kota =  ['Bandung', 'Jakarta', 'Padang', 'Bali', 'Bekasi'];
        let buttonImage;
        if(this.state.btnImage){
            buttonImage=(
                <div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        name="foto"
                        onChange={this.handlerFoto('foto')}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                            <PhotoCameraIcon className={classes.photoCameraIcon} />
                            Upload Foto
                            </Button>
                    </label>
                </div>
               
            )
        }     
        return (
            <div>
                <Typography variant="h4">
                    Tambah Data Siswa
                </Typography>
                <Grid  style={{
                    marginTop: 20
                }}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={40}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="filled-full-width"
                                        label="NIS"
                                        name="nis"
                                        value={this.state.nis}
                                        onChange={this.onChange('nis')}
                                        style={{ margin: 10 }}       
                                        fullWidth
                                        margin="normal"           
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        id="filled-full-width"
                                        label="Nama"
                                        name="nama"
                                        value={this.state.nama}
                                        onChange={this.onChange('nama')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                  
                                    <TextField
                                        id="filled-full-width"
                                        label="Nama Ayah"
                                        name="namaAyah"
                                        value={this.state.namaAyah}
                                        onChange={this.onChange('namaAyah')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="filled-full-width"
                                        label="Nama Ibu"
                                        name="namaIbu"
                                        value={this.state.namaIbu}
                                        onChange={this.onChange('namaIbu')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="filled-full-width"
                                        label="No.Telepon"
                                        name="noTelepon"
                                        type="number"
                                        value={this.state.noTelepon}
                                        onChange={this.onChange('noTelepon')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="filled-full-width"
                                        label="HP.Siswa"
                                        name="hpSiswa"
                                        type="number"
                                        value={this.state.hpSiswa}
                                        onChange={this.onChange('hpSiswa')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="filled-full-width"
                                        label="HP.Ayah"
                                        name="hpAyah"
                                        type="number"
                                        value={this.state.hpAyah}
                                        onChange={this.onChange('hpAyah')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="filled-full-width"
                                        label="HP.Ibu"
                                        name="hpIbu"
                                        type="number"
                                        value={this.state.hpIbu}
                                        onChange={this.onChange('hpIbu')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth className={classes.formControl} margin="normal"
                                        style={{ margin: 10 }} >
                                        <InputLabel htmlFor="tempat-lahir">Tempat Lahir</InputLabel>
                                        <Select
                                            value={this.state.tempatLahir}
                                            onChange={this.onChange('tempatLahir')}
                                       
                                            inputProps={{
                                                name: 'tempatLahir',
                                                id: 'tempat-lahir',
                                            }}
                                        >
                                            {kota.map(kt => (
                                                <MenuItem key={kt} value={kt}>
                                                    {kt}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id="datetime-local"
                                        label="Tanggal Lahir"
                                        type="datetime-local"
                                        margin="normal"
                                        name="tanggalLahir"
                                        fullWidth
                                        value={this.state.tanggalLahir}
                                        onChange={this.onChange('tanggalLahir')}
                                        style={{ margin: 10 }}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <FormControl component="fieldset" className={classes.formControl} fullWidth>
                                        <FormLabel component="legend">Jenis Kelamin</FormLabel>
                                        <RadioGroup
                                            aria-label="jenisKelamin"
                                            name="jenisKelamin"
                                            value={this.state.jenisKelamin}
                                            onChange={this.onChange('jenisKelamin')}
                                            row
                                            margin="normal"
                                            style={{ margin: 10 }}
                                        >
                                            <FormControlLabel
                                                value="Pria"
                                                control={<Radio color="primary" />}
                                                label="Pria"
                                            />
                                            <FormControlLabel
                                                value="Wanita"
                                                control={<Radio color="primary" />}
                                                label="Wanita"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField
                                        id="filled-full-width"
                                        label="Alamat"
                                        name="alamat"
                                        multiline
                                        rows="4"
                                        variant="outlined"
                                        value={this.state.alamat}
                                        onChange={this.onChange('alamat')}
                                        style={{ margin: 10 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                      
                                 {buttonImage}


                                </Grid>
                            </Grid>
                          


                        </CardContent>
                    </Card>
                </Grid>

            </div>

        )
    }
}
DataSiswaCreate.propTypes={
    classes:PropTypes.object.isRequired
}


export default compose(withStyles(styles,{name:"DataSiswaCreate"}),connect(null))(DataSiswaCreate);