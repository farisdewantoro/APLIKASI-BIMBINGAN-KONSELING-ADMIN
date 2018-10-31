import React, { Component } from 'react'
import EnhancedTableHead from '../table/TableRapotSiswa';
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

class RapotSiswa extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div >
                <Grid container>
                    <Button variant="contained" color="secondary" component={Link} to="/datasiswa/create" >
                        <NoteAddIcon className={classes.NoteIcon} />
                        Tambah data Siswa
                    </Button>

                    <EnhancedTableHead />

                </Grid>
            </div>
        )
    }
}
RapotSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RapotSiswa);