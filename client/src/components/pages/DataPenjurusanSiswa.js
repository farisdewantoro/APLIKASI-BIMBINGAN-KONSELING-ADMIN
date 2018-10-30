import React, { Component } from 'react'
import EnhancedTableHead from '../table/TableDataPenjurusanSiswa';
import { NavigationIcon, Button, Grid } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const styles = theme => ({
    NoteIcon: {
        marginRight: theme.spacing.unit
    }
});

class DataPenjurusanSiswa extends Component {
    render() {
        const { classes } = this.props;
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

export default withStyles(styles)(DataPenjurusanSiswa);