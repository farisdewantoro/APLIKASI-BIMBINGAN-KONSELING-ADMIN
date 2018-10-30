import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography, Button, TextField, FormControlLabel,Checkbox } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {AccountCircle, Lock} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link} from 'react-router-dom';


const styles = theme => ({

    container: {
        [
            theme
                .breakpoints
                .up("md")
        ]: {
            width: 1100
        }
    },
    title1: {
        color: "white",
        marginBottom:10,
    },
    title2: {
        color: "white"
    },
    gridMargin:{
        marginTop:20
    },
    cardHeader:{
        textAlign:'center',
        background:'#191919',
        color:"white"
    },
    formloginTitle:{
        padding:10,
        textAlign:'center',
        borderBottom:1,
    }
});

class Login extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center" className="login-background">
                <Grid
                    container
                    className={classes.container}
                    alignItems="center"
                    justify="center">
                    <Grid item xs={7}>
                        <Typography variant="h2" className={classes.title1}>
                            Bimbingan Konseling 
                       
                        </Typography>
                        <Typography variant="h4" className={classes.title2}>
                            SMA PASUNDAN 2
                            </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Card >
                           
                                <Typography variant="h5" className={classes.formloginTitle}>
                                    Admin Login
                                </Typography>
                            
                            <CardContent>
                                <TextField
                                    id="input-with-icon-textfield"
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    style={{ marginBottom: 20 }}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    )
                                }}/>
                                <br/>
                                <TextField
                                    id="input-with-icon-textfield"
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    style={{marginBottom:20}}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock/>
                                        </InputAdornment>
                                    )
                                }}/>
                                
                                <FormControlLabel
                                    control={
                                        <Checkbox value="checkedB"
                                            color="primary" />
                                    }
                                    label="Remember me"
                                />
                                    <Button variant="contained" fullWidth  color="primary" style={{marginTop:50}} component={Link} to="/">
                                        Sign In
                                    </Button>
                           
                               
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(styles)(Login);