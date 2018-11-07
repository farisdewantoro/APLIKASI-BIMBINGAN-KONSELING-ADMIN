import React, {Component} from 'react'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    TextField,
    Divider,
    InputBase,
    InputLabel,
    FormControl
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    margin:{
        margin:theme.spacing.unit,
    },
    dense: {
        marginTop: 19
    },
    menu: {
        width: 200
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
});
class DataSiswaCreate extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography variant="h4">
                    Tambah Data Siswa
                </Typography>
                <Grid container style={{
                    marginTop: 20
                }}>
                    <Card>
                        <CardContent>
                            <Grid item xs={6}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    variant="outlined"
                                    className={classes.textField}/>
                                <TextField
                                    id="No Induk"
                                    label="No Induk"
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    variant="outlined"
                                    className={classes.textField}/>
                                <TextField
                                    id="Angkatan"
                                    label="Angkatan"
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    variant="outlined"
                                    className={classes.textField}/>
                                <TextField
                                    id="Kelas"
                                    label="Kelas"
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    variant="outlined"
                                    className={classes.textField}/>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl className={classes.margin}>
                                <InputLabel
                                    shrink
                                    htmlFor="bootstrap-input"
                                    className={classes.bootstrapFormLabel}
                                    >
                                    Bootstrap
                                </InputLabel>
                                <InputBase
                                    id="bootstrap-input"
                                    defaultValue="react-bootstrap"
                                    classes={{
                                    root: classes.bootstrapRoot,
                                    input: classes.bootstrapInput
                                }}/>
                                </FormControl>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>

            </div>

        )
    }
}

export default withStyles(styles)(DataSiswaCreate);