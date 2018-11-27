import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getAllJurusan} from '../../../actions/jurusanActions';
import { getAllPertanyaan } from '../../../actions/pertanyaanActions';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListJurusan from './ListJurusan';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    addIcon: {
        marginRight: theme.spacing.unit,
    },
});
 class Jurusan extends Component {

    componentDidMount(){
        this.props.getAllJurusan();
        this.props.getAllPertanyaan();
    }

    
  render() {
      const { classes } = this.props;
      const {loading,jurusans} = this.props.jurusan;
      const loadingPertanyaan = this.props.pertanyaan.loading;
      const { pertanyaan } = this.props.pertanyaan;
      let progressBar;
      if ((!loading && jurusans !== null && jurusans.length>0 ) && (!loadingPertanyaan && pertanyaan !== null && pertanyaan instanceof Array ) ){
          progressBar =(
              <ListJurusan jurusan={jurusans} pertanyaan={pertanyaan} />
          )
      }
     else if ((!loading && jurusans.length === 0 ) && (!loadingPertanyaan && pertanyaan !== null && pertanyaan instanceof Array)  ){
        progressBar =(
            <Card>
                <CardContent>
                    <Typography style={{textAlign:"center" }} variant="h4" >
                        NO DATA
            </Typography>
                </CardContent>
            </Card>
        
        )
      }
      else{
          progressBar=(
              <div>
                  <LinearProgress />
                  <br />
                  <LinearProgress color="secondary" />
              </div>
          )
      }
    return (
      <div className="jurusan-list">
        <Grid container direction="column" spacing={16}>
            <Grid item>
                    <Button variant="contained" component={Link} to="/jurusan/create" color="secondary" className={classes.button}>
                        <AddIcon className={classes.addIcon} />
                        Penjurusan
          </Button>
            </Grid>

            <Grid item>
                {progressBar}
            </Grid>
        </Grid>
      
      </div>
    )
  }
}

Jurusan.propTypes = {
    classes: PropTypes.object.isRequired,
    jurusan:PropTypes.object.isRequired,
    pertanyaan:PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    jurusan:state.jurusan,
    pertanyaan:state.pertanyaan
});


export default compose(withStyles(styles, { name: 'Jurusan' }), connect(mapStateToProps, { getAllJurusan, getAllPertanyaan}))(Jurusan);