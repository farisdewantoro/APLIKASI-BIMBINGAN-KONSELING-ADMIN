import React, { Component } from 'react'
import { Grid, Typography, Card, CardContent, TextField, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});
class DataSiswaCreate extends Component {
  render() {
      const { classes } = this.props;
    return (
        <div>
            <Typography variant="h4">
               Tambah Data Siswa
            </Typography>
            <Grid container style={{marginTop:20}}>
                <Card>
                    <CardContent>
                        <TextField id="name"
                            label="Name"
                            margin="normal"
                              className={classes.textField} />
                             <TextField id="No Induk"
                            label="No Induk"
                            margin="normal" 
                            className={classes.textField}/>
                             <TextField id="Angkatan"
                            label="Angkatan"
                            margin="normal"
                            className={classes.textField} />
                        <TextField id="Kelas"
                            label="Kelas"
                            margin="normal"
                              className={classes.textField} />
                    </CardContent>
                </Card>
            </Grid>

        </div>
     
    )
  }
}


export default withStyles(styles)(DataSiswaCreate);