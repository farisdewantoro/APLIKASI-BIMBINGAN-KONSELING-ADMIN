import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {Typography,Paper, Button,TextField,Grid,Card,CardContent,CardHeader} from '@material-ui/core';
import HobbyList from '../form/HobbyList';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return [' Masukan Nama Jurusan', 'Masukan Hobby&Bobot ', 'Masukan Kepribadian&Bobot'];
}






class PenjurusanCreate extends React.Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            hobbyLists:[
                {hobby:'',bobot:''}
            ],
            kepribadianLists:[
                {kepribadian:'',bobot:''}
            ],
            caraBelajarLists:[
                {carabelajar:'',bobot:''}
            ],
            softSkillLists:[
                {softskill:'',bobot:''}
            ]
        };
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    handleHobbyValueChange = (i) => (evt) => {
    
        const newHobby = this.state.hobbyLists.map((hobbyList, index) => {
        
            if(i !== index) return hobbyList;
            return {...hobbyList,[evt.target.name]:evt.target.value};
        });

        this.setState({ hobbyLists: newHobby });
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
    deleteHandlerHobby = (i) =>{
        this.setState({ hobbyLists: this.state.hobbyLists.filter((hobbylist, index) => i !== index) });
    }
    addHobbyHandler = () =>{
        this.setState({ hobbyLists: this.state.hobbyLists.concat([{ hobby: '', bobot:'' }]) });
    }
    deleteHandlerKepribadian = (i) => {
        this.setState({ kepribadianLists: this.state.kepribadianLists.filter((kepribadianList, index) => i !== index) });
    }
    addKepribadianHandler = () => {
        this.setState({ kepribadianLists: this.state.kepribadianLists.concat([{ kepribadian: '', bobot: '' }]) });
    }

     getStepContent = (step) => {

    switch (step) {
        case 0:
            return (
                <div>
                    <TextField
                        id="standard-name"
                        label="Jurusan"
                        fullWidth
                        margin="normal"
                    /></div>

            );
        case 1:

            return (
                <div>

                    
                    {this.state.hobbyLists.map((list, i) => {
                  
                    return (
                        <Grid container spacing={16} key={i}>
                            <Grid item>
                                <TextField
                                    id="standard-name"
                                    label="Hobby"
                                    fullWidth
                                    margin="normal"
                                    name="hobby"
                                    value={list.hobby}
                                    onChange={this.handleHobbyValueChange(i)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="standard-name"
                                    label="Bobot"
                                    fullWidth
                                    margin="normal"
                                    name="bobot"
                                    value={list.bobot}
                                    onChange={this.handleHobbyValueChange(i)}
                                />
                            </Grid>
                            <Grid item>
                                <Button component="span" style={{ marginTop: 20 }} onClick={()=>this.deleteHandlerHobby(i)} >
                                    <DeleteIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    );
                })}
                    <Button fullWidth style={{marginTop:20}} variant = "contained" color = "primary" onClick={this.addHobbyHandler}>Tambah Opsi baru</Button>
                </div>
            );



        case 2:
            return (
                <div>
                    {this.state.kepribadianLists.map((list, i) => {

                        return (
                            <Grid container spacing={16} key={i}>
                                <Grid item>
                                    <TextField
                                        id="standard-name"
                                        label="Kepribadian"
                                        fullWidth
                                        margin="normal"
                                        name="kepribadian"
                                        value={list.kepribadian}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-name"
                                        label="Bobot"
                                        fullWidth
                                        margin="normal"
                                        name="bobot"
                                        value={list.bobot}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button component="span" style={{ marginTop: 20 }} onClick={() => this.deleteHandlerKepribadian(i)} >
                                        <DeleteIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addKepribadianHandler}>Tambah Opsi baru</Button>
                </div>
            );
        default:
            return 'Unknown step';
    }
}

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const data = this.state;
        return (
            <div className={classes.root}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Typography variant="h5"> 
                            <BuildIcon style={{marginLeft:10,marginRight:10}}/>
                            Penjurusan
                        </Typography>
                    </Grid>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Grid container>{this.getStepContent(index)}</Grid >
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                      </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
            </Button>
                    </Paper>
                )}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

PenjurusanCreate.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(PenjurusanCreate);