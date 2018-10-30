import React, { Component } from 'react'
import { TextField, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
class SoftSkillList extends Component {
  render() {
    return (

        <Grid container spacing={16} key={this.props.id}>
            <Grid item>
                <TextField
                    id="standard-name"
                    label="Softskill"
                    fullWidth
                    margin="normal"
                    name="softskill"
                    value={this.props.valSoftskill}
                    onChange={this.props.controlValSoftskill}
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
                <Button component="span" style={{ marginTop: 20 }} onClick={this.props.deleteSoftskillList} >
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    );
  }
}

export default SoftSkillList;