import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingIcon from '@material-ui/icons/Build';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import { deleteJurusan} from '../../../actions/jurusanActions';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '5%',
        color: theme.palette.text.secondary,
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
    icon: {
        marginLeft: theme.spacing.unit
    }
});

class ListJurusan extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            confirmDelete: '',
            errors: {},
            index: 0
        }
    }
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    findSoal = (kodeSoal) =>{
        const {pertanyaan} = this.props;
        let soal;
        pertanyaan.forEach((tanya,i)=>{
            if(tanya.kodeSoal === kodeSoal){
                soal= tanya.soal;
            
            }
        });
        return soal;
    }

    findJawaban = (kodeSoal,kodeJawaban) =>{
        const { pertanyaan } = this.props;
        let jawaban;
       pertanyaan.forEach((tanya, i) => {
            if (tanya.kodeSoal === kodeSoal) {
                tanya.jawaban.forEach((jawab)=>{
                    if(jawab.kodeJawaban === kodeJawaban){
                        jawaban = jawab.jawab;
                  
                    }
                });
            }
        });
        return jawaban;
        }

    handleOpenDialog = (i) => {
        this.setState({ open: true });
        this.setState({ index: i });
    }
    handlerConfirmVal = (e) => {
        this.setState({ confirmDelete: e.target.value });
    }
    handleCloseDialog = () => {
        this.setState({ open: false });
    }
    deleteSubmitForm = (e) => {
        let confirmDelete = this.state.confirmDelete;
        let index = this.state.index;
        let jurusan = this.props.jurusan[index].namaJurusan;

        if (confirmDelete.toLowerCase() === jurusan.toLowerCase()) {
            this.setState({ open: false, errors: {} });
            this.props.deleteJurusan(this.props.jurusan[index]._id);
        
        } else {
            this.setState({ errors: { confirmError: 'Kode soal yang diisikan harus sesuai' } });
        }
    }


    render() {
        const { classes, jurusan } = this.props;
        const { expanded,errors,index } = this.state;

        return (
            <div className={classes.root}>
                {jurusan.map((jurusan, i) => {
                    return (
                        <ExpansionPanel
                            expanded={expanded === jurusan.namaJurusan}
                            onChange={this.handleChange(jurusan.namaJurusan)}
                            key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >{jurusan.namaJurusan}</Typography>

                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>

                                <Grid container direction="row" spacing={16}>
                                    <Grid item xs={12}> 
                                        <Typography>
                                            Deskripsi
                                        </Typography>
                                        <Divider/>
                                        <Typography>
                                            {jurusan.deskripsi}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container direction="column">
                                            {jurusan.rule.map((rule, i) => {
                                                return (
                                                    <Grid container direction="row" key={i}>
                                                        <Grid item xs={12}>
                                                            <Typography >{`${this.findSoal(rule.kodeSoal)} ${this.findJawaban(rule.kodeSoal, rule.kodeJawaban)}`}   </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography ></Typography>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                             

                            </ExpansionPanelDetails>
                            <Divider/>
                            <ExpansionPanelActions>
                                <Button size="small" color="primary" onClick={() => this.handleOpenDialog(i)}> Hapus <DeleteIcon className={classes.icon} /></Button>
                                <Button size="small" color="primary" component={Link} to={`/jurusan/edit/${jurusan._id}`}>
                                    Edit  <SettingIcon className={classes.icon} />
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    )
                })}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Hapus Semua data</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah anda yakin untuk menghapus jurusan  <strong style={{ textTransform: "uppercase" }}> {jurusan[index].namaJurusan} </strong> ? untuk menghapus ini isi fields dengan kode soal.

            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="confirmDelete"
                            name="confirmDelete"
                            onChange={this.handlerConfirmVal}
                            label="Nama Jurusan"
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
            </div>
        );
    }
}

ListJurusan.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteJurusan:PropTypes.func.isRequired
};

export default compose(withStyles(styles, { name: 'ListJurusan' }), connect(null, { deleteJurusan}))(ListJurusan);