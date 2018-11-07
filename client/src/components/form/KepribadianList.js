import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
class KepribadianList extends Component {
  render() {
    return (
        <Grid container spacing={16} key={this.props.id}>
            <Grid item>
                <TextField
                    id="standard-name"
                    label="Kepribadian"
                    fullWidth
                    margin="normal"
                    name="kepribadian"
                    value={this.props.valKepribadian}
                    onChange={this.props.controlValKepribadian}
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
                <Button component="span" style={{ marginTop: 20 }} onClick={this.props.deleteKepribadianList} >
                    <DeleteIcon />
                </Button>
            </Grid>
        </Grid>
    );
  }
}

export default KepribadianList;