import React from 'react'
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { Card, CardContent, Typography, Button, TextField, FormControlLabel,Checkbox } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {AccountCircle, Lock} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginAdmin} from '../../actions/authActions';




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
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        };
    }
    handlerLoginValue = (e)=>{
      
        this.setState({[e.target.name]:e.target.value});
    }
    handlerSubmitLogin = ()=>{
        const adminData ={
            email:this.state.email,
            password:this.state.password
        };
    
    this.props.loginAdmin(adminData);
        // axios.post('/api/admin/login',admin)
    //     .then((res)=>{
    //         console.log(res);
    //     })
    //     .catch(err =>{
    //         if(err){
    //             this.setState({errors:err.response.data});
    //         }
    //     });
    
    
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/');
        }
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    render() {
        const {errors} = this.state;
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
                                    error={errors.email !== undefined  }
                                id="form-email"
                                fullWidth
                                label="Email"
                                margin="normal"
                                name="email"
                                    value={this.state.email}
                                    onChange={this.handlerLoginValue}
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
                                    error={errors.password !== undefined }
                                    id="form-password"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handlerLoginValue}
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
                                <Button variant="contained" fullWidth color="primary" style={{ marginTop: 50 }} onClick={this.handlerSubmitLogin}>
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

Login.propTypes={
    loginAdmin:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    auth:state.auth,
    errors:state.errors
});


// export default connect(null, { loginUser })(withStyles(styles)(Login)); // cara 1 tanpa library recompose

// Menggunakan library recompose
export default compose(
    withStyles(styles,{name:'Login'}),
    connect(mapStateToProps,{loginAdmin})
)(Login); 