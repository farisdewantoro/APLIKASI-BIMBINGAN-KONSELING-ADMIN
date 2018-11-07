import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import EnhancedTableHead from '../table/TableRapotSiswa';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

export default compose(withStyles(styles,{name:"RapotSiswa"}),connect(null))(RapotSiswa);