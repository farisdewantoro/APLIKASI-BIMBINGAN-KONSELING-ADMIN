import React, { Component } from 'react'
import {  TextField, Grid,Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



 class HobbyList extends Component {
    DeleteHandler = (id) =>{
      return id;
    }
  render() {
     
    return (
        <div>
            <Grid container spacing={16}>
                <Grid item>
                    <TextField
                        id="standard-name"
                        label="Hobby"
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-name"
                        label="Bobot"
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item>
                    <Button component="span" style={{ marginTop: 20 }} >
                        <DeleteIcon/>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
  }
}
export default HobbyList;