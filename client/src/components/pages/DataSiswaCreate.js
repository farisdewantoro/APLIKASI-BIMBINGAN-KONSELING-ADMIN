import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import FormHelperText from '@material-ui/core/FormHelperText';
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
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {createNewMurid} from '../../actions/muridActions';
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
    fotoMurid:{
        maxWidth:"100%",
        display:"block",
        marginLeft:"auto",
        marginRight:"auto"
    },
    SiswaCreate:{
        paddingTop:"3vh",
        paddingBottom:"10vh"
    }
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
            fotoDisplay:'',
            namaAyah:'',
            namaIbu:'',
            noTelepon:'',
            hpSiswa:'',
            hpIbu:'',
            hpAyah:'',
            alamat:'',
            errors:{},
            foto:null
        }
    }
    onChange = name=> event => {
       
        this.setState({[name]: event.target.value });
    }

    handlerFoto = name=>e =>{
        if(e.target.files && e.target.files[0]){
            this.setState({foto:e.target.files[0]});
            let reader = new FileReader();
            reader.onload = (e) =>{
                this.setState({fotoDisplay:e.target.result});
               
            };
            reader.readAsDataURL(e.target.files[0]);
        
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit = (e) =>{
          e.preventDefault();
        const noTanggalLahir = moment(this.state.tanggalLahir).format("L").replace(/[/]/g, "");

      
        const muridData = {
            tempatLahir:this.state.tempatLahir,
            jenisKelamin:this.state.jenisKelamin,
            nis: this.state.nis,
            nama: this.state.nama,
            tanggalLahir:this.state.tanggalLahir,
            namaAyah:this.state.namaAyah,
            namaIbu:this.state.namaIbu,
            noTelepon:this.state.noTelepon,
            hpSiswa: this.state.hpSiswa,
            hpIbu: this.state.hpIbu,
            hpAyah:this.state.hpAyah,
            alamat:this.state.alamat,
            noTanggalLahir:noTanggalLahir
            
        }
        const foto =this.state.foto;
        
        this.props.createNewMurid(muridData, foto,this.props.history);
        
    }


    render() {
        const { classes } = this.props;
        const { errors } = this.state;
      
        const kota =  ['Bandung', 'Jakarta', 'Padang', 'Bali', 'Bekasi'];
        
        let buttonImage;
        let uploadedFoto;
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
        if(this.state.fotoDisplay !== ''){
            uploadedFoto=(
                <Card>
                    <CardMedia >
                        <img src={this.state.fotoDisplay} className={classes.fotoMurid} alt="foto" />
                    </CardMedia>

                </Card> 
            );
        }     
        return (
            <div className={classes.SiswaCreate}>
                <form onSubmit={this.onSubmit} >
          
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
                                        error={errors.nis !== undefined}
                                        helperText={errors.nis}
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
                                            error={errors.nama !== undefined}
                                            helperText={errors.nama}
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
                                            error={errors.namaAyah !== undefined}
                                            helperText={errors.namaAyah}
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
                                            error={errors.namaIbu !== undefined}
                                            helperText={errors.namaIbu}
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
                                            error={errors.noTelepon !== undefined}
                                            helperText={errors.noTelepon}
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
                                            error={errors.hpSiswa !== undefined}
                                            helperText={errors.hpSiswa}
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
                                            error={errors.hpAyah !== undefined}
                                            helperText={errors.hpAyah}
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
                                            error={errors.hpIbu !== undefined}
                                            helperText={errors.hpIbu}
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
                                    <FormControl fullWidth 
                                            error={errors.tempatLahir !== undefined}
                                           
                                    className={classes.formControl} margin="normal"
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
                                            <FormHelperText error>{errors.tempatLahir}</FormHelperText >
                                      
                                    </FormControl>

                                    <TextField
                                        id="datetime-local"
                                        label="Tanggal Lahir"
                                        type="date"
                                        margin="normal"
                                        name="tanggalLahir"
                                            error={errors.tanggalLahir !== undefined}
                                            helperText={errors.tanggalLahir}
                                        fullWidth
                                        value={this.state.tanggalLahir}
                                        onChange={this.onChange('tanggalLahir')}
                                        style={{ margin: 10 }}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <FormControl component="fieldset"
                                            error={errors.jenisKelamin !== undefined}
            
                                    className={classes.formControl} fullWidth>
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

                                        <FormHelperText error>{errors.jenisKelamin}</FormHelperText>
                                    </FormControl>
                                    <TextField
                                        id="filled-full-width"
                                        label="Alamat"
                                        name="alamat"
                                        multiline
                                            error={errors.alamat !== undefined}
                                            helperText={errors.alamat}
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
                                    {uploadedFoto}           

                                </Grid>
                            </Grid>
                          


                        </CardContent>
                    </Card>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="secondary" style={{ margin:20 }}>
                            <CancelIcon className={classes.photoCameraIcon} />
                            Cancel</Button>    

                        <Button variant="contained" type="submit" color="primary" style={{ margin:20 }}>
                            <SaveIcon className={classes.photoCameraIcon} />
                            Save</Button>                
                    </Grid>                       
                 
                </Grid>
            </form>
            </div>

        )
    }
}
DataSiswaCreate.propTypes={
    classes:PropTypes.object.isRequired,
    createNewMurid:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>({
    errors:state.errors
});



export default compose(withStyles(styles,{name:"DataSiswaCreate"}),connect(mapStateToProps,{createNewMurid}))(withRouter(DataSiswaCreate));