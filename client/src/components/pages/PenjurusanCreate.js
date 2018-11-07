import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import BuildIcon from '@material-ui/icons/Build';
import HobbyList from '../form/HobbyList';
import KepribadianList from '../form/KepribadianList';
import CaraBelajarList from '../form/CaraBelajarList';
import SoftSkillList from '../form/SoftSkillList';
import NilaiMatapelajaranList from '../form/NilaiMatapelajaranList';

import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
    return [' Masukan Nama Jurusan', 'Masukan Hobby&Bobot ', 'Masukan Kepribadian&Bobot','Masukan Cara Belajar&Bobot','Masukan Softskill&Bobot','Masukan Matapelajaran&Nilai'];
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
            ],
            nilaiMatapelajaranLists:[
                {matapelajaran:'',nilai:''}
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

    handleKepribadianValueChange = (i) => (value) =>{
        const newKepribadian = this.state.kepribadianLists.map((kepribadianList,index)=>{
            if (i !== index) return kepribadianList;
            return {...kepribadianList,[value.target.name]:value.target.value};
        });
        this.setState({ kepribadianLists: newKepribadian });
    }
    handleCarabelajarValueChange = (i) => (value) =>{
        const newCarabelajar = this.state.caraBelajarLists.map((carabelajarList,index)=>{
            if (i !== index) return carabelajarList;
            return { ...carabelajarList,[value.target.name]:value.target.value};
        });
        this.setState({ caraBelajarLists: newCarabelajar });
    }
    handleSoftskillValueChange = (i) => (value) => {
        const newSoftskill = this.state.softSkillLists.map((softSkillList, index) => {
            if (i !== index) return softSkillList;
            return { ...softSkillList, [value.target.name]: value.target.value };
        });
        this.setState({ softSkillLists: newSoftskill });
    }

    handleNilaiMatapelajaranValueChange = (i) => (value) => {
        const newNilaiMatapelajaran = this.state.nilaiMatapelajaranLists.map((nilaiMatapelajaranList, index) => {
            if (i !== index) return nilaiMatapelajaranList;
            return { ...nilaiMatapelajaranList, [value.target.name]: value.target.value };
        });
        this.setState({ nilaiMatapelajaranLists: newNilaiMatapelajaran });
    }


  
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

    deleteHandlerCarabelajar = (i) => {
        this.setState({ caraBelajarLists: this.state.caraBelajarLists.filter((carabelajarList, index) => i !== index) });
    }
    addCarabelajarHandler = () => {
        this.setState({ caraBelajarLists: this.state.caraBelajarLists.concat([{ carabelajar: '', bobot: '' }]) });
    }

    deleteHandlerSoftskill = (i) => {
        this.setState({ softSkillLists: this.state.softSkillLists.filter((SoftskillList, index) => i !== index) });
    }
    addSoftskillHandler = () => {
        this.setState({ softSkillLists: this.state.softSkillLists.concat([{ softskill: '', bobot: '' }]) });
    }

    deleteHandlerNilaiMatapelajaran = (i) => {
        this.setState({ nilaiMatapelajaranLists: this.state.nilaiMatapelajaranLists.filter((nilaiMatapelajaranList, index) => i !== index) });
    }
    addNilaiMatapelajaranHandler = () => {
        this.setState({ nilaiMatapelajaranLists: this.state.nilaiMatapelajaranLists.concat([{ matapelajaran: '', nilai: '' }]) });
    }


    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };
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
                        <HobbyList 
                        key={i}
                        id={i} 
                        valHobby={list.hobby} 
                        controlValHobby={this.handleHobbyValueChange(i) }
                        valBobot={list.bobot}
                        controlValBobot={this.handleHobbyValueChange(i)}
                        deleteHobbylist={() =>this.deleteHandlerHobby(i)} 
                        />
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addHobbyHandler}>Tambah Opsi baru</Button>
                </div>
            );


        case 2:
            return (
                <div>
                    {this.state.kepribadianLists.map((list, i) => {

                        return (
                            <KepribadianList 
                            key={i}
                            id={i}
                            valKepribadian={list.kepribadian}
                            controlValKepribadian={this.handleKepribadianValueChange(i)}
                            valBobot={list.bobot}
                            controlValBobot={this.handleKepribadianValueChange(i)}
                            deleteKepribadianList={()=>this.deleteHandlerKepribadian(i)}
                            />
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addKepribadianHandler}>Tambah Opsi baru</Button>
                </div>
            );
        case 3:
            return (
                <div>
                    {this.state.caraBelajarLists.map((list, i) => {
                        
                        return (
                            <CaraBelajarList
                                key={i}
                                id={i}
                                valCarabelajar={list.carabelajar}
                                controlValCarabelajar={this.handleCarabelajarValueChange(i)}
                                valBobot={list.bobot}
                                controlValBobot={this.handleCarabelajarValueChange(i)}
                                deleteCarabelajarList={() => this.deleteHandlerCarabelajar(i)}
                            />
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addCarabelajarHandler}>Tambah Opsi baru</Button>
                </div>
            );
        case 4:
            return (
                <div>
                    {this.state.softSkillLists.map((list, i) => {

                        return (
                            <SoftSkillList
                                key={i}
                                id={i}
                                valSoftskill={list.softskill}
                                controlValSoftskill={this.handleSoftskillValueChange(i)}
                                valBobot={list.bobot}
                                controlValBobot={this.handleSoftskillValueChange(i)}
                                deleteSoftskillList={() => this.deleteHandlerSoftskill(i)}
                            />
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addSoftskillHandler}>Tambah Opsi baru</Button>
                </div>
        );
        case 5:
            return (
                <div>
                    {this.state.nilaiMatapelajaranLists.map((list, i) => {
                        return (
                            <NilaiMatapelajaranList
                                key={i}
                                id={i}
                                valMatapelajaran={list.matapelajaran}
                                controlValMatapelajaran={this.handleNilaiMatapelajaranValueChange(i)}
                                valNilai={list.nilai}
                                controlValNilai={this.handleNilaiMatapelajaranValueChange(i)}
                                deleteNilaiMatapelajaranList={() => this.deleteHandlerNilaiMatapelajaran(i)}
                            />
                        );
                    })}
                    <Button fullWidth style={{ marginTop: 20 }} variant="contained" color="primary" onClick={this.addNilaiMatapelajaranHandler}>Tambah Opsi baru</Button>
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

export default compose(withStyles(styles,{name:"PenjurusanCreate"}),connect(null))(PenjurusanCreate);