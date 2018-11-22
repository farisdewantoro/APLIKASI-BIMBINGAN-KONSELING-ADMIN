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
             endQuestion:false
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
     }

     handlerNisChange =(e)=>{
         this.setState({nis:e.target.value})
     }

     handlerStartQuestion = () =>{
         this.setState({startQuestion:!this.state.startQuestion});
     }

     submitAnswer = (kodeSoal,kodeJawaban) =>{
         let {hasilJawaban} = this.state;
         this.setState({ hasilJawaban: hasilJawaban.concat([{ kodeSoal: kodeSoal, kodeJawaban: kodeJawaban }])});
     }

     

     componentDidUpdate(prevProps, prevState, snapshot){
         const { jurusan, hasilJawaban, pertanyaan } = this.state;
         if (hasilJawaban !== prevState.hasilJawaban || pertanyaan !== prevState.pertanyaan){
             const hasilAkhir = [];
             let notFind;
             let soalPalingBanyak = {};
             let hasilAkhirMaxSoal;

             if (hasilJawaban.length > 0) {
                 hasilJawaban.forEach((hasil) => {
                     jurusan.forEach((item) => {                                        //get items from data B
                         item.rule.forEach((innerItem) => {                            //get rules from data B
                             if (innerItem.kodeJawaban == hasil.kodeJawaban && innerItem.kodeSoal == hasil.kodeSoal) {    //compare kodeJawaban for each
                                hasilAkhir.push(item);                                //add to hasil if they match
                            }
                         })
                     })
                 })
                 
             }

            
             if (hasilAkhir.length > 0 && notFind == false) {
                 hasilJawaban.forEach(itemHjawaban => {
                     hasilAkhir.forEach((itemHasilAkhir) => {
                         itemHasilAkhir.rule.forEach((innerItem, i) => {
                             if (itemHjawaban.kodeSoal === innerItem.kodeSoal) {
                                 itemHasilAkhir.rule.splice(i, 1);
                             }
                         })
                     })
                 })

                 
               
                     hasilAkhir.forEach(itemSoalPalingBanyak => {
                         itemSoalPalingBanyak.rule.forEach(x => {
                             soalPalingBanyak[x.kodeSoal] = (soalPalingBanyak[x.kodeSoal] || 0) + 1;
                         })
                     });
                 
             

                 let cariValue = Object.values(soalPalingBanyak);
                 hasilAkhirMaxSoal = Math.max(...cariValue);
                 let keysSoalPalingBanyak = Object.keys(soalPalingBanyak);
                 keysSoalPalingBanyak.forEach(keys => {

                     if (soalPalingBanyak[keys] !== hasilAkhirMaxSoal) {
                         delete soalPalingBanyak[keys];
                     }
                 })

                 let newPertanyaan = pertanyaan.filter((p, i) => {
                     return p.kodeSoal === Object.keys(soalPalingBanyak).toString();
                 })
                 
                 this.setState({ pertanyaan: newPertanyaan });
                
             }

             if(notFind){

             }

         }
      
       
     }

  render() {
      const { nis, startQuestion, pertanyaan, index, endQuestion} = this.state;
      let formContainer;  
   
      
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
        } else if (pertanyaan.length > 0 ){
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
        }else{
            formContainer = (
                <p>SUCCESS</p>
            )
        }

    return (
      <div className="konsultasi-app">
       
                <Card>
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
    getAllPertanyaan:PropTypes.func.isRequired,
    getAllJurusan:PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    jurusan:state.jurusan,
    pertanyaan:state.pertanyaan
});


export default connect(mapStateToProps, { getAllPertanyaan,getAllJurusan})(Konsultasi);