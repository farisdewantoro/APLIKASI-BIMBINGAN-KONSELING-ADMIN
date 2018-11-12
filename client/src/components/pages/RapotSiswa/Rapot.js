import React, {Component} from 'react'
import {connect} from 'react-redux';
import { getRapotMurid, deleteDataMurid, editDataMurid} from '../../../actions/muridActions';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MuridDetail from './MuridDetail';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import NilaiRapot from './NilaiRapot';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
class Rapot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            murid: {
                tempatLahir: '',
                jenisKelamin: '',
                nis: '',
                nama: '',
                tanggalLahir: '',
                namaAyah: '',
                namaIbu: '',
                noTelepon: '',
                hpSiswa: '',
                hpIbu: '',
                hpAyah: '',
                alamat: ''
            },
            open:false,
            confirmDelete: '',
            errors: {},
            expanded:false
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
                    tempatLahir: murid.tempatLahir,
                    jenisKelamin: murid.jenisKelamin,
                    nis: murid.nis,
                    tanggalLahir: murid.tanggalLahir,
                    namaAyah: murid.namaAyah,
                    namaIbu: murid.namaIbu,
                    noTelepon: murid.noTelepon,
                    hpSiswa: murid.hpSiswa,
                    hpIbu: murid.hpIbu,
                    hpAyah: murid.hpAyah,
                    alamat: murid.alamat
                },
              
            });
        }
    }
    onChange =(e)=>{
        let fields = e.target.name;
        let fieldsVal=e.target.value;

        this.setState(prevState =>({
            murid:{
                ...prevState.murid,
                [fields]:fieldsVal
            }
        }));
    }
    handleExpanded = () =>{
        this.setState({expanded:!this.state.expanded});
    }
    handlerConfirmVal = (e) =>{
        this.setState({confirmDelete:e.target.value});
    }
    handleOpenDialog = () =>{
        this.setState({ open: true });
    }
    handleCloseDialog = () =>{
        this.setState({open:false});
    }

    deleteSubmitForm = (e) =>{
    let confirmDelete = this.state.confirmDelete;
    let namaMurid = this.state.murid.nama;

        if (confirmDelete.toLowerCase() === namaMurid.toLowerCase()){
            this.setState({ open: false, errors:{} });
            this.props.deleteDataMurid(this.state.murid.nis,this.props.history);
        }else{
            this.setState({ errors: {confirmError:'Nama yang diisikan harus sesuai'} });
        }
    }

    handleCancelEdit = () =>{
        this
            .props
            .getRapotMurid(this.props.match.params.nis);
        this.setState({ expanded: !this.state.expanded });
    }

    handleSubmitEdit = () =>{
        this.props.editDataMurid(this.state.murid);
        this.setState({expanded:!this.state.expanded});
    }

    render() {
        const {murid,errors,expanded} = this.state;
        const dataMurid = this.props.rapot.murid;
        console.log(this.props);
        let rapotSiswa;
        if (dataMurid !== null ){
            rapotSiswa = (
                <NilaiRapot murid={dataMurid} />
            )
        }
     
        return (
            <div className="rapot-siswa">
                <Button variant="contained" color="secondary" style={{margin:10}} onClick={this.handleOpenDialog}>Hapus Semua data</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Hapus Semua data</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah anda yakin untuk menghapus seluruh data rapot beserta dengan data siswa    <strong style={{textTransform:"uppercase"}}>  {murid.nama}</strong> ? untuk menghapus ini isi fields dengan nama siswa.
                            
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="confirmDelete"
                            name="confirmDelete"
                            onChange={this.handlerConfirmVal}
                            label="Nama Siswa"
                            type="text"
                            fullWidth
                            error={errors.confirmError !== undefined}
                            helperText={errors.confirmError}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                         </Button>
                        <Button onClick={this.deleteSubmitForm} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                <MuridDetail 
                murid={murid} 
                onChange={this.onChange} 
                onClickExpanded={this.handleExpanded}  
                expanded={expanded} 
                onClickCancel={this.handleCancelEdit}
                    onClickSubmit={this.handleSubmitEdit}/>


                <Grid container style={{marginTop:20}}>
                    <Card>
                        <CardContent>
                            <Grid container
                                direction="row"
                                justify="space-between"
                                style={{marginBottom:20}}>
                                <Typography variant="h6">
                                    Nilai Rapot
                            </Typography>
                       
                             
                            </Grid>
                                         
                            {rapotSiswa}
                        </CardContent>
                    </Card>
                    
                </Grid>

            </div>
        )
    }
}
Rapot.propTypes = {
    rapot: PropTypes.object.isRequired,
    deleteDataMurid:PropTypes.func.isRequired,
    editDataMurid:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({rapot: state.rapot});
export default connect(mapStateToProps, { getRapotMurid, deleteDataMurid, editDataMurid})(withRouter(Rapot));