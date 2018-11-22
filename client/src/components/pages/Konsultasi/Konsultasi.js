import React, { Component } from 'react'
import {connect} from "react-redux";
import {compose} from 'redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {getAllJurusan} from '../../../actions/jurusanActions';
import {getAllPertanyaan} from '../../../actions/pertanyaanActions';
import { getQuestionKonsultasi} from '../../../actions/konsultasiAction';
import LinearProgress from '@material-ui/core/LinearProgress';


 class Konsultasi extends Component {
     constructor(props){
         super(props);
         this.state={
             nis:'',
             startQuestion:false,
             pertanyaan:null,
             index:0,
             jurusan:null,
             hasilJawaban:[],
             endQuestion:false,
             hasilAkhir:[],
         }
     }

     componentDidMount(){
         this.props.getAllJurusan();
         this.props.getAllPertanyaan();

     }

     componentWillReceiveProps(nextProps){
         if(nextProps.pertanyaan.pertanyaan){
             this.setState({pertanyaan:nextProps.pertanyaan.pertanyaan});
         }
         if (nextProps.jurusan.jurusans) {
             this.setState({ jurusan: nextProps.jurusan.jurusans });
         }
         if(nextProps.konsultasi.pertanyaan.length > 0 ){
             this.setState({pertanyaan:nextProps.konsultasi.pertanyaan});
         }

     }

     handlerNisChange =(e)=>{
         this.setState({nis:e.target.value})
     }

     handlerStartQuestion = () =>{
         this.setState({startQuestion:!this.state.startQuestion});
     }

     submitAnswer = (kodeSoal,kodeJawaban) =>{
         let {hasilJawaban} = this.state;
        
         let newData = hasilJawaban.concat([{
             rule: {
                 $elemMatch: { kodeSoal: kodeSoal, kodeJawaban: kodeJawaban }
             }
         }]);

         this.setState({ hasilJawaban: hasilJawaban.concat([{rule:{
             $elemMatch: { kodeSoal: kodeSoal, kodeJawaban: kodeJawaban }
         }}])});
       
         this.props.getQuestionKonsultasi(newData);
        }

  

 


     

  render() {
      const { nis, startQuestion, pertanyaan, index, endQuestion} = this.state;
      const {konsultasi} = this.props;
      let loadingNextQuestion = this.props.konsultasi.loading;
      let loadingPertanyaan = this.props.pertanyaan.loading;
      let loadingJurusan = this.props.jurusan.loading; 
      let loadingComponent;
      let formContainer; 

    if(loadingJurusan || loadingPertanyaan || loadingNextQuestion){
        loadingComponent=(
            <LinearProgress color="secondary" variant="query" />
        )
    }

        if(nis == '' || startQuestion == false || pertanyaan == null){
            formContainer=(
                <div>
                    <Grid container direction="column" spacing={16}>
                        <Grid item>
                            <TextField fullWidth label="NIS" value={nis} onChange={this.handlerNisChange} InputLabelProps={{
                                shrink: true,
                            }} />
                        </Grid>

                        <Grid item>
                            <Button variant="contained" onClick={this.handlerStartQuestion}>
                                MULAI TEST
                        </Button>
                        </Grid>
                    
                    
                    </Grid>
                  
                </div>
                
            )
        } else if (pertanyaan.length > 0 && endQuestion == false && pertanyaan[index].hasOwnProperty('jawaban') ){
   
            formContainer=(
                <Grid item>
                    <Grid container direction="column" alignContent="center" justify="center" spacing={16}>
                        <Grid item>
                            <Typography>
                                {pertanyaan[index].soal}
                            </Typography>
                        </Grid>
                        {pertanyaan[index].jawaban.map((jawab,i)=>{
                            return(
                                <Grid item key={i}>
                                    <Button variant="contained" fullWidth onClick={() => this.submitAnswer(pertanyaan[index].kodeSoal,jawab.kodeJawaban,i)}>
                                        {jawab.jawab}
                                    </Button>
                                </Grid>
                           
                            )
                        })}
                       
                    </Grid>
                </Grid>
            )
        }else if(pertanyaan.length > 0 && pertanyaan[index].hasOwnProperty('namaJurusan')){
            formContainer = (
                <div>
                    {pertanyaan.map((hasil, i) => {
                      return(
                          <Grid item key={i}>
                            <Grid container>
                                <Grid item>
                                      <Typography>
                                          {hasil.namaJurusan}
                                      </Typography>
                                      <Typography>
                                          {hasil.dataMatched/hasil.maxLength*100}
                                      </Typography>
                                </Grid>

                            </Grid>
                            


                          </Grid>
                      )  
                    })}
                </div>
            
            )
        }else{
            formContainer = (
                <div>
                    <p>Not Fond</p>
                </div>
            )
        }

    return (
      <div className="konsultasi-app">
       
                <Card>
                {loadingComponent}
                    <CardContent>
                    <Grid container>
                        {formContainer}
                    </Grid>
                    </CardContent>
                </Card>
              

           
       
      </div>
    )
  }
}

Konsultasi.propTypes={
    jurusan:PropTypes.object.isRequired,
    pertanyaan:PropTypes.object.isRequired,
    konsultasi:PropTypes.object.isRequired,
    getAllPertanyaan:PropTypes.func.isRequired,
    getAllJurusan:PropTypes.func.isRequired,
    getQuestionKonsultasi:PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    jurusan:state.jurusan,
    pertanyaan:state.pertanyaan,
    konsultasi:state.konsultasi
});


export default connect(mapStateToProps, { getAllPertanyaan, getAllJurusan, getQuestionKonsultasi})(Konsultasi);