import React, { Component } from 'react'


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


import DeleteIcon from '@material-ui/icons/Delete';

class CaraBelajarList extends Component {
  render() {
    return (
        <Grid container spacing={16} key={this.props.id}>
            <Grid item>
                <TextField
                    id="standard-name"
                    label="Cara Belajar"
                    fullWidth
                    margin="normal"
                    name="carabelajar"
                    value={this.props.valCarabelajar}
                    onChange={this.props.controlValCarabelajar}
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
                <Button component="span" style={{ marginTop: 20 }} onClick={this.props.deleteCarabelajarList} >
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    )
  }
}

export default CaraBelajarList;
