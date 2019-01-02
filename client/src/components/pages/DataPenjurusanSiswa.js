import React, { Component } from 'react';
import EnhancedTableHead from '../table/TableDataPenjurusanSiswa';
import {  Grid } from '@material-ui/core';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { getAllJawaban} from '../../actions/jawabanActions';

const styles = theme => ({ 
    NoteIcon: {
        marginRight: theme.spacing.unit
    }
});

class DataPenjurusanSiswa extends Component {
    componentDidMount(){
        this.props.getAllJawaban();
    }
    render() {
        let {jawaban,loading} = this.props.jawaban;
        if(jawaban !== null){
            return (
                <div >
                    <Grid container>


                        <EnhancedTableHead jawaban={jawaban} loading={loading} />

                    </Grid>
                </div>
            ) 
        }else{
            <div>
                <p>
                    NO DATA
                </p>
            </div>
        }
    
    }
}
DataPenjurusanSiswa.propTypes = {
    classes: PropTypes.object.isRequired,
    getAllJawaban:PropTypes.func.isRequired,
    jawaban:PropTypes.object.isRequired
};

const mapStateToProps=(state)=>({
    jawaban:state.jawaban
})

export default compose(withStyles(styles, { name: "DataPenjurusanSiswa" }), connect(mapStateToProps, { getAllJawaban}))(DataPenjurusanSiswa);