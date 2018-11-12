import React, { Component } from 'react'
import { getRapotMurid } from '../../../actions/muridActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
const styles = theme =>({
  infoSiswa:{
    fontWeight:"bold",
    textTransform:"Uppercase"
  },

  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  margin: {
    marginBottom:20
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  addIcon:{
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

});

 class KelolaRapotSiswa extends Component {
   constructor(props){
    super(props);
      this.state={
        murid: {
          nis: '',
          nama: '',
          tanggalLahir: '',
        },
        rapots:[{
          kelas:'',
          nilai:[{
            semester:'',
            tahunPelajaran:'',
            mataPelajaran:[{
              namaMataPelajaran:'',
              nilaiPelajaran:'',
              predikat:''
            }]
          }]
        }]
      }
   }
   componentDidMount() {
     this
       .props
       .getRapotMurid(this.props.match.params.nis);
   }
   componentWillReceiveProps(nextProps) {
     if (nextProps.rapot.murid) {
       let murid = nextProps.rapot.murid;
       this.setState({
         murid: {
           nama: murid.nama,
           nis: murid.nis,
           tanggalLahir: murid.tanggalLahir,
         },

       });
     }
   }

   handlerTambahField = () =>{
     console.log('as');
     this.setState({rapots:this.state.rapots.concat([
       {
         kelas: '',
         nilai: [{
           semester: '',
           tahunPelajaran: '',
           mataPelajaran: [{
             namaMataPelajaran: '',
             nilaiPelajaran: '',
             predikat: ''
           }]
         }]}
     ])});
   }

  componentNilai = () => {
    const { classes } = this.props;
    return (
      
      <div>
        {this.state.rapots.map((rapot,i)=>{
      
          return (

            <Grid item key={i} style={{marginTop:20}} > 
       
                <Grid container direction="column" style={{marginBottom:20}} spacing={24}>
                  <Grid item>
                    <TextField
                      id="kelas"
                      label="Kelas"
                      name="kelas"
                      fullWidth

                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                  </Grid>

                {rapot.nilai.map((n,i)=>{
                  return (
                    <Grid item key={i}>
                      <Paper className={classes.paperRoot} elevation={1}>
                        <div className={classes.margin}>
                          <TextField
                            id="semester"
                            label="Semester"
                            name="semester"
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            id="tahunPelajaran"
                            label="Tahun Pelajaran"
                            name="tahunPelajaran"
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </div>
                        <Divider />
                        <Grid container direction="column" spacing={16}>
                        
                          <Grid item>
                            <TextField
                              id="mataPelajaran"
                              label="Mata Pelajaran"
                              name="mataPelajaran"
                              margin="normal"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              id="nilai"
                              label="Nilai"
                              name="nilai"
                              margin="normal"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />

                            <TextField
                              id="predikat"
                              label="Predikat"
                              name="predikat"
                              margin="normal"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>

                          <Grid item>
                            <Button variant="contained" fullWidth>
                              Tambah matapelajaran
                            </Button>
                          </Grid>


                        </Grid>


                      </Paper>
                    </Grid>
                  )
                })}
                <Grid item>
                  <Button variant="contained" fullWidth>
                    Tambah Semester
                            </Button>
                </Grid>
                </Grid>






        <Divider/>
            </Grid>
          )
        })}
     
      </div>
    )
    
  }

  render() {
    const {murid,rapot} = this.state;
    const {classes} = this.props;
    return (
      <Card>
        <CardHeader title="Kelola Rapot" />
          <Divider/>
        <CardContent>
          <Grid container direction="column" spacing={24}>
              <Grid item>
                  <Grid container spacing={16}>
                      <Grid item>
                  <Typography variant="subtitle1" className={classes.infoSiswa}>
                   NIS : {murid.nis}
                  </Typography>

                      </Grid>
                      <Grid item>
                  <Typography variant="subtitle1" className={classes.infoSiswa}>
                    NAMA : {murid.nama}
                  </Typography>
                      </Grid>
                <Grid item>
                  <Typography variant="subtitle1" className={classes.infoSiswa}>
                    TANGGAL LAHIR : {murid.tanggalLahir}
                  </Typography>
                </Grid>
                  </Grid>
              </Grid>
            <Divider/>
            <Grid item>
              <Button variant="contained" onClick={this.handlerTambahField} >
                <AddIcon className={classes.addIcon} /> Tambah Field
                </Button>
            </Grid>
       
              {this.componentNilai()}
            
         
            </Grid>
        </CardContent>
      </Card>
    )
  }
}

KelolaRapotSiswa.propTypes={
  classes: PropTypes.object.isRequired,
  getRapotMurid:PropTypes.func.isRequired,
  rapot: PropTypes.object.isRequired,
}

const mapStateToProps =(state)=>({
  rapot:state.rapot
});

export default 
compose(
  withStyles(styles,{name:"KelolaRapotSiswa"}),
  connect(mapStateToProps, { getRapotMurid }))(withRouter
(KelolaRapotSiswa));
