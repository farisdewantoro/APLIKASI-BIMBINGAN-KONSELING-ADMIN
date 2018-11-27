import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { getAllPertanyaan } from '../../../actions/pertanyaanActions';
import { setNewJurusan, getJurusan } from '../../../actions/jurusanActions';
import CardActions from '@material-ui/core/CardActions';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    addIcon: {
        marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    rule:{
        paddingTop:20
    },
       margin: {
        margin: theme.spacing.unit
    },
    icon: {
        marginRight: theme.spacing.unit
    }
});




 class CreateJurusan extends Component {
     constructor(props){
         super(props);
         this.state={
             pertanyaan:null,
             namaJurusan:'',
             deskripsi:'',
             soal:null,
             jawaban:null,
             rule:[{kodeSoal:null,kodeJawaban:null}],
             
         }
     }
     componentDidMount = () => {
         this.props.getAllPertanyaan();
 
         if (this.props.match.params._id !== undefined){
             this.props.getJurusan(this.props.match.params._id);
         }
       
     }

     componentWillReceiveProps (nextProps){
        this.setState({pertanyaan:nextProps.pertanyaan.pertanyaan});
         let pertanyaan= nextProps.pertanyaan.pertanyaan;
         let jurusan = nextProps.jurusan.jurusans;
         if(pertanyaan !== null){
             const soal=[];
             const jawaban=[]; 
            pertanyaan.forEach(tanya=>{
                soal.push({label:tanya.soal,value:tanya.kodeSoal});
                tanya.jawaban.forEach(jwb=>{
                    jawaban.push({label:jwb.jawab,value:jwb.kodeJawaban});
                })
             })
             this.setState({jawaban:jawaban});
             this.setState({soal:soal});
         }

         if ('namaJurusan' in jurusan && this.props.match.params._id){
             this.setState({ namaJurusan: jurusan.namaJurusan });
             this.setState({deskripsi:jurusan.deskripsi});
             this.setState({rule:jurusan.rule});
         }
 
     }
     toggleClearable = () =>{
         this.setState(state => ({ isClearable: !state.isClearable }));
     }

     selectOnChange = (i,name) => (e) =>{
        let kodeSoalVal = this.state.rule.map((rule,index)=>{
            if (i !== index) return rule;
            return{
                ...rule,
                [name]:e.value
            }
        });
        
        this.setState({
            rule:kodeSoalVal
        });
         
     }
     handlerTambahOpsi = () =>{
         this.setState({rule:this.state.rule.concat([{kodeSoal:null,kodeJawaban:null}])});
     }

     handlerEditSoalValue = (i) =>{
        if(typeof this.state.rule[i] !== 'undefined' 
        && this.state.rule[i] !== null 
        && this.state.soal !== null){
            let rule = this.state.rule;
            let soal = this.state.soal;
            let newData = [];
                rule.forEach((r,index)=>{
                soal.forEach((soal)=>{
                    if(soal.value === r.kodeSoal){
                        newData.push({label:soal.label,value:soal.value});
                    }
                })
            });

            let defaultValue= newData.filter((data,index)=>{
                return index === i;
            })
            return defaultValue;
           

        }
     }

     handlerEditJawabanValue = (i)=>{
         if (typeof this.state.rule[i] !== 'undefined' 
         && this.state.rule[i] !== null 
         && this.state.jawaban !== null) {
             let rule = this.state.rule;
             let jawaban = this.state.jawaban;
             let newData = [];
             rule.forEach((r, index) => {
                 jawaban.forEach((jawaban) => {
                     if (jawaban.value === r.kodeJawaban) {
                         newData.push({ label: jawaban.label, value: jawaban.value });
                     }
                 })
             });

             let defaultValue = newData.filter((data, index) => {
                 return index === i;
             })
             return defaultValue;


         }
     }


     loadJawaban = (i) =>{
        let pertanyaan = this.state.pertanyaan;
        let rule = this.state.rule;
        let listJawaban;
        let kodeSoal;
        let dataOption = [];
          rule.filter((r,index)=>{
            if(i === index){
                return kodeSoal=r.kodeSoal;
            }
            else{
                return r;
            }
        });

        if(kodeSoal !==null){     
            pertanyaan.forEach((p, index) => {
                if (p.kodeSoal === kodeSoal) {
                    listJawaban = p.jawaban;
                }
            });

            if (listJawaban !== null && listJawaban !== undefined){
         
                listJawaban.forEach(list => {
                    dataOption.push({ label: list.jawab, value: list.kodeJawaban })
                });
            }

           
        }
         return dataOption;           
     }
     onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
     }
     handlerDelete = (i)  =>{
         this.setState(prevState=>({
            rule:prevState.rule.filter((rule,index)=> index !== i)
         }));
     }
     onSubmit = () =>{
         const dataJurusan = {
             rule: this.state.rule,
             namaJurusan: this.state.namaJurusan,
             deskripsi: this.state.deskripsi
         };
         if(this.props.match.params._id !== undefined ){
            dataJurusan["_id"]=this.props.match.params._id;
         }
       
         this.props.setNewJurusan(dataJurusan,this.props.history);
     }
 
        

  render() {
      const { classes } = this.props;
      const {loading} = this.props.pertanyaan;
      const { soal, rule, namaJurusan,deskripsi,pertanyaan} = this.state;
      let progressBar;
      let formRule;
      
      if (!loading && soal !== null && pertanyaan !== null){
          formRule=(
             rule.map((r,i)=>{
                 
                 return(
                     <Grid container direction="row" spacing={16} className={classes.rule} key={i}>
                         <Grid item xs={5}>
                             <Select
                                 options={soal}
                                 value={this.handlerEditSoalValue(i)}
                                 placeholder="Pilih Pertanyaan"
                                 name="kodeSoal"
                                 onChange={this.selectOnChange(i,'kodeSoal')}
                             />
                         </Grid>
                         <Grid item xs={5}>
                             <Select
                                 placeholder="Pilih Jawaban"
                                 name="kodeJawaban"
                                 value={this.handlerEditJawabanValue(i)}
                                 options={this.loadJawaban(i)}
                                 onChange={this.selectOnChange(i,'kodeJawaban')}
                             />
                         </Grid>
                         <Grid item xs={2}>
                            <Button onClick={()=>this.handlerDelete(i)}>
                                <DeleteIcon/>
                            </Button>
                         </Grid>
                     </Grid> 
                  
                 )
             }) 
             
          );
      }else{
              progressBar = (
                  <LinearProgress color="secondary" variant="query" />
              )
      }
    return (
      <div className="create-jurusan">
        <Card style={{overflow:"visible"}}>
            {progressBar}
            <CardContent>
                <Grid container direction="column" spacing={16}>
                <Grid item>
                            <TextField label="Nama Jurusan" margin="normal"
                                 className={classes.textField}
                                name="namaJurusan"
                                value={namaJurusan}
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                </Grid>
                        <Grid item>
                            <TextField
                                id="filled-full-width"
                                label="Deskripsi"
                                name="deskripsi"
                                value={deskripsi}
                                multiline
                                rows="4"
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                onChange={this.onChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    <Divider/>
                    <Grid item>
                            <Typography variant="h6">
                                Rule
                            </Typography>
                                {formRule}
                            <Grid container direction="column" style={{paddingTop:40}}>
                                <Grid item>
                                    <Button fullWidth variant="contained" disabled={loading} color="primary" onClick={this.handlerTambahOpsi}>
                                        Tambah Opsi
                                    </Button>
                                </Grid>
                            </Grid>
                    </Grid>
                       
                </Grid>
            </CardContent>
                <Divider />
                <CardActions disableActionSpacing>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.margin}
                        onClick={this.onSubmit}
                        disabled={loading}>
                        <SaveIcon className={classes.icon} /> Simpan
                        </Button>
                </CardActions>
        </Card>
      </div>
    )
  }
}
CreateJurusan.propTypes = {
    classes: PropTypes.object.isRequired,
    getAllPertanyaan: PropTypes.func.isRequired,
    setNewJurusan:PropTypes.func.isRequired,
    getJurusan:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    pertanyaan: state.pertanyaan,
    jurusan:state.jurusan
});
export default compose(withStyles(styles, { name: 'CreateJurusan' }), connect(mapStateToProps, { getAllPertanyaan, setNewJurusan, getJurusan}))(withRouter(CreateJurusan));
