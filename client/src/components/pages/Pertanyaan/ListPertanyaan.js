import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import SettingIcon from '@material-ui/icons/Build';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { deletePertanyaan } from '../../../actions/pertanyaanActions';

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
    icon:{
        marginLeft:theme.spacing.unit
    },
    kodeJawaban:{
        color: theme.palette.text.secondary,
    }

});

class ListPertanyaan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: null,
            open: false,
            confirmDelete: '',
            errors: {},
            index:0
        };       
    }
 

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    handlerConfirmVal = (e) => {
        this.setState({ confirmDelete: e.target.value });
    }
    handleOpenDialog = (i) => {
        this.setState({ open: true });
        this.setState({index:i});
    }
    handleCloseDialog = () => {
        this.setState({ open: false });
    }
    deleteSubmitForm = (e) => {
        let confirmDelete = this.state.confirmDelete;
        let index = this.state.index;
        let kodeSoal = this.props.data[index].kodeSoal;

        if (confirmDelete.toLowerCase() === kodeSoal.toLowerCase()) {
            this.setState({ open: false, errors: {} });
            this.props.deletePertanyaan(kodeSoal);
            // this.props.deleteDataMurid(this.state.murid.nis, this.props.history);
        } else {
            this.setState({ errors: { confirmError: 'Kode soal yang diisikan harus sesuai' } });
        }
    }


    render() {
        const { classes,data } = this.props;
        const { expanded, errors, index } = this.state;
       
        return (
            <div className={classes.root}>
            
            {data.map((pertanyaan,i)=>{
                return(
                   
                    <ExpansionPanel 
                    expanded={expanded === pertanyaan.kodeSoal}
                     onChange={this.handleChange(pertanyaan.kodeSoal)}
                            key={i}
                    >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{pertanyaan.kodeSoal}</Typography>
                            <Typography className={classes.secondaryHeading}>{pertanyaan.soal}</Typography>
                          
                        </ExpansionPanelSummary>
                        <Divider/>
                        <ExpansionPanelDetails>
                        <Grid container direction="column" spacing={8}>
                        {pertanyaan.jawaban.map((jwb,i)=>{
                            return(
                                <Grid item key={i}>
                                    <Grid container direction="row" key={i}  >
                                        <Grid item xs={1} >
                                            <Typography className={classes.kodeJawaban}>{jwb.kodeJawaban}</Typography>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography >{jwb.jawab}</Typography>
                                        </Grid>
                                    </Grid>  
                                </Grid>
                              
                            )
                        })}
                            </Grid>
                           
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                                <Button size="small" color="primary" onClick={()=>this.handleOpenDialog(i)}> Hapus <DeleteIcon className={classes.icon}/></Button>
                            <Button size="small" color="primary" component={Link} to={`/pertanyaan/edit/${pertanyaan.kodeSoal}`}>
                                Edit  <SettingIcon className={classes.icon}/>
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
                            Apakah anda yakin untuk menghapus pertanyaan dengan kode soal  <strong style={{ textTransform: "uppercase" }}>  {data[index].kodeSoal}</strong> ? untuk menghapus ini isi fields dengan kode soal.
    
            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="confirmDelete"
                                name="confirmDelete"
                                onChange={this.handlerConfirmVal}
                                label="Kode Soal"
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

ListPertanyaan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { name: 'ListPertanyaan' }), connect(null, { deletePertanyaan}))(ListPertanyaan);