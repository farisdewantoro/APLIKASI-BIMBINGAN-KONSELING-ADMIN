import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {getAllJurusan} from '../../../actions/jurusanActions';
import {getAllPertanyaan} from '../../../actions/pertanyaanActions';
import { getQuestionKonsultasi, saveHasilKonsultasi} from '../../../actions/konsultasiAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';
import Divider from '@material-ui/core/Divider';
import HasilKonsultasi from '../../chart/HasilKonsultasi';
import ResetIcon from '@material-ui/icons/Cached';
const styles = (theme) =>({
    headingSoal:{
        fontWeight:600,
    },
    jawaban:{
        padding:20,
        fontSize:16
    },
    hasilJurusanHeading:{
        borderRadius:'15px',
        backgroundColor:"#3f51b5",
    },
    hasilTextJurusanHeading:{
        color:"#fff",
        padding:"10px 50px 10px 50px",
    },
    petKeterampilan:{
        color:"#545251aa",
        fontWeight:"bold",

    },
    formJudulMulai: {
        backgroundColor: "#3f51b5",
        borderRadius: "5px",
        padding: 20
    },
    formJudulMulaiText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    },
    subTitle: {
        textAlign: "center",
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonStart: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        fontSize: "20px"
    },
    icon: {
        marginRight: theme.spacing.unit
    }
});

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
             randomNamaJurusan:'',
             listNamaJurusan:[],
             waktuAwal:null,
             indexJurusan:0,
             originalJawaban:[]
         }
     }

     componentDidMount(){
         this.props.getAllJurusan();
         this.props.getAllPertanyaan();
      
        this.interval = setInterval(this.generateJurusan,85);
    
     }
     generateJurusan=()=>{
         let pertanyaan = this.state.pertanyaan;
         if (this.state.jurusan !== null && this.state.listNamaJurusan.length > 0 && pertanyaan !== null) {
             if (pertanyaan[this.state.index].hasOwnProperty('namaJurusan')) { 
            this.setState({ indexJurusan: this.state.indexJurusan++ });
             let listNamaJurusan = this.state.listNamaJurusan;
             if (this.state.indexJurusan === listNamaJurusan.length) this.setState({ indexJurusan: 0 });
             this.setState({ randomNamaJurusan: listNamaJurusan[this.state.indexJurusan++] });
             if(new Date().getTime() - this.state.waktuAwal > 1000 ){
                 clearInterval(this.interval);
                 let dataJurusanMatched = [];
                 let findValueData = [];
                 pertanyaan.forEach((p) => {
                     dataJurusanMatched.push({ value: p.dataMatched / p.maxLength * 100, nama: p.namaJurusan });
                     findValueData.push(p.dataMatched / p.maxLength * 100);
                 })
                 let cariValue = Math.max(...findValueData);

                 let hasilJurusan = dataJurusanMatched.filter((dJur) => {
                     return dJur.value == cariValue;
                 });
                 let hasilNamaJurusan = hasilJurusan.map(hJur => {
                     return hJur.nama;
                 })
                 this.setState({ randomNamaJurusan: hasilNamaJurusan.toString()})

             }
             }
        }

     }

     componentWillUnmount() {
         clearInterval(this.interval);
     }
    
  

     componentWillReceiveProps(nextProps){
         let pertanyaan = nextProps.pertanyaan.pertanyaan;
         let jurusan = nextProps.jurusan.jurusans;
         if(pertanyaan){
             this.setState({pertanyaan:pertanyaan});
         }
         if (jurusan) {
             this.setState({ jurusan: jurusan });
             let namaJurusan = jurusan.map(jur => {
                 return jur.namaJurusan;
             })
             this.setState({ listNamaJurusan: namaJurusan});
         }
         if(nextProps.konsultasi.pertanyaan.length > 0 ){
             this.setState({pertanyaan:nextProps.konsultasi.pertanyaan});
         }

         if (nextProps.konsultasi.pertanyaan.length > 0 && nextProps.konsultasi.pertanyaan[0].hasOwnProperty('namaJurusan')){
            this.setState({waktuAwal:new Date().getTime()});
         }
     }

     handlerNisChange =(e)=>{
         this.setState({nis:e.target.value})
     }

     handlerStartQuestion = () =>{
         this.setState({startQuestion:!this.state.startQuestion});
     }
     handlerReset = () => {
         window.location.href = "/konsultasi";
     }

     handlerSaveHasil = () =>{
         let hasilJawaban = this.state.originalJawaban;
         let jurusan = this.state.pertanyaan;
         let murid = "5be6eba79ad77a32c40eee64";

         let hasilAkhir={
             hasilJawaban: hasilJawaban,
             jurusan:jurusan,
             murid:murid
         }
         
         this.props.saveHasilKonsultasi(hasilAkhir);
        
     }

     submitAnswer = (kodeSoal,kodeJawaban) =>{
         let {hasilJawaban} = this.state;
        
         let newData = hasilJawaban.concat([{
             rule: {
                 $elemMatch: { kodeSoal: kodeSoal, kodeJawaban: kodeJawaban }
             }
         }]);
         
         this.setState({ originalJawaban:this.state.originalJawaban.concat([{
             kodeSoal:kodeSoal,kodeJawaban:kodeJawaban
         }])});

         this.setState({ hasilJawaban: hasilJawaban.concat([{rule:{
             $elemMatch: { kodeSoal: kodeSoal, kodeJawaban: kodeJawaban }
         }}])});
       
         this.props.getQuestionKonsultasi(newData);
        }

        
 
        


     

  render() {
      const { nis, startQuestion, pertanyaan, index, endQuestion, randomNamaJurusan} = this.state;
      const { classes } = this.props;
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

        if(startQuestion === false || pertanyaan === null){
            formContainer=(
                <div>
                    <Grid container direction="column" spacing={16}>

                        <div className={classes.formJudulMulai}>
                            <Typography variant="h4" className={classes.formJudulMulaiText}>
                                Jurusan mana yang seharusnya Saya ambil?
                            </Typography>
                        </div>

                        <div>
                            <Typography className={classes.subTitle} variant="h6">
                                a.k.a Jurusan mana yang seharusnya Saya pilih?
                        </Typography>

                            <Typography variant="subtitle1" style={{ margin: "0px 50px 0px 50px" }}>
                                Pilih jawaban untuk setiap pertanyaan. Ada kemungkinan bahwa lebih dari satu jawaban yang cocok untuk Anda, tapi pilihlah yang lebih Anda sukai.
                        </Typography>

                            <Typography variant="subtitle1" style={{ margin: "20px 50px 20px 50px" }}>
                                Tes ini akan menilai jurusan mana yang terbaik dan tercocok untuk Anda dan menawarkan dan menyarankan beberapa universitas buat Anda tentang jurusan itu.
                        </Typography>
                        </div>

                        <div>
                            <Button color="secondary" className={classes.buttonStart} variant="contained" disabled={loadingJurusan || loadingPertanyaan} onClick={this.handlerStartQuestion}>
                                MULAI TEST
                        </Button>
                        </div>

        


                    </Grid>

                </div>
                
            )
        }
         else if (pertanyaan.length > 0 && endQuestion === false && pertanyaan[index].hasOwnProperty('jawaban') ){
         
            formContainer=(
                <Grid item xs={12}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} className={classes.headingSoal}>
                            <Typography variant="h3">
                                {pertanyaan[index].soal}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                       

                        <Grid item xs={12}>
                            <Grid container direction="row" alignContent="center" justify="center" spacing={24}>
                                {pertanyaan[index].jawaban.map((jawab, i) => {
                                    return (
                                        <Grid item xs={6} key={i}>
                                            <Button disabled={loadingNextQuestion} variant="contained" color="primary" className={classes.jawaban} fullWidth onClick={() => this.submitAnswer(pertanyaan[index].kodeSoal, jawab.kodeJawaban, i)}>
                                                {jawab.jawab}
                                            </Button>
                                        </Grid>

                                    )
                                })}
                            </Grid>
                        </Grid>
                   
                       
                    </Grid>
                </Grid>
            )
        }else if(pertanyaan.length > 0 && pertanyaan[index].hasOwnProperty('namaJurusan')){
          

            formContainer = (
                <div>
                   
                        <Grid item xs={12}>
                            <Grid>
                                <Grid container direction="column" alignItems="center" justify="center" spacing={8}>
                                    <Grid item >
                                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                            Anda mungkin harus memilih
                                 </Typography>
                                    </Grid>

                                    <Grid item className={classes.hasilJurusanHeading}>
                                        <Typography variant="h4" className={classes.hasilTextJurusanHeading}>
                                        {randomNamaJurusan}
                                 </Typography>
                                    </Grid>
                                </Grid>


                                <Grid container direction="column" alignItems="center" justify="center" style={{ paddingTop: 20, paddingBottom: 20 }}>
                                    <Grid item >
                                        <Typography variant="subtitle1" className={classes.petKeterampilan}>
                                            Peta Keterampilan
                                 </Typography>
                                    </Grid>

                                    <Grid item>
                                        <HasilKonsultasi dataHasil={pertanyaan} />
                                    </Grid>

                                </Grid>
                            <Grid container >
                          
                                <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={this.handlerReset}>
                                    <ResetIcon className={classes.icon} />  Reset
                                </Button>

                                {/* <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={this.handlerSaveHasil}>
                                   Save
                                </Button> */}


                            </Grid>

                            </Grid>
                        </Grid>
          
            
           
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
                    <Grid >
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
    getQuestionKonsultasi:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>({
    jurusan:state.jurusan,
    pertanyaan:state.pertanyaan,
    konsultasi:state.konsultasi
});


export default compose(withStyles(styles, { name: "Konsultasi" }), connect(mapStateToProps, { getAllPertanyaan, getAllJurusan, getQuestionKonsultasi, saveHasilKonsultasi}))(Konsultasi);