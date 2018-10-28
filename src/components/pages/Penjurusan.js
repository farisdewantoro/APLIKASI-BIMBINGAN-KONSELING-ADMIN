import React, { Component } from 'react'
import EnhancedTableHead from '../table/TablePenjurusan';
import { NavigationIcon, Button,Grid } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
const styles = theme=> ({
    NoteIcon:{
        marginRight:theme.spacing.unit
    }
});

 class Penjurusan extends Component {
  render() {
      const { classes } = this.props;
    return (
        <div >
        <Grid container>
                <Button variant="contained" color="secondary" component={Link} to="/penjurusan/create" >
                <NoteAddIcon className={classes.NoteIcon} />
                Tambah Jurusan Baru
                </Button>
      
       <EnhancedTableHead/>
 
        </Grid>
        </div>
    )
  }
}
Penjurusan.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Penjurusan);