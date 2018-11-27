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
import { getLastCode, loadingPertanyaan, setNewPertanyaan,getPertanyaan} from '../../../actions/pertanyaanActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardActions from '@material-ui/core/CardActions';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
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
    },
    buttonDelete:{
        margin:theme.spacing.unit,
        marginTop:22
    }

    
});

 class CreatePertanyaan extends Component {
     constructor(props){
         super(props);
         this.state={
        
            lastKodeJawaban:'',
            pertanyaan:{
                kodeSoal:'',
                soal:'',
                jawaban:[
                    {jawab:'',kodeJawaban:''}
                ]
            },
            editForm:false
         }
     }

    componentDidMount = () =>{
        this.props.getLastCode();
        this.props.getPertanyaan(this.props.match.params.kodeSoal);
    
    }
     componentWillReceiveProps(nextProps) {
         let LastNumkodeJawaban = 'J1';
         let lastNumKodeSoal = 'P1';
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
             }
         }
         
        //  else{
        //      LastNumkodeJawaban = 'J1';
        //      lastNumKodeSoal = 'P1';
        //  }

         this.setState({ lastKodeJawaban: LastNumkodeJawaban });
         
         if (nextProps.pertanyaan.pertanyaan !== null && this.props.match.params.kodeSoal ) {
             this.setState({ pertanyaan: nextProps.pertanyaan.pertanyaan });
             this.setState({ editForm:true});
             
         }
         if (nextProps.pertanyaan.pertanyaan == null && !this.props.match.params.kodeSoal){
             //  this.setState({ lastKodeSoal: lastNumKodeSoal });
             this.setState(prevState => ({
                 pertanyaan: {
                     ...prevState.pertanyaan,
                     kodeSoal: lastNumKodeSoal
                 }
             }));
          
             
             let kodeJawabanPertama = this.state.pertanyaan.jawaban.map((jwb, i) => {
                 if (i === 0) {
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

     handlerOnChange = (e,index)=>{
    
     }

     onChange = (index) => (e) =>{
        // let pertanyaanVal = this.state.pertanyaan.jawaban.map((jwb,i)=>{
        //     if(i !== index) return jwb;
        //     return {...jwb,
        //         [e.target.name]:e.target.value}
        // });

        // let pertanyaan = {
        //     ...this.state.pertanyaan,jawaban:pertanyaanVal
        // }
        // this.setState({
        //     pertanyaan:pertanyaan
        // });

  
         if (typeof this.state.pertanyaan.jawaban[index] !== 'undefined' &&  this.state.pertanyaan.jawaban[index] !== null){
             var newData = { [e.target.name]: e.target.value }; 
            this.setState(prevState=>({
                 pertanyaan:{
                     ...prevState.pertanyaan,
                     jawaban:[
                         ...this.state.pertanyaan.jawaban.slice(0,index), //memisahkan array dari 0 sampe index
                         Object.assign({},this.state.pertanyaan.jawaban[index],newData), // memasukan data kedalam array berupa object sesuai dengan index
                         ...this.state.pertanyaan.jawaban.slice(index+1) //memasukan index +1  terakhir

                        //  MEMBUAT ARRAY DENGAN MEMISAHKAN TIAP ARRAY DAN DIAMBIL DATANYA 
                        // ARRAY SLICE TERDAPAT 2 PARAMETER BEGIN DAN END JADI UNTUK SLICE(0,INDEX) MENGAMBIL ARRAY DARI INDEX 0 SAMPE INDEX
                        // KEMUDIAN DIBUAT OBJECT BARU DITENGAH-TENGAH RANGE 
                        // slice(index+1) memasukan array baru dari index+1 sampe data terakhir karena hanya 1 parameter
                     ]
                 }
             }))
         }

     

    
     }

     buatLastKode(){
        let lastKodeJawaban ;
        let checkIfEdit = this.state.editForm;
         if (checkIfEdit){
             lastKodeJawaban = this.state.lastKodeJawaban;
             lastKodeJawaban = lastKodeJawaban.match(/([0-9])+/g);
             lastKodeJawaban = parseInt(lastKodeJawaban, 10);
             lastKodeJawaban++;
             lastKodeJawaban = `J${lastKodeJawaban}`;
             this.setState({ lastKodeJawaban: lastKodeJawaban });
         }else{
             lastKodeJawaban = this.state.pertanyaan.jawaban;
             lastKodeJawaban = lastKodeJawaban.slice(-1).pop();
             lastKodeJawaban = lastKodeJawaban.kodeJawaban.match(/([0-9])+/g);
             lastKodeJawaban = parseInt(lastKodeJawaban, 10);
             lastKodeJawaban++;
             lastKodeJawaban = `J${lastKodeJawaban}`;
         }

        // let newOpsiJawaban = this.state.pertanyaan.jawaban.concat({
        //     jawab: '', kodeJawaban: lastKodeJawaban
        // });

        return {
            jawab:'',
            kodeJawaban:lastKodeJawaban
        }
     }

     handlerTambahOpsi = (event) =>{

        //@TANPA MUTASI ARRAY === BAIK <---
        this.setState(prevState=>({
            pertanyaan:{
                ...prevState.pertanyaan,
                jawaban: [...this.state.pertanyaan.jawaban, this.buatLastKode()]
            }
            
        }))

              
        //@ KALO GINI MEMUTASI ARRAY == TIDAK BAIK <-----
        // JANGAN LANGSUNG MERUBAH ARRAY
        // let lastKodeJawaban ;
        // let checkIfEdit = this.state.editForm;
        //  if (checkIfEdit){
        //      lastKodeJawaban = this.state.lastKodeJawaban;
        //      lastKodeJawaban = lastKodeJawaban.match(/([0-9])+/g);
        //      lastKodeJawaban = parseInt(lastKodeJawaban, 10);
        //      lastKodeJawaban++;
        //      lastKodeJawaban = `J${lastKodeJawaban}`;
        //      this.setState({ lastKodeJawaban: lastKodeJawaban });
        //  }else{
        //      lastKodeJawaban = this.state.pertanyaan.jawaban;
        //      lastKodeJawaban = lastKodeJawaban.slice(-1).pop();
        //      lastKodeJawaban = lastKodeJawaban.kodeJawaban.match(/([0-9])+/g);
        //      lastKodeJawaban = parseInt(lastKodeJawaban, 10);
        //      lastKodeJawaban++;
        //      lastKodeJawaban = `J${lastKodeJawaban}`;
        //  }
        
        // let newOpsiJawaban = this.state.pertanyaan.jawaban.concat({
        //     jawab: '', kodeJawaban: lastKodeJawaban
        // });
        //  let pertanyaan = {
        //     ...this.state.pertanyaan,jawaban:newOpsiJawaban
        // }
        //  this.setState({ pertanyaan: pertanyaan});


     }

     handlerDeleteJawaban = (index) =>{
        // let deleteJawaban = this.state.pertanyaan.jawaban;
        // if(deleteJawaban.length > 1){
        //     deleteJawaban.splice(index, 1);
        //     this.setState(prevState => ({
        //         pertanyaan: {
        //             ...prevState.pertanyaan,
        //             jawaban: deleteJawaban
        //         }
        //     }));
        // }
         if (this.state.pertanyaan.jawaban.length > 1){
             this.setState(prevState => ({
                 pertanyaan: {
                     ...prevState.pertanyaan,
                     jawaban: prevState.pertanyaan.jawaban.filter((jwb, i) => i !== index)
                 }
             }))
         }
          
        
        

     }
     handlerKeyPress = (i)=>(event) =>{
         if (event.key === 'Enter'){
            this.handlerTambahOpsi();
            const form =event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            // let data = this.refs[`jawab${index}`];
             if (form.elements[index + 3]){
                form.elements[index + 3].focus();
            }

             event.preventDefault();
            //  
            console.log(form.elements);
            // e.next().focus();
        }
     }

     onSubmit = () =>{
         this.props.setNewPertanyaan(this.state.pertanyaan,this.props.history);
     }



  render() {
      const {classes} = this.props;
      const {pertanyaan} = this.state;
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
                            <form >
                                {pertanyaan.jawaban.map((jwb, index) => {
                                    return (
                                        <Grid container direction="row" key={index}>
                                            <Grid item xs={2}>
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
                                                    ref={`jawab${index}`}
                                                    onChange={this.onChange(index)}
                                                    onKeyPress={this.handlerKeyPress(index)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <Button className={classes.buttonDelete} onClick={() => this.handlerDeleteJawaban(index)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    );
                                })}


                            </form>
                            

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

export default compose(withStyles(styles, { name: 'CreatePertanyaan' }), connect(mapStateToProps, { getLastCode, loadingPertanyaan, setNewPertanyaan, getPertanyaan}))(withRouter(CreatePertanyaan));