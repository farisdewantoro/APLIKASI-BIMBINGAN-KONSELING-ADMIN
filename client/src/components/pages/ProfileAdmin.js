import React, { Component } from 'react'

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProfileAdmin extends Component {
  render() {
    const {  admin } = this.props.auth;
    return (
      <div>
        <Typography variant="h4">
          Profile
          </Typography >
        <Grid container style={{marginTop:20}}>


          <Grid item>
            <Card>
              <CardContent>
                <TextField id="name"
                  label="Name"
                  value={admin.name}
                  margin="normal" />

              <Divider/>

                <TextField id="email"
                  label="email"
                  value={admin.email}
                  margin="normal" />

              </CardContent>

              
            </Card>
          </Grid>
        </Grid>
      </div>
  
    )
  }
}

ProfileAdmin.propTypes ={
  auth:PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProfileAdmin);