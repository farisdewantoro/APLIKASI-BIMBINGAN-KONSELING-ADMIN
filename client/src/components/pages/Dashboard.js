import React, {Component} from 'react';
import DashboardChart from 
'../chart/DashboardChart';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getAllJawaban } from '../../actions/jawabanActions';
 class Dashboard extends Component {
     componentDidMount() {
         this.props.getAllJawaban();
     }
    render() {
        let { jawaban, loading } = this.props.jawaban;

        return (
            <div >
             
                <DashboardChart jawaban={jawaban}/>
            </div>
        )
    }
}
Dashboard.propTypes = {
    getAllJawaban: PropTypes.func.isRequired,
    jawaban: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    jawaban: state.jawaban
})
export default connect(mapStateToProps, { getAllJawaban})(Dashboard);
