import React, { Component } from 'react'
import {  TextField, Grid,Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



 class HobbyList extends Component {
    DeleteHandler = (id) =>{
      return id;
    }
  render() {
    return (
        
            <Grid container spacing={16} key={this.props.id}>
                <Grid item>
                    <TextField
                        id="standard-name"
                        label="Hobby"
                        fullWidth
                        margin="normal"
                        name="hobby"
                        value={this.props.valHobby}
                        onChange={this.props.controlValHobby}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-name"
                        label="Bobot"
                        fullWidth
                        margin="normal"
                        name="bobot"
                        value={this.props.valBobot}
                        onChange={this.props.controlValBobot}
                    />
                </Grid>
                <Grid item>
                    <Button component="span" style={{ marginTop: 20 }} onClick={this.props.deleteHobbylist} >
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
    );
  }
}
export default HobbyList;