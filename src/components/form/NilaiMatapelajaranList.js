import React, { Component } from 'react'
import { TextField, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class NilaiMatapelajaranList extends Component {
  render() {
    return (
        <Grid container spacing={16} key={this.props.id}>
            <Grid item>
                <TextField
                    id="standard-name"
                    label="Matapelajaran"
                    fullWidth
                    margin="normal"
                    name="matapelajaran"
                    value={this.props.valMatapelajaran}
                    onChange={this.props.controlValMatapelajaran}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="standard-name"
                    label="Nilai"
                    fullWidth
                    margin="normal"
                    name="nilai"
                    value={this.props.valNilai}
                    onChange={this.props.controlValNilai}
                />
            </Grid>
            <Grid item>
                <Button component="span" style={{ marginTop: 20 }} onClick={this.props.deleteNilaiMatapelajaranList} >
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    );
  }
}

export default NilaiMatapelajaranList;