import React, { Component } from 'react'
import ListPertanyaan from './ListPertanyaan';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/NoteAdd';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { getAllPertanyaan} from '../../../actions/pertanyaanActions';
import {connect} from 'react-redux';
import {compose} from 'redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  addIcon: {
    marginRight: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

 class Pertanyaan extends Component {
  componentDidMount= ()=>{
    this.props.getAllPertanyaan();
  }

  render() {
    const { classes } = this.props;
    const {loading,pertanyaan} = this.props.pertanyaan;
    let progressBar;
    if (!loading && pertanyaan !== null && pertanyaan instanceof Array){
      if(pertanyaan.length > 0){
        progressBar = (


          <ListPertanyaan data={pertanyaan} />
        )
      }else{
        progressBar = (
          
              <Card>
                <CardContent>
                  <Typography variant="h3" style={{textAlign:"center"}}>
                    NO DATA 
                  </Typography>
                </CardContent>
              </Card>
          
        )
      }
  
    }else{
        progressBar=(
          <div>
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
          </div>
        )
    }
    return (
      <div className="Pertanyaan-list">
      <Grid container direction="column" spacing={16}>
      <Grid item>
            <Button variant="contained" component={Link} to="/pertanyaan/create" color="secondary" className={classes.button}>
              <AddIcon className={classes.addIcon} />
              Pertanyaan
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

Pertanyaan.propTypes={
  classes:PropTypes.object.isRequired,
  pertanyaan:PropTypes.object.isRequired,
  getAllPertanyaan:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  pertanyaan:state.pertanyaan
});

export default compose(withStyles(styles,{name:'Pertanyaan'}),connect(mapStateToProps,{getAllPertanyaan}))(Pertanyaan);