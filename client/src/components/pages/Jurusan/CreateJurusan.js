import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { getAllPertanyaan } from '../../../actions/pertanyaanActions';
import { setNewJurusan } from '../../../actions/jurusanActions';
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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


 class CreateJurusan extends Component {
     constructor(props){
         super(props);
         this.state={
             pertanyaan:null,
             namaJurusan:'',
             deskripsi:'',
             soal:null,
             rule:[{kodeSoal:null,kodeJawaban:null}],
         }
     }
     componentDidMount = () => {
         this.props.getAllPertanyaan();


     }
     componentWillReceiveProps = (nextProps)=>{
        this.setState({pertanyaan:nextProps.pertanyaan.pertanyaan});
         let pertanyaan= nextProps.pertanyaan.pertanyaan;
         if(pertanyaan !== null){
             const soal=[]; 
            pertanyaan.filter(tanya=>{
                soal.push({label:tanya.soal,value:tanya.kodeSoal});
             })

             this.setState({soal:soal});
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

     loadJawaban = (i) =>{
        let pertanyaan = this.state.pertanyaan;
        let rule = this.state.rule;
        let listJawaban;
        let kodeSoal;
        let dataOption = [];
          rule.filter((r,index)=>{
            if(i == index){
                return kodeSoal=r.kodeSoal;
            }
            else{
                return r;
            }
        });

        if(kodeSoal !==null){     
            pertanyaan.filter((p, index) => {
                if (p.kodeSoal === kodeSoal) {
                    listJawaban = p.jawaban;
                }
            });

            if (listJawaban !== null && listJawaban !== undefined){
         
                listJawaban.filter(list => {
                    dataOption.push({ label: list.jawab, value: list.kodeJawaban })
                });
            }

           
        }
         return dataOption;           
     }
     onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
     }
     onSubmit = () =>{
        const dataJurusan ={
            kodeSoal:"p2",
            kodeJawaban:"p3",
            kodeSoal:"p4",
            kodeJawaban:"p5"
        }

        console.log(dataJurusan);
        // const dataJurusan = {
        //     rule:this.state.rule,
        //     namaJurusan:this.state.namaJurusan,
        //     deskripsi:this.state.deskripsi
        // };
        //  this.props.setNewJurusan(dataJurusan,this.props.history);
     }
 
        

  render() {
      const { classes } = this.props;
      const {loading} = this.props.pertanyaan;
      const { soal, rule, namaJurusan,deskripsi} = this.state;
      let progressBar;
      let formRule;
      if (!loading && soal !== null ){
          formRule=(
             rule.map((r,i)=>{
                 
                 return(
                     <Grid container direction="row" spacing={16} className={classes.rule} key={i}>
                         <Grid item xs={6}>
                             <Select
                                 options={soal}
                                 placeholder="Pilih Pertanyaan"
                                 name="kodeSoal"
                                 onChange={this.selectOnChange(i,'kodeSoal')}
                             />
                         </Grid>
                         <Grid item xs={6}>
                             <Select
                                 placeholder="Pilih Jawaban"
                                 name="kodeSoal"
                                 options={this.loadJawaban(i)}
                                 onChange={this.selectOnChange(i,'kodeJawaban')}
                             />
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
  
}

const mapStateToProps = (state) => ({
    pertanyaan: state.pertanyaan
});
export default compose(withStyles(styles, { name: 'CreateJurusan' }), connect(mapStateToProps, { getAllPertanyaan, setNewJurusan}))(withRouter(CreateJurusan));
