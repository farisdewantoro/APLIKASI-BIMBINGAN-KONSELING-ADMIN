import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import EnhancedTableHead from '../../table/TableRapotSiswa';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { getAllMurid} from '../../../actions/muridActions';
import Spinner from '../../common/Spinner';
const styles = theme => ({
    NoteIcon: {
        marginRight: theme.spacing.unit
    }
});

class RapotSiswa extends Component {
 
    componentDidMount(){
        this.props.getAllMurid();
    }


    render() {
        const { classes } = this.props;
        const {murids,loading} = this.props.murids;
        let TableData;
        if(loading || murids === null){
           
            TableData = (
                <Spinner />
            )
        }else{
            TableData = (
                <EnhancedTableHead data={murids} />
            )
        }
        return (
            <div >
                <Grid container>
                    <Grid item>
                        <Button variant="contained" color="secondary" component={Link} to="/datasiswa/create" >
                            <NoteAddIcon className={classes.NoteIcon} />
                            Tambah data Siswa
                    </Button>
                    </Grid>
                    
                 
                    <Grid item>
                        {TableData}
                    </Grid>
                  

                </Grid>
            </div>
        )
    }
}
RapotSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
    murids:PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    murids:state.murids
});

export default compose(withStyles(styles, { name: "RapotSiswa" }), connect(mapStateToProps,{getAllMurid}))(RapotSiswa);