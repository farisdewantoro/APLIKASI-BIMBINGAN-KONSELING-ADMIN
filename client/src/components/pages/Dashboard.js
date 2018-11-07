import React, {Component} from 'react';
import SimpleLineChart from '../chart/SimpleLineChart';
import {connect} from 'react-redux';
 class Dashboard extends Component {
    render() {
        return (
            <div >
             
                <SimpleLineChart/>
            </div>
        )
    }
}

export default connect(null)(Dashboard);
