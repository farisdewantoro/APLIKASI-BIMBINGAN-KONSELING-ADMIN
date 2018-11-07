import React, { Component } from 'react';
import EnhancedTableHead from '../table/TableDataPenjurusanSiswa';
import {  Grid } from '@material-ui/core';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
const styles = theme => ({
    NoteIcon: {
        marginRight: theme.spacing.unit
    }
});

class DataPenjurusanSiswa extends Component {
    render() {
       
        return (
            <div >
                <Grid container>
              

                    <EnhancedTableHead />

                </Grid>
            </div>
        )
    }
}
DataPenjurusanSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles,{name:"DataPenjurusanSiswa"}),connect(null))(DataPenjurusanSiswa);