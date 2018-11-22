import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { getLastCode, loadingPertanyaan, setNewPertanyaan} from '../../../actions/pertanyaanActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardActions from '@material-ui/core/CardActions';
import SaveIcon from '@material-ui/icons/Save';
import { withRouter } from 'react-router-dom';
const styles = theme => ({

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,   
    },
    margin:{
        margin:theme.spacing.unit
    },
    icon:{
        marginRight: theme.spacing.unit
    }

    
});

 class CreatePertanyaan extends Component {
     constructor(props){
         super(props);
         this.state={
            // lastKodeSoal:'',
            lastKodeJawaban:'',
            pertanyaan:{
                kodeSoal:'',
                soal:'',
                jawaban:[
                    {jawab:'',kodeJawaban:''}
                ]
            }
         }
     }

    componentDidMount = () =>{
        this.props.getLastCode();
    }
     componentWillReceiveProps(nextProps) {
         let LastNumkodeJawaban;
         let lastNumKodeSoal;
         if(nextProps.pertanyaan.lastPertanyaan){
             let kodeSoal = nextProps.pertanyaan.lastPertanyaan.kodeSoal;
             lastNumKodeSoal= kodeSoal.match(/([0-9])+/g);
             lastNumKodeSoal = parseInt(lastNumKodeSoal,10);
             lastNumKodeSoal++;
             lastNumKodeSoal = `P${lastNumKodeSoal}`;
             if(nextProps.pertanyaan.lastPertanyaan.jawaban.length !== 0){
                let jawaban = nextProps.pertanyaan.lastPertanyaan.jawaban;
                 jawaban = jawaban.slice(-1).pop();
                 LastNumkodeJawaban = jawaban.kodeJawaban.match(/([0-9])+/g);
                 LastNumkodeJawaban = parseInt(LastNumkodeJawaban,10); 
                 LastNumkodeJawaban++;
                 LastNumkodeJawaban = `J${LastNumkodeJawaban}`;
             }else{
                 LastNumkodeJawaban = 'ERROR PLEASE CONTACT ADMIN';
             }
         }else{
             LastNumkodeJawaban = 'J1';
             lastNumKodeSoal = 'P1';
         }
        
        //  this.setState({ lastKodeSoal: lastNumKodeSoal });
         this.setState(prevState=>({
             pertanyaan:{
                 ...prevState.pertanyaan,
                 kodeSoal:lastNumKodeSoal
             }
         }));
         this.setState({ lastKodeJawaban: LastNumkodeJawaban });

         let kodeJawabanPertama = this.state.pertanyaan.jawaban.map((jwb,i)=>{
             if(i == 0){         
                  jwb.kodeJawaban = LastNumkodeJawaban;
             }
             return jwb;
         });
         this.setState(prevState => ({
             pertanyaan: {
                 ...prevState.pertanyaan,
                 jawaban: kodeJawabanPertama
             }
         }));
         
     }
     handlerOnchangeSoal = (e) =>{
         let val = e.target.value;
        this.setState(prevState =>({
            pertanyaan:{
                ...prevState.pertanyaan,
                soal: val
            }
        }))
     }
     onChange = (index) => (e) =>{
        let pertanyaanVal = this.state.pertanyaan.jawaban.map((jwb,i)=>{
            if(i !== index) return jwb;
            return {...jwb,
                [e.target.name]:e.target.value}
        });

        let pertanyaan = {
            ...this.state.pertanyaan,jawaban:pertanyaanVal
        }

        this.setState({
            pertanyaan:pertanyaan
        });
     }

     handlerTambahOpsi = () =>{
        let lastKodeJawaban = this.state.pertanyaan.jawaban;
         lastKodeJawaban = lastKodeJawaban.slice(-1).pop();
         lastKodeJawaban = lastKodeJawaban.kodeJawaban.match(/([0-9])+/g);
         lastKodeJawaban = parseInt(lastKodeJawaban,10);
         lastKodeJawaban++;
         lastKodeJawaban = `J${lastKodeJawaban}`;
        let newOpsiJawaban = this.state.pertanyaan.jawaban.concat({
            jawab: '', kodeJawaban: lastKodeJawaban
        });
         let pertanyaan = {
            ...this.state.pertanyaan,jawaban:newOpsiJawaban
        }
         this.setState({ pertanyaan: pertanyaan});
        
     }

     onSubmit = () =>{
         this.props.setNewPertanyaan(this.state.pertanyaan,this.props.history);
     }



  render() {
      const {classes} = this.props;
      const {pertanyaan,lastKodeJawaban} = this.state;
      const {loading} = this.props.pertanyaan;
      let progressBar;
      if(loading){
         progressBar = (
             <LinearProgress color="secondary" variant="query" />
         ) 
      }


    return (
    
        <div className="pertanyaan-create" >
    
        <Card>
                {progressBar}
            <CardContent>
                   
                <Grid container direction="column" spacing={24}>

                <Grid item>
                            <TextField label="Kode Soal" margin="normal"
                             disabled className={classes.textField} 
                             value={pertanyaan.kodeSoal}
                             name="kodeSoal"
                             InputLabelProps={{
                                shrink: true,
                            }} />
                            <TextField label="Soal" 
                            margin="normal" fullWidth 
                            name="soal"
                            value={this.state.pertanyaan.soal}
                            onChange={this.handlerOnchangeSoal}
                            className={classes.textField} InputLabelProps={{
                                shrink: true,
                            }} />
                </Grid>
           
                       
                     
                            <Grid item>

                            {pertanyaan.jawaban.map((jwb,index)=>{
                                return(
                                    <Grid container direction="row" key={index}>
                                        <Grid item xs={4}>
                                            <TextField label="Kode Jawaban"
                                                margin="normal"
                                                disabled  
                                                className={classes.textField}
                                                value={jwb.kodeJawaban}
                                                name="kodeJawaban"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField label="Jawaban"
                                                name="jawab" 
                                                margin="normal" 
                                                fullWidth 
                                                className={classes.textField} 
                                                value={jwb.jawab}
                                                onChange={this.onChange(index)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} />
                                        </Grid>
                                    </Grid>
                                );
                            })}
                                


                                <Button 
                                fullWidth color="primary" 
                                style={{marginTop:20}} 
                                variant="contained"
                                onClick={this.handlerTambahOpsi}
                                disabled={loading}
                                >
                                    Tambah Opsi 
                                </Button>
                            </Grid>

                </Grid>
                 

            </CardContent>
            <Divider/>
                <CardActions disableActionSpacing>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.margin} 
                    disabled={loading}
                    onClick={this.onSubmit}>
                        <SaveIcon className={classes.icon}/> Simpan
                        </Button>
                </CardActions>
        </Card>
      </div>
    )
  }
}

CreatePertanyaan.propTypes = {
    classes: PropTypes.object.isRequired,
    pertanyaan:PropTypes.object.isRequired
};

const mapStateToProps = (state)=>({
    pertanyaan:state.pertanyaan
});

export default compose(withStyles(styles, { name: 'CreatePertanyaan' }), connect(mapStateToProps, { getLastCode, loadingPertanyaan, setNewPertanyaan}))(withRouter(CreatePertanyaan));